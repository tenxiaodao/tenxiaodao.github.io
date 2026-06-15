---
layout: hexo
title: 使用 Hexo + GitHub Pages 搭建个人网站
date: 2024-09-03 05:22:18
cover: https://bu.dusays.com/2025/10/18/68f395b02b646.webp
categories: Hexo
series: Hexo 系列
permalink: /shi-yong-hexo-github-pages-da-jian-ge-ren-wang-zhan/
slug: shi-yong-hexo-github-pages-da-jian-ge-ren-wang-zhan
tags:
  - Hexo
  - GitHub Pages
  - 个人博客
---

# Hexo + GitHub Pages：从零搭建个人网站（精简、实用）

本文为实操指南，按步骤说明在本地使用 Hexo 构建并部署到 GitHub Pages 的全过程，适合 Windows / Linux 用户快速上手。

---

## 0. 准备（先决条件）
- 已注册 GitHub 账号。  
- 本地安装：Git、Node.js（推荐 LTS）、npm。  
- 建议在命令行使用 Git Bash（Windows）或终端（Linux/macOS）。  
- 注意：项目目录路径尽量不要含中文或空格。

---

## 1. 安装必要工具

### 安装 Git
Windows：从 https://git-scm.com/ 下载并安装（安装后建议使用 Git Bash）。  
Linux：
```bash
sudo apt-get update
sudo apt-get install -y git
```

### 安装 Node.js / npm
访问 https://nodejs.org/ 下载 LTS 版本，或在 Linux 使用包管理器安装：
```bash
sudo apt-get install -y nodejs npm
```

---

## 2. 安装 Hexo 并初始化站点
在目标目录创建站点并初始化：
```bash
# 全局安装 hexo-cli（仅需一次）
npm install -g hexo-cli

# 创建站点目录并初始化
mkdir myBlog && cd myBlog
hexo init
npm install
```
常见目录说明：
- source：文章与页面源文件  
- themes：主题  
- public：Hexo 生成的静态站点（部署到 GitHub Pages）  
- _config.yml：全局配置文件

---

## 3. 本地调试（常用命令）
```bash
hexo clean            # 清理缓存
hexo g                # 生成静态文件
hexo s                # 启动本地服务器（http://localhost:4000）
# 或合并执行
hexo clean && hexo g && hexo s
```

---

## 4. 更换 / 安装主题（以 Fluid 为例）
安装主题并关联：
```bash
npm install --save hexo-theme-fluid
# 将主题配置复制到 _config.fluid.yml（参考主题文档）
```
在主配置文件 `_config.yml` 指定主题：
```yaml
theme: fluid
language: zh-CN
```
创建关于页面示例：
```bash
hexo new page about
# 编辑 source/about/index.md，添加 layout: about
```

---

## 5. 配置 GitHub Pages（部署）

### 5.1 在 GitHub 创建仓库
- 仓库名必须为 `你的用户名.github.io`（Public）。  
- 不建议勾选自动创建 README（避免后续推送冲突）。

### 5.2 本地配置 Git 用户信息与 SSH（推荐 SSH）
```bash
git config --global user.name "你的用户名"
git config --global user.email "你的邮箱"
ssh-keygen -t rsa -C "你的邮箱"   # 一路回车生成
# 将 ~/.ssh/id_rsa.pub 内容复制到 GitHub -> Settings -> SSH and GPG keys
ssh -T git@github.com            # 测试
```

### 5.3 配置 Hexo deploy（_config.yml）
在 `_config.yml` 添加或修改 deploy 段：
```yaml
deploy:
  type: git
  repo: git@github.com:你的用户名/你的用户名.github.io.git
  branch: main   # 或 gh-pages，按仓库设置
```
安装部署插件：
```bash
npm install hexo-deployer-git --save
```

### 5.4 生成并部署
```bash
hexo clean && hexo g && hexo d
```
部署成功后访问：https://你的用户名.github.io

---

## 6. 常见问题与解决
- 推送失败（SSH 端口被拦截）：可改用 HTTPS 地址（repo: https://github.com/用户名/仓库.git）或配置 SSH 使用 443 端口。  
- 本地生成后页面不更新：尝试 hexo clean && hexo g 再 hexo d。  
- 主题配置未生效：检查是否把主题特定配置复制到对应的主题配置文件（如 _config.fluid.yml）。

---

## 7. 小技巧与建议
- 开发时使用 `hexo s` 本地预览，修改后刷新页面验证样式与功能。  
- 使用 Git 分支或 CI（GitHub Actions）自动化部署可提高稳定性与可重复性。  
- 为静态资源启用 CDN 和长缓存，提高访问速度。  
- 文章元数据（front-matter）保持规范，便于主题按需渲染（如 toc、comments 等）。

---

## 参考资源
- Hexo 官方： http://hexo.io/  
- Git 官方： https://git-scm.com/  
- Hexo 主题（Fluid）文档：参考主题仓库说明

---
总结：按步骤安装好 Git / Node.js → 初始化 Hexo → 选主题并配置 → 创建 GitHub 仓库并配置 SSH → 配置 hexo-deployer-git → hexo clean && hexo g && hexo d 即可上线。如需我把这篇美化后的内容直接写回该文件，请确认。 
