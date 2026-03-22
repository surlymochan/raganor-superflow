#!/usr/bin/env node

/**
 * Superflow GitHub 规范初始化脚本
 *
 * 为新项目快速应用 Superflow GitHub Norm v1.0 配置
 */

const fs = require('fs');
const path = require('path');

const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

const ROOT = process.cwd();
const SCRIPT_DIR = __dirname;
const PROJECT_ROOT = path.resolve(SCRIPT_DIR, '..');

// 要复制的文件列表（从项目根目录的 config 目录）
const filesToCopy = [
  // Workflows
  { src: '.github/workflows/ci.yml', desc: 'CI 工作流' },
  { src: '.github/workflows/publish.yml', desc: '发布工作流' },
  { src: '.github/workflows/code-review.yml', desc: '代码审查工作流' },
  { src: '.github/workflows/secret-scan.yml', desc: 'Secret 扫描工作流' },
  { src: '.github/workflows/qa-adversarial-review.yml', desc: '对抗性 QA 审查' },
  { src: '.github/workflows/codeql.yml', desc: 'CodeQL 安全扫描' },
  { src: '.github/workflows/workflow-sanity.yml', desc: '工作流健全性检查' },
  { src: '.github/workflows/auto-response.yml', desc: 'PR 自动回应' },
  { src: '.github/workflows/labeler.yml', desc: 'PR 自动打标签' },
  { src: '.github/workflows/stale.yml', desc: '自动关闭 stale issue' },

  // 配置文件
  { src: '.github/labeler.yml', desc: 'Labeler 配置' },
  { src: '.github/CODEOWNERS', desc: 'CODEOWNERS' },
  { src: '.gitleaks.toml', desc: 'Gitleaks 配置' },

  // 模板
  { src: '.github/ISSUE_TEMPLATE/bug_report.yml', desc: 'Bug 报告模板' },
  { src: '.github/ISSUE_TEMPLATE/feature_request.yml', desc: '功能请求模板' },
  { src: '.github/PULL_REQUEST_TEMPLATE.md', desc: 'PR 模板' },
  { src: '.github/SUPPORT.md', desc: '支持文档' },
  { src: 'SECURITY.md', desc: '安全政策' },
];

// 要创建的目录
const dirsToCreate = [
  '.github/workflows',
  '.github/ISSUE_TEMPLATE',
  'openspec/specs/domain',
  'openspec/changes/archive',
  'docs/design',
  'docs/issues',
  'config/templates',
];

// 要创建的基础文档
const baseDocs = {
  'openspec/README.md': `# OpenSpec 规范驱动开发

**版本**: 1.0
**项目**: \${PROJECT_NAME}

---

## 快速开始

\`\`\`bash
# 1. 发起新变更
/superflow:brainstorm 添加用户登录功能

# 2. 审查提案
# AI 自动创建 openspec/changes/<name>/proposal.md

# 3. 应用实现
/superflow:plan <name>
/superflow:execute <name>

# 4. 完成归档
/superflow:archive <name>
\`\`\`

---

## 目录结构

\`\`\`
openspec/
├── README.md
├── specs/
│   ├── domain/                   # 领域规范 (含 PRD)
│   ├── api/                      # API 规范
│   └── arch/                     # 架构规范
└── changes/
    ├── <change-name>/            # 进行中的变更
    └── archive/                  # 已归档变更
\`\`\`

---

## 工作流

| 阶段 | 命令 | 产出 |
|------|------|------|
| 1. 脑暴 | \`/superflow:brainstorm\` | PRD 草稿 + 设计文档 |
| 2. 计划 | \`/superflow:plan\` | PRD 正式版 + Spec + 任务清单 |
| 3. 执行 | \`/superflow:execute\` | 代码实现 + 测试 |
| 4. 归档 | \`/superflow:archive\` | 归档 + Spec 更新 |
`,

  'docs/design/README.md': `# \${PROJECT_NAME} 设计门户

**最后更新**: \${DATE}

---

## 快速链接

| 文档 | 说明 |
|------|------|
| [DOCUMENT-MAP.md](./DOCUMENT-MAP.md) | 完整文档地图 |
| [系统架构](#系统架构) | 架构图和组件说明 |

---

## 系统架构

（待补充）

---

## 设计决策记录

（待补充）
`,

  'docs/design/DOCUMENT-MAP.md': `# \${PROJECT_NAME} 文档地图

**最后更新**: \${DATE}

---

## 文档分类

### 1. 设计规范 (OpenSpec)

| 文档 | 路径 |
|------|------|
| OpenSpec 使用说明 | \`openspec/README.md\` |
| GitHub 规范 | \`openspec/specs/superflow/github-norm-v1.0.md\` |

### 2. 设计文档

| 文档 | 路径 |
|------|------|
| 设计门户 | \`docs/design/README.md\` |
| 文档地图 | \`docs/design/DOCUMENT-MAP.md\` |

### 3. 项目文档

| 文档 | 路径 |
|------|------|
| README | \`README.md\` |
| 贡献指南 | \`CONTRIBUTING.md\` |
| 变更日志 | \`CHANGELOG.md\` |
`,

  'docs/issues/README.md': `# \${PROJECT_NAME} Issues 说明

**最后更新**: \${DATE}

---

## 概述

本目录为 **\${PROJECT_NAME} Issues 说明**。

Issues 用于追踪：
- Bug 报告
- 功能请求
- 文档改进
- 规范更新

---

## Issue 模板

项目配置了以下 Issue 模板：
- Bug Report
- Feature Request

请访问 https://github.com/\${OWNER}/\${REPO}/issues/new/choose 创建 Issue。

---

## Issue 处理流程

\`\`\`
1. 提交 Issue
       ↓
2. 团队审查（打标签、分配）
       ↓
3. 开发处理
       ↓
4. PR 提交 → CI 检查 → Code Review
       ↓
5. 合并 + 关闭
\`\`\`
`,

  'SECURITY.md': `# Security Policy

## 报告安全问题

如果你发现安全漏洞，请：

1. **不要** 公开报告 Issue
2. 发送邮件到：[security@\${DOMAIN}](mailto:security@\${DOMAIN})
3. 包含以下信息：
   - 漏洞描述
   - 复现步骤
   - 潜在影响
   - 可能的修复建议（如有）

我们将会在 48 小时内回复。

## 支持的范围

| 版本 | 支持状态 |
|------|----------|
| 1.0.x | ✅ 支持中 |
| < 1.0 | ❌ 不再支持 |
`,
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function ensureDir(dir) {
  const fullPath = path.join(ROOT, dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
    log(`✓ 创建目录：${dir}`, 'green');
  }
}

function copyFile(src, dest, desc) {
  const srcPath = path.join(PROJECT_ROOT, src);
  const destPath = path.join(ROOT, dest);

  if (fs.existsSync(srcPath)) {
    // 确保目标目录存在
    ensureDir(path.dirname(dest));

    fs.copyFileSync(srcPath, destPath);
    log(`✓ 复制 ${desc}: ${dest}`, 'green');
    return true;
  } else {
    log(`⚠ 源文件不存在：${srcPath}`, 'yellow');
    return false;
  }
}

function createFile(content, dest, desc) {
  const destPath = path.join(ROOT, dest);

  // 替换变量
  const pkgPath = path.join(ROOT, 'package.json');
  let projectName = path.basename(ROOT);
  let owner = 'owner';
  let repo = path.basename(ROOT);
  const domain = 'example.com';

  if (fs.existsSync(pkgPath)) {
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
    if (pkg.repository?.url) {
      const match = pkg.repository.url.match(/github\.com[:/]([^/]+)\/([^/.]+)/);
      if (match) {
        owner = match[1];
        repo = match[2];
      }
    }
    projectName = pkg.name || projectName;
  }

  const now = new Date();
  const formattedContent = content
    .replace(/\$\{PROJECT_NAME\}/g, projectName)
    .replace(/\$\{OWNER\}/g, owner)
    .replace(/\$\{REPO\}/g, repo)
    .replace(/\$\{DOMAIN\}/g, domain)
    .replace(/\$\{DATE\}/g, now.toISOString().split('T')[0]);

  ensureDir(path.dirname(dest));
  fs.writeFileSync(destPath, formattedContent);
  log(`✓ 创建 ${desc}: ${dest}`, 'green');
}

function main() {
  log('╔════════════════════════════════════════════════╗', 'blue');
  log('║  Superflow GitHub 规范初始化                   ║', 'blue');
  log('╚════════════════════════════════════════════════╝', 'blue');
  log();
  log(`目标目录：${ROOT}`, 'cyan');
  log(`规范版本：GitHub Norm v1.0`, 'cyan');
  log();

  // 1. 创建目录结构
  log('步骤 1/4: 创建目录结构...', 'blue');
  for (const dir of dirsToCreate) {
    ensureDir(dir);
  }
  log();

  // 2. 复制工作流和配置文件
  log('步骤 2/4: 复制工作流和配置文件...', 'blue');
  let copied = 0;
  let skipped = 0;

  for (const file of filesToCopy) {
    if (copyFile(file.src, file.src, file.desc)) {
      copied++;
    } else {
      skipped++;
    }
  }
  log(`\n已复制 ${copied} 个文件，跳过 ${skipped} 个文件`, 'cyan');
  log();

  // 3. 创建基础文档
  log('步骤 3/4: 创建基础文档...', 'blue');
  for (const [dest, content] of Object.entries(baseDocs)) {
    createFile(content, dest, '文档');
  }
  log();

  // 4. 更新 package.json
  log('步骤 4/4: 更新 package.json...', 'blue');
  const pkgPath = path.join(ROOT, 'package.json');
  if (fs.existsSync(pkgPath)) {
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));

    // 添加验证脚本
    if (!pkg.scripts) {
      pkg.scripts = {};
    }
    pkg.scripts['validate:norm'] = 'node ../scripts/validate-github-norm.js';

    // 添加 devDependencies
    if (!pkg.devDependencies) {
      pkg.devDependencies = {};
    }
    pkg.devDependencies['eslint'] = '^9.0.0';
    pkg.devDependencies['@eslint/js'] = '^9.0.0';

    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
    log('✓ 更新 package.json', 'green');
  } else {
    log('⚠ package.json 不存在，跳过', 'yellow');
  }
  log();

  // 完成
  log('════════════════════════════════════════════════', 'blue');
  log('✅ 初始化完成！', 'green');
  log();
  log('下一步操作:', 'cyan');
  log('  1. 运行验证：node ../scripts/validate-github-norm.js');
  log('  2. 提交变更：git add -A && git commit -m "chore: 应用 GitHub Norm v1.0"');
  log('  3. 配置 Branch Protection:');
  log('     https://github.com/<owner>/<repo>/settings/rules');
  log();
  log('规范文档：openspec/specs/superflow/github-norm-v1.0.md', 'cyan');
}

main();
