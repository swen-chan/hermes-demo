# 03 — Hermes 搭建指南

> 从零到跑通，面向技术/非技术混合受众。可独立分发。

---

## 1. 前置条件：选一条路径

### 路径 A：有 Coding Agent 经验

你用过 Claude Code / Codex / Cursor / OpenCode 之类能写代码、跑命令的 Agent。你能打开终端、知道什么是 API key。

**你只需要：**
- macOS 或 Windows（WSL）
- 网络能访问 GitHub 和 API 服务

→ 直接跳到第 2 步「安装」。

### 路径 B：只有通用 Agent（ChatGPT / Gemini / 豆包 等）

你用过 ChatGPT 聊天，但没跑过命令行、没配过开发环境。

**macOS 用户：**
1. 按 `Cmd + 空格`，输入 `Terminal`，回车——这就是终端，所有命令塞这里
2. 安装 Homebrew（包管理器）：复制下面这行到终端，回车

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

3. 装完后再装 Python 和 Git：

```bash
brew install python git
```

4. 确认装好了：

```bash
python3 --version
git --version
```

两条命令都应该输出版本号，不报错。

**Windows 用户：**
1. 按 `Win`，搜 `PowerShell`，右键「以管理员身份运行」
2. 装 Python：去 https://www.python.org/downloads/ 下载安装包，安装时 **勾选「Add Python to PATH」**
3. 装 Git：去 https://git-scm.com/download/win 下载安装包，一路默认
4. 确认装好：

```powershell
python --version
git --version
```

两条都应该输出版本号。

> 💡 Windows 用户强烈建议用 WSL（Windows Subsystem for Linux）。在 PowerShell 跑 `wsl --install`，然后所有后续命令在 WSL 终端里跑，不容易遇到路径/权限问题。

---

## 2. 安装 Hermes

打开终端，一行命令：

```bash
curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash
```

等它跑完，关掉终端重新打开，验证：

```bash
hermes --version
```

输出类似 `v0.14.0` 就装好了。

如果提示 `command not found`：关掉终端重新打开，或者跑 `source ~/.bashrc`（macOS: `source ~/.zshrc`）。

---

## 3. 配置模型

Hermes 支持 20+ 模型提供商。最简单的入门方式是用 **OpenRouter**（一个 API 聚合平台，免费额度够试用）。

### 3.1 获取 API Key
1. 打开 https://openrouter.ai/keys
2. 注册/登录，创建一个 API key，复制

### 3.2 配置到 Hermes

运行配置向导：

```bash
hermes setup
```

选择：
- Provider: **OpenRouter**
- 输入刚才复制的 API key
- Model: 推荐 `anthropic/claude-sonnet-4` 或 `google/gemini-2.5-flash`（性价比高）

或者手写配置：

```bash
# 写入 API key
echo "OPENROUTER_API_KEY=你的key" >> ~/.hermes/.env

# 选模型
hermes model
```

> 💡 其他常用提供商：Anthropic（直接）、DeepSeek（便宜）、OpenAI Codex。完整列表见：https://hermes-agent.nousresearch.com/docs/integrations/providers

---

## 4. 定义 SOUL 和 AGENTS：让 Agent 按你的规则办事

这是 Hermes 和普通聊天工具的核心区别——你用两个 markdown 文件告诉它"你是谁、怎么做事"。

### 4.1 最小 SOUL.md

创建 `~/Desktop/Hermes-Demo/SOUL.md`（或任何你放项目的地方）：

```markdown
## Identity
你是我的个人工作流助手。

## Core Mission
帮我：查资料、写文档、管理项目、处理日常任务。

## Operating Principles
- 重要决定先问我确认
- 不自动发社交媒体
- 保持简洁，说人话
```

> 💡 SOUL.md 定义"人格和底线"——类似给新员工的第一天培训手册。

### 4.2 最小 AGENTS.md

同一个目录下创建 `AGENTS.md`：

```markdown
## Purpose
这份文件定义 Hermes 在这个项目里的操作规则。

## Operating Hierarchy
1. SOUL.md（最高优先级）
2. AGENTS.md
3. 当前任务的上下文文件
4. 用户在对话中的直接指令

## File Safety
- 不删除、不覆盖已有文件，除非我明确说
- 不修改 .env、密码、系统配置
- 危险操作前先说明理由，等我确认
```

> 💡 AGENTS.md 定义"在这个项目里怎么干活"——文件安全、决策流程、任务路由。

这两个文件写好后，在 Hermes 对话里引用即可。Hermes 会在每个 session 启动时读取它们。

---

## 5. 接入 Telegram（可选，推荐）

Hermes 不只是命令行工具，它能接入 Telegram/Discord/Slack 等 10+ 平台。接入后你可以像聊天一样用手机给 Agent 发任务。

```bash
hermes gateway setup
```

选择 Telegram，按提示操作：
1. 去 @BotFather 创建一个 bot，拿到 token
2. 把 token 填进去
3. Gateway 启动后，在 Telegram 里给你的 bot 发消息就能交互

```bash
# 后台运行 gateway
hermes gateway install
hermes gateway start

# 检查状态
hermes gateway status
```

> 💡 更多平台配置：https://hermes-agent.nousresearch.com/docs/user-guide/messaging/

---

## 6. 第一个任务

确认一切正常：

```bash
hermes
```

进入交互模式后，试试你的第一个任务：

```
帮我在桌面创建一个 hello.txt，内容写 "Hello from Hermes Agent"。
带备注解释每一步操作，确认后再执行。
```

如果它先问你是否确认、然后创建文件——说明 SOUL/AGENTS 生效了。

---

## 7. 常见坑

| 问题 | 解决 |
|---|---|
| `hermes: command not found` | 重开终端，或跑 `source ~/.bashrc`（macOS: `source ~/.zshrc`）|
| 模型调不通 / 超时 | `hermes doctor` 检查配置；检查 API key 是否正确写入 `.env` |
| Gateway 连不上 | `grep error ~/.hermes/logs/gateway.log` 看日志 |
| 改了配置不生效 | Gateway: `/restart`；CLI: 退出重进 |
| 权限报错 | Hermes 默认对你的文件系统有读写权限——用 AGENTS.md 限制范围 |
| pip 安装慢 | 换清华源: `pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple` |

---

## 延伸阅读

- Hermes 官方文档：https://hermes-agent.nousresearch.com/docs/
- GitHub：https://github.com/NousResearch/hermes-agent
- 这篇分享的完整源码：`~/Desktop/Hermes-Demo/`
- 我的 Twitter/X：[@swen_chan](https://x.com/swen_chan)（Agent 搭建 / 商业化 / 创业思考）