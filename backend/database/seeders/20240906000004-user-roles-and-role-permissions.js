'use strict';

const { v4: uuidv4 } = require('uuid');

// 用户角色关联和角色权限关联数据种子
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // 获取用户、角色和权限数据
    const users = await queryInterface.sequelize.query(
      'SELECT id, username FROM users',
      { type: Sequelize.QueryTypes.SELECT }
    );

    const roles = await queryInterface.sequelize.query(
      'SELECT id, code FROM roles',
      { type: Sequelize.QueryTypes.SELECT }
    );

    const permissions = await queryInterface.sequelize.query(
      'SELECT id, code FROM permissions',
      { type: Sequelize.QueryTypes.SELECT }
    );

    // 创建映射
    const userMap = {};
    users.forEach(u => { userMap[u.username] = u.id; });

    const roleMap = {};
    roles.forEach(r => { roleMap[r.code] = r.id; });

    const permissionMap = {};
    permissions.forEach(p => { permissionMap[p.code] = p.id; });

    // 用户角色关联数据
    const userRoles = [
      {
        id: uuidv4(),
        user_id: userMap['admin'],
        role_id: roleMap['super_admin'],
      },
      {
        id: uuidv4(),
        user_id: userMap['demo'],
        role_id: roleMap['user'],
      },
    ];

    await queryInterface.bulkInsert('user_roles', userRoles.map(ur => ({
      ...ur,
      created_at: new Date(),
      updated_at: new Date(),
    })));

    // 角色权限关联数据
    const rolePermissions = [];

    // 超级管理员拥有所有权限
    const superAdminRoleId = roleMap['super_admin'];
    permissions.forEach(permission => {
      rolePermissions.push({
        id: uuidv4(),
        role_id: superAdminRoleId,
        permission_id: permission.id,
      });
    });

    // 管理员拥有除超级管理员专有权限外的其他权限
    const adminRoleId = roleMap['admin'];
    const adminPermissionCodes = [
      'dashboard',
      'system',
      'system:user',
      'system:user:view',
      'system:user:create',
      'system:user:update',
      'system:user:manage',
      'system:role',
      'system:role:view',
      'system:role:update',
      'system:role:manage',
      'system:permission',
      'system:permission:view',
      'profile',
    ];

    adminPermissionCodes.forEach(code => {
      if (permissionMap[code]) {
        rolePermissions.push({
          id: uuidv4(),
          role_id: adminRoleId,
          permission_id: permissionMap[code],
        });
      }
    });

    // 普通用户权限
    const userRoleId = roleMap['user'];
    const userPermissionCodes = [
      'dashboard',
      'profile',
    ];

    userPermissionCodes.forEach(code => {
      if (permissionMap[code]) {
        rolePermissions.push({
          id: uuidv4(),
          role_id: userRoleId,
          permission_id: permissionMap[code],
        });
      }
    });

    await queryInterface.bulkInsert('role_permissions', rolePermissions.map(rp => ({
      ...rp,
      created_at: new Date(),
      updated_at: new Date(),
    })));
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('role_permissions', null, {});
    await queryInterface.bulkDelete('user_roles', null, {});
  },
};