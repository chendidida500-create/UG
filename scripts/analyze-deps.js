const fs = require('fs');
const path = require('path');

// 读取各项目的package.json
const rootPackage = JSON.parse(
  fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8')
);
const frontendPackage = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, '..', 'frontend', 'package.json'),
    'utf8'
  )
);
const backendPackage = JSON.parse(
  fs.readFileSync(path.join(__dirname, '..', 'backend', 'package.json'), 'utf8')
);

console.log('=== 项目依赖分析报告 ===\n');

// 检查Node.js和pnpm版本一致性
console.log('1. 版本一致性检查:');
console.log(`   根项目 Node: ${rootPackage.engines?.node || '未指定'}`);
console.log(`   根项目 pnpm: ${rootPackage.engines?.pnpm || '未指定'}`);
console.log(`   前端 Node: ${frontendPackage.engines?.node || '未指定'}`);
console.log(`   前端 pnpm: ${frontendPackage.engines?.pnpm || '未指定'}`);
console.log(`   后端 Node: ${backendPackage.engines?.node || '未指定'}`);
console.log(`   后端 pnpm: ${backendPackage.engines?.pnpm || '未指定'}`);
console.log(
  `   根项目 packageManager: ${rootPackage.packageManager || '未指定'}`
);
console.log(
  `   前端 packageManager: ${frontendPackage.packageManager || '未指定'}`
);
console.log(
  `   后端 packageManager: ${backendPackage.packageManager || '未指定'}\n`
);

// 检查重复依赖
console.log('2. 重复依赖检查:');
const rootDeps = rootPackage.devDependencies || {};
const frontendDeps = {
  ...frontendPackage.dependencies,
  ...frontendPackage.devDependencies,
};
const backendDeps = {
  ...backendPackage.dependencies,
  ...backendPackage.devDependencies,
};

const allDeps = new Set([
  ...Object.keys(rootDeps),
  ...Object.keys(frontendDeps),
  ...Object.keys(backendDeps),
]);

const duplicates = {};
for (const dep of allDeps) {
  const locations = [];
  if (rootDeps[dep]) locations.push('root');
  if (frontendDeps[dep]) locations.push('frontend');
  if (backendDeps[dep]) locations.push('backend');

  if (locations.length > 1) {
    duplicates[dep] = {
      locations,
      versions: {
        root: rootDeps[dep],
        frontend: frontendDeps[dep],
        backend: backendDeps[dep],
      },
    };
  }
}

if (Object.keys(duplicates).length > 0) {
  console.log('   发现重复依赖:');
  for (const [dep, info] of Object.entries(duplicates)) {
    console.log(`   - ${dep}:`);
    for (const location of info.locations) {
      console.log(`     ${location}: ${info.versions[location] || 'N/A'}`);
    }
  }
} else {
  console.log('   未发现重复依赖');
}

console.log('\n3. 版本冲突检查:');
// 检查相同依赖的不同版本
const versionConflicts = {};
for (const dep of allDeps) {
  const versions = new Set();
  if (rootDeps[dep]) versions.add(rootDeps[dep]);
  if (frontendDeps[dep]) versions.add(frontendDeps[dep]);
  if (backendDeps[dep]) versions.add(backendDeps[dep]);

  if (versions.size > 1) {
    versionConflicts[dep] = {
      versions: Array.from(versions),
      locations: {
        root: rootDeps[dep],
        frontend: frontendDeps[dep],
        backend: backendDeps[dep],
      },
    };
  }
}

if (Object.keys(versionConflicts).length > 0) {
  console.log('   发现版本冲突:');
  for (const [dep, info] of Object.entries(versionConflicts)) {
    console.log(`   - ${dep}:`);
    console.log(`     版本: ${info.versions.join(', ')}`);
    for (const [location, version] of Object.entries(info.locations)) {
      if (version) console.log(`     ${location}: ${version}`);
    }
  }
} else {
  console.log('   未发现版本冲突');
}

console.log('\n4. 建议:');
console.log('   - 确保所有项目的Node.js和pnpm版本一致');
console.log('   - 考虑将共享依赖提升到根package.json');
console.log('   - 统一相同依赖的版本号');
