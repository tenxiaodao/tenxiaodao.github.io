---
title: 在windows11下用wsl2安装Ubuntu子系统安装kvm运行macos
date: 2024-10-05 13:32:04
tags:
  - WSL2
  - KVM
  - macOS
  - Ubuntu
cover: https://bu.dusays.com/2025/10/18/68f395aef2c48.webp
# comments: false
# aside: false

categories: 苹果生态
permalink: /zai-windows11-xia-yong-wsl2-an-zhuang-ubuntu-zi-xi-tong-an-zhuang-kvm-yun-xing-macos/
slug: zai-windows11-xia-yong-wsl2-an-zhuang-ubuntu-zi-xi-tong-an-zhuang-kvm-yun-xing-macos
---

# 在Windows11 WSL上通过QEMU KVM流畅运行macOS虚拟机（2024）

## 前言
除了安装黑苹果（Hackintosh）外，在 Windows PC 上体验 macOS 的方法还有安装 macOS 虚拟机。由于授权和软件支持等因素，VMware、VirtualBox 等虚拟机软件虽能运行 macOS，但性能较差。

本文介绍一种基于 WSL 和 QEMU-KVM 的方案，可以较为流畅地运行 macOS 虚拟机。

---

## 基本系统要求
运行 macOS 虚拟机的最低系统要求如下：

| 名称         | 规格/建议配置                     |
|--------------|----------------------------------|
| **操作系统** | Windows 11                      |
| **内存**     | 至少 16GB RAM                   |
| **硬盘**     | 至少一块固态硬盘                |
| **虚拟化**   | 已启用虚拟化                    |
| **GPU**      | 已安装 vGPU 驱动程序（参考文档） |
| **WSL**      | WSL 2                           |

### 示例配置
以下是本文使用的电脑配置：

| 名称         | 型号/规格                     |
|--------------|------------------------------|
| **CPU**      | Intel i7-14700KF             |
| **内存**     | 64GB DDR5                    |
| **GPU**      | Nvidia GeForce RTX 4070 Super |
| **操作系统** | Windows 11                   |

---

## 基本步骤概览
以下是实现目标的三个主要步骤：

1. **启用 WSL2 和安装 Ubuntu 子系统**
2. **设置 KVM 支持**
3. **安装 macOS 虚拟机**


> **⚠️ 注意：** 未经苹果许可，在非苹果硬件上运行 macOS 可能违反苹果的最终用户许可协议 (EULA)。请确保在法律允许的范围内使用该操作。
## 一、WSL 的安装与配置
### 安装 WSL
如果尚未安装 WSL2，请以管理员权限打开 Windows Terminal 或 PowerShell，运行以下命令：
````
wsl --install
````



## 启用 WSL2 并安装 Ubuntu 子系统

### 启用 WSL2
打开 PowerShell（以管理员身份），运行以下命令：
````
powershell
# 启用 WSL 和虚拟机平台
wsl --install
wsl --set-default-version 2
````

以下是优化后的文章结构，调整了段落、标题层级、代码块格式，并添加了表格和注释以提升可读性：

```markdown
---
title: 在Windows11 WSL上通过QEMU KVM流畅运行macOS虚拟机（2024）
date: 2024-07-26
categories: 虚拟化
tags:
  - Linux
  - 虚拟化
  - macOS
  - KVM
cover: https://example.com/cover.jpg
---

# 在Windows11 WSL上通过QEMU KVM流畅运行macOS虚拟机（2024）

## 前言
除了安装黑苹果（Hackintosh）外，在 Windows PC 上体验 macOS 的方法还有安装 macOS 虚拟机。由于授权和软件支持等因素，VMware、VirtualBox 等虚拟机软件虽能运行 macOS，但性能较差。

本文介绍一种基于 WSL 和 QEMU-KVM 的方案，可以较为流畅地运行 macOS 虚拟机。

---

## 基本系统要求
运行 macOS 虚拟机的最低系统要求如下：

| 名称         | 规格/建议配置                     |
|--------------|----------------------------------|
| **操作系统** | Windows 11                      |
| **内存**     | 至少 16GB RAM                   |
| **硬盘**     | 至少一块固态硬盘                |
| **虚拟化**   | 已启用虚拟化                    |
| **GPU**      | 已安装 vGPU 驱动程序（参考文档） |
| **WSL**      | WSL 2                           |

### 示例配置
以下是本文使用的电脑配置：

| 名称         | 型号/规格                     |
|--------------|------------------------------|
| **CPU**      | Intel i7-14700KF             |
| **内存**     | 64GB DDR5                    |
| **GPU**      | Nvidia GeForce RTX 4070 Super |
| **操作系统** | Windows 11                   |

---

## 一、WSL 的安装与配置

### 安装 WSL
如果尚未安装 WSL2，请以管理员权限打开 Windows Terminal 或 PowerShell，运行以下命令：
```bash
wsl --install
```

将默认版本设置为 WSL2：
```bash
wsl --set-default-version 2
```

按照屏幕提示完成安装。

### 配置 WSL
编辑用户目录下的 `.wslconfig` 文件，允许嵌套虚拟化。以下是示例配置：
```ini
[wsl2]
networkingMode=bridged
vmSwitch=ex
memory=16G
processors=8
swap=16G
localhostForwarding=true
nestedVirtualization=true
pageReporting=true
kernelCommandLine=intel_iommu=on iommu=pt kvm.ignore_msrs=1 kvm-intel.nested=1 kvm-intel.ept=1 kvm-intel.emulate_invalid_guest_state=0 kvm-intel.enable_shadow_vmcs=1 kvm-intel.enable_apicv=1
```

> **注意**：
> - `memory` 设置 WSL 的最大内存使用量。
> - 如果找不到 `.wslconfig` 文件，可以在 `/etc/wsl.conf` 中添加上述内容。

重启 WSL：
```bash
wsl --shutdown
```

---

## 二、安装 macOS

### 安装必需软件
进入 WSL 的 Ubuntu 环境，运行以下命令安装所需软件：
```bash
sudo apt update
sudo apt-get install qemu uml-utilities virt-manager git wget dmg2img libguestfs-tools p7zip-full make -y
```

### 配置 KVM
启用 KVM 并设置权限：
```bash
echo 1 > /sys/module/kvm/parameters/ignore_msrs
sudo usermod -aG kvm $(whoami)
sudo usermod -aG libvirt $(whoami)
```

---

## 三、使用 OSX-KVM 项目安装 macOS

### 拉取 OSX-KVM 项目
```bash
sudo git clone https://github.com/kholia/OSX-KVM.git
cd OSX-KVM
```

### 下载 macOS 镜像
运行以下脚本下载 macOS 镜像：
```bash
sudo ./fetch-macOS-v2.py
```

将下载的 `.dmg` 文件转换为 `.img` 格式：
```bash
sudo dmg2img BaseSystem.dmg BaseSystem.img
```

### 创建磁盘镜像
创建一个 512GB 的磁盘镜像：
```bash
sudo qemu-img create -f qcow2 mac_hdd_ng.img 512G
```

---

## 四、配置 Virt-manager

### 添加虚拟机
1. 使用以下命令生成虚拟机配置文件：
   ```bash
   sudo sed "s/CHANGEME/$USER/g" macOS-libvirt-Catalina.xml > macOS.xml
   virt-xml-validate macOS.xml
   virsh --connect qemu:///system define macOS.xml
   ```

2. 如果 `OSX-KVM` 位于其他目录，请修改 `macOS-libvirt-Catalina.xml` 文件中的路径。

### 启动 Virt-manager
启动 Virt-manager：
```bash
sudo systemctl start libvirtd
sudo virt-manager
```

---

## 五、安装 macOS

### 安装步骤
1. 在 macOS 安装界面中，选择 **磁盘工具**，将虚拟磁盘格式化为 APFS 格式。
2. 安装 macOS，安装过程可能需要一定时间。

### 调整虚拟机配置
- **内存**：推荐至少 8GB（8192MB）。
- **核心数**：根据需求设置，建议与 WSL 配置一致。

---

## 六、常见问题

### 1. `.wslconfig` 配置问题
- **错误**：`未知密钥 'wsl2.pageReporting'`
  - 解决方法：注释掉 `pageReporting=true`。

- **错误**：`找不到 VmSwitch 'ex'`
  - 解决方法：使用以下命令手动配置桥接网络：
    ```bash
    Set-VMSwitch WSL -NetAdapterName <你的网络适配器名称>
    ```

### 2. Virt-manager 无法启动虚拟机
- **错误**：`Emulator '/usr/bin/qemu-system-x86_64' does not support virt type 'kvm'`
  - 解决方法：确保使用非 root 用户运行命令。

---

## 七、总结
通过本文的方法，你可以在 Windows 11 的 WSL 环境中使用 QEMU-KVM 流畅运行 macOS 虚拟机。得益于 WSL2 的优化和 vGPU 支持，性能相比传统虚拟机方案有显著提升。

如果你有其他问题或建议，欢迎在评论区留言讨论！

---

## 八、参考链接
- [WSL 官方文档](https://learn.microsoft.com/en-us/windows/wsl/)
- [OSX-KVM 项目](https://github.com/kholia/OSX-KVM)
- [桥接网络配置](https://blog.csdn.net/chubbykkk/article/details/125216708)