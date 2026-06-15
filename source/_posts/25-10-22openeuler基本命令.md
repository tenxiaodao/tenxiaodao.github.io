---
title: openEuler 常用命令与管理指南
date: 2025-10-22 16:05:21
tags:
  - openEuler
  - Linux
  - 运维
cover: https://bu.dusays.com/2025/10/22/68f8a07a013b1.webp
categories: Linux
series: Linux 入门系列
permalink: /openeuler-chang-yong-ming-ling-yu-guan-li-zhi-nan/
slug: openeuler-chang-yong-ming-ling-yu-guan-li-zhi-nan
---

# openEuler 常用命令与管理指南（速查）

本文按场景汇总常用命令与配置示例，便于日常运维快速参考。

---

## 1 开机自动挂载（fstab）

编辑 /etc/fstab，添加示例：
```bash
# 本地 ISO 镜像挂载（iso9660）
/dev/cdrom  /root/aaa  iso9660  defaults  0  0
```
字段说明：设备 文件系统挂载点 FS类型 挂载选项 dump fsck顺序。修改后重启或执行 mount -a 测试。

---

## 2 配置 SSH 服务

编辑 /etc/ssh/sshd_config，常用项：
```text
PermitRootLogin yes           # 允许 root 用户远程登录
Port 22                       # 允许的端口
PasswordAuthentication yes    # 允许密码登录
AllowUsers user1 user2        # 仅允许 user1 和 user2 登录（登录超时设置（防止空闲连接占用资源））
ClientAliveInterval 300       # 每 5 分钟发送一次心跳
ClientAliveCountMax 3         # 0 表示无限次，可改为 3 等有限次数
```
保存后重启：
```bash
sudo systemctl restart sshd
```
>配置免密登录
>两台主机
>A生成密钥对执行命令生成 RSA 密钥对（一路回车，也可设密码，但设密码后仍需输密钥密码，一般免密场景直接回车留空 ）：

免密登录（在 A 机执行）：
```bash
ssh-keygen -t rsa
ssh-copy-id username@B_IP
ssh username@B_IP   # 测试无密码登录
```

---

## 3 网络配置（network-scripts / nmtui）

>在 openEuler 中配置 network-scripts（传统网络服务）主要通过编辑 /etc/sysconfig/network-scripts/ 目录下的网卡配置文件实现。以下是详细
>步骤，适用于静态 IP 和 DHCP 两种场景：

查看网卡：
```bash
ip addr
```
静态 IP（/etc/sysconfig/network-scripts/ifcfg-ens33 示例）：
```ini
TYPE=EthernetTYPE=Ethernet           # 网络类型
BOOTPROTO=static                     # 静态 IP（dhcp 为动态获取）
NAME=ens33                           # 网卡名称（与文件名一致）
DEVICE=ens33                         # 设备名（与网卡实际名称一致）
ONBOOT=yes                           # 开机启用
IPADDR=192.168.1.100                 # 静态 IP 地址
PREFIX=24                            # 子网掩码（24 等价于 255.255.255.0）
GATEWAY=192.168.1.1                  # 网关地址
DNS1=114.114.114.114                 # DNS 服务器 1
DNS2=8.8.8.8                         # DNS 服务器 2（可选）
```
重启网络：
```bash
sudo systemctl restart network
```
使用图形化文本界面：
```bash
sudo nmtui
# 选择 Edit a connection -> 选择网卡 -> 配置静态 IP -> 激活连接
```

---

## 4 命令补全

安装 bash 补全：
```bash
sudo yum -y install bash-completion
exec bash
```

---

## 5 安装图形化桌面（DDE / UKUI）

>DDE 和 UKUI 都是国产 Linux 图形化桌面环境，相当于电脑的 “可视化操作界面”，类似 Windows 的桌面，但设计理念和适用场景有差异。以下用通俗易懂的方式对比两者区别：
1. 定位与风格
DDE（Deepin Desktop Environment，深度桌面环境）
风格：更偏向时尚、现代，界面设计简洁美观，动画效果流畅，图标和窗口风格精致，类似 macOS 的简约感。
定位：适合追求颜值和操作流畅度的个人用户，比如日常办公、娱乐、编程等，尤其受年轻用户和开发者喜欢。
UKUI（优麒麟用户界面）
风格：更偏向稳重、实用，界面布局中规中矩，类似 Windows 经典风格（如开始菜单、任务栏位置），学习成本低。
定位：适合需要稳定、适配性强的场景，比如政府、企业办公，或国产操作系统的标准化部署（如 openEuler、银河麒麟等）。
2. 功能与生态
DDE
功能：内置工具更 “潮”，比如深度商店（应用丰富，支持微信、QQ 等常用软件）、深度截图、系统监控等，交互细节贴心（如全局快捷键、多桌面管理）。
生态：深度社区活跃，对国产硬件（如华为、统信芯片）和软件适配较好，适合个人用户打造 “个性化桌面”。
UKUI
功能：功能更 “基础”，侧重系统稳定性和兼容性，内置工具偏向办公实用（如文件管理器、文本编辑器），界面选项简洁，不易出错。
生态：依赖国产操作系统官方支持（如优麒麟、openEuler），对政府 / 企业级软件（如电子政务系统）适配更优，适合大规模统一部署。
3. 使用场景推荐
选 DDE：
如果你是个人用户，想在 Linux 上体验好看、好用的桌面，或常用国产软件（如微信、WPS），选 DDE 更舒服。
选 UKUI：
如果你是企业用户或使用国产操作系统（如单位电脑预装的 openEuler），需要稳定、符合传统操作习惯的界面，选 UKUI 更合适。
一句话总结
DDE：像 “年轻人的时尚桌面”，好看又好用，适合追求个性和流畅体验的个人。
UKUI：像 “稳重的办公桌面”，朴实无华但稳定可靠，适合企业和标准化场景。
根据需求选就行～ 如果只是日常用电脑，建议先试试 DDE；如果是单位或国产系统设备，可能默认就是 UKUI

安装示例（视仓库与包名而定）：
```bash
sudo yum -y install ukui      # 或 dde
sudo chmod +x /etc/rc.d/rc.local   # 若需要
sudo systemctl set-default graphical.target
sudo reboot
```
DDE 更美观偏个人，UKUI 更稳重适配企业场景，按需选择。

---

## 6 虚拟机网络模式简介（桥接 / Host-Only / NAT）

- 桥接（Bridged）：虚拟机直接加入 LAN，获取同网段 IP，适合做局域网服务。
- 仅主机（Host-Only）：仅主机与虚拟机可互通，隔离外网，适合测试隔离环境。
- NAT：虚拟机通过宿主 NAT 上网，配置简单但外网无法主动访问虚拟机（需端口映射）。

---

## 7 常用命令速查

系统与信息：
```bash
whoami; hostnamectl; uname -a; uptime
free -h; df -h; du -sh /path
```
进程与服务：
```bash
ps aux | grep name
pkill -f name
sudo systemctl status|start|stop|restart nginx
ss -tulpn | grep :80
```
文件与查找：
```bash
ls -la; cat file; less file
find / -name "*.log"
grep -R --exclude-dir=node_modules "关键词" .
tar czvf a.tar.gz folder/; tar xzvf a.tar.gz
```
网络与传输：
```bash
ping -c4 example.com
curl -I https://example.com
scp file user@host:/path
rsync -avz src/ user@host:/dest/
```

---

## 8 vim 快捷与编辑

常用模式与命令：
- 模式：命令模式 / 插入模式 / 底行模式  
- 插入：i a I A o O  
- 行操作：yy 复制行；p 粘贴；dd 删除行  
- 底行命令：:w 保存；:q 退出；:wq 保存退出；:q! 强制退出

---

## 9 提权（sudo）

编辑 sudoers（使用 visudo）：
```text
# 允许 user1 使用 sudo
user1 ALL=(ALL) ALL
```
建议通过 visudo 修改以避免语法错误。

---

## 10 安全与建议（简要）

- 优先使用密钥登录，禁用 root 密码登录（生产环境）。
- 防火墙只开放必要端口，使用 SELinux/防火墙策略。
- 定期备份 /etc、重要配置与数据，使用包管理器更新补丁。
- 在生产环境谨慎设置 PermitRootLogin 与 PasswordAuthentication。

---

本文为速查手册，覆盖常见场景与示例，具体命令与包名请根据 openEuler 版本与仓库调整，遇到疑问可查看 man 页面或官方文档。
