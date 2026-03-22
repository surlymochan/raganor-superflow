# Superflow - OpenCode OMO 最强增强器

**版本**: 0.2
**平台**: OpenCode
**用途**: 解决长程任务模糊、幻觉、成功率低的问题

---

## 概述

Superflow 是 OpenCode OMO（Multi-Agent Orchestration）最强增强器，通过四阶段工作流确保长程任务的成功。

### 解决的问题

| 问题 | 解决方案 |
|------|----------|
| **需求模糊** | Clarify 阶段并行调研 + 渐进式澄清 |
| **AI 幻觉** | Spec 是真理源，代码必须符合规范 |
| **成功率低** | TDD + Challenge 审查 + 用户验收 |

---

## 四阶段命令

### 阶段 1: Clarify

```bash
/superflow:clarify <一句话需求>
```

**职责**:
1. 并行调研 (`explore` + `librarian`)
2. 渐进式澄清（一次一个问题）
3. 方案对比（2-3 个选项）
4. 创建 Spec 草稿

**产出**:
- `openspec/changes/<name>/spec.md`
- `openspec/changes/<name>/context.md`
- `openspec/changes/<name>/options.md`

---

### 阶段 2: Plan

```bash
/superflow:plan <name>
```

**职责**:
1. Spec 定稿
2. 任务分解（每项 2-5 分钟）
3. 验证方式规划

**产出**:
- `openspec/specs/<domain>/<name>.md`
- `openspec/changes/<name>/tasks.md`

---

### 阶段 3: Execute

```bash
/superflow:execute <name>
```

**职责**:
1. Git 隔离 (`feature/<name>`)
2. 逐项执行 (TodoWrite 追踪)
3. TDD 循环 (RED → GREEN → REFACTOR)
4. 即时验证 (`lsp_diagnostics` + 测试)

**门禁**: 所有测试通过 + `lsp_diagnostics` 无 error

---

### 阶段 4: Verify

```bash
/superflow:verify <name>
```

**职责**:
1. Spec 验收（逐条检查）
2. 本地 Challenge 审查
3. E2E 验证 (gstack，如有问题 UI)
4. 独立 Challenge（新 OpenCode 进程）
5. 用户验收（回复 "OK"）

**产出**:
- `openspec/changes/archive/YYYY-MM-DD-<name>/`

---

## OpenCode OMO 能力使用

| 能力 | 用途 |
|------|------|
| `explore` agent | 并行调研、代码库探索 |
| `librarian` agent | 外部文档、最佳实践查找 |
| `task(category=)` | 任务委托、并行执行 |
| `gstack` | 浏览器自动化验证 |
| `TodoWrite` | 任务跟踪 |
| `lsp_diagnostics` | 代码质量验证 |

---

## 目录结构

```
openspec/
├── specs/
│   └── <domain>/              # Spec 真理源
│       └── <name>.md
└── changes/
    ├── <name>/                 # 进行中
    │   ├── spec.md
    │   ├── context.md
    │   ├── options.md
    │   └── tasks.md
    └── archive/               # 已完成
        └── YYYY-MM-DD-<name>/
```

---

## TDD 循环

```
RED     → 写一个失败的测试
GREEN   → 写最简代码让测试通过
REFACTOR → 重构代码，保持测试通过
```

---

## Challenge 审查

### 本地 Challenge
- `lsp_diagnostics` 无 error
- Spec 合规性检查
- 安全检查

### 独立 Challenge
启动新 OpenCode 进程进行对抗性验证。

---

## 版本历史

| 版本 | 日期 | 变更 |
|------|------|------|
| 0.1 | 2026-03-22 | 初始版本（跨平台工作流框架） |
| 0.2 | 2026-03-22 | 重写为 OpenCode OMO 最强增强器 |
