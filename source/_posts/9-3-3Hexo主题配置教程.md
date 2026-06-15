---
title: Hexo主题配置教程
date: 2024-09-03 05:43:33
tags:
  - Hexo
  - 博客搭建
  - 主题配置
cover: https://bu.dusays.com/2025/10/18/68f395aa53d17.webp
categories: Hexo
series: Hexo 系列
permalink: /hexo-zhu-ti-pei-zhi-jiao-cheng/
slug: hexo-zhu-ti-pei-zhi-jiao-cheng

sticky:
---

# Hexo主题配置教程  
## （以 Anzhiyu 主题为例，其他主题同理）

> 以下是安装安知鱼主题（Anzhiyu）的详细步骤：

---

## 1. 安装 Hexo 博客

在安装主题之前，您需要确保已经安装了 Hexo。如果还没有安装，请按照 [Hexo 官方文档](https://hexo.io/docs/) 进行安装和建站。

---

## 2. 安装主题

有三种方式可以安装 Anzhiyu 主题：

### 方式一（推荐）：通过 GitHub 克隆
```bash
git clone -b main https://github.com/anzhiyu-c/hexo-theme-anzhiyu.git themes/anzhiyu
```
如果遇到安装问题，可以尝试使用代理：
```bash
git clone -b main https://ghproxy.com/https://github.com/anzhiyu-c/hexo-theme-anzhiyu.git themes/anzhiyu
```

#### 方式二：下载 Release 版本
下载最新 release 版本并解压到 `themes` 目录，然后将解压出的文件夹重命名为 `anzhiyu`。

#### 方式三：通过 npm 安装
```bash
npm i hexo-theme-anzhiyu
```
注意：此方法只支持 Hexo 5.0.0 以上版本。通过 npm 安装的主题不会在 `themes` 目录下生成文件夹，而是在 `node_modules` 中。

### 3. 应用主题
打开 Hexo 根目录下的 `_config.yml` 文件，找到主题配置项，将主题改为 `anzhiyu`：
```yml
# Extensions
## Plugins: https://hexo.io/plugins/
## Themes: https://hexo.io/themes/
theme: anzhiyu
```

### 4. 安装 Pug 和 Stylus 渲染插件
安装 Pug 和 Stylus 渲染器，以支持主题的渲染：
```bash
npm install hexo-renderer-pug hexo-renderer-stylus --save
```
如果无法安装，可以尝试使用国内镜像：
```bash
npm install hexo-renderer-pug hexo-renderer-stylus --save --registry=http://registry.npmmirror.com
```

### 5. 覆盖配置
为了在更新主题时不丢失自定义配置，可以将主题配置文件复制到 Hexo 根目录：
- macOS/Linux:
  ```bash
  cp -rf ./themes/anzhiyu/_config.yml ./_config.anzhiyu.yml
  ```
- Windows:
  复制 `/themes/anzhiyu/_config.yml` 文件到 Hexo 根目录，并重命名为 `_config.anzhiyu.yml`。

### 6. 本地启动 Hexo
清除缓存并生成静态文件，然后启动本地服务器：
```bash
hexo cl
hexo g
hexo s
```
现在，您应该能够看到主题的效果。

### 7. 升级主题
如果您需要升级主题，可以按照以下步骤操作：
- 重命名当前主题文件夹为备份（例如 `anzhiyu-bkp`）。
- 重新执行安装命令。
- 比对并同步配置文件中的变更。

以上就是安装和使用 Anzhiyu 主题的详细步骤。如果在安装过程中遇到任何问题，可以参考主题的[官方文档](https://docs.anheyu.com/)。
