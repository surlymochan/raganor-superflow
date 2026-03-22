/* eslint-disable no-console */
#!/usr/bin/env node

/**
 * Superflow GitHub Norm v1.0 合规性验证脚本
 *
 * 验证项目是否遵循 Superflow GitHub 项目规范 v1.0
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
  cyan: '\x1b[36m',
};

const ROOT = process.cwd();

// 必须存在的工作流
const requiredWorkflows = [
  '.github/workflows/ci.yml',
  '.github/workflows/publish.yml',
  '.github/workflows/code-review.yml',
  '.github/workflows/secret-scan.yml',
];

// 推荐存在的工作流
const recommendedWorkflows = [
  '.github/workflows/qa-adversarial-review.yml',
  '.github/workflows/codeql.yml',
  '.github/workflows/workflow-sanity.yml',
];

// 必须存在的文件
const requiredFiles = [
  '.github/labeler.yml',
  '.github/CODEOWNERS',
  '.gitleaks.toml',
  'openspec/README.md',
  'openspec/specs/',
  'openspec/changes/',
  'README.md',
  'CONTRIBUTING.md',
  'LICENSE',
  'CHANGELOG.md',
  'SECURITY.md',
];

// 建议存在的文件
const recommendedFiles = [
  '.github/ISSUE_TEMPLATE/bug_report.yml',
  '.github/ISSUE_TEMPLATE/feature_request.yml',
  '.github/PULL_REQUEST_TEMPLATE.md',
  '.github/SUPPORT.md',
  'docs/design/README.md',
  'docs/design/DOCUMENT-MAP.md',
  'docs/issues/README.md',
  'config/templates/prd-template.md',
];

function checkFiles(files, category, required = true) {
  let ok = 0;
  let missing = 0;

  console.log(`\n${colors.blue}${category}:${colors.reset}`);
  console.log('─'.repeat(60));

  for (const file of files) {
    const exists = fs.existsSync(path.join(ROOT, file));
    const isDir = file.endsWith('/');
    const check = isDir
      ? fs.statSync(path.join(ROOT, file))?.isDirectory()
      : exists;

    if (check) {
      console.log(`  ${colors.green}✓${colors.reset} ${file}`);
      ok++;
    } else {
      console.log(`  ${colors.red}✗${colors.reset} ${file}`);
      missing++;
    }
  }

  return { ok, missing, required };
}

function checkWorkflowContent() {
  console.log(`\n${colors.blue}工作流内容检查:${colors.reset}`);
  console.log('─'.repeat(60));

  const issues = [];

  // 检查 ci.yml
  const ciPath = path.join(ROOT, '.github/workflows/ci.yml');
  if (fs.existsSync(ciPath)) {
    const ciContent = fs.readFileSync(ciPath, 'utf8');
    if (ciContent.includes('npm test') || ciContent.includes('npm run test')) {
      console.log(`  ${colors.green}✓${colors.reset} ci.yml: 包含测试步骤`);
    } else {
      console.log(`  ${colors.red}✗${colors.reset} ci.yml: 缺少测试步骤`);
      issues.push('ci.yml 缺少测试步骤');
    }
    if (ciContent.includes('pull_request')) {
      console.log(`  ${colors.green}✓${colors.reset} ci.yml: 在 PR 时触发`);
    } else {
      console.log(`  ${colors.yellow}⚠${colors.reset} ci.yml: 建议在 PR 时触发`);
    }
  }

  // 检查 secret-scan.yml
  const secretScanPath = path.join(ROOT, '.github/workflows/secret-scan.yml');
  if (fs.existsSync(secretScanPath)) {
    const secretScanContent = fs.readFileSync(secretScanPath, 'utf8');
    if (secretScanContent.includes('trufflehog') || secretScanContent.includes('gitleaks')) {
      console.log(`  ${colors.green}✓${colors.reset} secret-scan.yml: 包含 Secret 扫描工具`);
    } else {
      console.log(`  ${colors.red}✗${colors.reset} secret-scan.yml: 缺少 Secret 扫描工具`);
      issues.push('secret-scan.yml 缺少 Secret 扫描工具');
    }
  }

  // 检查 .gitleaks.toml
  const gitleaksPath = path.join(ROOT, '.gitleaks.toml');
  if (fs.existsSync(gitleaksPath)) {
    const gitleaksContent = fs.readFileSync(gitleaksPath, 'utf8');
    if (gitleaksContent.includes('[extend]') || gitleaksContent.includes('useDefault')) {
      console.log(`  ${colors.green}✓${colors.reset} .gitleaks.toml: 配置正确`);
    } else {
      console.log(`  ${colors.yellow}⚠${colors.reset} .gitleaks.toml: 建议配置 [extend]`);
    }
  }

  return issues;
}

function checkOpenspecStructure() {
  console.log(`\n${colors.blue}OpenSpec 结构检查:${colors.reset}`);
  console.log('─'.repeat(60));

  const specsDir = path.join(ROOT, 'openspec/specs');
  const changesDir = path.join(ROOT, 'openspec/changes');
  const archiveDir = path.join(changesDir, 'archive');

  if (fs.existsSync(specsDir)) {
    console.log(`  ${colors.green}✓${colors.reset} openspec/specs/ 存在`);
    const domainDir = path.join(specsDir, 'domain');
    if (fs.existsSync(domainDir)) {
      console.log(`  ${colors.green}✓${colors.reset} openspec/specs/domain/ 存在 (PRD 目录)`);
    } else {
      console.log(`  ${colors.yellow}⚠${colors.reset} 建议创建 openspec/specs/domain/ 用于存放 PRD`);
    }
  } else {
    console.log(`  ${colors.red}✗${colors.reset} openspec/specs/ 缺失`);
  }

  if (fs.existsSync(changesDir)) {
    console.log(`  ${colors.green}✓${colors.reset} openspec/changes/ 存在`);
  } else {
    console.log(`  ${colors.red}✗${colors.reset} openspec/changes/ 缺失`);
  }

  if (fs.existsSync(archiveDir)) {
    console.log(`  ${colors.green}✓${colors.reset} openspec/changes/archive/ 存在 (已归档变更)`);
  } else {
    console.log(`  ${colors.yellow}⚠${colors.reset} 建议创建 openspec/changes/archive/ 用于归档`);
  }
}

function printSummary(results) {
  console.log(`\n${colors.blue}════════════════════════════════════════════════════════${colors.reset}`);
  console.log(`${colors.blue}验证总结:${colors.reset}`);
  console.log(`════════════════════════════════════════════════════════`);

  const totalRequired = results.required.ok + results.required.missing;
  const totalRecommended = results.recommended.ok + results.recommended.missing;
  const complianceRate = Math.round((results.required.ok / totalRequired) * 100);

  console.log(`  核心工作流：${results.workflows.ok}/${results.workflows.ok + results.workflows.missing}`);
  console.log(`  推荐工作流：${results.recommendedWorkflows.ok}/${results.recommendedWorkflows.ok + results.recommendedWorkflows.missing}`);
  console.log(`  核心文件：${results.required.ok}/${totalRequired} (${complianceRate}%)`);
  console.log(`  推荐文件：${results.recommended.ok}/${totalRecommended}`);
  console.log();

  if (results.required.missing > 0) {
    console.log(`${colors.red}❌ 合规性检查未通过：缺少 ${results.required.missing} 个核心文件${colors.reset}`);
    console.log();
    console.log('请补充以下必需的配置:');
    console.log('');
  } else {
    console.log(`${colors.green}✅ 合规性检查通过！所有核心配置都存在。${colors.reset}`);
    console.log();
    console.log('下一步:');
    console.log('  1. 在 GitHub 上配置 Branch Protection Rules');
    console.log('  2. 访问：https://github.com/<owner>/<repo>/settings/rules');
    console.log('  3. 添加 required checks: CI, Secret Scan');
    console.log('');
  }
}

function main() {
  console.log(`${colors.blue}╔════════════════════════════════════════════════╗${colors.reset}`);
  console.log(`${colors.blue}║  Superflow GitHub Norm v1.0 合规性验证        ║${colors.reset}`);
  console.log(`${colors.blue}╚════════════════════════════════════════════════╝${colors.reset}`);
  console.log();
  console.log(`规范文档：openspec/specs/superflow/github-norm-v1.0.md`);
  console.log(`验证时间：${new Date().toISOString()}`);

  const results = {
    workflows: checkFiles(requiredWorkflows, '核心工作流 (必须)', true),
    recommendedWorkflows: checkFiles(recommendedWorkflows, '推荐工作流', false),
    required: checkFiles(requiredFiles, '核心文件 (必须)', true),
    recommended: checkFiles(recommendedFiles, '推荐文件', false),
  };

  checkWorkflowContent();
  checkOpenspecStructure();
  printSummary(results);

  if (results.required.missing > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

main();
