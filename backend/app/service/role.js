'use strict';

const BaseService = require('./base');

/**
 * 角色服务
 * 处理角色相关的业务逻辑
 */
class RoleService extends BaseService {
  /**
   * 获取角色列表（分页）
   * @param {Object} params 查询参数
   * @returns {Object} 分页结果
   */
  async findAll(params) {
    const { current, pageSize, offset, limit, keyword, status, startTime, endTime } = params;

    // 构建查询条件
    const whereCondition = this.buildWhereCondition(
      { keyword, status, startTime, endTime },
      ['name', 'code', 'description']
    );

    const result = await this.app.model.Role.findAndCountAll({
      where: whereCondition,
      include: [{
        model: this.app.model.Permission,
        as: 'permissions',
        through: { attributes: [] },
        attributes: ['id', 'name', 'code', 'type'],
      }],
      order: [['sort', 'ASC'], ['created_at', 'DESC']],
      offset,
      limit,
    });

    return this.formatPaginationResult(result, { current, pageSize });
  }

  /**
   * 根据ID查找角色
   * @param {string} id 角色ID
   * @returns {Object|null} 角色信息
   */
  async findById(id) {
    const role = await this.app.model.Role.findByPk(id, {
      include: [{
        model: this.app.model.Permission,
        as: 'permissions',
        through: { attributes: [] },
        attributes: ['id', 'name', 'code', 'type', 'parent_id', 'path', 'icon', 'sort'],
      }],
    });

    return role;
  }

  /**
   * 创建角色
   * @param {Object} roleData 角色数据
   * @returns {Object} 创建的角色信息
   */
  async create(roleData) {
    const { name, code, description, permissionIds = [] } = roleData;

    // 检查角色编码是否已存在
    const existingRole = await this.app.model.Role.findOne({
      where: { code },
    });
    if (existingRole) {
      throw new Error('角色编码已存在');
    }

    // 开启事务
    const transaction = await this.app.model.transaction();

    try {
      // 创建角色
      const role = await this.app.model.Role.create({
        id: this.generateUuid(),
        name,
        code,
        description,
        status: 1,
        is_system: 0,
        sort: 999,
      }, { transaction });

      // 分配权限
      if (permissionIds.length > 0) {
        const rolePermissions = permissionIds.map(permissionId => ({
          id: this.generateUuid(),
          role_id: role.id,
          permission_id: permissionId,
        }));

        await this.app.model.RolePermission.bulkCreate(rolePermissions, { transaction });
      }

      await transaction.commit();

      // 记录操作日志
      await this.logOperation('create', 'role', { roleId: role.id, name, code });

      return role.toJSON();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  /**
   * 更新角色信息
   * @param {string} id 角色ID
   * @param {Object} roleData 更新的角色数据
   * @returns {Object} 更新后的角色信息
   */
  async update(id, roleData) {
    const role = await this.app.model.Role.findByPk(id);
    if (!role) {
      throw new Error('角色不存在');
    }

    // 检查是否为系统角色
    if (role.is_system === 1 && roleData.code && roleData.code !== role.code) {
      throw new Error('系统角色不能修改编码');
    }

    const { name, code, description, status, permissionIds } = roleData;

    // 检查角色编码唯一性（如果有更新）
    if (code && code !== role.code) {
      const existingRole = await this.app.model.Role.findOne({
        where: { code },
      });
      if (existingRole) {
        throw new Error('角色编码已存在');
      }
    }

    // 开启事务
    const transaction = await this.app.model.transaction();

    try {
      // 更新角色基本信息
      const updateData = {};
      if (name !== undefined) updateData.name = name;
      if (code !== undefined) updateData.code = code;
      if (description !== undefined) updateData.description = description;
      if (status !== undefined) updateData.status = status;

      await role.update(updateData, { transaction });

      // 更新角色权限（如果提供了permissionIds）
      if (permissionIds !== undefined) {
        // 删除现有权限关联
        await this.app.model.RolePermission.destroy({
          where: { role_id: id },
          transaction,
        });

        // 创建新的权限关联
        if (permissionIds.length > 0) {
          const rolePermissions = permissionIds.map(permissionId => ({
            id: this.generateUuid(),
            role_id: id,
            permission_id: permissionId,
          }));

          await this.app.model.RolePermission.bulkCreate(rolePermissions, { transaction });
        }
      }

      await transaction.commit();

      // 记录操作日志
      await this.logOperation('update', 'role', { roleId: id, updateData });

      // 获取更新后的角色信息
      const updatedRole = await this.findById(id);
      return updatedRole.toJSON();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  /**
   * 软删除角色
   * @param {string} id 角色ID
   */
  async destroy(id) {
    const role = await this.app.model.Role.findByPk(id);
    if (!role) {
      throw new Error('角色不存在');
    }

    // 检查是否为系统角色
    if (role.is_system === 1) {
      throw new Error('系统角色不能删除');
    }

    // 检查是否有用户正在使用此角色
    const userCount = await this.app.model.UserRole.count({
      where: { role_id: id },
    });

    if (userCount > 0) {
      throw new Error('该角色正在被用户使用，不能删除');
    }

    // 开启事务
    const transaction = await this.app.model.transaction();

    try {
      // 删除角色权限关联
      await this.app.model.RolePermission.destroy({
        where: { role_id: id },
        transaction,
      });

      // 软删除角色
      await role.destroy({ transaction });

      await transaction.commit();

      // 记录操作日志
      await this.logOperation('delete', 'role', { roleId: id, name: role.name });
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  /**
   * 获取角色权限列表
   * @param {string} roleId 角色ID
   * @returns {Array} 权限列表
   */
  async getPermissions(roleId) {
    const role = await this.app.model.Role.findByPk(roleId, {
      include: [{
        model: this.app.model.Permission,
        as: 'permissions',
        through: { attributes: [] },
        where: { status: 1 },
        order: [['sort', 'ASC']],
      }],
    });

    if (!role) {
      throw new Error('角色不存在');
    }

    return role.permissions || [];
  }

  /**
   * 更新角色权限
   * @param {string} roleId 角色ID
   * @param {Array} permissionIds 权限ID数组
   */
  async updatePermissions(roleId, permissionIds) {
    const role = await this.app.model.Role.findByPk(roleId);
    if (!role) {
      throw new Error('角色不存在');
    }

    // 验证权限ID是否存在
    if (permissionIds.length > 0) {
      const existingPermissions = await this.app.model.Permission.findAll({
        where: {
          id: permissionIds,
          status: 1,
        },
        attributes: ['id'],
      });

      if (existingPermissions.length !== permissionIds.length) {
        throw new Error('部分权限不存在或已被禁用');
      }
    }

    // 开启事务
    const transaction = await this.app.model.transaction();

    try {
      // 删除现有权限关联
      await this.app.model.RolePermission.destroy({
        where: { role_id: roleId },
        transaction,
      });

      // 创建新的权限关联
      if (permissionIds.length > 0) {
        const rolePermissions = permissionIds.map(permissionId => ({
          id: this.generateUuid(),
          role_id: roleId,
          permission_id: permissionId,
        }));

        await this.app.model.RolePermission.bulkCreate(rolePermissions, { transaction });
      }

      await transaction.commit();

      // 记录操作日志
      await this.logOperation('update_permissions', 'role', {
        roleId,
        permissionCount: permissionIds.length
      });
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  /**
   * 获取所有可用角色（用于下拉选择）
   * @returns {Array} 角色列表
   */
  async getAvailableRoles() {
    const roles = await this.app.model.Role.findAll({
      where: { status: 1 },
      attributes: ['id', 'name', 'code', 'description'],
      order: [['sort', 'ASC'], ['name', 'ASC']],
    });

    return roles;
  }
}

module.exports = RoleService;