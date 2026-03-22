# OpenSpec 规范驱动开发

**版本**: 0.2
**项目**: Superflow — OpenCode OMO 最强增强器

---

## 0. 核心理念

Superflow 是 **OpenCode OMO（OpenCode Multi-Agent Orchestration）最强增强器**。

解决长程任务的三大问题：
| 问题 | 解决方案 |
|------|----------|
| **模糊** | 四阶段门禁，每阶段产出明确 |
| **幻觉** | Spec 是真理源，代码必须符合规范 |
| **成功率低** | TDD + Challenge 审查 + 用户验收 |

---

## 1. 快速开始

```bash
# 阶段 1: 澄清 - 一句话需求变清晰
/superflow:clarify "我想添加用户登录功能"

# 阶段 2: 计划 - Spec 定稿 + 任务分解
/superflow:plan user-login

# 阶段 3: 执行 - TDD + 逐项验证
/superflow:execute user-login

# 阶段 4: 验证 - Challenge + 用户验收
/superflow:verify user-login
```

---

## 2. OpenCode OMO Native

Superflow 只使用 OpenCode 内置能力：

| 能力 | 用途 |
|------|------|
| `explore` agent | 并行调研、代码库探索 |
| `librarian` agent | 外部文档、最佳实践查找 |
| `task(category=)` | 任务委托、并行执行 |
| `gstack` | 浏览器自动化验证 |
| `TodoWrite` | 任务跟踪 |
| `lsp_diagnostics` | 代码质量验证 |

**无外部依赖。** 不引用 superpowers 或其他技能库。

---

## 3. 四阶段定义

### 阶段 1: Clarify（澄清）

**解决的问题**: 需求模糊、不完整

```
并行调研 (explore + librarian)
    ↓
渐进式澄清（一次一个问题）
    ↓
方案对比（2-3 个选项）
    ↓
Spec 草稿 → 用户批准
```

**产出**:
- `openspec/changes/<name>/spec.md`
- `openspec/changes/<name>/context.md`
- `openspec/changes/<name>/options.md`

---

### 阶段 2: Plan（计划）

**解决的问题**: 任务不清、无从下手

```
Spec 定稿
    ↓
任务分解（每项 2-5 分钟）
    ↓
验证方式规划（TDD/快照/gstack）
    ↓
任务清单 → 用户批准
```

**产出**:
- `openspec/specs/<domain>/<name>.md` — 规范真理源
- `openspec/changes/<name>/tasks.md` — 任务清单

---

### 阶段 3: Execute（执行）

**解决的问题**: 实现混乱、质量不可控

```
Git 隔离 (feature/<name>)
    ↓
逐项执行 (TodoWrite 追踪)
    ↓
TDD 循环 (RED → GREEN → REFACTOR)
    ↓
即时验证 (lsp_diagnostics + 测试)
    ↓
提交 → 下一任务
```

**门禁**: 所有测试通过 + lsp_diagnostics 无 error

---

### 阶段 4: Verify（验证）

**解决的问题**: 幻觉、实现与 Spec 不符

```
Spec 验收（逐条检查）
    ↓
本地 Challenge 审查
    ↓
E2E 验证（gstack，如有问题 UI）
    ↓
独立 Challenge（新 OpenCode 进程）
    ↓
用户验收（回复 "OK"）
    ↓
归档 + 分支完成
```

---

## 4. 目录结构

```
openspec/
├── specs/
│   └── <domain>/              # 领域规范
│       └── <name>.md         # Spec 真理源
└── changes/
    ├── <name>/               # 进行中
    │   ├── spec.md           # Spec 草稿
    │   ├── context.md        # 调研上下文
    │   ├── options.md        # 方案对比
    │   └── tasks.md          # 任务清单
    └── archive/              # 已完成
        └── YYYY-MM-DD-<name>/
            ├── spec.md
            ├── tasks.md
            ├── challenge-report.md
            └── evidence/
```

---

## 5. TDD 规范

```
RED     → 写一个失败的测试
GREEN   → 写最简代码让测试通过
REFACTOR → 重构代码，保持测试通过
```

**验证命令**:
```bash
npm test <path>   # 应失败 (RED) → 应通过 (GREEN) → 应通过 (REFACTOR)
```

---

## 6. Challenge 审查

### 本地 Challenge

- lsp_diagnostics 无 error
- Spec 合规性
- 安全检查

### 独立 Challenge

启动新 OpenCode 进程，传入 Spec + 代码变更，进行对抗性验证。

---

## 7. 版本历史

| 版本 | 日期 | 变更 |
|------|------|------|
| 0.1 | 2026-03-22 | 初始版本（跨平台工作流框架） |
| 0.2 | 2026-03-22 | 重写为 OpenCode OMO 最强增强器 |
