# Superflow GitHub 项目规范 v0.1

**版本**: 0.1
**生效日期**: 2026-03-22
**性质**: 所有使用 Superflow 工作流的项目必须遵循的 GitHub 规范

---

## 0. 总览

本规范定义了一套**最小可行的 GitHub 项目配置**，适用于所有使用 Superflow 四阶段工作流的项目。

**规范来源**:
- 参考 raganor-opc 的 GitHub 规范（已验证）
- 通过 Superflow 工作流自举产生（吃狗粮）
- 经 Challenge 审查和用户验收

---

## 1. 核心原则

### 1.1 SDD (Spec-Driven Development)

- Spec 是真理源，代码必须遵循规范
- 变更通过 openspec/changes/ 提案
- 归档到 openspec/changes/archive/

### 1.2 四阶段门禁

| 阶段 | 命令 | 门禁 |
|------|------|------|
| 1. 脑暴 | `/superflow:brainstorm` | 用户批准 |
| 2. 计划 | `/superflow:plan` | 用户批准 |
| 3. 执行 | `/superflow:execute` | 测试通过 |
| 4. 归档 | `/superflow:archive` | Challenge + 用户验收 |

### 1.3 自动化优先

- 能用 GitHub Actions 自动化的，不依赖人工
- 质量门禁自动运行，不信任人工承诺
- 测试必须真正验证行为，不是装饰

---

## 2. 目录结构

### 2.1 必须存在的目录

```
<project-root>/
├── .github/
│   ├── workflows/          # GitHub Actions 工作流
│   └── labeler.yml         # PR 自动打标签配置
├── openspec/
│   ├── specs/              # 规范真理源
│   └── changes/            # 变更提案（进行中 + 归档）
├── docs/
│   ├── design/             # 设计文档
│   └── issues/             # Issues 说明
└── config/
    └── commands/           # Superflow 命令定义（如使用）
```

### 2.2 建议存在的目录

```
├── scripts/                # 工具脚本
├── examples/               # 示例数据
└── src/                    # 源代码
```

---

## 3. GitHub 工作流

### 3.1 核心工作流（必须）

所有项目**必须**包含以下 3 个工作流：

#### 3.1.1 ci.yml

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    name: Unit & Integration Tests
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - name: Install dependencies
        run: npm ci
      - name: Run tests
        run: npm test

  build:
    name: Build Verification
    runs-on: ubuntu-latest
    needs: test
    steps:
      - uses: actions/checkout@v4
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - name: Install dependencies
        run: npm ci
      - name: Build
        run: npm run build
```

**要求**:
- 必须包含单元测试
- 必须包含构建验证
- 必须使用 Node.js 20+（或项目对应的运行时）

#### 3.1.2 publish.yml

```yaml
name: Publish

on:
  release:
    types: [published]

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          registry-url: 'https://registry.npmjs.org'
      - name: Install dependencies
        run: npm ci
      - name: Build
        run: npm run build
      - name: Publish to NPM
        run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

**要求**:
- 必须配置 NPM Token（GitHub Secrets）
- 必须先构建再发布
- 只在 release published 时触发

#### 3.1.3 code-review.yml

```yaml
name: Code Review

on:
  push:
    branches: [main]
  pull_request:
    types: [opened, synchronize, reopened]

jobs:
  lint:
    name: Code Quality
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - name: Install dependencies
        run: npm ci
      - name: Run ESLint
        run: npm run lint
```

**要求**:
- 必须包含代码质量检查（ESLint 或类似）
- 必须在 PR 和 push 时触发
- 失败时阻止合并

---

### 3.2 增强工作流（推荐）

所有项目**推荐**包含以下 3 个工作流：

#### 3.2.1 qa-adversarial-review.yml

```yaml
name: Adversarial QA Review

on:
  pull_request:
    types: [opened, synchronize, reopened]

jobs:
  qa-review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - name: Install dependencies
        run: npm ci
      - name: Build
        run: npm run build
      - name: Run all tests
        run: npm test
```

**说明**: 可接入 LLM 评审（调用 OpenAI/Anthropic API）

#### 3.2.2 codeql.yml

```yaml
name: CodeQL Analysis

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  analyze:
    name: Analyze
    runs-on: ubuntu-latest
    permissions:
      actions: read
      contents: read
      security-events: write
    strategy:
      fail-fast: false
      matrix:
        language: ['javascript']
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
      - name: Initialize CodeQL
        uses: github/codeql-action/init@v3
        with:
          languages: ${{ matrix.language }}
      - name: Autobuild
        uses: github/codeql-action/autobuild@v3
      - name: Perform CodeQL Analysis
        uses: github/codeql-action/analyze@v3
```

**说明**: GitHub 托管，零配置

#### 3.2.3 labeler.yml

```yaml
# .github/workflows/labeler.yml
name: Label PRs

on:
  pull_request_target:
    types: [opened]

jobs:
  label:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      pull-requests: write
    steps:
      - uses: actions/labeler@v5
        with:
          repo-token: ${{ secrets.GITHUB_TOKEN }}
          configuration-path: .github/labeler.yml

# .github/labeler.yml
feature:
  - src/**/*
ci:
  - .github/workflows/**/*
documentation:
  - '**/*.md'
testing:
  - '**/*.test.ts'
dependencies:
  - package.json
  - package-lock.json
```

---

### 3.3 自动化工作流（可选）

项目**可选**包含以下工作流：

#### 3.3.1 auto-response.yml

```yaml
name: Auto PR Response

on:
  pull_request:
    types: [opened]

jobs:
  response:
    runs-on: ubuntu-latest
    permissions:
      pull-requests: write
    steps:
      - name: Auto comment
        uses: thijsvanloef/pr-comment-action@v3
        with:
          repo-token: ${{ secrets.GITHUB_TOKEN }}
          message: |
            👋 感谢你的 PR！CI 正在运行，请等待所有检查完成后再合并。
```

#### 3.3.2 stale.yml

```yaml
name: Close stale issues

on:
  schedule:
    - cron: '0 12 * * *'

jobs:
  stale:
    runs-on: ubuntu-latest
    permissions:
      issues: write
      pull-requests: write
    steps:
      - uses: actions/stale@v9
        with:
          repo-token: ${{ secrets.GITHUB_TOKEN }}
          days-before-stale: 60
          days-before-close: 7
```

---

## 4. Openspec 规范

### 4.1 目录结构

```
openspec/
├── README.md                     # 使用说明
├── specs/
│   ├── domain/                   # 领域规范
│   ├── api/                      # API 规范
│   └── arch/                     # 架构规范
└── changes/
    ├── <change-name>/            # 进行中的变更
    │   ├── proposal.md           # 变更提案
    │   ├── design.md             # 技术设计
    │   └── tasks.md              # 任务清单
    └── archive/                  # 已归档变更
        └── YYYY-MM-DD-<name>/
```

### 4.2 变更提案格式

```markdown
# 变更提案：<name>

**日期**: YYYY-MM-DD
**状态**: 草稿/审查中/已批准/已归档

## 1. 变更意图

为什么做这个变更？

## 2. 变更范围

影响哪些文件/模块？

## 3. 技术方案

如何实现？

## 4. 成功标准

如何验证完成？

## 5. 决策记录

关键决策和理由。

## 6. 等待批准

阶段 X 完成，等待用户批准。
```

---

## 5. 文档要求

### 5.1 必须存在的文档

| 文档 | 说明 |
|------|------|
| `README.md` | 项目说明 + 快速开始 |
| `CONTRIBUTING.md` | 贡献指南 |
| `LICENSE` | 开源许可证 |
| `CHANGELOG.md` | 变更日志 |

### 5.2 建议存在的文档

| 文档 | 说明 |
|------|------|
| `docs/design/README.md` | 设计门户 |
| `docs/design/DOCUMENT-MAP.md` | 文档地图 |
| `docs/issues/README.md` | Issues 说明 |

---

## 6. 配置文件

### 6.1 必须存在的配置

| 文件 | 说明 |
|------|------|
| `.gitignore` | Git 忽略规则 |
| `.editorconfig` | 编辑器配置 |
| `package.json` | 项目配置（Node.js） |
| `tsconfig.json` | TypeScript 配置（如使用 TS） |
| `.eslintrc.js` | ESLint 配置 |

### 6.2 Superflow 特有配置

| 文件 | 说明 |
|------|------|
| `config/commands/brainstorm.md` | 阶段 1 命令 |
| `config/commands/plan.md` | 阶段 2 命令 |
| `config/commands/execute.md` | 阶段 3 命令 |
| `config/commands/archive.md` | 阶段 4 命令 |

---

## 7. 合规性验证

### 7.1 自检脚本

创建 `scripts/validate-norm.js`：

```javascript
#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const required = [
  '.github/workflows/ci.yml',
  '.github/workflows/publish.yml',
  '.github/workflows/code-review.yml',
  'openspec/specs/',
  'openspec/changes/',
  'README.md',
  'CONTRIBUTING.md',
  'LICENSE',
];

let ok = true;
for (const file of required) {
  const exists = fs.existsSync(path.join(process.cwd(), file));
  if (!exists) {
    console.error(`❌ Missing: ${file}`);
    ok = false;
  }
}

if (!ok) process.exit(1);
console.log('✅ All required files present');
```

### 7.2 CI 验证

在 CI 工作流中加入：

```yaml
- name: Validate norm compliance
  run: node scripts/validate-norm.js
```

---

## 8. 版本历史

| 版本 | 日期 | 变更 |
|------|------|------|
| 0.1 | 2026-03-22 | 初始版本（通过 Superflow 四阶段产生） |

---

## 9. 批准记录

- [ ] 阶段 2 计划批准
- [ ] 阶段 3 执行完成
- [ ] 阶段 4 Challenge 审查通过
- [ ] 用户验收确认
