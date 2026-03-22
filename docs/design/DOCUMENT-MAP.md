# Superflow 文档地图

**最后更新**: 2026-03-22

---

## 文档分类

### 1. 设计规范 (OpenSpec)

| 文档 | 路径 | 说明 |
|------|------|------|
| OpenSpec 使用说明 | `openspec/README.md` | 规范驱动开发指南 |
| GitHub 规范 v0.1 | `openspec/specs/superflow/github-norm-v0.1.md` | GitHub 项目规范标准 |
| 工作流规范 v0.1 | `openspec/specs/superflow/workflow-v0.1.md` | Superflow 工作流规范 |

### 2. 设计文档

| 文档 | 路径 | 说明 |
|------|------|------|
| 设计门户 | `docs/design/README.md` | 设计文档入口 |
| 文档地图 | `docs/design/DOCUMENT-MAP.md` | 本文档 |
| 开源初始化设计 | `docs/plans/2026-03-22-superflow-init-design.md` | 阶段 1 设计 |
| 开源初始化计划 | `docs/plans/2026-03-22-superflow-init-plan.md` | 阶段 2 计划 |

### 3. 变更提案

| 文档 | 路径 | 说明 |
|------|------|------|
| 开源初始化提案 | `openspec/changes/superflow-init/proposal.md` | 变更提案 |

### 4. 项目文档

| 文档 | 路径 | 说明 |
|------|------|------|
| README | `README.md` | 项目说明 |
| 贡献指南 | `CONTRIBUTING.md` | 贡献指南 |
| 变更日志 | `CHANGELOG.md` | 版本历史 |

### 5. 命令定义

| 文档 | 路径 | 说明 |
|------|------|------|
| Brainstorm | `config/commands/brainstorm.md` | 阶段 1 命令 |
| Plan | `config/commands/plan.md` | 阶段 2 命令 |
| Execute | `config/commands/execute.md` | 阶段 3 命令 |
| Archive | `config/commands/archive.md` | 阶段 4 命令 |

---

## 文档关系图

```
┌─────────────────────────────────────────────────────────────┐
│                     用户入口                                │
│                     README.md                               │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│                   设计门户                                    │
│              docs/design/README.md                          │
├─────────────────────────────────────────────────────────────┤
│  ←→ OpenSpec (规范)     ←→ Plans (计划)    ←→ Changes     │
│  openspec/README.md     docs/plans/         openspec/      │
│  specs/                                   changes/         │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│                   命令定义                                    │
│            config/commands/*.md                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 文档用途

| 文档类型 | 用途 | 更新频率 |
|----------|------|----------|
| 规范 (Specs) | 真理源，代码必须遵循 | 低（变更时） |
| 设计 (Design) | 架构和方案说明 | 中（新功能） |
| 计划 (Plans) | 任务分解和执行计划 | 高（每项任务） |
| 提案 (Changes) | 变更意图和范围 | 中（变更时） |

---

## 归档规则

- **进行中的变更**: `openspec/changes/<name>/`
- **已归档变更**: `openspec/changes/archive/YYYY-MM-DD-<name>/`
- **规范历史**: 保留所有版本，更新时增加版本号
