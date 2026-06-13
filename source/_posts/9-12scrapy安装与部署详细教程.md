---
layout: windows
title: Scrapy 安装与部署详细教程
date: 2024-09-12 19:09:53
tags:
  - Scrapy
  - 爬虫
  - Python
  - Windows
  - Linux
categories: Python
permalink: /scrapy-an-zhuang-yu-bu-shu-xiang-xi-jiao-cheng/
slug: scrapy-an-zhuang-yu-bu-shu-xiang-xi-jiao-cheng
cover: https://bu.dusays.com/2025/10/18/68f395ae4b74c.webp
# comments: true
# aside: false
---

# Scrapy 安装与部署详细教程

## 前言
Scrapy 是一个开源的、功能强大的 Python 爬虫框架，适用于快速、高效地抓取网站数据，并提取其中的结构化数据。它支持多种数据格式的输出（如 JSON、XML、CSV），广泛应用于数据采集、信息监控和自动化测试等领域。

本文将分别介绍如何在 **Windows** 和 **Linux** 环境下安装和配置 Scrapy，并创建一个简单的爬虫项目。

---

## 一、Windows 环境下安装 Scrapy

### 1. 环境准备
在开始安装 Scrapy 之前，请确保系统满足以下要求：
- **Windows 10 或更高版本**
- **Python 3.6 及以上版本**
- **pip**：Python 包管理工具
- **必要的依赖包**（如 Twisted、pywin32）

---

### 2. 安装 Python 和 pip

#### 2.1 下载并安装 Python
1. 前往 [Python 官网](https://www.python.org/downloads/) 下载适合你的系统的 Python 版本。
2. 安装时，务必勾选 **"Add Python to PATH"** 选项，这会将 Python 添加到系统环境变量中。

#### 2.2 验证安装
安装完成后，打开命令提示符 (CMD)，输入以下命令确认 Python 和 pip 是否安装成功：
```bash
python --version
pip --version
```

3. 如果你的系统中还没有 pip，使用你上传的 `get-pip.py` 文件来安装它：
   - 将 `get-pip.py` 放置在某个文件夹中，并在命令行中导航到该文件夹：
     ```bash
     cd C:\path\to\get-pip.py\directory
     ```
   - 运行以下命令安装 pip：
     ```bash
     python get-pip.py
     ```
   - 安装成功后，可以再次输入 `pip --version` 来验证。

### 3. 安装 Scrapy 所需的依赖

Scrapy 在 Windows 上的安装通常会遇到依赖问题，特别是 `Twisted` 和 `pywin32` 包的安装。你已经提供了这些包的安装文件，下面我们将逐步讲解如何使用这些文件来完成安装。

#### 3.1 安装 pywin32

`pywin32` 是 Scrapy 在 Windows 环境下的一个重要依赖，它提供了对 Windows API 的支持，Scrapy 使用它来与操作系统进行交互。

你上传了 `pywin32-221.win-amd64-py3.6.exe` 文件，这是适用于 Python 3.6 版本的 `pywin32` 安装包。

##### 安装步骤：
1. 双击 `pywin32-221.win-amd64-py3.6.exe` 文件，按照安装向导提示完成安装。
2. 安装完成后，验证 pywin32 是否安装成功：
   ```bash
   python -m pip show pywin32
   ```
   如果能看到 pywin32 包的信息，说明安装成功。

#### 3.2 安装 Twisted

`Twisted` 是 Scrapy 的核心依赖，它是一个用于处理网络通信的异步框架。由于 Twisted 依赖 C++ 编译器，在 Windows 上直接安装通常会出现问题。你提供了一个 `.whl` 文件（`Twisted-19.7.0-cp36-cp36m-win_amd64.whl`），这是针对 Windows 和 Python 3.6 版本的预编译包。

##### 安装步骤：
1. 将 `Twisted-19.7.0-cp36-cp36m-win_amd64.whl` 文件放在某个文件夹中。
2. 在命令行中导航到该文件夹并运行以下命令安装 Twisted：
   ```bash
   pip install Twisted-19.7.0-cp36-cp36m-win_amd64.whl
   ```
3. 安装完成后，验证 Twisted 是否安装成功：
   ```bash
   pip show twisted
   ```
   如果输出 Twisted 包的信息，表示安装成功。

### 4. 安装 Scrapy

现在你已经安装了所有的必要依赖，接下来就可以安装 Scrapy 了。

##### 安装步骤：
1. 打开命令提示符，执行以下命令安装 Scrapy：
   ```bash
   pip install scrapy
   ```
   这将安装 Scrapy 及其所有剩余的依赖项。
   
2. 安装完成后，运行以下命令确认 Scrapy 是否成功安装：
   ```bash
   scrapy version
   ```
   如果显示 Scrapy 的版本号，表示安装成功。

### 5. 创建 Scrapy 项目

接下来，你可以开始创建一个 Scrapy 项目，演示如何使用 Scrapy 抓取网站数据。

##### 项目创建步骤：
1. 在命令提示符中，导航到你想要存储项目的文件夹：
   ```bash
   cd C:\path\to\your\project\directory
   ```
2. 运行以下命令创建一个新的 Scrapy 项目：
   ```bash
   scrapy startproject myproject
   ```
   这将创建一个名为 `myproject` 的文件夹，包含 Scrapy 项目的基本结构。

3. 进入项目文件夹：
   ```bash
   cd myproject
   ```

#### 5.1 Scrapy 项目结构
Scrapy 项目的基本结构如下：

```
myproject/
    scrapy.cfg
    myproject/
        __init__.py
        items.py
        middlewares.py
        pipelines.py
        settings.py
        spiders/
            __init__.py
```
- `spiders/` 目录是你定义爬虫逻辑的地方。
- `items.py` 用于定义抓取的数据结构。
- `pipelines.py` 用于处理和保存抓取的数据。
- `settings.py` 包含项目的全局设置。

### 6. 编写第一个爬虫

现在，你可以创建一个简单的爬虫来抓取网页内容。我们将抓取示例网站 `example.com`。

##### 爬虫创建步骤：
1. 在 `spiders/` 目录中，创建一个新的 Python 文件 `example_spider.py`。
2. 编辑 `example_spider.py` 文件，添加以下代码：
   ```python
   import scrapy

   class ExampleSpider(scrapy.Spider):
       name = "example"
       start_urls = [
           'https://example.com',
       ]

       def parse(self, response):
           page_title = response.css('title::text').get()
           yield {'title': page_title}
   ```
   该爬虫将访问 `example.com` 并提取网页的标题。

##### 运行爬虫：
1. 在项目根目录下运行以下命令：
   ```bash
   scrapy crawl example
   ```
   这将启动爬虫并输出抓取到的标题信息。

##### 输出数据到文件：
你还可以将抓取的数据保存到 JSON 文件中，运行以下命令：
```bash
scrapy crawl example -o output.json
```

### 7. 总结与常见问题

#### 7.1 常见问题
- **Twisted 安装问题**：如果没有使用 `.whl` 文件安装 Twisted，可能会遇到编译器缺失的问题。你提供的预编译版本可以解决这个问题。
  
- **pywin32 相关问题**：在 Windows 上运行 Scrapy 时，`pywin32` 是必不可少的包，如果未安装此包，可能会导致某些功能无法正常工作。

#### 7.2 小结
- 本文详细介绍了如何在 Windows 10 上配置 Scrapy 环境，并通过你提供的文件辅助完成 Twisted 和 pywin32 的安装。
- 通过 Scrapy，用户可以高效地抓取和提取网站数据，适合用于数据分析、监控等应用场景。

---
## 二、Linux 系统下的 Scrapy 安装与部署教程

### 1. 环境准备

在 Linux 下安装 Scrapy 的要求如下：
- **Python 3.6 及以上版本**：Scrapy 支持 Python 3.6 及以上版本。
- **pip**：Python 的包管理工具，用于安装 Scrapy 及其依赖项。

### 2. 安装 Python 和 pip

大多数 Linux 发行版预装了 Python，但你仍需要确保系统中的 Python 版本符合 Scrapy 的要求，并且安装了 `pip` 工具。

#### 2.1 检查系统是否已安装 Python 和 pip
在终端中执行以下命令，检查 Python 和 pip 的版本：

```bash
python3 --version
pip3 --version
```

如果已经安装 Python 3 和 pip 3，你将会看到相应的版本号。如果没有安装或版本不符合要求，接着执行以下步骤进行安装。

#### 2.2 安装 Python 3 和 pip
在 Ubuntu 或 Debian 系统上，可以通过 `apt` 来安装 Python 3 和 pip 3：

```bash
sudo apt update
sudo apt install python3 python3-pip
```

对于 CentOS/RHEL，使用以下命令安装 Python 3：

```bash
sudo yum install python3
```

安装完成后，再次验证 Python 和 pip 是否已正确安装：

```bash
python3 --version
pip3 --version
```

### 3. 安装 Scrapy 所需的依赖

在 Linux 上安装 Scrapy 需要一些系统库和 Python 扩展包。在大多数情况下，Scrapy 依赖的库会自动安装，但建议手动安装一些系统工具和编译库以避免潜在的问题。

#### 3.1 安装必要的系统库

在基于 Debian 的系统上，你可以使用以下命令安装 Scrapy 所需的基础库：

```bash
sudo apt install build-essential libssl-dev libffi-dev python3-dev
```

对于 CentOS 或 RHEL 系统，使用以下命令：

```bash
sudo yum groupinstall "Development Tools"
sudo yum install libffi-devel openssl-devel
```

这些库会帮助你在编译和安装 Scrapy 依赖时避免常见的编译问题。

#### 3.2 安装 Twisted 依赖
Twisted 是 Scrapy 依赖的异步网络框架，在某些系统上，安装 Twisted 需要额外的步骤：

```bash
sudo apt install python3-lxml
```

对于 CentOS：

```bash
sudo yum install python3-lxml
```

### 4. 安装 Scrapy

一旦环境准备好了，就可以使用 `pip3` 安装 Scrapy。这里使用 `pip3` 来确保 Python 3 版本的包管理工具。

#### 4.1 使用 pip 安装 Scrapy
在终端中运行以下命令安装 Scrapy：

```bash
pip3 install scrapy
```

这会自动安装 Scrapy 以及所有必要的依赖项，包括 `Twisted`、`lxml`、`cssselect` 等。

#### 4.2 验证安装
安装完成后，运行以下命令来检查 Scrapy 是否成功安装：

```bash
scrapy version
```

如果你看到 Scrapy 的版本号，说明安装成功。

### 5. 创建 Scrapy 项目

现在 Scrapy 已经成功安装，你可以开始创建第一个 Scrapy 项目。

#### 5.1 创建新项目

1. 在终端中，导航到你希望存放项目的目录，例如：
   ```bash
   cd ~/projects
   ```

2. 使用以下命令创建一个新的 Scrapy 项目：
   ```bash
   scrapy startproject myproject
   ```

这将创建一个名为 `myproject` 的文件夹，其中包含 Scrapy 项目的基础结构。

#### 5.2 项目目录结构

Scrapy 项目结构如下：

```
myproject/
    scrapy.cfg
    myproject/
        __init__.py
        items.py
        middlewares.py
        pipelines.py
        settings.py
        spiders/
            __init__.py
```

- `spiders/` 是定义爬虫的地方。
- `settings.py` 是项目的全局配置文件。

### 6. 编写你的第一个爬虫

在项目结构中，`spiders/` 目录用来定义爬虫。接下来，我们将创建一个简单的爬虫，抓取示例网站 `example.com` 的标题。

#### 6.1 创建爬虫

1. 在 `spiders/` 目录中，创建一个名为 `example_spider.py` 的 Python 文件：
   ```bash
   cd myproject/myproject/spiders
   touch example_spider.py
   ```

2. 编辑 `example_spider.py` 文件并添加以下代码：
   ```python
   import scrapy

   class ExampleSpider(scrapy.Spider):
       name = "example"
       start_urls = [
           'https://example.com',
       ]

       def parse(self, response):
           page_title = response.css('title::text').get()
           yield {'title': page_title}
   ```

#### 6.2 运行爬虫

在项目的根目录下，运行以下命令来启动爬虫：

```bash
scrapy crawl example
```

这个命令将会启动爬虫并在终端中输出抓取到的网页标题。

#### 6.3 保存抓取数据

你可以将抓取到的数据保存为 JSON 文件，使用以下命令：

```bash
scrapy crawl example -o output.json
```

这会将抓取到的网页标题保存到 `output.json` 文件中。

### 7. 常见问题与解决

#### 7.1 Twisted 相关问题

如果在安装 Scrapy 或 Twisted 时遇到编译错误，可以先安装 Twisted 的预编译版本：

```bash
pip3 install twisted
```

#### 7.2 缺少编译工具

如果在安装过程中遇到任何编译错误，通常是因为缺少必要的编译工具。确保你已经安装了 `build-essential` 或类似的开发工具包。

#### 7.3 安装虚拟环境（可选）

为了避免包之间的冲突，建议使用虚拟环境管理 Python 项目。你可以使用 `virtualenv` 或 `venv` 来创建隔离的 Python 环境：

```bash
sudo apt install python3-venv
python3 -m venv scrapyenv
source scrapyenv/bin/activate
```

在虚拟环境中，你可以按照本文的步骤安装 Scrapy 和所有依赖项。
>以上就是在 Windows 10 和 Linux 上安装和配置 Scrapy 的详细教程。