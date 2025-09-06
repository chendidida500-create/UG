'use strict';

const { Service } = require('egg');

/**
 * 基础服务类
 * 提供通用的服务方法
 */
class BaseService extends Service {
  /**
   * 获取当前用户信息
   */
  get currentUser() {
    return this.ctx.currentUser;
  }

  /**
   * 获取当前用户ID
   */
  get currentUserId() {
    return this.ctx.currentUserId;
  }

  /**
   * 创建UUID
   * @returns {string} UUID字符串
   */
  generateUuid() {
    const { v4: uuidv4 } = require('uuid');
    return uuidv4();
  }

  /**
   * 密码加密
   * @param {string} password 明文密码
   * @returns {string} 加密后的密码
   */
  async hashPassword(password) {
    const bcrypt = require('bcryptjs');
    const { saltRounds } = this.app.config.userConfig.bcrypt;
    return await bcrypt.hash(password, saltRounds);
  }

  /**
   * 密码验证
   * @param {string} password 明文密码
   * @param {string} hashedPassword 加密后的密码
   * @returns {boolean} 验证结果
   */
  async comparePassword(password, hashedPassword) {
    const bcrypt = require('bcryptjs');
    return await bcrypt.compare(password, hashedPassword);
  }

  /**
   * 生成JWT Token
   * @param {Object} payload Token载荷
   * @param {string} expiresIn 过期时间
   * @returns {string} JWT Token
   */
  generateToken(payload, expiresIn = null) {
    const jwt = require('jsonwebtoken');
    const { secret } = this.app.config.jwt;
    const options = {};

    if (expiresIn) {
      options.expiresIn = expiresIn;
    } else if (this.app.config.jwt.expiresIn) {
      options.expiresIn = this.app.config.jwt.expiresIn;
    }

    return jwt.sign(payload, secret, options);
  }

  /**
   * 验证JWT Token
   * @param {string} token JWT Token
   * @returns {Object} Token载荷
   */
  verifyToken(token) {
    const jwt = require('jsonwebtoken');
    const { secret } = this.app.config.jwt;
    return jwt.verify(token, secret);
  }

  /**
   * 格式化分页查询结果
   * @param {Object} result Sequelize查询结果
   * @param {Object} pagination 分页参数
   * @returns {Object} 格式化后的结果
   */
  formatPaginationResult(result, pagination) {
    return {
      list: result.rows || [],
      pagination: {
        current: pagination.current,
        pageSize: pagination.pageSize,
        total: result.count || 0,
        totalPages: Math.ceil((result.count || 0) / pagination.pageSize),
      },
    };
  }

  /**
   * 构建查询条件
   * @param {Object} params 查询参数
   * @param {Array} searchFields 可搜索字段
   * @returns {Object} Sequelize查询条件
   */
  buildWhereCondition(params, searchFields = []) {
    const { Op } = require('sequelize');
    const where = {};

    // 处理搜索关键词
    if (params.keyword && searchFields.length > 0) {
      where[Op.or] = searchFields.map(field => ({
        [field]: {
          [Op.like]: `%${params.keyword}%`,
        },
      }));
    }

    // 处理状态过滤
    if (params.status !== undefined && params.status !== '') {
      where.status = params.status;
    }

    // 处理时间范围过滤
    if (params.startTime && params.endTime) {
      where.created_at = {
        [Op.between]: [params.startTime, params.endTime],
      };
    } else if (params.startTime) {
      where.created_at = {
        [Op.gte]: params.startTime,
      };
    } else if (params.endTime) {
      where.created_at = {
        [Op.lte]: params.endTime,
      };
    }

    return where;
  }

  /**
   * 记录操作日志
   * @param {string} action 操作类型
   * @param {string} target 操作目标
   * @param {Object} data 操作数据
   */
  async logOperation(action, target, data = {}) {
    // 这里可以实现操作日志记录逻辑
    // 暂时使用console.log，后续可以存储到数据库
    this.logger.info(`[Operation Log] User: ${this.currentUserId}, Action: ${action}, Target: ${target}`, data);
  }
}

module.exports = BaseService;