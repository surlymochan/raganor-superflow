---
name: superflow:archive
description: Superflow 阶段 4: 归档 - Challenge→用户验收→归档
---

# Superflow 阶段 4：归档

**用法**: `/superflow:archive [名称]`

## 前置条件

- 阶段 3 执行完成
- E2E 验证通过
- 浏览器验证通过（如有 UI）
- PRD 中的验收标准全部满足

## 流程

```
阶段 3 完成
  ↓
Challenge 审查 ← 本地 + OpenCode 双审查（验证 PRD 对齐）
  ↓
呈现验收材料（含 PRD 验收标准完成情况）
  ↓
用户确认 OK
  ↓
归档 + 完成分支 + PRD 版本更新
```

## 详细流程

### 0. PRD 版本更新

归档前，更新 PRD 版本号（如 v1.0 → v1.1），记录本次变更。

### 1. Challenge 审查（本地 + OpenCode 双审查）

#### 1.1 本地 Challenge 审查

调用 `superflow-challenge` 技能，**重点审查 PRD 对齐**：
- 实现是否满足 PRD 中的所有功能需求？
- 验收标准是否全部通过？
- 有无范围蔓延？

#### 1.2 OpenCode Challenge 审查（干净上下文）

调用 OpenCode 独立进程审查。

### 2. 呈现验收材料

展示实现摘要、测试证据、Challenge 结果。

### 3. 用户验收

用户回复 "OK" 后进入归档。

### 4. 归档操作

```bash
# 1. 更新 PRD 版本（如需要）
# 在 openspec/specs/domain/<domain>/prd-<name>.md 中更新版本号

# 2. 移动变更到归档目录
mv openspec/changes/<name>/ openspec/changes/archive/YYYY-MM-DD-<name>/

# 3. 完成分支
superpowers:finishing-a-development-branch
```

### 5. PRD 沉淀

归档完成后，PRD 文档保留在 `openspec/specs/domain/<domain>/` 目录，作为产品需求的真理源。

## 使用的技能

- `superflow-challenge` - 本地 Challenge 审查
- `opencode challenge` - OpenCode 独立审查
- `superpowers:finishing-a-development-branch` - 完成分支
