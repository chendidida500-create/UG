const startTime = Date.now();

process.on('exit', () => {
  const endTime = Date.now();
  const startupTime = endTime - startTime;
  console.log(`应用启动时间: ${startupTime}ms`);
});

// 如果需要更详细的分析，可以添加以下代码：
// 记录不同阶段的时间点
console.time('应用启动');
console.timeEnd('应用启动');