---
title: 笔记 - 在macOS上使用FreeSurfer对脑部MRI图像进行预处理
date: 2023-03-17 20:06:02
author: LIANG Sidi
categories: 医学图像处理
tags:
    - 医学图像处理
    - 中文
---
[FreeSurfer](http://freesurfer.net)是一个开源的软件套件，集成了许多知名工具（如ANTs、FSL等），被广泛用于处理和分析人脑MRI成像数据，且目前开发团队仍然在对其进行维护和更新。`recon-all` 是FreeSurfer的核心指令，用于完成FreeSurfer皮质重建的部分或全部过程。`recon-all` 大概有30多个步骤，并提供了只完成其中某些步骤的选项。我使用FreeSurfer主要是利用它前面的几个预处理步骤，包括强度归一化、映射到标准脑、以及去颅骨。
有一个细节，就是根据FreeSurfer的文档， ***FreeSurfer（中的许多工具）只能用于处理T1序列的图像*** 。实际操作中发现FreeSurfer的去颅骨算法是根据颜色的不同进行去颅骨，把T2的图像送进去会出很大问题。目前项目需要处理T2等其他几个序列的图像，尝试过使用FSL，效果不理想，现在仍然在寻找合适的预处理方法。（前几天查文献查到了一个叫[SynthStrip](https://pubmed.ncbi.nlm.nih.gov/35842095/)[1]的去颅骨方法，使用了神经网络，据称是可以对任意脑部图像进行去颅骨，再一查发现这个工具已经在2023年初被整合进FreeSurfer了，这几天更新FreeSurfer尝试之后会再写一篇笔记记录效果。）
更新：用一例T2图像试了一下，SynthStrip效果确实很好！后面写个批处理把所有的图像都用这个方法处理一下看看效果，然后写篇博客记录一下！

## 安装
在macOS上安装FreeSurfer的过程比较简单。首先在[官网](https://surfer.nmr.mgh.harvard.edu/fswiki/rel7downloads)下载最新版安装包进行安装，有tar包和pkg包可选，我这里选用**pkg**安装包。软件比较大，需要提前在电脑上预留二三十个G左右。下载完成后直接双击打开，按提示进行安装。

### 许可证
使用FreeSurfer之前需要去官网申请一个许可证。这个许可证是免费的，据官方说法主要是为了统计软件使用情况。[前往这个链接](https://surfer.nmr.mgh.harvard.edu/registration.html)填写好申请表就可以申请到许可证了。最后有一个reCAPTCHA验证，如果加载不出来可能需要科学上网。获得许可证之后把许可证扔到FreeSurfer根目录下（`/Applications/freesurfer/<你安装的FreeSurfer版本,可以用Finder去看一下实际路径>`）就可以了。

### 设置环境变量
安装完成后，需要设置一下环境变量。在终端中输入下列命令：
```
$ export FREESURFER_HOME=/Applications/freesurfer/<你安装的FreeSurfer版本,可以用Finder去看一下实际路径>
$ export SUBJECTS_DIR=$FREESURFER_HOME/subjects
$ source $FREESURFER_HOME/SetUpFreeSurfer.sh

```
这时应该会看到类似下面的输出(版本号可能不同):
```
-------- freesurfer-darwin-macOS-7.1.1-20200429-3a03ebd --------
Setting up environment for FreeSurfer/FS-FAST (and FSL)
WARNING: /Users/synpro/freesurfer/fsfast does not exist
FREESURFER_HOME   /Applications/freesurfer/7.1.1
FSFAST_HOME       /Users/synpro/freesurfer/fsfast
FSF_OUTPUT_FORMAT nii.gz
SUBJECTS_DIR      /Applications/freesurfer/7.1.1/su
```
这时输入`which freeview`，如果返回正确的FreeView路径（类似`/Applications/freesurfer/7.1.1/bin/freeview`）说明安装成功。

## 运行
根据FreeSurfer[官方文档](https://surfer.nmr.mgh.harvard.edu/fswiki/recon-all#StepDescriptionSummaries)，当前版本中 recon-all 共有以下31个步骤：
```
Autorecon Processing Stages (see -autorecon# flags above):
1. Motion Correction and Conform
2. NU (Non-Uniform intensity normalization)
3. Talairach transform computation
4. Intensity Normalization 1
5. Skull Strip
6. EM Register (linear volumetric registration)
7. The CA Intensity Normalization
8. CA Non-linear Volumetric Registration
9. Remove Neck
10. LTA with Skull
11. CA Label (Volumetric Labeling, ie Aseg) and Statistics
12. Intensity Normalization 2 (start here for control points)
13. White matter segmentation
14. Edit WM With ASeg
15. Fill (start here for wm edits)
16. Tessellation (begins per-hemisphere operations)
17. Smooth1
18. Inflate1
19. QSphere
20. Automatic Topology Fixer
21. Final Surfs (start here for brain edits for pial surf)
22. Smooth2
23. Inflate2
24. Spherical Mapping
25. Spherical Registration
26. Spherical Registration, Contralateral hemisphere
27. Map average curvature to subject
28. Cortical Parcellation - Desikan-Killiany and Christophe (Labeling)
29. Cortical Parcellation Statistics
30. Cortical Ribbon Mask
31. Cortical Parcellation mapping to Aseg
```
同时 `recon-all` 提供了`-autorecon1` 参数，使用该参数时只执行步骤1-5，刚好满足我们的需求。recon-all还有许多其他的参数，具体可以参考官方文档中[介绍recon-all的部分](https://surfer.nmr.mgh.harvard.edu/fswiki/recon-all#StepDescriptionSummaries)。

运行`recon-all`：
```
recon-all -s <输出路径> -i <nii或dcm文件, 如/path/to/nii/my_nii_file.nii.gz> -autorecon1

```
运行完成后，为这个病例生成的所有文件都可以在输出路径中找到。我们主要用mri文件夹内的文件。查询文档得知，去颅骨后的结果被保存在`mri/brainmask.auto.mgz`文件中。可以运行`mri_convert brainmask.auto.mgz result.nii`将文件转换回nii文件。注意此时的图像的大小已经变为`256*256*256`。

[1] Hoopes A, Mora JS, Dalca AV, Fischl B, Hoffmann M. SynthStrip: skull-stripping for any brain image. Neuroimage. 2022 Oct 15;260:119474. doi: 10.1016/j.neuroimage.2022.119474. Epub 2022 Jul 13. PMID: 35842095; PMCID: PMC9465771.
