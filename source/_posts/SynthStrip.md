---
title: 使用SynthStrip对任意序列(T1、T2、FLAIR、T1CE等)脑部MRI图像进行去颅骨处理
date: 2023-03-18 12:19:02
categories: 医学图像处理
author: Sidi Liang
tags:    
    - 医学图像处理
    - 中文
---

目前正在做的项目需要对T1, T2, FLAIR 和T1CE四种序列的脑部MRI图像进行预处理，主要是归一化和去颅骨。然而，操作中发现FreeSurfer的去颅骨算法只适用于T1，并不适用于其他几个序列，切出来的结果非常混乱。经过一段时间搜索后发现了一个叫[SynthStrip](https://pubmed.ncbi.nlm.nih.gov/35842095/)[1]的去颅骨方法，应用神经网络将图像中的颅骨部分去除，可以对任意序列的脑部图像进行去颅骨。  
![SynthStrip论文](img1.png)  
访问官网，发现这个工具已经在 v7.3.0 release中被整合进FreeSurfer中，且在2023-02-14这天的freesurfer release中修复了一个已知的问题。二话不说，直接下载安装dev版本的freesurfer（[官方下载地址](https://surfer.nmr.mgh.harvard.edu/pub/dist/freesurfer/dev/)），思路就是先完成去颅骨之前的处理步骤，然后改用新版FreeSurfer软件包里集成的SynthStrip工具进行去颅骨。
```
recon-all -s ./subjects/bratsexample -i Brats17_CBICA_ABO_1_t2.nii.gz -autorecon1 -noskullstrip
mri_synthstrip -i ./subjects/bratsexample/mri/T1.mgz -o /preprocess/sub/mri/strip.mgz
mri_convert ./subjects/bratsexample/mri/strip.mgz /preprocess/sub/mri/Brats17_CBICA_ABO_1_t2_preprocessed.nii.gz
```
![T2、FLAIR、T1CE处理效果](img2.png)  

可以看到，使用SynthStrip工具可以正确去除T1、T2、FLAIR、T1CE四个序列MRI图像中的颅骨部分，解决了原有工具难以对T2、FLAIR、T1CE自动去颅骨的问题。  


[1] Hoopes A, Mora JS, Dalca AV, Fischl B, Hoffmann M. SynthStrip: skull-stripping for any brain image. Neuroimage. 2022 Oct 15;260:119474. doi: 10.1016/j.neuroimage.2022.119474. Epub 2022 Jul 13. PMID: 35842095; PMCID: PMC9465771.
