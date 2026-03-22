# Superflow 开源初始化变更提案

**变更名称**: superflow-init
**提案日期**: 2026-03-22
**状态**: 草稿（阶段 1 脑暴）

---

## 1. 变更意图

让 Superflow 项目本身遵循其定义的四阶段工作流，同时定义一套**可复用的 GitHub 项目规范**，供后续所有使用 Superflow 工作流的项目遵循。

**核心目标**:
1. **吃狗粮**——Superflow 必须用自己的工作流构建自己
2. **规范即代码**——openspec 由工作流自动引入
3. **定义标准**——基于 opc 参考，定义 Superflow 自己的 GitHub 规范

---

## 2. 变更范围

### 2.1 影响的文件/目录

| 目录 | 变更类型 | 说明 |
|------|----------|------|
| `.github/workflows/` | 新增 6 个工作流 | code-review, qa-adversarial, codeql, labeler, auto-response, stale |
| `openspec/` | 新增目录 | specs/, changes/, archive/ |
| `docs/design/` | 新增目录 | README.md, DOCUMENT-MAP.md |
| `docs/issues/` | 新增目录 | README.md |
| `config/norms/` | 新增目录 | github-norm-v0.1.md |
| `config/commands/` | 修改 4 个命令 | 自动引入 openspec |
| `.eslintrc.js` | 新增 | ESLint 配置 |
| `tsconfig.json` | 新增 | TypeScript 配置 |
| `CONTRIBUTING.md` | 完善 | 贡献指南 |

### 2.2 更新的规范

| 规范文件 | 更新内容 |
|----------|----------|
| `openspec/specs/superflow/github-norm-v0.1.md` | 新建：GitHub 项目规范标准 |
| `openspec/specs/superflow/workflow-v0.1.md` | 新建：Superflow 工作流规范 |

---

## 3. 必要性论证

### 3.1 为什么要做这个变更？

**当前状态**:
- Superflow 有 4 个阶段命令定义，但项目本身没有遵循
- 缺少 openspec 目录，SDD 无法落地
- 只有 2 个 GitHub 工作流（CI/Publish），缺少质量门禁

**风险**:
- 如果不"吃狗粮"，无法验证工作流的可行性
- 如果没有规范，后续项目无法复用
- 如果质量门禁不足，代码质量无法保证

### 3.2 不做的后果

- Superflow 沦为"配置模板"，而非"完整项目"
- 无法证明四阶段工作流的有效性
- 用户无法信任 Superflow 的质量

---

## 4. 技术方案

### 4.1 阶段 1：脑暴（当前阶段）

**产出**:
- [x] `docs/plans/2026-03-22-superflow-init-design.md` - 设计文档
- [x] `openspec/changes/superflow-init/proposal.md` - 本提案
- [ ] 用户批准

### 4.2 阶段 2：计划

**产出**:
- [ ] `openspec/specs/superflow/github-norm-v0.1.md` - GitHub 规范
- [ ] `openspec/specs/superflow/workflow-v0.1.md` - 工作流规范
- [ ] `docs/plans/2026-03-22-superflow-init-plan.md` - 任务清单
- [ ] 用户批准 + 执行模式选择

### 4.3 阶段 3：执行

**任务分解**（共 20 项，每项 2-5 分钟）:
- [ ] 任务 1: 创建 openspec 目录结构
- [ ] 任务 2-10: 创建 8 个 GitHub 工作流
- [ ] 任务 11-14: 更新 4 个阶段命令（自动引入 openspec）
- [ ] 任务 15-17: 创建设计文档和 Issues 说明
- [ ] 任务 18-20: 完善配置文件（eslint, tsconfig, CONTRIBUTING）

**执行模式**: 推荐模式 A（子代理驱动）

### 4.4 阶段 4：归档

**门禁**:
- [ ] Challenge 审查（本地 + OpenCode 双审查）
- [ ] 用户验收确认
- [ ] 归档到 `openspec/changes/archive/`

---

## 5. 成功标准

| 标准 | 验证方式 |
|------|----------|
| openspec 目录存在且结构正确 | `test -d openspec/specs/superflow/` |
| GitHub 工作流完整（8 个） | `ls .github/workflows/ | wc -l` = 8 |
| 规范文档存在 | `test -f openspec/specs/superflow/github-norm-v0.1.md` |
| 安装脚本正常 | `npm run install:all` 无错误 |
| 四阶段工作流跑通 | 完成阶段 4 归档 |

---

## 6. 决策记录

### 6.1 方案选择

**决策**: 采用"方案 B+C 混合"
- 以 opc 的 GitHub 规范为基线（8 个工作流）
- 用 Superflow 工作流实现（吃狗粮）
- openspec 由工作流自动引入（规范即代码）

**理由**:
- 避免重复造轮子（opc 已验证）
- 真正验证 Superflow 工作流
- 规范清晰，后续项目可复用

### 6.2 发现的 workflow 不合理处

| 问题 | 修正建议 |
|------|----------|
| 循环依赖（用工作流构建工作流） | 分"引导阶段"和"自举阶段" |
| openspec 目录引入时机 | 修改 brainstorm.md 自动创建 |
| 跨平台配置同步 | 安装脚本增加配置校验 |

---

## 7. 风险与缓解

| 风险 | 可能性 | 影响 | 缓解措施 |
|------|--------|------|----------|
| 工作流本身有 bug | 中 | 高 | 阶段 3 执行时发现并修正 |
| openspec 结构不合理 | 低 | 中 | 阶段 4 Challenge 审查验证 |
| 跨平台同步失败 | 中 | 中 | 安装脚本增加错误处理 |

---

## 8. 等待批准

**阶段 1 完成，等待用户批准。**

批准后进入阶段 2：`/superflow:plan superflow-init`

---

## 附录：相关文件

- [设计文档](../../../docs/plans/2026-03-22-superflow-init-design.md)
- [GitHub 规范 v0.1 草案](../../../openspec/specs/superflow/github-norm-v0.1.md)（阶段 2 输出）
