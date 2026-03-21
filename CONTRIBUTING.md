# 贡献指南

欢迎为 Superflow 项目做出贡献！

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

## 问题反馈

遇到问题？请提交 [Issue](https://github.com/raganor/raganor-superflow/issues)

## 许可证

MIT License
