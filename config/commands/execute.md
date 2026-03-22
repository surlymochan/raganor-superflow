---
name: superflow:execute
description: Superflow 阶段 3: 执行 - TDD → E2E → 浏览器验证
---

# Superflow 阶段 3：执行

**用法**: `/superflow:execute [名称] [--mode=A|B]`

## 前置条件

- 阶段 2 Spec 和任务已批准
- PRD 文档存在：`openspec/specs/domain/<domain>/prd-<name>.md`
- 计划文档存在：`docs/plans/YYYY-MM-DD-<name>-plan.md`

## 验证 PRD 对齐

执行前，AI 应验证：
1. 每项任务都能追溯到 PRD 中的用户故事或功能需求
2. 验收标准与 PRD 一致
3. 无范围蔓延（实现 PRD 未包含的功能）

## 执行模式

### 模式 A：当前会话执行（默认/推荐）

**命令**: `/superflow:execute <name> --mode=A` 或直接 `/superflow:execute <name>`

使用 `superpowers:subagent-driven-development`：
- 每项任务分派独立子代理
- 每项任务后自动 Challenge 审查
- 快速迭代，无需切换会话

### 模式 B：并行会话执行

**命令**: `/superflow:execute <name> --mode=B`

使用 `superpowers:executing-plans`：
- 在新会话中执行
- 适合需要人工检查点的场景
- 批次执行（每批 3 个任务）

---

## 流程

### 1. Git 工作树隔离

```bash
git checkout -b feature/<name>
# 验证基线测试通过
npm test
```

### 2. 任务执行

**模式 A（当前会话）**：
```
读取计划 → 创建 TodoWrite → 每项任务:
  ├→ 分派实现子代理
  ├→ TDD (RED→GREEN→REFACTOR)
  ├→ 提交
  └→ 下一项任务
```

**模式 B（并行会话）**：
```
打开新会话 → 传入计划 → 批次执行:
  ├→ 批次 1 (任务 1-3)
  ├→ 人工检查点
  ├→ 批次 2 (任务 4-6)
  └→ ...
```

### 3. E2E 验证

所有任务完成后：
```
E2E 测试 ← 自动执行
  ↓
浏览器自动化验证 (如有 UI 变更) ← 使用 gstack 亲自操作
  ↓
等待阶段 4: /superflow:archive
```

---

## E2E 验证要求

### 1. E2E 测试

- 运行项目 E2E 测试套件（如 Playwright、Cypress）
- 验证关键用户流程
- 截图/录屏保存证据

### 2. 浏览器自动化验证（如有 UI 变更）

使用 `gstack` 或 Playwright：

```bash
# 启动应用
npm run dev &

# 使用 gstack 验证
gstack navigate http://localhost:3000
gstack click "[data-testid=submit]"
gstack screenshot --annotated
```

**必须亲自操作浏览器验证**：
- 点击关键按钮
- 填写表单
- 验证响应式布局
- 截图保存

---

## 执行完成后

E2E 验证通过后，**等待用户运行阶段 4 命令**：

```
/superflow:archive [名称]
```

---

## 使用的技能

| 技能 | 阶段 | 作用 |
|------|------|------|
| `superpowers:using-git-worktrees` | 执行前 | Git 隔离分支 |
| `superpowers:subagent-driven-development` | 任务执行 | **推荐**：子代理逐项执行 |
| `superpowers:executing-plans` | 任务执行 | 可选：并行会话批次执行 |
| `superpowers:test-driven-development` | 每项任务 | TDD 循环 |
| `superpowers:verification-before-completion` | 每项任务 | 验证测试通过 |
| `gstack` | E2E 验证 | 浏览器自动化验证 |

---

## 模式选择指南

| 场景 | 推荐模式 | 理由 |
|------|---------|------|
| 任务独立、快速迭代 | Subagent-Driven | 无需切换会话，自动审查 |
| 需要人工检查点 | Executing Plans | 批次间可暂停审查 |
| 任务紧密耦合 | 手动执行 | 子代理可能上下文不足 |

---

## Challenge 说明

**Challenge 审查不在阶段 3 执行**，而是在阶段 4 (`/superflow:archive`) 中，在浏览器验证通过后、用户验收前执行。

阶段 4 会使用：
- `superflow-challenge` - 本地 Challenge 审查
- **`opencode challenge`** - 调用 OpenCode 进程进行独立审查（干净上下文）
