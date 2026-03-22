# Superflow 开源初始化设计文档

**日期**: 2026-03-22
**阶段**: 阶段 1 脑暴 → 阶段 2 计划
**状态**: 设计草稿（待批准）

---

## 0. 设计目标

用 Superflow 自己的四阶段工作流，完成 Superflow 项目本身的开源初始化，同时定义一套**可复用的 GitHub 项目规范**，供后续所有使用 Superflow 工作流的项目遵循。

**核心原则**:
1. **吃狗粮**——Superflow 必须用自己的工作流构建自己
2. **规范即代码**——openspec 由工作流自动引入，不是手动创建
3. **参考 opc，但不复制**——提取通用核心，定义 Superflow 自己的标准

---

## 1. 需求澄清

### 1.1 目的

- 让 Superflow 项目本身遵循其定义的四阶段工作流
- 定义一套"开源初始化标准"，后续项目可直接复用
- 验证 Superflow 工作流的可行性（真正的"吃狗粮"测试）

### 1.2 约束

- 必须参考 raganor-opc 的 GitHub 规范（8 个工作流）
- openspec 目录必须由工作流自动引入，不是手动创建
- 工作流不合理的地方可以提出并修正，不一味遵循

### 1.3 成功标准

| 标准 | 验证方式 |
|------|----------|
| Superflow 项目本身跑通四阶段 | 阶段 4 归档完成 |
| 产出可复用的 GitHub 规范模板 | 后续项目可直接复制 |
| 工作流不合理处被记录并修正 | 更新 config/commands/ |
| openspec 由工作流自动引入 | 检查目录是否自动创建 |

---

## 2. 架构设计

### 2.1 整体流程

```
┌─────────────────────────────────────────────────────────────┐
│  阶段 1: 脑暴 (Brainstorming)                               │
│  输入：一句话需求"希望项目本身也用他自己的规范"              │
│  输出：本设计文档 + openspec/changes/superflow-init/        │
│  门禁：用户批准                                             │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│  阶段 2: 计划 (Writing Plans)                               │
│  输入：批准的设计                                           │
│  输出：openspec/specs/superflow/github-norm-v0.1.md         │
│        docs/plans/YYYY-MM-DD-superflow-init-plan.md         │
│  门禁：用户批准 + 执行模式选择                              │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│  阶段 3: 执行 (Execute)                                     │
│  Git 隔离 → TDD → Challenge → E2E → 浏览器验证                │
│  产出：完整的 GitHub 工作流 + 配置文件 + 文档                │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│  阶段 4: 归档 (Archive)                                     │
│  Challenge 审查 (本地+OpenCode) → 用户验收 → 归档             │
│  产出：归档文档 + Spec 更新 + 分支处理                        │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 目录结构

```
raganor-superflow/
├── .github/
│   ├── workflows/
│   │   ├── ci.yml                    # 必须：CI/CD
│   │   ├── publish.yml               # 必须：NPM 发布
│   │   ├── code-review.yml           # 必须：代码质量门禁
│   │   ├── qa-adversarial-review.yml # 推荐：对抗性审查
│   │   ├── codeql.yml                # 推荐：安全扫描
│   │   ├── labeler.yml               # 推荐：自动打标签
│   │   ├── auto-response.yml         # 可选：PR 自动回应
│   │   └── stale.yml                 # 可选：关闭 stale issue
│   └── labeler.yml                   # PR 标签配置
├── openspec/
│   ├── README.md                     # OpenSpec 使用说明
│   ├── specs/
│   │   └── superflow/
│   │       ├── github-norm-v0.1.md   # GitHub 项目规范标准
│   │       └── workflow-v0.1.md      # Superflow 工作流规范
│   └── changes/
│       ├── superflow-init/           # 当前变更
│       │   ├── proposal.md           # 变更提案
│       │   ├── design.md             # 技术设计
│       │   └── tasks.md              # 任务清单
│       └── archive/                  # 已归档变更
├── docs/
│   ├── design/
│   │   ├── README.md                 # 设计门户
│   │   └── DOCUMENT-MAP.md           # 文档地图
│   └── issues/
│       └── README.md                 # Issues 说明
├── config/
│   ├── commands/                     # Superflow 命令定义
│   │   ├── brainstorm.md
│   │   ├── plan.md
│   │   ├── execute.md
│   │   └── archive.md
│   └── norms/
│   │   └── github-norm-v0.1.md       # 规范源文件（安装时复制）
├── scripts/
│   ├── install-*.js                  # 平台安装脚本
│   └── validate-workflows.js         # 工作流验证脚本
├── .gitignore
├── .editorconfig
├── .eslintrc.js                      # ESLint 配置
├── tsconfig.json                     # TypeScript 配置
├── package.json
├── README.md
├── CONTRIBUTING.md
├── LICENSE
└── CHANGELOG.md
```

---

## 3. GitHub 规范 v0.1 定义

### 3.1 核心工作流（必须）

| 工作流 | 说明 | 配置复杂度 |
|--------|------|------------|
| `ci.yml` | 测试 + 构建验证 | 低 |
| `publish.yml` | NPM/ releases 发布 | 低 |
| `code-review.yml` | 代码质量门禁（架构/SOLID/命名） | 中 |

### 3.2 增强工作流（推荐）

| 工作流 | 说明 | 配置复杂度 |
|--------|------|------------|
| `qa-adversarial-review.yml` | 对抗性 QA 审查 | 中（可接 LLM） |
| `codeql.yml` | CodeQL 安全扫描 | 低（GitHub 托管） |
| `labeler.yml` | PR 自动打标签 | 低 |

### 3.3 自动化工作流（可选）

| 工作流 | 说明 | 配置复杂度 |
|--------|------|------------|
| `auto-response.yml` | PR 自动回应 | 低 |
| `stale.yml` | 自动关闭 stale issue/PR | 低 |
| `workflow-sanity.yml` | 工作流健全性检查 | 中 |

### 3.4 规范与 OPC 的对比

| 维度 | OPC | Superflow | 说明 |
|------|-----|-----------|------|
| 核心工作流 | 3 个 | 3 个 | 相同 |
| 增强工作流 | 2 个 | 3 个 | + workflow-sanity |
| 自动化工作流 | 3 个 | 3 个 | 相同 |
| openspec 集成 | 手动 | **自动** | 工作流自动引入 |
| 规范文档 | v0.1/ 目录 | openspec/specs/ | 统一位置 |

---

## 4. 组件设计

### 4.1 Openspec 自动引入机制

**当前问题**: Superflow 的 4 个阶段命令没有自动创建 openspec 目录

**解决方案**: 修改 `config/commands/` 中的 4 个命令定义

| 阶段 | 自动创建的文件 |
|------|----------------|
| Brainstorm | `openspec/changes/<name>/proposal.md` |
| Plan | `openspec/specs/<domain>/<name>.md` |
| Execute | Git 工作树 + 自动提交 |
| Archive | 移动到 `openspec/changes/archive/` |

### 4.2 规范文件自动同步

**问题**: config/commands/ 的修改需要同步到三个平台（Claude Code/OpenCode/Cursor）

**解决方案**: 安装脚本增加"规范同步"功能

```bash
npm run install:all
# 自动复制：
# - config/commands/* → ~/.claude/commands/superflow/
# - config/commands/* → ~/.opencode/commands/superflow/
# - config/commands/* → ~/.cursor/commands/superflow/
# - config/norms/github-norm-v0.1.md → 各平台/skills/superflow/
```

---

## 5. 数据流

```
用户输入 (一句话需求)
       ↓
  ┌────────────┐
  │ Brainstorm │ → 创建 openspec/changes/<name>/proposal.md
  └────────────┘
       ↓ 批准
  ┌────────────┐
  │    Plan    │ → 创建 openspec/specs/<domain>/<name>.md
  └────────────┘
       ↓ 批准
  ┌────────────┐
  │  Execute   │ → Git 隔离 → TDD → Challenge → E2E
  └────────────┘
       ↓ 验证通过
  ┌────────────┐
  │   Archive  │ → 挑战审查 → 用户验收 → 归档
  └────────────┘
       ↓
  规范更新 (openspec/specs/ 更新)
```

---

## 6. 错误处理

| 错误场景 | 处理方式 |
|----------|----------|
| openspec 目录已存在 | 跳过创建，使用现有目录 |
| 阶段 1 设计未批准 | 返回阶段 1 修改，不进入阶段 2 |
| 阶段 2 任务未批准 | 返回阶段 2 修改，不进入阶段 3 |
| 阶段 3 测试失败 | 停止执行，修复后重试 |
| 阶段 4 Challenge 不通过 | 返回阶段 3 重新实现 |
| 用户验收不通过 | 返回阶段 3 重新实现 |

---

## 7. 发现的不合理之处及修正建议

### 7.1 循环依赖问题

**问题**: Superflow 要用自己的工作流构建自己，但工作流本身可能不完善

**修正建议**:
1. **引导阶段**——先用现有工作流完成初始化
2. **自举阶段**——在工作流完善后，重新跑一遍四阶段
3. **版本化**——规范文档增加版本号（v0.1, v0.2...）

### 7.2 Openspec 目录引入时机

**问题**: 当前 brainstorm.md 没有定义自动创建 openspec

**修正建议**: 修改 `config/commands/brainstorm.md`，增加：
```markdown
## 自动操作
1. 创建 `openspec/changes/<name>/proposal.md`
2. 创建 `openspec/specs/` 目录（如不存在）
3. 创建 `docs/plans/YYYY-MM-DD-<name>-design.md`
```

### 7.3 跨平台配置同步

**问题**: 三个平台的配置可能不同步

**修正建议**: 安装脚本增加"配置校验"功能，检测并警告不一致的配置

---

## 8. 成功标准验证

| 标准 | 验证命令 |
|------|----------|
| openspec 目录存在 | `test -d openspec/` |
| GitHub 工作流完整 | `ls .github/workflows/ | wc -l` = 8 |
| 规范文档存在 | `test -f openspec/specs/superflow/github-norm-v0.1.md` |
| 安装脚本正常 | `npm run install:all` |

---

## 9. 下一步

1. **用户批准本设计** → 进入阶段 2：计划
2. **阶段 2**: Spec 定稿 + 任务分解（每项 2-5 分钟）
3. **阶段 3**: 执行（用 Superflow 工作流实现）
4. **阶段 4**: 归档（Challenge 审查 + 用户验收）

---

## 附录 A：任务分解预览（阶段 2 输出）

| ID | 任务 | 预计时长 | 依赖 |
|----|------|----------|------|
| 1 | 创建 openspec 目录结构 | 2 分钟 | - |
| 2 | 编写 github-norm-v0.1.md 规范 | 5 分钟 | 1 |
| 3 | 创建 CI 工作流 | 5 分钟 | 1 |
| 4 | 创建 Publish 工作流 | 5 分钟 | 1 |
| 5 | 创建 Code Review 工作流 | 10 分钟 | 2 |
| 6 | 创建 QA Adversarial 工作流 | 10 分钟 | 2 |
| 7 | 创建 CodeQL 工作流 | 5 分钟 | 2 |
| 8 | 创建 Labeler 配置 | 3 分钟 | 2 |
| 9 | 创建 Auto Response 工作流 | 5 分钟 | 2 |
| 10 | 创建 Stale 工作流 | 5 分钟 | 2 |
| 11 | 更新 brainstorm.md（自动创建 openspec） | 5 分钟 | - |
| 12 | 更新 plan.md（自动引入 openspec） | 5 分钟 | - |
| 13 | 更新 execute.md（自动 Git 隔离） | 5 分钟 | - |
| 14 | 更新 archive.md（自动归档） | 5 分钟 | - |
| 15 | 创建 docs/design/README.md | 3 分钟 | 1 |
| 16 | 创建 docs/design/DOCUMENT-MAP.md | 5 分钟 | 1 |
| 17 | 创建 docs/issues/README.md | 3 分钟 | 1 |
| 18 | 创建 CONTRIBUTING.md | 5 分钟 | 2 |
| 19 | 创建 eslint.config.js | 3 分钟 | 1 |
| 20 | 创建 tsconfig.json | 3 分钟 | 1 |

**预计总任务数**: 20 项
**预计总时长**: ~100 分钟
**推荐执行模式**: 模式 A（子代理驱动，任务独立）
