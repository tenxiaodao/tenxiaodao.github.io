---
title: GitHub Actions 使用指南：从入门到实战
date: 2026-06-13 16:30:00
updated: 2026-06-13 16:30:00
tags:
  - GitHub Actions
  - CI/CD
  - 自动化部署
  - Hexo
categories: DevOps
series: CI/CD 系列
cover: https://bu.dusays.com/2025/10/22/68f8a07866ac7.webp
aside: false
sticky: false
permalink: /github-actions-guide/
slug: github-actions-guide
---

# GitHub Actions 使用指南：从入门到实战

## 什么是 GitHub Actions

GitHub Actions 是 GitHub 自带的自动化工作流平台。你可以把它理解成 **GitHub 仓库自带的免费服务器**，每次有人推送代码、提 Issue、创建 PR……都可以触发它执行一系列任务。

对于个人开发者来说，最常见的用法就是 **自动化部署**，也就是 CI/CD。但它的能力远不止于此——编译代码、运行测试、发送通知、定时任务，只要是能写脚本完成的事，它都能干。

## 核心概念

一个 GitHub Actions 工作流由几个层级组成：

```
Workflow（工作流）          ← 一个 .yml 文件
  └─ Jobs（作业）           ← 可以并行或串行
       └─ Steps（步骤）     ← 按顺序执行
            └─ Actions（动作） ← 可复用的公共模块
```

### Workflow（工作流）

工作流就是一个 YAML 文件，放在仓库的 `.github/workflows/` 目录下。一个仓库可以有多个工作流文件，分别处理不同的事情。

### Events（触发器）

工作流靠事件来触发。最常用的是 `push`：

```yaml
on:
  push:
    branches: [master]
```

其他常见事件：
- `pull_request` — 有人提交 PR 时触发
- `schedule` — 定时触发（cron 表达式）
- `workflow_dispatch` — 手动在 GitHub 页面上点击运行
- `issue_comment` — 有人评论 Issue 时触发
- `release` — 发布 Release 时触发

### Jobs（作业）

一个工作流可以包含多个 job，默认是并行执行的。如果 job B 依赖 job A 的结果，可以用 `needs` 来控制顺序：

```yaml
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - run: npm test

  deploy:
    needs: test          # 等 test 跑完才执行
    runs-on: ubuntu-latest
    steps:
      - run: npm run build
```

### Steps（步骤）

每个 job 由多个 step 组成，按顺序执行。每个 step 可以是一条命令，或者引用一个 Action：

```yaml
steps:
  - name: 拉取代码
    uses: actions/checkout@v4

  - name: 安装依赖
    run: npm install

  - name: 运行测试
    run: npm test
```

### Actions（可复用模块）

Actions 是 GitHub Marketplace 上的公共模块，像搭积木一样拼到工作流里。最常用的几个：

| Action | 用途 |
|---|---|
| `actions/checkout@v4` | 拉取仓库代码 |
| `actions/setup-node@v4` | 安装指定版本 Node.js |
| `actions/setup-python@v5` | 安装指定版本 Python |
| `actions/cache@v4` | 缓存依赖加速构建 |
| `actions/upload-artifact@v4` | 上传构建产物 |
| `peaceiris/actions-gh-pages@v4` | 部署到 GitHub Pages |

## 我的博客工作流拆解

下面是我博客的 GitHub Actions 配置，一步步拆开看：

```yaml
name: Deploy Hexo to GitHub Pages
```

这是工作流的名字，会显示在 Actions 页面上。

```yaml
on:
  push:
    branches: [master]
  workflow_dispatch:
```

触发条件：当 `master` 分支有推送时自动运行，同时支持在页面手动点击触发。

```yaml
permissions:
  contents: write
```

给工作流分配权限，`contents: write` 允许它向仓库推送代码。

```yaml
jobs:
  deploy:
    runs-on: ubuntu-latest
```

定义了一个叫 `deploy` 的作业，运行在最新版 Ubuntu 上。

```yaml
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
```

第一步：把仓库源码拉到虚拟机上。`fetch-depth: 0` 表示拉取完整 Git 历史，某些插件需要用到。

```yaml
      - uses: actions/setup-node@v4
        with:
          node-version: 20
```

第二步：安装 Node.js 20。`setup-node` 会自动处理下载和环境变量。

```yaml
      - name: Install dependencies
        run: npm install

      - name: Generate site
        run: npx hexo generate
```

第三步和第四步：安装依赖、生成静态页面。和你在本地执行的 `npm install && hexo g` 完全一样。

```yaml
      - name: Deploy to GitHub Pages
        run: |
          git clone --depth 1 --branch main https://x-access-token:${{ secrets.GITHUB_TOKEN }}@github.com/tenxiaodao/tenxiaodao.github.io.git deploy
          rm -rf deploy/*
          cp -r public/* deploy/
          cd deploy
          git config user.name 'github-actions[bot]'
          git config user.email 'github-actions[bot]@users.noreply.github.com'
          git add -A
          git commit -m "deploy: ${{ github.sha }}" || exit 0
          git push
```

第五步：部署。先 clone 当前的 `main` 分支（Pages 用的分支），清空后用生成的静态文件替换，提交并推送。

这里的 `${{ secrets.GITHUB_TOKEN }}` 是 GitHub 自动提供的认证令牌，每个工作流运行都会生成一个临时有效的 token，不需要你自己配置。

## 怎么看工作流跑没跑通

推送代码后，打开 GitHub 仓库，点顶部的 **Actions** 标签：

- ✅ 绿色表示成功
- ❌ 红色表示失败，点进去可以看到每一步的日志
- 🟡 黄色表示正在运行

每步的日志会显示命令的输出，如果构建报错，日志里会明确告诉你在哪行出了问题。

## 进阶技巧

### 缓存依赖加速构建

如果你的项目有 `package-lock.json`（或 `yarn.lock`），可以用缓存功能：

```yaml
- uses: actions/setup-node@v4
  with:
    node-version: 20
    cache: npm
```

这样 `node_modules` 会被缓存，后续构建就直接恢复缓存，跳过 `npm install`。**但如果你的项目没有 lockfile，不要加这个选项，会报错。**

### 并行 Job

如果你想在部署前先跑测试，可以拆成两个并行 job：

```yaml
jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - run: npm run lint

  deploy:
    needs: lint
    runs-on: ubuntu-latest
    steps:
      - run: npm run build
```

`needs: lint` 确保 lint 通过了才部署。

### 手动触发

在 workflow 文件里加上 `workflow_dispatch`，就可以在 GitHub 页面手动点按钮触发，适合调试。

### 定时触发

如果需要定时任务（比如每天自动更新某个数据），用 cron 表达式：

```yaml
on:
  schedule:
    - cron: '0 0 * * *'   # 每天 UTC 0 点运行
```

## 写在最后

GitHub Actions 是我用过最顺手的自动化工具之一。它对公开仓库完全免费，语法清晰，生态成熟，而且和 GitHub 深度集成，不需要额外配置任何东西。

从一个最简单的自动部署开始，你可以慢慢扩展它的用途——自动检查文章链接是否失效、自动压缩图片、自动同步到其他平台……只要你能想到的自动化任务，它几乎都能做。

你的第一个工作流跑通了吗？
