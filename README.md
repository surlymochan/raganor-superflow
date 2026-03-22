# Superflow - OpenCode OMO 最强增强器

> **解决长程任务模糊、幻觉、成功率低的问题**

[![npm version](https://img.shields.io/npm/v/@raganor/superflow.svg)](https://www.npmjs.com/@raganor/superflow)
![支持平台](https://img.shields.io/badge/platform-OpenCode-blue)

## 定位

Superflow 是 **OpenCode OMO（OpenCode Multi-Agent Orchestration）最强增强器**。

不是另一个工作流框架，而是 OpenCode 能力的**最佳实践组合**。

## 解决的问题

| 问题 | 解决方案 |
|------|----------|
| **需求模糊** | 四阶段门禁，每阶段产出明确 |
| **AI 幻觉** | Spec 是真理源，代码必须符合规范 |
| **成功率低** | TDD + Challenge 审查 + 用户验收 |

## 快速开始

```bash
# 阶段 1: 澄清 - 并行调研 + 需求明确
/superflow:clarify "我想添加用户登录功能"

# 阶段 2: 计划 - Spec 定稿 + 任务分解
/superflow:plan user-login

# 阶段 3: 执行 - TDD + 逐项验证
/superflow:execute user-login

# 阶段 4: 验证 - Challenge + 用户验收
/superflow:verify user-login
```

## 四阶段工作流

```
┌─────────────────────────────────────────────────────────────┐
│  阶段 1: Clarify（澄清）                                    │
│  解决问题: 需求模糊、不完整                                  │
│  产出: Spec 草稿 + 调研上下文 + 方案对比                    │
│  门禁: 用户批准方案                                         │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│  阶段 2: Plan（计划）                                      │
│  解决问题: 任务不清、无从下手                                │
│  产出: Spec 定稿 + 任务清单（每项 2-5 分钟）                 │
│  门禁: 用户批准 Spec + 任务清单                             │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│  阶段 3: Execute（执行）                                    │
│  解决问题: 实现混乱、质量不可控                              │
│  流程: Git 隔离 → TDD → 逐项验证 → 提交                    │
│  门禁: 所有测试通过 + lsp_diagnostics 无 error              │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│  阶段 4: Verify（验证）                                    │
│  解决问题: 幻觉、实现与 Spec 不符                            │
│  流程: Spec 验收 → Challenge 审查 → E2E → 用户验收          │
│  门禁: Challenge 通过 + 用户回复 "OK"                        │
└─────────────────────────────────────────────────────────────┘
```

## OpenCode OMO Native

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

## 核心能力

| 能力 | 说明 |
|------|------|
| **Spec 驱动开发 (SDD)** | Spec 是真理源，代码严格遵循规范 |
| **四阶段门禁** | 每阶段批准后才能继续，防止需求漂移 |
| **TDD** | 测试先行，RED → GREEN → REFACTOR |
| **Challenge 审查** | 本地 + 独立进程双重审查，对抗幻觉 |
| **E2E 验证** | gstack 浏览器自动化（如有 UI） |
| **用户验收** | 用户确认 OK 后才能归档 |

## 安装

```bash
# 克隆仓库
git clone https://github.com/raganor/raganor-superflow.git
cd raganor-superflow

# 安装到 OpenCode
npm run install:opencode
```

## 开发

```bash
# 修改命令定义
vim config/commands/<command>.md

# 重新安装到 OpenCode
npm run install:opencode
```

## 许可证

MIT
