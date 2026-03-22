---
name: superflow:verify
description: Superflow 阶段 4: 验证 - Challenge 审查 + 用户验收
---

# Superflow 阶段 4：Verify（验证）

**命令**: `/superflow:verify <name>`

**解决的问题**: 幻觉、实现与 Spec 不符

## 前置条件

- 阶段 3 Execute 已完成
- 所有测试通过
- lsp_diagnostics 无 error

## 流程

### 1. Spec 验收

逐条检查 Spec 满足情况：

```markdown
## Spec 验收清单

### [Spec 条目 1]
- [ ] 实现满足此条
- [ ] 测试覆盖

### [Spec 条目 2]
- [ ] 实现满足此条
- [ ] 测试覆盖
```

### 2. 本地 Challenge 审查

#### 2.1 代码质量检查

```bash
lsp_diagnostics .  # 无 error
```

#### 2.2 Spec 合规性检查

- [ ] 实现是否满足 Spec 每条？
- [ ] 是否有范围蔓延？
- [ ] 是否有未测试的功能？

#### 2.3 安全检查

- [ ] 无注入风险（SQL/命令）
- [ ] 无敏感数据暴露
- [ ] 输入验证完整

### 3. E2E 验证（如有 UI）

使用 gstack 进行浏览器自动化验证：

```bash
# 启动应用
npm run dev &

# gstack 验证流程
$BROWSER goto http://localhost:3000
$BROWSER snapshot -i
$BROWSER fill @e3 "test input"
$BROWSER click @e5
$BROWSER screenshot /tmp/verify.png
```

### 4. 独立 Challenge（对抗性验证）

启动新的 OpenCode 进程进行独立审查：

```
启动 opencode - 在新进程中
  ↓
传入：Spec 文件路径 + 代码变更
  ↓
审查清单：
  □ 实现是否满足 Spec 每条？
  □ 是否有未测试的核心路径？
  □ 是否有安全风险？
  □ 命名是否清晰？
  □ 是否有明显复杂度问题？
  ↓
生成 Challenge 报告
```

### 5. 呈现验收材料

```markdown
## 验收材料：<name>

### Spec 满足情况
[逐条检查结果]

### 测试证据
- 测试覆盖率：X%
- [测试截图]

### Challenge 结果
- 本地 Challenge：通过
- 独立 Challenge：通过

### E2E 验证（如有）
- [gstack 截图]

### 分支状态
- feature/<name>: 已完成
- 提交数: N
```

### 6. 用户验收

等待用户回复 "OK" 确认。

## 门禁

- Challenge 审查通过
- 用户回复 "OK"

## 归档操作

用户验收后：

```bash
# 1. 创建归档目录
mkdir -p openspec/changes/archive/YYYY-MM-DD-<name>/

# 2. 移动文件
mv openspec/changes/<name>/* openspec/changes/archive/YYYY-MM-DD-<name>/

# 3. 完成分支
git checkout main
git merge feature/<name>
git branch -d feature/<name>
git push

# 4. 清理
rmdir openspec/changes/<name> 2>/dev/null || true
```

## 产出

```
openspec/changes/archive/
└── YYYY-MM-DD-<name>/
    ├── spec.md              # 最终 Spec
    ├── tasks.md             # 执行记录
    ├── challenge-report.md   # Challenge 结果
    └── evidence/            # 截图、测试报告
```

## 完成

```bash
echo "✅ Superflow 完成: <name>"
echo "归档位置: openspec/changes/archive/YYYY-MM-DD-<name>/"
```
