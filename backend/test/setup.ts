import { app } from 'egg-mock/bootstrap';

// 全局测试设置
before(async () => {
  // 可以在这里添加全局测试设置
  console.log('开始运行后端测试...');
});

// 全局测试清理
after(async () => {
  // 可以在这里添加全局测试清理
  console.log('后端测试运行完毕');
});