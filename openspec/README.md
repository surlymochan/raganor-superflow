# OpenSpec 规范驱动开发

**版本**: 0.1
**项目**: Superflow

---

## 0. 快速开始

```bash
# 1. 发起新变更
/superflow:brainstorm 添加用户登录功能

# 2. 审查提案
# AI 自动创建 openspec/changes/<name>/proposal.md

# 3. 应用实现
/superflow:plan <name>
/superflow:execute <name>

# 4. 完成归档
/superflow:archive <name>
```

---

## 1. 目录结构

```
openspec/
├── README.md                   # 本文件
├── specs/                      # 规范真理源 (Source of Truth)
│   ├── domain/                 # 领域规范
│   ├── api/                    # API 规范
│   └── arch/                   # 架构规范
└── changes/                    # 变更提案
    ├── <change-name>/          # 进行中的变更
    │   ├── proposal.md         # 变更提案 (为什么做、做什么)
    │   ├── design.md           # 技术设计
    │   └── tasks.md            # 任务清单
    └── archive/                # 已归档的变更
        └── YYYY-MM-DD-<name>/
```

---

## 2. 工作流

### 2.1 与 Superflow 四阶段集成

| Superflow 阶段 | Openspec 操作 | 自动创建的文件 |
|----------------|---------------|----------------|
| 阶段 1: 脑暴 | `/superflow:brainstorm` | `openspec/changes/<name>/proposal.md` |
| 阶段 2: 计划 | `/superflow:plan` | `openspec/specs/<domain>/<name>.md` + `tasks.md` |
| 阶段 3: 执行 | `/superflow:execute` | 代码实现 + 提交 |
| 阶段 4: 归档 | `/superflow:archive` | 移动到 `openspec/changes/archive/` |

### 2.2 详细流程

#### 阶段 1: 脑暴

**命令**: `/superflow:brainstorm <需求>`

**AI 自动执行**:
1. 澄清需求（一次一个问题）
2. 提出 2-3 个方案对比
3. 创建设计文档：`docs/plans/YYYY-MM-DD-<name>-design.md`
4. 创建变更提案：`openspec/changes/<name>/proposal.md`
5. 等待用户批准

**批准后**: 进入阶段 2

#### 阶段 2: 计划

**命令**: `/superflow:plan <name>`

**AI 自动执行**:
1. Spec 定稿：`openspec/specs/<domain>/<name>.md`
2. 任务分解：每项 2-5 分钟
3. 创建任务清单：`openspec/changes/<name>/tasks.md`
4. 推荐执行模式（A/B）
5. 等待用户批准

**批准后**: 进入阶段 3

#### 阶段 3: 执行

**命令**: `/superflow:execute <name> [--mode=A|B]`

**AI 自动执行**:
1. Git 工作树隔离：`git checkout -b feature/<name>`
2. 逐项执行任务（TDD → Challenge → 提交）
3. E2E 验证
4. 浏览器自动化验证（如有 UI）

**完成后**: 等待阶段 4

#### 阶段 4: 归档

**命令**: `/superflow:archive <name>`

**AI 自动执行**:
1. Challenge 审查（本地 + OpenCode 双审查）
2. 呈现验收材料
3. 等待用户验收确认
4. 归档：移动到 `openspec/changes/archive/YYYY-MM-DD-<name>/`
5. 完成分支

---

## 3. 规范编写原则

1. **规范是真理源** - 代码必须符合规范，不是规范适应代码
2. **变更可追溯** - 每个变更都有提案、设计、任务的完整记录
3. **归档即历史** - 归档目录是项目决策的历史档案
4. **规范可演化** - 通过变更提案不断更新规范

---

## 4. 变更提案模板

```markdown
# 变更提案：<name>

**日期**: YYYY-MM-DD
**状态**: 草稿/审查中/已批准/已归档

## 1. 变更意图

为什么做这个变更？解决什么问题？

## 2. 变更范围

影响哪些文件/模块？有哪些依赖？

## 3. 技术方案

如何实现？有哪些设计决策？

## 4. 成功标准

如何验证完成？验收标准是什么？

## 5. 决策记录

关键决策和理由。

## 6. 等待批准

阶段 X 完成，等待用户批准。
```

---

## 5. 任务分解模板

```markdown
# 任务清单：<name>

| ID | 任务 | 预计时长 | 依赖 | 状态 |
|----|------|----------|------|------|
| 1 | 任务描述 | 5 分钟 | - | pending |
| 2 | 任务描述 | 5 分钟 | 1 | pending |

## 执行记录

- [ ] 任务 1: 完成时间 / 提交 hash
- [ ] 任务 2: 完成时间 / 提交 hash
```

---

## 6. 与 Superpowers 集成

| 功能 | Superpowers 技能 |
|------|------------------|
| Git 隔离 | `superpowers:using-git-worktrees` |
| TDD | `superpowers:test-driven-development` |
| 验证 | `superpowers:verification-before-completion` |
| 代码审查 | `superpowers:requesting-code-review` |
| 完成分支 | `superpowers:finishing-a-development-branch` |
| 子代理 | `superpowers:subagent-driven-development` |

---

## 7. 快速参考

### 命令速查

```bash
/superflow:brainstorm <需求>     # 阶段 1: 脑暴
/superflow:plan <name>           # 阶段 2: 计划
/superflow:execute <name>        # 阶段 3: 执行
/superflow:archive <name>        # 阶段 4: 归档
```

### 目录速查

| 目录 | 内容 |
|------|------|
| `openspec/specs/` | 规范真理源 |
| `openspec/changes/` | 变更提案（进行中） |
| `openspec/changes/archive/` | 已归档变更 |
| `docs/plans/` | 设计文档 |

---

## 8. 版本历史

| 版本 | 日期 | 变更 |
|------|------|------|
| 0.1 | 2026-03-22 | 初始版本 |
