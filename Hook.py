# import frida
# 获取模拟器或者手机上已连接的设备
# device = frida.get_remote_device()
# print(device)

# 获取device上的所有app
# applications = device.enumerate_applications()

# for application in applications:
# print(application)

# python Python_Application.py
# python
# -*- coding: utf-8 -*-

import frida
import sys


def on_message(message, data):
    if message['type'] == 'send':
        print("*****[frida hook]***** : {0}".format(message['payload']))
    else:
        print("*****[frida hook]***** : " + str(message))


def get_javascript(filepath):
    code = ''
    with open(filepath, 'r') as file:
        code = code + file.read()
    return code


# 连接远端设备
# device = frida.get_remote_device()
# 连接【手机】
device = frida.get_usb_device()
# 附加到进程
# pid = device.spawn(["Nesur_U3dProject"])#程序名
# device.resume(pid)
# session = device.attach(3246)#Nesur_U3dProject
# pid = 11078
pid = "Merge Dragons!"
session = device.attach(pid)  # 合成龙
# 【另一种附加方式】session = device.attach(package_name)

# 《《《加载JavaScript代码》》》
# 【1】直接写入 javascript 代码
javascript = """
//<javascript code>
             """


# 【2】从文件中加载 javascript 脚本代码
hook_js = get_javascript(r'D:\MyCodeTools\Frida_syscall_interceptor\frida-agent-example-master\agent\InLineHook.js')

# 基于脚本内容创建运行脚本对象
script = session.create_script(hook_js)
script.on('message', on_message)

# 加载脚本并执行
script.load()
sys.stdin.read()
