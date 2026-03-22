# 贡献指南

欢迎为 Superflow 项目做出贡献！

## 项目理念

Superflow 使用**自己的四阶段工作流**构建（吃狗粮），遵循**Spec 驱动开发 (SDD)**。

在贡献之前，请阅读：
- [OpenSpec 使用说明](./openspec/README.md)
- [GitHub 规范 v0.1](./openspec/specs/superflow/github-norm-v0.1.md)
- [工作流规范 v0.1](./openspec/specs/superflow/workflow-v0.1.md)

## 开发环境设置

```bash
# 克隆仓库
git clone https://github.com/raganor/raganor-superflow.git
cd raganor-superflow

# 安装依赖
npm install

# 运行测试
npm test

# 安装到本地测试
npm run install:claude-code
```

## 贡献流程

### 使用 Superflow 工作流贡献

我们推荐使用 Superflow 工作流进行贡献：

```bash
# 1. 发起变更（阶段 1: 脑暴）
/superflow:brainstorm 添加新功能

# 2. 生成计划（阶段 2: 计划）
/superflow:plan <变更名称>

# 3. 执行实现（阶段 3: 执行）
/superflow:execute <变更名称>

# 4. 归档（阶段 4: 归档）
/superflow:archive <变更名称>
```

### 传统方式贡献

如果不使用 Superflow 工作流，请确保：
1. 在 `docs/plans/` 创建设计文档
2. 遵循四阶段门禁精神（先设计，再实现，有审查）

## 提交指南

### 分支命名

- `main` - 主分支
- `feature/<name>` - 新功能
- `fix/<name>` - Bug 修复
- `docs/<name>` - 文档更新
- `chore/<name>` - 构建/工具配置

### 提交信息格式

```
<type>: <subject>

<body>

<footer>
```

**type 类型**：
- `feat`: 新功能
- `fix`: Bug 修复
- `docs`: 文档变更
- `style`: 代码格式
- `refactor`: 重构
- `test`: 测试
- `chore`: 构建/工具

**示例**：
```
feat: 添加新的执行模式

- 支持批次执行任务
- 每批 3 个任务后暂停确认

Closes #123
```

## 测试

运行所有测试：

```bash
npm test
```

## 发布流程

1. 更新 `CHANGELOG.md`
2. 更新 `package.json` 版本号
3. 提交并打 tag
4. GitHub Actions 自动发布到 npm

## 代码风格

项目使用 EditorConfig 保持代码风格一致。请确保你的编辑器支持：

- 2 空格缩进
- LF 换行符
- 文件末尾换行
- 移除行尾空白

### 合规性验证

在提交之前，运行合规性验证：

```bash
node scripts/validate-norm.js
```

这将检查项目是否遵循 Superflow GitHub Norm v0.1。

## 问题反馈

遇到问题？请提交 [Issue](https://github.com/raganor/raganor-superflow/issues)

## 许可证

MIT License
