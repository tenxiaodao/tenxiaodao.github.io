---
title: Openeuler的安装教程
date: 2025-11-03 18:55:23
tags:
    - VM虚拟机
    - 
cover: https://bu.dusays.com/2025/10/22/68f8a07193d51.webp
categories: Linux
permalink: /openeuler-de-an-zhuang-jiao-cheng/
slug: openeuler-de-an-zhuang-jiao-cheng
---
>先安装vm可以看往期教程[vm虚拟机安装]()


## 安装的详细步骤

> 下面按“准备 → 引导安装 → 磁盘分区 → 系统配置 → 首次启动与验证 → 虚拟机增强 → 常见问题”顺序给出可直接操作的详细步骤与常用命令示例。按需复制命令到终端执行。

### 准备
1. 下载 ISO：从官网或镜像站下载对应版本（server / desktop）。  
2. 下载链接：[sha256sum OpenEuler-*.iso](https://pan.quark.cn/s/4789247ff06b)
>提取码：idbr

---

### 创建虚拟机（推荐配置）
1. 类型：Linux → 64-bit
2. CPU：2 核（推荐 ≥2）
3. 内存：最小 2GB，桌面版建议 4GB+
4. 磁盘：20GB 起（测试 40GB 更宽松）
5. 网络：NAT（默认）或 桥接（Bridged，便于局域网访问）
6. 光驱：加载下载的 ISO
7. 图形：桌面版启用显存 128MB

---

### 启动 ISO 并选择安装模式
启动 VM，选择 Install → Graphical Install（桌面）或 Text Install（服务器/低内存）。
选择语言、键盘、时区。

图形安装中可选择“自动分区（LVM）”或“手动分区”。手动示例分区（MBR/UEFI 以实际引导方式为准）：

- UEFI 示例（GPT）：
  - /dev/sda1  EFI System  512M  FAT32  （挂载 /boot/efi）
  - /dev/sda2  /boot       1G    ext4
  - /dev/sda3  LVM PV    剩余全部  -> LVM 内建立 lv_root, lv_home, lv_swap
    - lv_root  /    20G  ext4/xfs
    - lv_home  /home 剩余空间  ext4/xfs
    - lv_swap  swap  >=2G（按内存大小）

- BIOS/Legacy 示例：
  - /dev/sda1  /boot 1G ext4
  - /dev/sda2  LVM PV 剩余 -> 同上

提示：
- 生产环境建议至少将 /boot 单独分区、使用 LVM 更易扩容。  
- 如果不熟悉 LVM，可选择自动分区或仅创建 / 和 swap。

>如是初学者默认就好
---

### 软件包选择与网络
1. 若使用 Text 安装，安装器会有包组选择，常选 `Minimal`（服务器）或 `Server with GUI` / `Desktop`。  
2. 网络：若需要固定 IP，安装过程中选择手动配置静态 IP（或装完系统后用 nmcli/nmtui 设置）。

---

### 创建账户与安全设置
1. 设置 root 密码并创建普通用户（勾选 sudo 权限或后续用 visudo 添加）。  
2. 建议启用 SSH 并使用密钥登录（安装后配置），关闭不必要服务。

SSH 启用：
```bash
sudo systemctl enable --now sshd
sudo firewall-cmd --permanent --add-service=ssh
sudo firewall-cmd --reload
```
配置 sudo（visudo）：
```bash
sudo visudo
# 添加 user1 ALL=(ALL) ALL
```
---

### 完成安装后首次启动
登录后执行：
```bash
# 更新系统
sudo dnf update -y

# 安装常用工具
sudo dnf install -y vim wget curl net-tools bash-completion unzip git

# 可选：启用 EPEL-like 源或企业镜像（按发行说明配置 repo）
```

---

### 常见问题与排查命令
- 无网络：检查 NetworkManager、网卡状态与路由
```bash
ip addr
nmcli device status
nmcli connection show --active
journalctl -u NetworkManager -e
```
- 更新失败（repo 问题）：检查 /etc/yum.repos.d/ 下的 repo 文件与 DNS
- SSH 无法登录：检查 sshd 状态、firewalld、SELinux（如启用）
```bash
sudo systemctl status sshd
sudo firewall-cmd --list-all
sudo sestatus
```
- 分辨率 / 鼠标问题：安装虚拟机增强后重启

---

### 建议与安全注意
- 在生产场景：关闭不必要端口、使用防火墙规则、强制使用密钥登录和关闭 root 密码登录（编辑 /etc/ssh/sshd_config 设置 PermitRootLogin no），并启用定期补丁管理。  
- 建议启用快照 / 备份策略，初学者多用快照练习分区与回滚。  
- 若需 GUI 桌面，可安装 UKUI/DDE，但桌面占用资源较多，服务器场景不推荐。

---