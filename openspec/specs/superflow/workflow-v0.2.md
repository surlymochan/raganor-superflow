# Superflow 工作流规范 v0.2

**版本**: 0.2
**生效日期**: 2026-03-22
**性质**: OpenCode OMO 最强增强器 — 解决长程任务模糊、幻觉、成功率低

---

## 0. 设计原则

### 0.1 核心目标

| 问题 | 解决方案 |
|------|----------|
| **模糊** | 四阶段门禁，每阶段产出明确 |
| **幻觉** | Spec 是真理源，代码必须符合规范 |
| **成功率低** | TDD + Challenge 审查 + 用户验收 |

### 0.2 OpenCode OMO Native

Superflow 只使用 OpenCode 内置能力，不引入外部依赖：

| 能力 | 用于 |
|------|------|
| `explore` agent | 并行调研、代码库探索 |
| `librarian` agent | 外部文档、最佳实践查找 |
| `task(category=)` | 任务委托、并行执行 |
| `gstack` | 浏览器自动化验证 |
| `TodoWrite` | 任务跟踪 |
| `lsp_diagnostics` | 代码质量验证 |

### 0.3 与 Superpowers 的关系

**完全解耦。** Superflow 不引用任何 superpowers 技能。Superflow 自己实现：
- TDD（测试驱动开发）
- Challenge（对抗性审查）
- 分支完成流程

---

## 1. 四阶段定义

### 阶段 1：Clarify（澄清）

**命令**: `/superflow:clarify <一句话需求>`

**解决的问题**: 需求模糊、不完整

**职责**:
1. **并行调研** — 启动 `explore` + `librarian` 了解上下文
2. **渐进澄清** — 一次一个问题，理解目的、约束、成功标准
3. **方案对比** — 提出 2-3 个方案，优缺点明确
4. **Spec 草稿** — 创建 `openspec/changes/<name>/spec.md`

**门禁**: 用户批准方案 + 确认 Spec 草稿

**输出**:
```
openspec/changes/<name>/
├── spec.md          # Spec 真理源（需用户批准）
├── context.md       # 调研结果（explore + librarian）
└── options.md       # 方案对比
```

---

### 阶段 2：Plan（计划）

**命令**: `/superflow:plan <name>`

**解决的问题**: 任务不清、无从下手

**职责**:
1. **Spec 定稿** — 完善 `openspec/specs/<domain>/<name>.md`
2. **任务分解** — 每项 2-5 分钟，可独立执行
3. **依赖分析** — 明确任务间的依赖关系
4. **验证规划** — 每项任务的验证方式（TDD / 快照 / gstack）

**门禁**: 用户批准 Spec + 任务清单

**输出**:
```
openspec/specs/<domain>/<name>.md    # 规范真理源
openspec/changes/<name>/
├── spec.md                          # 更新的 Spec
└── tasks.md                        # 任务清单
```

**任务模板**:
```markdown
### Task N: <任务名称>

**验证方式**: [TDD/快照/gstack/手动]
**依赖**: [Task N 或无]
**Spec 引用**: [Spec 中哪条]

- [ ] 步骤 1
- [ ] 步骤 2
- [ ] 验证
```

---

### 阶段 3：Execute（执行）

**命令**: `/superflow:execute <name>`

**解决的问题**: 实现混乱、质量不可控

**职责**:
1. **Git 隔离** — `git checkout -b feature/<name>`
2. **逐项执行** — TodoWrite 追踪，逐任务完成
3. **TDD 循环** — RED → GREEN → REFACTOR
4. **即时验证** — 每任务后运行诊断 + 测试

**执行流程**:
```
TodoWrite 创建所有任务
    ↓
遍历每项任务:
    ├→ 标记 in_progress
    ├→ 执行 (TDD 或 指定验证方式)
    ├→ lsp_diagnostics 验证
    ├→ git commit
    └→ 标记 completed
    ↓
所有任务完成 → 进入阶段 4
```

**门禁**: 所有测试通过 + lsp_diagnostics 无 error

**输出**:
```
git commit 历史（含每任务提交）
测试覆盖率报告
```

---

### 阶段 4：Verify（验证）

**命令**: `/superflow:verify <name>`

**解决的问题**: 幻觉、实现与 Spec 不符

**职责**:
1. **Spec 验收** — 逐条检查 Spec 是否满足
2. **Challenge 审查** — 本地 + 独立进程双重审查
3. **E2E 验证** — gstack 浏览器自动化（如有 UI）
4. **用户验收** — 呈现完整验收材料

**Challenge 审查内容**:
- Spec 合规性（实现是否满足每条 Spec）
- 代码质量（SOLID、命名、复杂度）
- 安全风险（注入、暴露敏感数据等）
- 测试覆盖（核心路径是否有测试）

**门禁**: Challenge 通过 + 用户回复 "OK"

**输出**:
```
openspec/changes/archive/
└── YYYY-MM-DD-<name>/
    ├── spec.md              # 最终 Spec
    ├── tasks.md             # 执行记录
    ├── challenge-report.md   # Challenge 结果
    └── evidence/            # 截图、测试报告
```

---

## 2. 命令文件

### 2.1 位置

```
config/commands/
├── clarify.md    # 阶段 1: 澄清
├── plan.md       # 阶段 2: 计划
├── execute.md    # 阶段 3: 执行
└── verify.md     # 阶段 4: 验证（重命名 archive → verify）
```

### 2.2 OpenCode 安装

```bash
# 安装到 OpenCode
npm run install:opencode
# 复制到 ~/.opencode/commands/superflow/
```

---

## 3. 目录结构

```
openspec/
├── specs/
│   └── <domain>/           # 领域规范
│       └── <name>.md      # Spec 真理源
└── changes/
    ├── <name>/            # 进行中
    │   ├── spec.md        # Spec 草稿
    │   ├── context.md     # 调研上下文
    │   ├── options.md     # 方案对比
    │   └── tasks.md       # 任务清单
    └── archive/           # 已完成
        └── YYYY-MM-DD-<name>/
```

---

## 4. TDD 规范

### 4.1 循环

```
RED     → 写一个失败的测试
GREEN   → 写最简代码让测试通过
REFACTOR → 重构代码，保持测试通过
```

### 4.2 验证命令

```bash
# RED: 确认测试失败
npm test <path>  # 应失败

# GREEN: 确认测试通过
npm test <path>  # 应通过

# REFACTOR: 确认重构后测试仍通过
npm test <path>  # 应通过
```

---

## 5. Challenge 审查规范

### 5.1 本地 Challenge

使用 `lsp_diagnostics` + 代码审查：
- 无 error（warning 可接受）
- 无明显代码异味
- 测试覆盖核心路径

### 5.2 独立 Challenge

启动新 OpenCode 进程，传入：
- Spec 文件路径
- 代码变更
- 审查清单

**审查清单**:
```
□ 实现是否满足 Spec 每条？
□ 是否有未测试的核心路径？
□ 是否有安全风险？
□ 命名是否清晰？
□ 是否有明显复杂度问题？
```

---

## 6. 分支管理

### 6.1 分支命名

```
feature/<name>     # 功能开发
bugfix/<name>     # Bug 修复
hotfix/<name>     # 紧急修复
```

### 6.2 完成流程

```
verify 通过 + 用户验收
    ↓
git checkout main
git merge feature/<name>
git branch -d feature/<name>
git push
    ↓
归档到 openspec/changes/archive/
```

---

## 7. 版本历史

| 版本 | 日期 | 变更 |
|------|------|------|
| 0.1 | 2026-03-22 | 初始版本（跨平台工作流框架） |
| 0.2 | 2026-03-22 | 重写为 OpenCode OMO 最强增强器 |

---

## 8. 批准记录

- [ ] 阶段 1 Clarify 完成
- [ ] 阶段 2 Plan 完成
- [ ] 阶段 3 Execute 完成
- [ ] 阶段 4 Verify 完成（Challenge 通过 + 用户验收）
