'use strict';

const BaseService = require('./base');

/**
 * 权限服务
 * 处理权限相关的业务逻辑
 */
class PermissionService extends BaseService {
  /**
   * 获取权限列表（分页）
   * @param {Object} params 查询参数
   * @returns {Object} 分页结果
   */
  async findAll(params) {
    const { current, pageSize, offset, limit, keyword, status, type, startTime, endTime } = params;

    // 构建查询条件
    const whereCondition = this.buildWhereCondition(
      { keyword, status, startTime, endTime },
      ['name', 'code', 'description']
    );

    // 添加类型过滤
    if (type) {
      whereCondition.type = type;
    }

    const result = await this.app.model.Permission.findAndCountAll({
      where: whereCondition,
      include: [{
        model: this.app.model.Permission,
        as: 'parent',
        attributes: ['id', 'name', 'code'],
      }],
      order: [['sort', 'ASC'], ['created_at', 'DESC']],
      offset,
      limit,
    });

    return this.formatPaginationResult(result, { current, pageSize });
  }

  /**
   * 根据ID查找权限
   * @param {string} id 权限ID
   * @returns {Object|null} 权限信息
   */
  async findById(id) {
    const permission = await this.app.model.Permission.findByPk(id, {
      include: [
        {
          model: this.app.model.Permission,
          as: 'parent',
          attributes: ['id', 'name', 'code'],
        },
        {
          model: this.app.model.Permission,
          as: 'children',
          attributes: ['id', 'name', 'code', 'type', 'sort'],
          where: { status: 1 },
          required: false,
          order: [['sort', 'ASC']],
        },
      ],
    });

    return permission;
  }

  /**
   * 获取权限树形结构
   * @returns {Array} 权限树
   */
  async getTree() {
    const permissions = await this.app.model.Permission.findAll({
      where: { status: 1 },
      attributes: ['id', 'name', 'code', 'type', 'parent_id', 'path', 'icon', 'sort'],
      order: [['sort', 'ASC'], ['created_at', 'ASC']],
    });

    return this.buildTree(permissions);
  }

  /**
   * 构建权限树形结构
   * @param {Array} permissions 权限列表
   * @param {string} parentId 父权限ID
   * @returns {Array} 树形结构
   */
  buildTree(permissions, parentId = null) {
    const tree = [];

    permissions.forEach(permission => {
      if (permission.parent_id === parentId) {
        const node = {
          ...permission.toJSON(),
          children: this.buildTree(permissions, permission.id),
        };

        // 如果没有子节点，删除children属性
        if (node.children.length === 0) {
          delete node.children;
        }

        tree.push(node);
      }
    });

    return tree;
  }

  /**
   * 创建权限
   * @param {Object} permissionData 权限数据
   * @returns {Object} 创建的权限信息
   */
  async create(permissionData) {
    const { name, code, type, parent_id, path, component, icon, sort = 0, description } = permissionData;

    // 检查权限编码是否已存在
    const existingPermission = await this.app.model.Permission.findOne({
      where: { code },
    });
    if (existingPermission) {
      throw new Error('权限编码已存在');
    }

    // 验证父权限是否存在
    if (parent_id) {
      const parentPermission = await this.app.model.Permission.findByPk(parent_id);
      if (!parentPermission) {
        throw new Error('父权限不存在');
      }
    }

    // 创建权限
    const permission = await this.app.model.Permission.create({
      id: this.generateUuid(),
      name,
      code,
      type,
      parent_id: parent_id || null,
      path: path || null,
      component: component || null,
      icon: icon || null,
      sort,
      status: 1,
      description: description || null,
    });

    // 记录操作日志
    await this.logOperation('create', 'permission', {
      permissionId: permission.id,
      name,
      code,
      type
    });

    return permission.toJSON();
  }

  /**
   * 更新权限信息
   * @param {string} id 权限ID
   * @param {Object} permissionData 更新的权限数据
   * @returns {Object} 更新后的权限信息
   */
  async update(id, permissionData) {
    const permission = await this.app.model.Permission.findByPk(id);
    if (!permission) {
      throw new Error('权限不存在');
    }

    const { name, code, type, parent_id, path, component, icon, sort, status, description } = permissionData;

    // 检查权限编码唯一性（如果有更新）
    if (code && code !== permission.code) {
      const existingPermission = await this.app.model.Permission.findOne({
        where: { code },
      });
      if (existingPermission) {
        throw new Error('权限编码已存在');
      }
    }

    // 验证父权限（不能设置自己为父权限）
    if (parent_id) {
      if (parent_id === id) {
        throw new Error('不能设置自己为父权限');
      }

      const parentPermission = await this.app.model.Permission.findByPk(parent_id);
      if (!parentPermission) {
        throw new Error('父权限不存在');
      }

      // 检查是否会形成循环引用
      const isCircular = await this.checkCircularReference(id, parent_id);
      if (isCircular) {
        throw new Error('不能设置子权限为父权限，会形成循环引用');
      }
    }

    // 更新权限信息
    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (code !== undefined) updateData.code = code;
    if (type !== undefined) updateData.type = type;
    if (parent_id !== undefined) updateData.parent_id = parent_id;
    if (path !== undefined) updateData.path = path;
    if (component !== undefined) updateData.component = component;
    if (icon !== undefined) updateData.icon = icon;
    if (sort !== undefined) updateData.sort = sort;
    if (status !== undefined) updateData.status = status;
    if (description !== undefined) updateData.description = description;

    await permission.update(updateData);

    // 记录操作日志
    await this.logOperation('update', 'permission', { permissionId: id, updateData });

    // 获取更新后的权限信息
    const updatedPermission = await this.findById(id);
    return updatedPermission.toJSON();
  }

  /**
   * 检查循环引用
   * @param {string} currentId 当前权限ID
   * @param {string} parentId 要设置的父权限ID
   * @returns {boolean} 是否存在循环引用
   */
  async checkCircularReference(currentId, parentId) {
    const children = await this.getDescendants(currentId);
    return children.some(child => child.id === parentId);
  }

  /**
   * 获取权限的所有后代
   * @param {string} permissionId 权限ID
   * @returns {Array} 后代权限列表
   */
  async getDescendants(permissionId) {
    const descendants = [];

    const children = await this.app.model.Permission.findAll({
      where: { parent_id: permissionId },
    });

    for (const child of children) {
      descendants.push(child);
      const grandChildren = await this.getDescendants(child.id);
      descendants.push(...grandChildren);
    }

    return descendants;
  }

  /**
   * 软删除权限
   * @param {string} id 权限ID
   */
  async destroy(id) {
    const permission = await this.app.model.Permission.findByPk(id);
    if (!permission) {
      throw new Error('权限不存在');
    }

    // 检查是否有子权限
    const childCount = await this.app.model.Permission.count({
      where: { parent_id: id, status: 1 },
    });

    if (childCount > 0) {
      throw new Error('该权限下还有子权限，不能删除');
    }

    // 检查是否有角色正在使用此权限
    const roleCount = await this.app.model.RolePermission.count({
      where: { permission_id: id },
    });

    if (roleCount > 0) {
      throw new Error('该权限正在被角色使用，不能删除');
    }

    // 开启事务
    const transaction = await this.app.model.transaction();

    try {
      // 软删除权限
      await permission.destroy({ transaction });

      await transaction.commit();

      // 记录操作日志
      await this.logOperation('delete', 'permission', {
        permissionId: id,
        name: permission.name,
        code: permission.code
      });
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  /**
   * 获取所有可用权限（用于角色分配）
   * @returns {Array} 权限列表
   */
  async getAvailablePermissions() {
    const permissions = await this.app.model.Permission.findAll({
      where: { status: 1 },
      attributes: ['id', 'name', 'code', 'type', 'parent_id'],
      order: [['sort', 'ASC'], ['name', 'ASC']],
    });

    return permissions;
  }

  /**
   * 根据类型获取权限
   * @param {string} type 权限类型
   * @returns {Array} 权限列表
   */
  async getPermissionsByType(type) {
    const permissions = await this.app.model.Permission.findAll({
      where: {
        type,
        status: 1,
      },
      attributes: ['id', 'name', 'code', 'path', 'icon', 'sort'],
      order: [['sort', 'ASC'], ['name', 'ASC']],
    });

    return permissions;
  }
}

module.exports = PermissionService;