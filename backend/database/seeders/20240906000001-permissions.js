'use strict';

const { v4: uuidv4 } = require('uuid');

// 权限数据种子文件，与前端路由配置保持一致
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const permissions = [
      // 系统管理模块
      {
        id: uuidv4(),
        name: '系统管理',
        code: 'system',
        type: 'menu',
        parent_id: null,
        path: '/system',
        icon: 'setting',
        sort: 1000,
        status: 1,
        description: '系统管理模块',
      },

      // 用户管理权限
      {
        id: uuidv4(),
        name: '用户管理',
        code: 'system:user',
        type: 'menu',
        parent_id: null,
        path: '/system/users',
        icon: 'user',
        sort: 1010,
        status: 1,
        description: '用户管理页面',
      },
      {
        id: uuidv4(),
        name: '查看用户',
        code: 'system:user:view',
        type: 'button',
        parent_id: null,
        sort: 1011,
        status: 1,
        description: '查看用户信息',
      },
      {
        id: uuidv4(),
        name: '创建用户',
        code: 'system:user:create',
        type: 'button',
        parent_id: null,
        sort: 1012,
        status: 1,
        description: '创建新用户',
      },
      {
        id: uuidv4(),
        name: '编辑用户',
        code: 'system:user:update',
        type: 'button',
        parent_id: null,
        sort: 1013,
        status: 1,
        description: '编辑用户信息',
      },
      {
        id: uuidv4(),
        name: '删除用户',
        code: 'system:user:delete',
        type: 'button',
        parent_id: null,
        sort: 1014,
        status: 1,
        description: '删除用户',
      },
      {
        id: uuidv4(),
        name: '用户管理API',
        code: 'system:user:manage',
        type: 'api',
        parent_id: null,
        sort: 1015,
        status: 1,
        description: '用户管理相关API权限',
      },

      // 角色管理权限
      {
        id: uuidv4(),
        name: '角色管理',
        code: 'system:role',
        type: 'menu',
        parent_id: null,
        path: '/system/roles',
        icon: 'team',
        sort: 1020,
        status: 1,
        description: '角色管理页面',
      },
      {
        id: uuidv4(),
        name: '查看角色',
        code: 'system:role:view',
        type: 'button',
        parent_id: null,
        sort: 1021,
        status: 1,
        description: '查看角色信息',
      },
      {
        id: uuidv4(),
        name: '创建角色',
        code: 'system:role:create',
        type: 'button',
        parent_id: null,
        sort: 1022,
        status: 1,
        description: '创建新角色',
      },
      {
        id: uuidv4(),
        name: '编辑角色',
        code: 'system:role:update',
        type: 'button',
        parent_id: null,
        sort: 1023,
        status: 1,
        description: '编辑角色信息',
      },
      {
        id: uuidv4(),
        name: '删除角色',
        code: 'system:role:delete',
        type: 'button',
        parent_id: null,
        sort: 1024,
        status: 1,
        description: '删除角色',
      },
      {
        id: uuidv4(),
        name: '角色管理API',
        code: 'system:role:manage',
        type: 'api',
        parent_id: null,
        sort: 1025,
        status: 1,
        description: '角色管理相关API权限',
      },

      // 权限管理权限
      {
        id: uuidv4(),
        name: '权限管理',
        code: 'system:permission',
        type: 'menu',
        parent_id: null,
        path: '/system/permissions',
        icon: 'safety',
        sort: 1030,
        status: 1,
        description: '权限管理页面',
      },
      {
        id: uuidv4(),
        name: '查看权限',
        code: 'system:permission:view',
        type: 'button',
        parent_id: null,
        sort: 1031,
        status: 1,
        description: '查看权限信息',
      },
      {
        id: uuidv4(),
        name: '创建权限',
        code: 'system:permission:create',
        type: 'button',
        parent_id: null,
        sort: 1032,
        status: 1,
        description: '创建新权限',
      },
      {
        id: uuidv4(),
        name: '编辑权限',
        code: 'system:permission:update',
        type: 'button',
        parent_id: null,
        sort: 1033,
        status: 1,
        description: '编辑权限信息',
      },
      {
        id: uuidv4(),
        name: '删除权限',
        code: 'system:permission:delete',
        type: 'button',
        parent_id: null,
        sort: 1034,
        status: 1,
        description: '删除权限',
      },
      {
        id: uuidv4(),
        name: '权限管理API',
        code: 'system:permission:manage',
        type: 'api',
        parent_id: null,
        sort: 1035,
        status: 1,
        description: '权限管理相关API权限',
      },

      // 工作台权限
      {
        id: uuidv4(),
        name: '工作台',
        code: 'dashboard',
        type: 'menu',
        parent_id: null,
        path: '/dashboard',
        icon: 'dashboard',
        sort: 100,
        status: 1,
        description: '工作台页面',
      },

      // 个人中心权限
      {
        id: uuidv4(),
        name: '个人中心',
        code: 'profile',
        type: 'menu',
        parent_id: null,
        path: '/profile',
        icon: 'user',
        sort: 9000,
        status: 1,
        description: '个人中心页面',
      },
    ];

    // 插入权限数据
    await queryInterface.bulkInsert('permissions', permissions.map(permission => ({
      ...permission,
      created_at: new Date(),
      updated_at: new Date(),
    })));

    // 更新父子关系 - 先获取插入的数据
    const insertedPermissions = await queryInterface.sequelize.query(
      'SELECT id, code FROM permissions',
      { type: Sequelize.QueryTypes.SELECT }
    );

    const permissionMap = {};
    insertedPermissions.forEach(p => {
      permissionMap[p.code] = p.id;
    });

    // 更新父权限ID - 分别更新每条记录
    const updates = [
      // 用户管理子权限
      { code: 'system:user:view', parent_code: 'system:user' },
      { code: 'system:user:create', parent_code: 'system:user' },
      { code: 'system:user:update', parent_code: 'system:user' },
      { code: 'system:user:delete', parent_code: 'system:user' },
      { code: 'system:user:manage', parent_code: 'system:user' },

      // 角色管理子权限
      { code: 'system:role:view', parent_code: 'system:role' },
      { code: 'system:role:create', parent_code: 'system:role' },
      { code: 'system:role:update', parent_code: 'system:role' },
      { code: 'system:role:delete', parent_code: 'system:role' },
      { code: 'system:role:manage', parent_code: 'system:role' },

      // 权限管理子权限
      { code: 'system:permission:view', parent_code: 'system:permission' },
      { code: 'system:permission:create', parent_code: 'system:permission' },
      { code: 'system:permission:update', parent_code: 'system:permission' },
      { code: 'system:permission:delete', parent_code: 'system:permission' },
      { code: 'system:permission:manage', parent_code: 'system:permission' },

      // 菜单父权限
      { code: 'system:user', parent_code: 'system' },
      { code: 'system:role', parent_code: 'system' },
      { code: 'system:permission', parent_code: 'system' },
    ];

    // 只更新有父权限的记录
    for (const update of updates) {
      if (permissionMap[update.parent_code] && permissionMap[update.code]) {
        await queryInterface.sequelize.query(
          'UPDATE permissions SET parent_id = ? WHERE code = ?',
          { replacements: [permissionMap[update.parent_code], update.code] }
        );
      }
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('permissions', null, {});
  },
};