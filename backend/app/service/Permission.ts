import { Service } from 'egg';
import { Op } from 'sequelize';

interface CreatePermissionParams {
  name: string;
  description?: string;
  action: string;
  resource: string;
}

interface UpdatePermissionParams {
  name?: string;
  description?: string;
  action?: string;
  resource?: string;
}

export default class PermissionService extends Service {
  /**
   * 获取所有权限
   */
  async index(page = 1, pageSize = 10, search?: string) {
    const { ctx } = this;
    const offset = (page - 1) * pageSize;
    const limit = pageSize;

    const where: any = {};
    if (search) {
      where[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
        { action: { [Op.like]: `%${search}%` } },
        { resource: { [Op.like]: `%${search}%` } },
      ];
    }

    const { rows: permissions, count } = await ctx.model.Permission.findAndCountAll({
      where,
      offset,
      limit,
      order: [['createdAt', 'DESC']],
    });

    return {
      permissions,
      pagination: {
        page,
        pageSize,
        total: count,
        totalPages: Math.ceil(count / pageSize),
      },
    };
  }

  /**
   * 根据ID获取权限
   */
  async show(id: number) {
    const { ctx } = this;
    const permission = await ctx.model.Permission.findByPk(id);

    if (!permission) {
      ctx.throw(404, '权限不存在');
    }

    return permission;
  }

  /**
   * 创建权限
   */
  async create({ name, description, action, resource }: CreatePermissionParams) {
    const { ctx } = this;
    
    // 检查权限是否已存在
    const existingPermission = await ctx.model.Permission.findOne({
      where: {
        [Op.or]: [
          { name },
          { 
            [Op.and]: [
              { action },
              { resource },
            ],
          },
        ],
      },
    });

    if (existingPermission) {
      ctx.throw(400, '权限名或操作资源组合已存在');
    }

    // 创建权限
    const permission = await ctx.model.Permission.create({
      name,
      description,
      action,
      resource,
    });

    return permission;
  }

  /**
   * 更新权限
   */
  async update(id: number, { name, description, action, resource }: UpdatePermissionParams) {
    const { ctx } = this;
    
    const permission = await ctx.model.Permission.findByPk(id);
    if (!permission) {
      ctx.throw(404, '权限不存在');
    }

    // 检查权限是否已存在（排除当前权限）
    if (name || action || resource) {
      const where: any = {
        [Op.and]: [
          {
            [Op.or]: [
              name ? { name } : {},
              (action && resource) ? { 
                [Op.and]: [
                  { action },
                  { resource },
                ],
              } : {},
            ],
          },
          {
            id: { [Op.ne]: id },
          },
        ],
      };

      const existingPermission = await ctx.model.Permission.findOne({
        where,
      });

      if (existingPermission) {
        ctx.throw(400, '权限名或操作资源组合已存在');
      }
    }

    // 更新权限信息
    await permission.update({
      name,
      description,
      action,
      resource,
    });

    return permission;
  }

  /**
   * 删除权限
   */
  async destroy(id: number) {
    const { ctx } = this;
    
    const permission = await ctx.model.Permission.findByPk(id);
    if (!permission) {
      ctx.throw(404, '权限不存在');
    }

    // 检查是否有角色关联此权限
    const rolePermissionCount = await ctx.model.RolePermission.count({
      where: { permissionId: id },
    });

    if (rolePermissionCount > 0) {
      ctx.throw(400, '该权限已被分配给角色，无法删除');
    }

    // 删除权限
    await permission.destroy();

    return true;
  }
}