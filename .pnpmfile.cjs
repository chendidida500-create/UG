module.exports = {
  hooks: {
    readPackage(pkg) {
      // 配置使用淘宝镜像源
      if (!pkg.resolutions) {
        pkg.resolutions = {};
      }
      pkg.resolutions['*'] = {
        registry: 'https://registry.npmmirror.com/'
      };
      return pkg;
    }
  }
};