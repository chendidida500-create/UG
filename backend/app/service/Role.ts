import { Service } from 'egg';
import { Op } from 'sequelize';

interface CreateRoleParams {
  name: string;
  description?: string;
}

interface UpdateRoleParams {
  name?: string;
  description?: string;
}

export default class RoleService extends Service {
  /**
   * 获取所有角色
   */
  async index(page = 1, pageSize = 10, search?: string) {
    const { ctx } = this;
    const offset = (page - 1) * pageSize;
    const limit = pageSize;

    const where: any = {};
    if (search) {
      where.name = { [Op.like]: `%${search}%` };
    }

    const { rows: roles, count } = await ctx.model.Role.findAndCountAll({
      where,
      offset,
      limit,
      order: [['createdAt', 'DESC']],
      include: [{
        model: ctx.model.Permission,
        through: { attributes: [] },
        attributes: ['id', 'name', 'action', 'resource'],
      }],
    });

    return {
      roles: roles.map(role => {
        const roleData = role.toJSON();
        return {
          ...roleData,
          permissions: roleData.Permissions?.map((permission: any) => ({
            id: permission.id,
            name: permission.name,
            action: permission.action,
            resource: permission.resource,
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
  }

  /**
   * 根据ID获取角色
   */
  async show(id: number) {
    const { ctx } = this;
    const role = await ctx.model.Role.findByPk(id, {
      include: [{
        model: ctx.model.Permission,
        through: { attributes: [] },
        attributes: ['id', 'name', 'action', 'resource'],
      }],
    });

    if (!role) {
      ctx.throw(404, '角色不存在');
    }

    const roleData = role.toJSON();
    return {
      ...roleData,
      permissions: roleData.Permissions?.map((permission: any) => ({
        id: permission.id,
        name: permission.name,
        action: permission.action,
        resource: permission.resource,
      })) || [],
    };
  }

  /**
   * 创建角色
   */
  async create({ name, description }: CreateRoleParams) {
    const { ctx } = this;
    
    // 检查角色名是否已存在
    const existingRole = await ctx.model.Role.findOne({
      where: { name },
    });

    if (existingRole) {
      ctx.throw(400, '角色名已存在');
    }

    // 创建角色
    const role = await ctx.model.Role.create({
      name,
      description,
    });

    return role;
  }

  /**
   * 更新角色
   */
  async update(id: number, { name, description }: UpdateRoleParams) {
    const { ctx } = this;
    
    const role = await ctx.model.Role.findByPk(id);
    if (!role) {
      ctx.throw(404, '角色不存在');
    }

    // 检查角色名是否已存在（排除当前角色）
    if (name) {
      const existingRole = await ctx.model.Role.findOne({
        where: {
          [Op.and]: [
            { name },
            { id: { [Op.ne]: id } },
          ],
        },
      });

      if (existingRole) {
        ctx.throw(400, '角色名已存在');
      }
    }

    // 更新角色信息
    await role.update({
      name,
      description,
    });

    return role;
  }

  /**
   * 删除角色
   */
  async destroy(id: number) {
    const { ctx } = this;
    
    const role = await ctx.model.Role.findByPk(id);
    if (!role) {
      ctx.throw(404, '角色不存在');
    }

    // 检查是否有用户关联此角色
    const userRoleCount = await ctx.model.UserRole.count({
      where: { roleId: id },
    });

    if (userRoleCount > 0) {
      ctx.throw(400, '该角色已被分配给用户，无法删除');
    }

    // 删除角色关联的权限
    await ctx.model.RolePermission.destroy({
      where: {
        roleId: id,
      },
    });

    // 删除角色
    await role.destroy();

    return true;
  }

  /**
   * 为角色分配权限
   */
  async assignPermissions(roleId: number, permissionIds: number[]) {
    const { ctx } = this;
    
    const role = await ctx.model.Role.findByPk(roleId);
    if (!role) {
      ctx.throw(404, '角色不存在');
    }

    // 先删除角色现有的权限关联
    await ctx.model.RolePermission.destroy({
      where: {
        roleId,
      },
    });

    // 添加新的权限关联
    if (permissionIds.length > 0) {
      const rolePermissions = permissionIds.map(permissionId => ({
        roleId,
        permissionId,
      }));
      await ctx.model.RolePermission.bulkCreate(rolePermissions);
    }

    return true;
  }
}