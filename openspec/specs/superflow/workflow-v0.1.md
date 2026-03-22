# Superflow 工作流规范 v0.1

**版本**: 0.1
**生效日期**: 2026-03-22
**性质**: Superflow 四阶段工作流的实现规范

---

## 0. 总览

本规范定义了 Superflow 四阶段工作流的**标准实现**，确保所有使用 Superflow 的项目有一致的工作流体验。

---

## 1. 四阶段定义

### 阶段 1：脑暴 (Brainstorming)

**命令**: `/superflow:brainstorm <需求>`

**职责**:
1. 澄清需求（一次一个问题）
2. 提出 2-3 个方案对比
3. 呈现设计（架构、组件、数据流）
4. 创建 Spec 草稿

**自动创建的文件**:
- `docs/plans/YYYY-MM-DD-<name>-design.md` - 设计文档
- `openspec/changes/<name>/proposal.md` - 变更提案
- `openspec/` 目录（如不存在）

**门禁**: 用户批准

**输出**: 批准的设计文档 + 变更提案

---

### 阶段 2：计划 (Writing Plans)

**命令**: `/superflow:plan <name>`

**职责**:
1. Spec 定稿：`openspec/specs/<domain>/<name>.md`
2. 任务分解：每项 2-5 分钟
3. 创建任务清单
4. 推荐执行模式（A/B）

**自动创建的文件**:
- `openspec/specs/<domain>/<name>.md` - 规范真理源
- `openspec/changes/<name>/tasks.md` - 任务清单
- `docs/plans/YYYY-MM-DD-<name>-plan.md` - 计划文档

**门禁**: 用户批准 + 执行模式选择

**输出**: 批准的 Spec + 任务清单

---

### 阶段 3：执行 (Execute)

**命令**: `/superflow:execute <name> [--mode=A|B]`

**职责**:
1. Git 工作树隔离
2. 逐项执行任务（TDD → Challenge → 提交）
3. E2E 验证
4. 浏览器自动化验证（如有 UI）

**执行模式**:

| 模式 | 适用场景 | 特点 |
|------|----------|------|
| A | 任务独立、快速迭代 | 子代理驱动，自动审查 |
| B | 需要人工检查点 | 批次执行，干净上下文 |

**门禁**: 测试通过 + E2E 验证

**输出**: 可工作的代码 + 测试证据

---

### 阶段 4：归档 (Archive)

**命令**: `/superflow:archive <name>`

**职责**:
1. Challenge 审查（本地 + OpenCode 双审查）
2. 呈现验收材料
3. 等待用户验收确认
4. 归档 + 完成分支

**自动操作**:
- 移动到 `openspec/changes/archive/YYYY-MM-DD-<name>/`
- 更新 `openspec/specs/` 中的规范
- 完成 Git 分支

**门禁**: Challenge 通过 + 用户验收

**输出**: 归档文档 + 更新的规范

---

## 2. 命令定义

### 2.1 配置文件位置

```
config/commands/
├── brainstorm.md    # 阶段 1 命令定义
├── plan.md          # 阶段 2 命令定义
├── execute.md       # 阶段 3 命令定义
└── archive.md       # 阶段 4 命令定义
```

### 2.2 安装位置

安装脚本会将命令复制到各平台：

| 平台 | 命令位置 |
|------|----------|
| Claude Code | `~/.claude/commands/superflow/` |
| OpenCode | `~/.opencode/commands/superflow/` |
| Cursor | `~/.cursor/commands/superflow/` |

---

## 3. Openspec 集成

### 3.1 目录结构

```
openspec/
├── README.md
├── specs/
│   ├── superflow/
│   │   ├── github-norm-v0.1.md    # GitHub 项目规范
│   │   └── workflow-v0.1.md       # 本文件
│   └── <domain>/
└── changes/
    ├── <name>/
    │   ├── proposal.md
    │   ├── design.md
    │   └── tasks.md
    └── archive/
```

### 3.2 自动引入机制

| 阶段 | 自动创建 |
|------|----------|
| Brainstorm | `openspec/changes/<name>/proposal.md` |
| Plan | `openspec/specs/<domain>/<name>.md` |
| Execute | Git 提交（自动关联变更） |
| Archive | 移动到 `archive/` |

---

## 4. Challenge 审查

### 4.1 审查时机

| 阶段 | Challenge 类型 |
|------|----------------|
| 执行中 | 每项任务后自动审查 |
| 阶段 4 | 本地 + OpenCode 双审查 |

### 4.2 审查内容

**任务级 Challenge**:
- TDD 测试是否真正验证行为
- 代码是否符合 Spec
- 有无明显质量问题

**阶段 4 Challenge**:
- 完整的功能验证
- Spec 合规性
- 代码质量（SOLID、命名、复杂度）
- 安全风险

### 4.3 OpenCode 独立审查

调用 OpenCode 进程进行审查，确保：
- 干净的上下文（无实现偏见）
- 独立的判断
- 对抗性验证

---

## 5. E2E 验证

### 5.1 验证要求

| 类型 | 工具 | 必须性 |
|------|------|--------|
| 单元测试 | Jest/Vitest | 必须 |
| E2E 测试 | Playwright/Cypress | 推荐 |
| 浏览器验证 | gstack/Playwright | 如有 UI |

### 5.2 验证证据

- 测试报告（覆盖率）
- 截图（关键页面）
- 录屏（关键流程）

---

## 6. Git 规范

### 6.1 分支命名

```
feature/<name>     # 功能分支
bugfix/<name>      # 修复分支
release/<version>  # 发布分支
```

### 6.2 提交规范

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Type**:
- `feat`: 新功能
- `fix`: Bug 修复
- `docs`: 文档更新
- `style`: 代码格式
- `refactor`: 重构
- `test`: 测试
- `chore`: 构建/工具

### 6.3 完成分支

使用 `superpowers:finishing-a-development-branch`:
1. 变基到最新 main
2. 压缩提交（如需要）
3. 合并到 main
4. 删除分支

---

## 7. 版本历史

| 版本 | 日期 | 变更 |
|------|------|------|
| 0.1 | 2026-03-22 | 初始版本 |

---

## 8. 批准记录

- [ ] 阶段 2 计划批准
- [ ] 阶段 3 执行完成
- [ ] 阶段 4 Challenge 审查通过
- [ ] 用户验收确认
