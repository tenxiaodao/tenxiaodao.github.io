---
title: 在surfacepro4里安装macOS
date: 2026-05-24
updated: 2026-05-24 12:00:00
tags: 
categories: 黑苹果
cover: https://bu.dusays.com/2026/03/30/69ca04388de10.webp
aside: false
sticky: 
# copyright_author: andylizhennan8
permalink: /surfacepro4/
slug: surfacepro4
---

# 前言之前
之前由于工作的原因导致断更了一段时间，前几天心血来潮想装一台完美黑苹果于是就有了以下的内容。你们可以参考国光酱的教程
>https://apple.sqlsec.com
## 前言

Surface Pro 4 本来是一台 Windows 平板电脑，但对于喜欢折腾的朋友来说，把它改成能够运行 macOS 的黑苹果设备，也是一个很有趣的挑战。本文总结了在 Surface Pro 4 上尝试安装 macOS 的思路、准备、关键步骤和常见问题。

## 1. 适配机型与风险提示

Surface Pro 4 采用的是第 6 代 Intel Core 处理器、Intel HD Graphics 520、以及 Surface 专用 Wi-Fi / 蓝牙模块。其硬件与普通台式机或笔记本不同，安装 macOS 存在较高风险。

- 备份数据：安装之前请务必备份 Windows 系统、重要文件和驱动程序
- 可能无法实现全部功能：触摸屏、摄像头、指纹、Surface Pen、休眠等功能可能无法完全正常
- 仅作折腾参考：本文不保证 100% 成功，仅总结常见做法

## 2. 准备工作

### 2.1 准备工具
- 一台正常可用的 macOS 电脑（或已经能够运行 macOS 的黑苹果）
- Windows 11 电脑也可以使用 balenaEtcher 等烧录工具写入 macOS 镜像
- 16GB 以上 USB 设备，用于制作启动盘
- 最新的 Clover 或 OpenCore 引导程序
- 合适的 macOS 版本镜像（Catalina、Big Sur、Monterey 等常见版本）

### 2.2 确认硬件配置

Surface Pro 4 常见机型：m3 / i5 / i7

建议目标 macOS 版本：

- 兼容性较好的版本为 macOS Catalina / Big Sur
- macOS 11.6 属于 Big Sur 系列，适合作为本机的目标版本
- 由于机型较老，不建议直接安装最新版本

### 2.3 事先准备 USB 启动盘

1. 在 Windows 11 上可以使用 `balenaEtcher` 写入 `macOS 11.6` 镜像，或者在 macOS 上使用 `createinstallmedia` 创建安装盘

2. 在 macOS 上使用 `Disk Utility` 抹掉 USB，格式为 `Mac OS Extended (Journaled)` 或 `APFS`

```bash
tsutil eraseDisk HFS+ "USB" /dev/diskN
sudo /Applications/Install\ macOS\ Catalina.app/Contents/Resources/createinstallmedia --volume /Volumes/USB
```

3. 安装完成后，将 `EFI` 分区挂载出来，复制对应版本的 Clover 或 OpenCore（OC） 文件。
4. 注意：balenaEtcher 仅会把安装镜像写入 USB，这只是第一步；要让 Surface Pro 4 正常启动，还必须补齐 USB 的 `EFI` 引导配置、`Kexts`、`ACPI` 补丁等。

## 3. 核心配置要点

### 3.1 引导程序

Surface Pro 4 推荐使用 OpenCore，当前区兼容性较好。需要准备的文件包括：

- `EFI/OC/config.plist`
- `EFI/OC/ACPI/` 补丁文件
- `EFI/OC/Kexts/` 核心驱动
- `EFI/OC/Drivers/` 引导驱动

### 3.2 必备 kexts

常见必备驱动：

- `Lilu.kext`
- `WhateverGreen.kext`
- `VirtualSMC.kext`
- `AppleALC.kext`
- `SMCProcessor.kext`
- `SMCBatteryManager.kext`
- `AirportItlwm.kext`（针对 Intel Wi-Fi）
- `IntelBluetoothFirmware.kext` / `IntelBluetoothInjector.kext`

> 注意：Surface 原生 WLAN 模块一般与 macOS 不兼容，通常需要更换为可识别的无线网卡，或者使用 USB 网卡。

### 3.3 核心引导参数

针对 Surface Pro 4，常用的启动参数包括：

- `-v`（调试模式）
- `dart=0`
- `alcid=1` 或 `alcid=3`
- `igfxonln=1`
- `npci=0x2000`
>找对EFI后一般不用修改

根据具体机型与 macOS 版本，参数可能有所不同。

## 4. 安装流程概述

### 4.1 关闭安全启动

进入 Surface UEFI 设置，关闭 `Secure Boot`，并确认引导顺序允许 USB 启动。

### 4.2 从 USB 启动

插入制作好的 macOS 安装 USB，启动时按住 `Volume Down` 进入 USB 启动菜单，选择 EFI 启动项。

### 4.3 安装 macOS

1. 进入 macOS 安装界面后，使用 `Disk Utility` 抹掉目标磁盘
2. 选择安装目标，开始安装
3. 安装过程中可能会出现内核 panic 或驱动问题，此时可切换到 `Verbose` 模式查看错误信息

### 4.4 第一阶段完成后重启

安装程序完成后，会自动重启多次。这时仍需从 USB 启动，进入 `Install macOS` 引导继续安装，直到进入安装完成界面。

### 4.5 迁移到硬盘引导

安装成功后，将 USB 中的 `EFI` 引导配置复制到硬盘的 `EFI` 分区，确保硬盘可以直接引导。

## 5. 常见问题与解决

### 5.1 无法识别 Wi-Fi

Surface Pro 4 原装无线网卡通常无法被 macOS 识别。解决方案：

- 更换为 Broadcom 兼容网卡
- 使用 `AirportItlwm` 驱动尝试支持 Intel 无线
- 使用 USB 网卡作为临时方案

### 5.2 显卡黑屏或分辨率异常

可能需要调整显卡启动参数，或使用 `WhateverGreen.kext` 进行补丁。

### 5.3 触摸屏与摄像头不可用

Surface 触摸屏和摄像头在 macOS 下很难完全支持，通常需要接受不支持或者依赖额外补丁的情况。

## 6. 适合黑苹果的替代方案

如果你只是想体验 macOS 或进行开发测试，建议考虑：

- 在 Windows 上使用 VMware / VirtualBox 安装 macOS 虚拟机(不推荐)
- 直接购买二手 MacBook / Mac mini
- 在兼容性更好的 Intel 台式机上搭建黑苹果



