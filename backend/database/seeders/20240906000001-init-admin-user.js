'use strict';

const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      // 创建默认权限
      const permissions = [
        // 系统管理
        { id: uuidv4(), name: '系统管理', code: 'system', type: 'menu', sort: 1, status: 1 },
        { id: uuidv4(), name: '用户管理', code: 'system:user', type: 'menu', sort: 1, status: 1 },
        { id: uuidv4(), name: '用户查看', code: 'system:user:view', type: 'button', sort: 1, status: 1 },
        { id: uuidv4(), name: '用户创建', code: 'system:user:create', type: 'button', sort: 2, status: 1 },
        { id: uuidv4(), name: '用户编辑', code: 'system:user:update', type: 'button', sort: 3, status: 1 },
        { id: uuidv4(), name: '用户删除', code: 'system:user:delete', type: 'button', sort: 4, status: 1 },
        { id: uuidv4(), name: '用户状态', code: 'system:user:status', type: 'button', sort: 5, status: 1 },

        // 角色管理
        { id: uuidv4(), name: '角色管理', code: 'system:role', type: 'menu', sort: 2, status: 1 },
        { id: uuidv4(), name: '角色查看', code: 'system:role:view', type: 'button', sort: 1, status: 1 },
        { id: uuidv4(), name: '角色创建', code: 'system:role:create', type: 'button', sort: 2, status: 1 },
        { id: uuidv4(), name: '角色编辑', code: 'system:role:update', type: 'button', sort: 3, status: 1 },
        { id: uuidv4(), name: '角色删除', code: 'system:role:delete', type: 'button', sort: 4, status: 1 },

        // 权限管理
        { id: uuidv4(), name: '权限管理', code: 'system:permission', type: 'menu', sort: 3, status: 1 },
        { id: uuidv4(), name: '权限查看', code: 'system:permission:view', type: 'button', sort: 1, status: 1 },
        { id: uuidv4(), name: '权限创建', code: 'system:permission:create', type: 'button', sort: 2, status: 1 },
        { id: uuidv4(), name: '权限编辑', code: 'system:permission:update', type: 'button', sort: 3, status: 1 },
        { id: uuidv4(), name: '权限删除', code: 'system:permission:delete', type: 'button', sort: 4, status: 1 },

        // API权限
        { id: uuidv4(), name: '用户API', code: 'api:user', type: 'api', sort: 1, status: 1 },
        { id: uuidv4(), name: '角色API', code: 'api:role', type: 'api', sort: 2, status: 1 },
        { id: uuidv4(), name: '权限API', code: 'api:permission', type: 'api', sort: 3, status: 1 },
      ];

      // 添加时间戳
      const now = new Date();
      permissions.forEach(permission => {
        permission.created_at = now;
        permission.updated_at = now;
      });

      await queryInterface.bulkInsert('permissions', permissions, { transaction });

      // 创建默认角色
      const adminRoleId = uuidv4();
      const userRoleId = uuidv4();

      const roles = [
        {
          id: adminRoleId,
          name: '超级管理员',
          code: 'SUPER_ADMIN',
          description: '系统超级管理员，拥有所有权限',
          status: 1,
          is_system: 1,
          sort: 1,
          created_at: now,
          updated_at: now,
        },
        {
          id: userRoleId,
          name: '普通用户',
          code: 'USER',
          description: '普通用户，基础权限',
          status: 1,
          is_system: 1,
          sort: 2,
          created_at: now,
          updated_at: now,
        },
      ];

      await queryInterface.bulkInsert('roles', roles, { transaction });

      // 为超级管理员角色分配所有权限
      const rolePermissions = permissions.map(permission => ({
        id: uuidv4(),
        role_id: adminRoleId,
        permission_id: permission.id,
        created_at: now,
        updated_at: now,
      }));

      await queryInterface.bulkInsert('role_permissions', rolePermissions, { transaction });

      // 创建默认管理员用户
      const adminUserId = uuidv4();
      const hashedPassword = await bcrypt.hash('zcn231101', 10);

      const users = [
        {
          id: adminUserId,
          username: 'adminug',
          email: 'admin@example.com',
          password: hashedPassword,
          status: 1,
          created_at: now,
          updated_at: now,
        },
        {
          id: uuidv4(),
          username: 'user',
          email: 'user@example.com',
          password: await bcrypt.hash('zcn231101', 10),
          status: 1,
          created_at: now,
          updated_at: now,
        },
      ];

      await queryInterface.bulkInsert('users', users, { transaction });

      // 为管理员用户分配超级管理员角色
      const userRoles = [
        {
          id: uuidv4(),
          user_id: adminUserId,
          role_id: adminRoleId,
          created_at: now,
          updated_at: now,
        },
      ];

      await queryInterface.bulkInsert('user_roles', userRoles, { transaction });

      await transaction.commit();
      console.log('初始数据创建成功！');
      console.log('默认管理员账号: adminug / zcn231101');
      console.log('默认用户账号: user / 123456');
    } catch (error) {
      await transaction.rollback();
      console.error('初始数据创建失败:', error);
      throw error;
    }
  },

  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      // 删除关联关系
      await queryInterface.bulkDelete('user_roles', null, { transaction });
      await queryInterface.bulkDelete('role_permissions', null, { transaction });

      // 删除主表数据
      await queryInterface.bulkDelete('users', null, { transaction });
      await queryInterface.bulkDelete('roles', null, { transaction });
      await queryInterface.bulkDelete('permissions', null, { transaction });

      await transaction.commit();
      console.log('初始数据清理完成！');
    } catch (error) {
      await transaction.rollback();
      console.error('初始数据清理失败:', error);
      throw error;
    }
  }
};