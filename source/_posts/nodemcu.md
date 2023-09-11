---
title: Getting Started with NodeMCU on macOS - 在macOS上的NodeMCU上手笔记
tags:
  - 嵌入式开发
  - NodeMCU
  - 中文
  - English
categories: 嵌入式开发
author: Sidi Liang
date: 2023-09-11 20:06:51
---


### *为了方便过审投放谷歌广告，这个笔记用英文撰写，划到下面有chatGPT提供的中文翻译版*

### Building the firmware
As only the application are concerned, we can use the online firmware building service at http://nodemcu-build.com to get the firmware. It's quite straightforward to build the firmware on this website, by just selecting the modules to be included. However, it won't work if too many modules are selected.

### Flashing the firmware
First make sure that the usb serial firmware is properly installed on the system.
I used this tool to flash the firmware:
https://github.com/marcelstoer/nodemcu-pyflasher
baudrate: 115200 (others might also work), dual IO, ...

## Using NodeMCU-Tool
NodeMCU-Tool: https://github.com/andidittrich/NodeMCU-Tool
*Before installing NodeMCU-Tool, make sure that you have  Node.js >= 7.6 installed on your system.*

### Installation
`sudo npm install nodemcu-tool -g`
This will install NodeMCU-Tool **globally** on your system.

### Verifying the installation
`nodemcu-tool --version`

### Creating the file system
`nodemcu-tool mkfs --port=/dev/tty.wchusbserial14410 --connection-delay 300 --baud 115200`
outputs:
```
(node:13754) Warning: Accessing non-existent property 'padLevels' of module exports inside circular dependency
(Use `node --trace-warnings ...` to show where the warning was created)
[NodeMCU-Tool]~ Connected
[device]      ~ Arch: esp8266 | Version: 3.0.0 | ChipID: 0x2aecbf | FlashID: 0x1640c8
[NodeMCU-Tool]~ Uploading "helloworld.lua" >> "helloworld.lua"...
[connector]   ~ Transfer-Mode: hex
[NodeMCU-Tool]~ File Transfer complete!
[NodeMCU-Tool]~ disconnecting

```

### Uploading code
`nodemcu-tool upload --port=/dev/tty.wchusbserial14410 --connection-delay 300 --baud 115200 helloworld.lua
`
outputs:
```
(node:13754) Warning: Accessing non-existent property 'padLevels' of module exports inside circular dependency
(Use `node --trace-warnings ...` to show where the warning was created)
[NodeMCU-Tool]~ Connected
[device]      ~ Arch: esp8266 | Version: 3.0.0 | ChipID: 0x2aecbf | FlashID: 0x1640c8
[NodeMCU-Tool]~ Uploading "helloworld.lua" >> "helloworld.lua"...
[connector]   ~ Transfer-Mode: hex
[NodeMCU-Tool]~ File Transfer complete!
[NodeMCU-Tool]~ disconnecting

```

### Running the helloworld
`nodemcu-tool run helloworld.lua --port=/dev/tty.wchusbserial14410 --connection-delay 300 --baud 115200`
outputs:
```
(node:13764) Warning: Accessing non-existent property 'padLevels' of module exports inside circular dependency
(Use `node --trace-warnings ...` to show where the warning was created)
[NodeMCU-Tool]~ Connected
[device]      ~ Arch: esp8266 | Version: 3.0.0 | ChipID: 0x2aecbf | FlashID: 0x1640c8
[device]      ~ Running "helloworld.lua"
[device]      ~ >----------------------------->
Hello World!
|---|
| H |
| E |
| L |
| L |
| O |
| | |
| W |
| O |
| R |
| L |
| D |
|---|
YEAH!!! HELLO WORLD!!!
String: Lorem ipsum dolor sit amet, consetetur sadipscing elitr
[device]      ~ >----------------------------->
[NodeMCU-Tool]~ disconnecting

```
### To be continued: LUA programming




### 构建固件
由于只关心应用程序，我们可以使用在线固件构建服务 http://nodemcu-build.com 来获取固件。在这个网站上构建固件非常简单，只需选择要包含的模块即可。但是，如果选择了太多模块，它可能不起作用。

### 刷写固件
首先确保 USB 串行固件已正确安装在系统上。
我使用了这个工具来刷写固件：
https://github.com/marcelstoer/nodemcu-pyflasher
波特率：115200（其他波特率也可能适用），双重 IO，...

## 使用 NodeMCU-Tool
NodeMCU-Tool：https://github.com/andidittrich/NodeMCU-Tool
*在安装 NodeMCU-Tool 之前，请确保您的系统上已安装 Node.js >= 7.6。*

### 安装
`sudo npm install nodemcu-tool -g`
这将在您的系统上**全局**安装 NodeMCU-Tool。

### 验证安装
`nodemcu-tool --version`

### 创建文件系统
`nodemcu-tool mkfs --port=/dev/tty.wchusbserial14410 --connection-delay 300 --baud 115200`
输出：
```
(node:13754) 警告: 在循环依赖关系内部访问模块导出的不存在的属性 'padLevels'
(使用 `node --trace-warnings ...` 来显示警告的创建位置)
[NodeMCU-Tool]~ 已连接
[device]      ~ 架构：esp8266 | 版本：3.0.0 | 芯片ID：0x2aecbf | FlashID：0x1640c8
[NodeMCU-Tool]~ 上传 "helloworld.lua" >> "helloworld.lua"...
[connector]   ~ 传输模式：hex
[NodeMCU-Tool]~ 文件传输完成！
[NodeMCU-Tool]~ 断开连接

```

### 上传代码
`nodemcu-tool upload --port=/dev/tty.wchusbserial14410 --connection-delay 300 --baud 115200 helloworld.lua
`
输出：
```
(node:13754) 警告: 在循环依赖关系内部访问模块导出的不存在的属性 'padLevels'
(使用 `node --trace-warnings ...` 来显示警告的创建位置)
[NodeMCU-Tool]~ 已连接
[device]      ~ 架构：esp8266 | 版本：3.0.0 | 芯片ID：0x2aecbf | FlashID：0x1640c8
[NodeMCU-Tool]~ 上传 "helloworld.lua" >> "helloworld.lua"...
[connector]   ~ 传输模式：hex
[NodeMCU-Tool]~ 文件传输完成！
[NodeMCU-Tool]~ 断开连接

```

### 运行 helloworld
`nodemcu-tool run helloworld.lua --port=/dev/tty.wchusbserial14410 --connection-delay 300 --baud 115200`
输出：
```
(node:13764) 警告: 在循环依赖关系内部访问模块导出的不存在的属性 'padLevels'
(使用 `node --trace-warnings ...` 来显示警告的创建位置)
[NodeMCU-Tool]~ 已连接
[device]      ~ 架构：esp8266 | 版本：3.0.0 | 芯片ID：0x2aecbf | FlashID：0x1640c8
[device]      ~ 正在运行 "helloworld.lua"
[device]      ~ >----------------------------->
Hello World!
|---|
| H |
| E |
| L |
| L |
| O |
| | |
| W |
| O |
| R |
| L |
| D |
|---|
YEAH!!! HELLO WORLD!!!
String: Lorem ipsum dolor sit amet, consetetur sadipscing elitr
[device]      ~ >----------------------------->
[NodeMCU-Tool]~ 断开连接

```
### 未完待续：LUA 编程
