'use strict';

const { Controller } = require('egg');

/**
 * 基础控制器
 * 提供通用的控制器方法
 */
class BaseController extends Controller {
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
   * 获取分页参数
   * @param {Object} defaultPagination 默认分页参数
   */
  getPagination(defaultPagination = {}) {
    return this.ctx.getPagination(defaultPagination);
  }

  /**
   * 验证参数
   * @param {Object} rules 验证规则
   * @param {Object} data 待验证数据
   */
  validate(rules, data = null) {
    const source = data || this.ctx.request.body;
    try {
      this.ctx.validate(rules, source);
    } catch (err) {
      this.ctx.throw(400, '参数验证失败', {
        code: 'VALIDATION_ERROR',
        errors: err.errors,
      });
    }
  }

  /**
   * 验证必需参数
   * @param {Array} requiredParams 必需参数列表
   * @param {Object} data 数据对象
   */
  validateRequired(requiredParams = [], data = null) {
    this.ctx.validateRequired(requiredParams, data);
  }

  /**
   * 健康检查
   */
  async health() {
    this.ctx.success({
      status: 'ok',
      timestamp: Date.now(),
      uptime: process.uptime(),
      environment: this.app.config.env,
      version: require('../../package.json').version,
    }, 'Service is healthy');
  }
}

module.exports = BaseController;