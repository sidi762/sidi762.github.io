---
title: 在mac上用cpu运行清华chatGLM-6B大模型，拥有自己的chatGPT！
date: 2023-04-05 22:55:57
tags:
  - 机器学习
  - LLM
  - 中文
categories: LLM
author: Sidi Liang
---
用mac也可以部署运行大模型！标题其实有些夸大的成分，因为用cpu进行模型推理实在是太慢了，没有什么实际意义，但是也算是一种体验大模型的方式吧。


首先把chatGLM的代码clone到本地：
```
git clone https://github.com/THUDM/ChatGLM-6B.git           
cd ChatGLM-6B                        
```
然后将chatGLM-6B的权重下载到本地：
```
git lfs install
git clone https://huggingface.co/THUDM/chatglm-6b/
```
下载好之后，用pip安装依赖：
```
pip3 install -r requirements.txt
pip3 install gradio    
```
都安装好之后，就可以准备开始运行了。
我们先运行cli_demo.py。我这里将其复制为my_cli_demo.py，第6、7行做如下修改：
```
tokenizer = AutoTokenizer.from_pretrained("THUDM/chatglm-6b", trust_remote_code=True)
model = AutoModel.from_pretrained("THUDM/chatglm-6b", trust_remote_code=True).half().cuda()
```
改为
```
tokenizer = AutoTokenizer.from_pretrained("./chatglm-6b", trust_remote_code=True)
model = AutoModel.from_pretrained("./chatglm-6b", trust_remote_code=True).float()
```

然后找到`chatglm-6b`下`modeling_chatglm.py`, 注释掉1394行至1404行：
```
#from .quantization import quantize

#if self.quantized:
#    logger.info("Already quantized.")
#    return self

#self.quantized = True

#self.config.quantization_bit = bits

#self.transformer = quantize(self.transformer, bits, empty_init=empty_init, **kwargs)
```

万事俱备！`python3 my_cli_demo.py`运行！我这里是16GB内存，勉强够用，一个回复大概要等10分钟左右。可能会出现内存不足的情况，可以把其他占内存的应用关掉再试试。
![运行效果，这里遇到了内存不足的问题](1.png)
![运行效果](3.png)
