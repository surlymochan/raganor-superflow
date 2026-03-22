---
name: superflow:plan
description: Superflow 阶段 2: 计划 - Spec 定稿 + 任务分解
---

# Superflow 阶段 2：Plan（计划）

**命令**: `/superflow:plan <name>`

**解决的问题**: 任务不清、无从下手

## 前置条件

阶段 1 Clarify 已完成，Spec 草稿已批准。

## 流程

### 1. Spec 定稿

将 `openspec/changes/<name>/spec.md` 移动到 `openspec/specs/<domain>/<name>.md`

完善 Spec：
- 补充接口设计
- 完善数据模型
- 明确验收标准（可测试）
- 添加技术约束

### 2. 任务分解

根据 Spec 分解任务，每项 2-5 分钟：

**分解原则**:
- 每个任务可独立完成
- 每个任务有明确的验证方式
- 任务间依赖最小化

### 3. 创建任务清单

```markdown
# 任务清单：<name>

**Spec**: `openspec/specs/<domain>/<name>.md`

## 任务列表

| ID | 任务 | 验证方式 | 依赖 | 状态 |
|----|------|----------|------|------|
| 1 | 任务描述 | TDD/快照/gstack | - | pending |
| 2 | 任务描述 | TDD/快照/gstack | 1 | pending |

## 验证方式说明

- **TDD**: 测试驱动开发，RED→GREEN→REFACTOR
- **快照**: lsp_diagnostics + 手动验证
- **gstack**: 浏览器自动化验证（如有 UI）
```

### 4. 任务模板

```markdown
### Task N: <任务名称>

**Spec 引用**: [Spec 中哪条]
**验证方式**: [TDD/快照/gstack]
**依赖**: [Task N 或无]

#### 步骤

- [ ] **Step 1**: [具体操作]
- [ ] **Step 2**: [具体操作]
- [ ] **Step 3**: [验证]

#### 验证命令

```bash
# 验证命令
npm test <path>
# 或
lsp_diagnostics <path>
```
```

## 产出

```
openspec/specs/<domain>/<name>.md     # 规范真理源
openspec/changes/<name>/
├── spec.md                           # 更新的 Spec
└── tasks.md                          # 任务清单
```

## 门禁

**用户必须**：
1. 确认 Spec 完整准确
2. 确认任务清单可执行

## 下一步

批准后，执行：`/superflow:execute <name>`
