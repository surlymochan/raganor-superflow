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

## 流程

```
阶段 3 完成
  ↓
Challenge 审查 ← 本地 + OpenCode 双审查
  ↓
呈现验收材料
  ↓
用户确认 OK
  ↓
归档 + 完成分支
```

## 详细流程

### 1. Challenge 审查（本地 + OpenCode 双审查）

#### 1.1 本地 Challenge 审查

调用 `superflow-challenge` 技能。

#### 1.2 OpenCode Challenge 审查（干净上下文）

调用 OpenCode 独立进程审查。

### 2. 呈现验收材料

展示实现摘要、测试证据、Challenge 结果。

### 3. 用户验收

用户回复 "OK" 后进入归档。

### 4. 归档操作

```bash
# 移动变更到归档目录
mv openspec/changes/<name>/ openspec/changes/archive/YYYY-MM-DD-<name>/

# 完成分支
superpowers:finishing-a-development-branch
```

## 使用的技能

- `superflow-challenge` - 本地 Challenge 审查
- `opencode challenge` - OpenCode 独立审查
- `superpowers:finishing-a-development-branch` - 完成分支
