'use strict';

/**
 * Context扩展
 * 为ctx添加常用的方法
 */

module.exports = {
  /**
   * 成功响应
   * @param {*} data 响应数据
   * @param {string} message 响应消息
   * @param {string} code 响应代码
   */
  success(data = null, message = 'success', code = 'SUCCESS') {
    this.status = 200;
    this.body = {
      success: true,
      code,
      message,
      data,
      timestamp: Date.now(),
    };
  },

  /**
   * 分页成功响应
   * @param {Array} list 数据列表
   * @param {Object} pagination 分页信息
   * @param {string} message 响应消息
   */
  successWithPagination(list = [], pagination = {}, message = 'success') {
    this.status = 200;
    this.body = {
      success: true,
      code: 'SUCCESS',
      message,
      data: {
        list,
        pagination: {
          current: pagination.current || 1,
          pageSize: pagination.pageSize || 20,
          total: pagination.total || 0,
          totalPages: Math.ceil(
            (pagination.total || 0) / (pagination.pageSize || 20)
          ),
        },
      },
      timestamp: Date.now(),
    };
  },

  /**
   * 错误响应
   * @param {string} message 错误消息
   * @param {string} code 错误代码
   * @param {number} status HTTP状态码
   * @param {*} data 额外数据
   */
  error(message = 'error', code = 'ERROR', status = 400, data = null) {
    this.status = status;
    this.body = {
      success: false,
      code,
      message,
      data,
      timestamp: Date.now(),
    };
  },

  /**
   * 获取当前用户信息
   */
  get currentUser() {
    return this.state.user || null;
  },

  /**
   * 获取当前用户ID
   */
  get currentUserId() {
    return this.state.userId || null;
  },

  /**
   * 获取分页参数
   * @param {Object} defaultPagination 默认分页参数
   */
  getPagination(defaultPagination = {}) {
    const { current = 1, pageSize = 20 } = this.query;
    const { defaultPageSize = 20, maxPageSize = 100 } =
      this.app.config.userConfig.pagination;

    const finalPageSize = Math.min(
      parseInt(pageSize) || defaultPagination.pageSize || defaultPageSize,
      maxPageSize
    );

    return {
      current: Math.max(parseInt(current) || 1, 1),
      pageSize: finalPageSize,
      offset: (Math.max(parseInt(current) || 1, 1) - 1) * finalPageSize,
      limit: finalPageSize,
    };
  },

  /**
   * 验证必需参数
   * @param {Array} requiredParams 必需参数列表
   * @param {Object} data 数据对象
   */
  validateRequired(requiredParams = [], data = null) {
    const source = data || this.request.body;
    const missing = requiredParams.filter((param) => {
      const value = source[param];
      return value === undefined || value === null || value === '';
    });

    if (missing.length > 0) {
      this.throw(400, `缺少必需参数: ${missing.join(', ')}`, {
        code: 'MISSING_REQUIRED_PARAMS',
        missing,
      });
    }
  },
};
