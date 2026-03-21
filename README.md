# Superflow - 跨平台超级工作流

> **SDD + 一句话需求 + TDD + 对抗性验证的长程模糊任务最佳帮手！**

[![npm version](https://img.shields.io/npm/v/@raganor/superflow.svg)](https://www.npmjs.com/package/@raganor/superflow)
![支持平台](https://img.shields.io/badge/platforms-Claude%20Code%20%7C%20OpenCode%20%7C%20Cursor-blue)

## 快速开始

### 1. 全局安装（一次安装，所有项目可用）

```bash
# 克隆仓库
git clone https://github.com/raganor/raganor-superflow.git
cd raganor-superflow

# 安装到所有平台
npm run install:all

# 或单独安装到特定平台
npm run install:claude-code   # Claude Code
npm run install:opencode      # OpenCode
npm run install:cursor        # Cursor
```

### 2. 在任何项目中使用

```bash
# 阶段 1: 脑暴 - 一句话需求变清晰
/superflow:brainstorm "我想做一个用户登录功能"

# 阶段 2: 计划 - 生成可执行任务清单
/superflow:plan user-login

# 阶段 3: 执行 - TDD + 自动审查
/superflow:execute user-login

# 阶段 4: 归档 - 对抗性验证 + 归档
/superflow:archive user-login
```

## 核心能力

| 能力 | 说明 |
|------|------|
| **SDD (Spec-Driven Development)** | Spec 是真理源，代码严格遵循规范 |
| **四阶段门禁** | 每阶段批准后才能继续 |
| **Challenge 审查** | 本地 + OpenCode 双审查（干净上下文） |
| **E2E 验证** | 自动化测试 + 浏览器自动化 (gstack) |
| **用户验收** | 用户确认 OK 后才能归档 |

## 工作流程

```
┌─────────────────────────────────────────────────────────────┐
│  阶段 1: 脑暴 (Brainstorming)                               │
│  输入：一句话需求                                           │
│  输出：设计文档 + Spec 草稿                                 │
│  门禁：用户批准                                             │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│  阶段 2: 计划 (Writing Plans)                               │
│  输入：批准的设计                                           │
│  输出：Spec 定稿 + 任务清单（每项 2-5 分钟）                   │
│  门禁：用户批准 + 执行模式选择                              │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│  阶段 3: 执行 (Execute)                                     │
│  输入：批准的任务清单                                       │
│  流程：Git 隔离 → TDD → Challenge → E2E → 浏览器验证           │
│  产出：可工作的代码 + 测试通过                              │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│  阶段 4: 归档 (Archive)                                     │
│  输入：完成的实现                                           │
│  流程：Challenge 审查 (本地+OpenCode) → 用户验收 → 归档         │
│  产出：归档文档 + Spec 更新 + 分支处理                        │
└─────────────────────────────────────────────────────────────┘
```

## 执行模式

### 模式 A：当前会话执行（推荐）

```bash
/superflow:execute user-login --mode=A
```

- ✅ 任务独立、快速迭代
- ✅ 每项任务自动审查
- ✅ 无需切换会话

### 模式 B：并行会话执行

```bash
/superflow:execute user-login --mode=B
```

- ✅ 需要人工检查点
- ✅ 批次执行（每批 3 任务）
- ✅ 干净上下文

## 平台支持

| 平台 | 命令位置 | 技能位置 |
|------|---------|---------|
| Claude Code | `~/.claude/commands/superflow/` | `~/.claude/skills/superflow/` |
| OpenCode | `~/.opencode/commands/superflow/` | `~/.opencode/skills/superflow/` |
| Cursor | `~/.cursor/commands/superflow/` | `~/.cursor/skills/superflow/` |

## 配置文件

所有命令定义集中存储在 `config/commands/` 目录：

```
config/commands/
├── brainstorm.md    # 阶段 1: 脑暴
├── plan.md          # 阶段 2: 计划
├── execute.md       # 阶段 3: 执行
└── archive.md       # 阶段 4: 归档
```

安装脚本会将这些文件复制到各个平台的配置目录。

## 开发

```bash
# 修改命令定义
vim config/commands/execute.md

# 重新安装到所有平台
npm run install:all
```

## 许可证

MIT

## 相关链接

- [GitHub 仓库](https://github.com/raganor/raganor-superflow)
- [NPM 包](https://www.npmjs.com/package/@raganor/superflow)
