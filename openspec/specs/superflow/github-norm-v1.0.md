# Superflow GitHub 项目规范 v1.0

**版本**: 1.0
**生效日期**: 2026-03-22
**性质**: 所有使用 Superflow 工作流的项目必须遵循的 GitHub 规范

---

## 0. 总览

本规范定义了**最小可行的 GitHub 项目配置**，适用于所有使用 Superflow 四阶段工作流的项目。

**规范来源**:
- 通过 Superflow 工作流自举产生（吃狗粮）
- 参考 raganor-opc 的 GitHub 规范（已验证）
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
│   │   ├── ci.yml          # 必须
│   │   ├── publish.yml     # 必须
│   │   ├── code-review.yml # 必须
│   │   ├── secret-scan.yml # 必须
│   │   └── ...
│   └── labeler.yml         # PR 自动打标签配置
├── openspec/
│   ├── specs/              # 规范真理源
│   │   └── domain/         # 领域规范（含 PRD）
│   └── changes/            # 变更提案（进行中 + 归档）
├── docs/
│   ├── design/             # 设计文档
│   └── issues/             # Issues 说明
└── config/
    ├── commands/           # Superflow 命令定义
    └── templates/          # 模板文件（含 PRD 模板）
```

### 2.2 必须存在的配置文件

| 文件 | 说明 |
|------|------|
| `.gitignore` | Git 忽略规则 |
| `.editorconfig` | 编辑器配置 |
| `.gitleaks.toml` | Gitleaks 配置（Secret 扫描） |
| `package.json` | 项目配置 |
| `tsconfig.json` | TypeScript 配置（如使用 TS） |
| `eslint.config.js` | ESLint 配置 |

---

## 3. GitHub 工作流

### 3.1 核心工作流（必须）

所有项目**必须**包含以下 4 个工作流：

#### 3.1.1 ci.yml

**目的**: 单元测试 + 构建验证

**要求**:
- 必须包含单元测试
- 必须包含构建验证
- 必须包含多个 Node.js 版本测试（18.x, 20.x, 22.x）
- 必须在 push 和 pull_request 时触发

**最小配置**:
```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [18.x, 20.x, 22.x]
    steps:
      - uses: actions/checkout@v4
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
          cache: 'npm'
      - name: Install dependencies
        run: npm ci
      - name: Run tests
        run: npm test

  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20.x'
          cache: 'npm'
      - name: Install dependencies
        run: npm ci
      - name: Run lint
        run: npm run lint
```

#### 3.1.2 publish.yml

**目的**: NPM/Releases 自动发布

**要求**:
- 必须配置 NPM Token（GitHub Secrets）
- 必须先构建再发布
- 只在 release published 时触发

#### 3.1.3 code-review.yml

**目的**: 代码质量门禁

**要求**:
- 必须包含代码质量检查（ESLint 或类似）
- 必须在 PR 和 push 时触发
- 失败时阻止合并

**最小配置**:
```yaml
name: Code Review

on:
  push:
    branches: [main]
  pull_request:
    types: [opened, synchronize, reopened]

jobs:
  lint:
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

#### 3.1.4 secret-scan.yml

**目的**: Secret 泄露扫描

**要求**:
- 必须包含 TruffleHog 或 Gitleaks
- 必须在 PR 和 push 时触发
- 发现 secret 时阻止合并

**最小配置**:
```yaml
name: Secret Scan

on:
  pull_request:
    types: [opened, synchronize, reopened]
  push:
    branches: [main]

jobs:
  trufflehog:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - name: Secret Scanning
        uses: trufflesecurity/trufflehog@main
        with:
          path: ./
          base: ${{ github.event.repository.default_branch }}
          head: HEAD
          extra_args: --only-verified
```

---

### 3.2 增强工作流（推荐）

所有项目**推荐**包含以下 3 个工作流：

| 工作流 | 说明 | 配置复杂度 |
|--------|------|------------|
| `qa-adversarial-review.yml` | 对抗性 QA 审查 | 中（可接 LLM） |
| `codeql.yml` | CodeQL 安全扫描 | 低（GitHub 托管） |
| `workflow-sanity.yml` | 工作流健全性检查 | 低 |

---

### 3.3 自动化工作流（可选）

项目**可选**包含以下工作流：

| 工作流 | 说明 |
|--------|------|
| `auto-response.yml` | PR 自动回应 |
| `labeler.yml` + workflow | PR 自动打标签 |
| `stale.yml` | 自动关闭 stale issue/PR |

---

## 4. Branch Protection Rules

### 4.1 必须配置的保护规则

所有项目**必须**在 GitHub 上配置以下 Branch Protection Rules：

```
Target: main branch only

Rules:
☑ Require a pull request before merging
  - Required approvals: 1
  - Dismiss stale reviews: ✓
  - Require Code Owner review: ✓

☑ Require status checks to pass before merging
  - Required checks:
    - CI ✓
    - Secret Scan ✓
  - Do not enforce on creation: ✓

☑ Require linear history
```

### 4.2 配置步骤

1. 访问：`https://github.com/<owner>/<repo>/settings/rules`
2. 点击 **"Add rule"** 或 **"Create ruleset"**
3. 配置：
   - **Name**: `main protection`
   - **Branches**: `main`
   - **Require a pull request**: ✓
   - **Required approvals**: `1`
   - **Require status checks**: ✓
   - **Required checks**: `CI`, `Secret Scan`
   - **Do not enforce on creation**: ✓
4. 保存

---

## 5. Openspec 规范

### 5.1 目录结构

```
openspec/
├── README.md                     # 使用说明
├── specs/
│   ├── domain/                   # 领域规范
│   │   └── <domain>/
│   │       ├── prd-<name>.md     # 产品需求文档
│   │       └── spec.md           # 技术规范
│   ├── api/                      # API 规范
│   └── arch/                     # 架构规范
└── changes/
    ├── <change-name>/            # 进行中的变更
    │   ├── proposal.md           # 变更提案
    │   ├── prd-draft.md          # PRD 草稿 (阶段 1)
    │   ├── design.md             # 技术设计
    │   └── tasks.md              # 任务清单
    └── archive/                  # 已归档变更
        └── YYYY-MM-DD-<name>/
```

### 5.2 PRD (产品需求文档)

**PRD 是产品需求的真理源**，包含：
- 问题陈述和目标用户
- 用户故事和验收标准
- 功能需求和非功能需求
- 依赖与风险
- 发布计划

**PRD 生命周期**:
| 阶段 | PRD 状态 | 位置 |
|------|----------|------|
| 阶段 1 (脑暴) | v0.1 草稿 | `openspec/changes/<name>/prd-draft.md` |
| 阶段 2 (计划) | v1.0 正式 | `openspec/specs/domain/<domain>/prd-<name>.md` |
| 阶段 3 (执行) | 验收验证 | 参考 PRD 验收 |
| 阶段 4 (归档) | 版本更新 | `openspec/specs/domain/<domain>/prd-<name>.md` (v1.1...) |

---

## 6. 文档要求

### 6.1 必须存在的文档

| 文档 | 说明 |
|------|------|
| `README.md` | 项目说明 + 快速开始 |
| `CONTRIBUTING.md` | 贡献指南 |
| `LICENSE` | 开源许可证 |
| `CHANGELOG.md` | 变更日志 |
| `SECURITY.md` | 安全政策 |

### 6.2 建议存在的文档

| 文档 | 说明 |
|------|------|
| `docs/design/README.md` | 设计门户 |
| `docs/design/DOCUMENT-MAP.md` | 文档地图 |
| `docs/issues/README.md` | Issues 说明 |
| `.github/SUPPORT.md` | 支持文档 |

---

## 7. Issue/PR 模板

### 7.1 Issue 模板（必须）

所有项目**必须**包含以下 Issue 模板：

| 模板 | 文件 | 说明 |
|------|------|------|
| Bug Report | `.github/ISSUE_TEMPLATE/bug_report.yml` | Bug 报告 |
| Feature Request | `.github/ISSUE_TEMPLATE/feature_request.yml` | 功能请求 |

### 7.2 PR 模板（必须）

所有项目**必须**包含：

| 模板 | 文件 |
|------|------|
| Pull Request Template | `.github/PULL_REQUEST_TEMPLATE.md` |

---

## 8. 其他配置

### 8.1 CODEOWNERS（必须）

所有项目**必须**配置 CODEOWNERS：

```
# .github/CODEOWNERS
# 根目录
* @owner

# 核心配置
.github/ @owner
package.json @owner

# OpenSpec 规范
openspec/ @owner
```

### 8.2 .gitleaks.toml（必须）

所有项目**必须**配置 Gitleaks：

```toml
title = "Gitleaks Config"

[extend]
useDefault = true

[allowlist]
description = "Exclude false positives"
paths = [
  '''node_modules/.*''',
  '''package-lock.json''',
  '''coverage/.*''',
]
```

---

## 9. 合规性验证

### 9.1 自检脚本

所有项目**必须**包含 `scripts/validate-norm.js` 合规性验证脚本：

```bash
# 运行验证
node scripts/validate-norm.js
```

**验证项目**:
- 核心工作流存在（4 个）
- openspec 目录结构存在
- 必须文档存在
- 配置文件存在

### 9.2 CI 验证

在 CI 工作流中加入：

```yaml
- name: Validate norm compliance
  run: node scripts/validate-norm.js
```

---

## 10. 版本历史

| 版本 | 日期 | 变更 |
|------|------|------|
| 1.0 | 2026-03-22 | 初始版本（通过 Superflow 四阶段产生） |

---

## 11. 批准记录

- [x] 阶段 2 计划批准
- [x] 阶段 3 执行完成
- [x] 阶段 4 Challenge 审查通过
- [x] 用户验收确认
