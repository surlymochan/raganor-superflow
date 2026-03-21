---
name: superflow:brainstorm
description: Superflow 阶段 1: 脑暴 - 一句话需求变清晰
---

# Superflow 阶段 1：脑暴

**用法**: `/superflow:brainstorm <需求>`

## 流程

1. **澄清需求** - 一次一个问题，理解目的、约束、成功标准
2. **提出 2-3 个方案** - 对比优缺点，给出推荐
3. **呈现设计** - 架构、组件、数据流、错误处理，逐节确认
4. **创建 Spec 草稿** - `openspec/changes/<name>/proposal.md`

## 产出

- `docs/plans/YYYY-MM-DD-<name>-design.md`
- `openspec/changes/<name>/proposal.md`

## 批准后

用户批准设计后，进入阶段 2：`/superflow:plan`
