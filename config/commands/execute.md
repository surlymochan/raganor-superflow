---
name: superflow:execute
description: Superflow 阶段 3: 执行 - TDD + 逐项验证
---

# Superflow 阶段 3：Execute（执行）

**命令**: `/superflow:execute <name>`

**解决的问题**: 实现混乱、质量不可控

## 前置条件

- 阶段 2 Plan 已完成
- Spec 已定稿
- 任务清单已批准

## 流程

### 1. Git 隔离

```bash
git checkout -b feature/<name>
```

验证基线：
```bash
npm test  # 或项目测试命令
lsp_diagnostics .  # 无 error
```

### 2. 创建 TodoWrite

读取 `openspec/changes/<name>/tasks.md`，创建 TodoWrite：

```
[TodoWrite]
- Task 1: <任务描述> — status: pending
- Task 2: <任务描述> — status: pending
...
```

### 3. 逐项执行

对每个任务：

```typescript
// 标记 in_progress
TodoWrite: Task N → in_progress

// 执行
执行任务步骤

// TDD（如验证方式为 TDD）
RED:
  - 写一个失败的测试
  - 运行测试，确认失败
GREEN:
  - 写最简代码让测试通过
  - 运行测试，确认通过
REFACTOR:
  - 重构代码
  - 运行测试，确认仍通过

// 验证
lsp_diagnostics <changed-files>  # 无 error

// 提交
git add <changed-files>
git commit -m "feat(<name>): <任务描述>"

// 标记 completed
TodoWrite: Task N → completed
```

### 4. 并行化（如任务独立）

对于无依赖的独立任务，使用 `task(category="deep")` 并行执行：

```typescript
// 并行执行 2-3 个任务
task(category="deep", load_skills=["tdd-workflow"], prompt="执行 Task 1...")
task(category="deep", load_skills=["tdd-workflow"], prompt="执行 Task 2...")
task(category="deep", load_skills=["tdd-workflow"], prompt="执行 Task 3...")

// 等待所有完成
```

### 5. 完成验证

所有任务完成后：

```bash
npm test                    # 所有测试通过
lsp_diagnostics .          # 无 error
git log --oneline         # 确认提交历史
```

## 门禁

- 所有测试通过
- lsp_diagnostics 无 error
- 每任务有独立提交

## 产出

```
git commit 历史（含每任务提交）
测试覆盖率报告（如果项目有）
```

## 下一步

执行完成后，执行：`/superflow:verify <name>`
