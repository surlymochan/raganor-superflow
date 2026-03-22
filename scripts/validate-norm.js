#!/usr/bin/env node

/**
 * Superflow GitHub 规范合规性验证脚本
 *
 * 验证项目是否遵循 Superflow GitHub Norm v0.1
 */

const fs = require('fs');
const path = require('path');

// ANSI 颜色代码
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
};

const ROOT = process.cwd();

// 必须存在的文件
const requiredFiles = [
  '.github/workflows/ci.yml',
  '.github/workflows/publish.yml',
  '.github/workflows/code-review.yml',
  'openspec/README.md',
  'openspec/specs/',
  'openspec/changes/',
  'README.md',
  'CONTRIBUTING.md',
  'LICENSE',
  'CHANGELOG.md',
];

// 推荐存在的文件
const recommendedFiles = [
  '.github/workflows/qa-adversarial-review.yml',
  '.github/workflows/codeql.yml',
  '.github/labeler.yml',
  '.github/labeler.yml',
  'docs/design/README.md',
  'docs/design/DOCUMENT-MAP.md',
  'docs/issues/README.md',
];

// 可选存在的文件
const optionalFiles = [
  '.github/workflows/auto-response.yml',
  '.github/workflows/stale.yml',
];

function checkFiles(files, category) {
  let ok = 0;
  let missing = 0;

  console.log(`\n${colors.blue}${category}:${colors.reset}`);
  console.log('─'.repeat(50));

  for (const file of files) {
    const exists = fs.existsSync(path.join(ROOT, file));
    const isDir = file.endsWith('/');
    const check = isDir ? fs.statSync(path.join(ROOT, file))?.isDirectory() : exists;

    if (check) {
      console.log(`  ${colors.green}✓${colors.reset} ${file}`);
      ok++;
    } else {
      console.log(`  ${colors.red}✗${colors.reset} ${file}`);
      missing++;
    }
  }

  return { ok, missing };
}

function main() {
  console.log(`${colors.blue}╔════════════════════════════════════════════════╗${colors.reset}`);
  console.log(`${colors.blue}║   Superflow GitHub Norm v0.1 合规性验证       ║${colors.reset}`);
  console.log(`${colors.blue}╚════════════════════════════════════════════════╝${colors.reset}`);

  const results = {
    required: checkFiles(requiredFiles, '核心文件 (必须)'),
    recommended: checkFiles(recommendedFiles, '推荐文件'),
    optional: checkFiles(optionalFiles, '可选文件'),
  };

  // 总结
  console.log(`\n${colors.blue}════════════════════════════════════════════════${colors.reset}`);
  console.log(`${colors.blue}总结:${colors.reset}`);

  const totalRequired = results.required.ok + results.required.missing;
  const complianceRate = Math.round((results.required.ok / totalRequired) * 100);

  console.log(`  核心文件：${results.required.ok}/${totalRequired} (${complianceRate}%)`);
  console.log(`  推荐文件：${results.recommended.ok}/${results.recommended.ok + results.recommended.missing}`);
  console.log(`  可选文件：${results.optional.ok}/${results.optional.ok + results.optional.missing}`);

  if (results.required.missing > 0) {
    console.log(`\n${colors.red}❌ 合规性检查未通过：缺少 ${results.required.missing} 个核心文件${colors.reset}`);
    process.exit(1);
  } else {
    console.log(`\n${colors.green}✅ 合规性检查通过！所有核心文件都存在。${colors.reset}`);
    process.exit(0);
  }
}

main();
