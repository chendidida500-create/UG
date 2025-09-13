import { Service } from 'egg';
import { Op } from 'sequelize';

interface CreateUserParams {
  username: string;
  email: string;
  password: string;
}

interface UpdateUserParams {
  username?: string;
  email?: string;
  password?: string;
}

export default class UserService extends Service {
  /**
   * 获取所有用户
   */
  async index(page = 1, pageSize = 10, search?: string) {
    const { ctx } = this;
    const offset = (page - 1) * pageSize;
    const limit = pageSize;

    // 尝试从缓存获取
    const cacheKey = `users:${page}:${pageSize}:${search || 'all'}`;
    const cachedResult = await ctx.service.cache.get(cacheKey);
    if (cachedResult) {
      return cachedResult;
    }

    const where: any = {};
    if (search) {
      where[Op.or] = [
        { username: { [Op.like]: `%${search}%` } },
        { email: { [Op.like]: `%${search}%` } },
      ];
    }

    const { rows: users, count } = await ctx.model.User.findAndCountAll({
      where,
      offset,
      limit,
      order: [['createdAt', 'DESC']],
      include: [{
        model: ctx.model.Role,
        through: { attributes: [] }, // 不查询中间表字段
        attributes: ['id', 'name'],
      }],
    });

    const result = {
      users: users.map(user => {
        const userData = user.toJSON();
        return {
          ...userData,
          roles: userData.Roles?.map((role: any) => ({
            id: role.id,
            name: role.name,
          })) || [],
        };
      }),
      pagination: {
        page,
        pageSize,
        total: count,
        totalPages: Math.ceil(count / pageSize),
      },
    };

    // 设置缓存，过期时间30秒
    await ctx.service.cache.set(cacheKey, result, 30);

    return result;
  }

  /**
   * 根据ID获取用户
   */
  async show(id: number) {
    const { ctx } = this;
    
    // 尝试从缓存获取
    const cacheKey = `user:${id}`;
    const cachedUser = await ctx.service.cache.get(cacheKey);
    if (cachedUser) {
      return cachedUser;
    }

    const user = await ctx.model.User.findByPk(id, {
      include: [{
        model: ctx.model.Role,
        through: { attributes: [] },
        attributes: ['id', 'name'],
      }],
    });

    if (!user) {
      ctx.throw(404, '用户不存在');
    }

    const userData = user.toJSON();
    const result = {
      ...userData,
      roles: userData.Roles?.map((role: any) => ({
        id: role.id,
        name: role.name,
      })) || [],
    };

    // 设置缓存，过期时间1分钟
    await ctx.service.cache.set(cacheKey, result, 60);

    return result;
  }

  /**
   * 创建用户
   */
  async create({ username, email, password }: CreateUserParams) {
    const { ctx } = this;
    
    // 检查用户名是否已存在
    const existingUser = await ctx.model.User.findOne({
      where: {
        [Op.or]: [
          { username },
          { email },
        ],
      },
    });

    if (existingUser) {
      ctx.throw(400, '用户名或邮箱已存在');
    }

    // 密码加密
    const hashedPassword = await ctx.genHash(password);

    // 创建用户
    const user = await ctx.model.User.create({
      username,
      email,
      password: hashedPassword,
    });

    return user;
  }

  /**
   * 更新用户
   */
  async update(id: number, { username, email, password }: UpdateUserParams) {
    const { ctx } = this;
    
    const user = await ctx.model.User.findByPk(id);
    if (!user) {
      ctx.throw(404, '用户不存在');
    }

    // 检查用户名是否已存在（排除当前用户）
    if (username || email) {
      const existingUser = await ctx.model.User.findOne({
        where: {
          [Op.and]: [
            {
              [Op.or]: [
                username ? { username } : {},
                email ? { email } : {},
              ],
            },
            {
              id: { [Op.ne]: id },
            },
          ],
        },
      });

      if (existingUser) {
        ctx.throw(400, '用户名或邮箱已存在');
      }
    }

    // 更新密码（如果提供了新密码）
    if (password) {
      password = await ctx.genHash(password);
    }

    // 更新用户信息
    await user.update({
      username,
      email,
      password,
    });

    // 清除相关缓存
    await ctx.service.cache.del(`user:${id}`);
    await ctx.service.cache.del(`users:*`);

    return user;
  }

  /**
   * 删除用户
   */
  async destroy(id: number) {
    const { ctx } = this;
    
    const user = await ctx.model.User.findByPk(id);
    if (!user) {
      ctx.throw(404, '用户不存在');
    }

    // 删除用户关联的角色
    await ctx.model.UserRole.destroy({
      where: {
        userId: id,
      },
    });

    // 删除用户
    await user.destroy();

    // 清除相关缓存
    await ctx.service.cache.del(`user:${id}`);
    await ctx.service.cache.del(`users:*`);

    return true;
  }

  /**
   * 为用户分配角色
   */
  async assignRoles(userId: number, roleIds: number[]) {
    const { ctx } = this;
    
    const user = await ctx.model.User.findByPk(userId);
    if (!user) {
      ctx.throw(404, '用户不存在');
    }

    // 先删除用户现有的角色关联
    await ctx.model.UserRole.destroy({
      where: {
        userId,
      },
    });

    // 添加新的角色关联
    if (roleIds.length > 0) {
      const userRoles = roleIds.map(roleId => ({
        userId,
        roleId,
      }));
      await ctx.model.UserRole.bulkCreate(userRoles);
    }

    // 清除相关缓存
    await ctx.service.cache.del(`user:${userId}`);

    return true;
  }
}