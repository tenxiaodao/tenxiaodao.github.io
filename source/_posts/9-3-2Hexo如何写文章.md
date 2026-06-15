---
title: Hexo如何写文章
date: 2024-09-04 09:53:21
cover: https://bu.dusays.com/2025/10/18/68f395b055ed7.webp
categories: Hexo
series: Hexo 系列
permalink: /hexo-ru-he-xie-wen-zhang/
slug: hexo-ru-he-xie-wen-zhang
tags:
  - Hexo
  - 博客搭建
  - Markdown
aside: false
sticky:
---

# Hexo如何写文章

> 在开始之前，我相信你已经成功搭建了网站。

---

## 详细教程

### 1. **创建新文章**
- 在 Hexo 的根目录下，通过命令行使用以下命令创建一篇新的文章：
  ```bash
  hexo new "文章标题"
  ```

2. **撰写文章**：
   - 打开创建的文章文件，使用Markdown语法编写你的文章内容。Markdown是一种轻量级的标记语言，它允许你使用简单的文本编辑器编写带有格式的内容，如标题、列表、链接、图片等 。

3. **Front-matter设置**：
   - 在文章的开头，你需要添加Front-matter，这是一些用于定义文章元数据的配置信息，包括`title`（标题）、`date`（日期）、`tags`（标签）、`categories`（分类）等。Front-matter必须被三个短横线`---`包围。例如：
     ```
     ---
     title: 我的博客文章
     date: 2024-09-04 12:00:00
     tags: [Hexo, 教程]
     categories: [编程]
     ---
     ```
   - 你可以在`_config.yml`中设置默认的Front-matter信息 。

4. **高级设置**：
   - 你可以在文章中使用`<!-- more -->`标记来分割文章摘要和全文内容。在文章列表页面，只有标记之前的内容会显示 。
   - 如果需要，你还可以添加其他Front-matter选项，如`layout`（布局）、`comments`（是否开启评论）、`published`（是否发布）等。

5. **本地预览**：
   - 使用`hexo s`命令启动本地服务器，然后在浏览器中访问`http://localhost:4000`来预览你的文章。

6. **生成静态文件**：
   - 使用`hexo g`命令生成静态文件。

7. **部署到服务器**：
   - 使用`hexo d`命令将生成的静态文件部署到你的服务器上，例如GitHub Pages。

8. **Markdown编辑器推荐**：
   - 对于Markdown编辑器，推荐使用Typora，它支持Markdown的实时预览和快捷键操作，使得写作更加便捷 。

9. **其他注意事项**：
   - 确保你的Hexo环境已经正确安装，并且所有依赖的插件都已经安装并配置好。
   - 如果你的文章中包含图片或其他媒体文件，确保它们被放置在正确的路径下，并且在文章中正确引用。

通过以上步骤，你可以在Hexo框架下撰写并发布你的博客文章。如果你需要更详细的帮助，可以参考Hexo的官方文档 。
