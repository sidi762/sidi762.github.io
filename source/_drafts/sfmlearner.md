---
title: 论文翻译：Unsupervised Learning of Depth and Ego-Motion from Video 从视频中对深度和自身运动进行无监督学习
date: 2025-01-04 13:36:15
author: Tinghui Zhou, Matthew Brown, Noah Snavely, David G. Lowe
categories: SLAM
tags:
    - SLAM
    - Computer Vision
    - Deep Learning
    - Monocular Depth Estimation
    - Unsupervised Learning
    - Ego-Motion Estimation
---
>本文为CVPR'17论文《Unsupervised Learning of Depth and Ego-Motion from Video》的中文翻译版。*

## 摘要

我们提出了一种无监督学习框架，用于从非结构化视频序列中进行单目深度和相机运动估计。与近期相关工作类似，我们采用了一种以视图合成为监督信号的端到端学习方法。然而，与之前的工作不同，我们的方法完全无监督，仅需要单目视频序列进行训练。

我们的方法使用单视图深度和多视图姿态网络，并基于通过计算的深度和姿态将相邻视图变换到目标视图来定义损失函数。在训练过程中，这些网络通过损失函数耦合，但在测试时可以独立应用。

在 KITTI 数据集上的实验证明了我们方法的有效性：
1. 单目深度估计的性能与使用地面真实深度或姿态监督的有监督方法相当。
2. 姿态估计与传统 SLAM 系统在相同输入条件下表现相当。

[代码开源地址](https://github.com/tinghuiz/SfMLearner)

## 引言

人类即使在短时间内也能够推断自身运动和场景的三维结构。例如，在街道上行走时，我们可以轻松识别障碍物并迅速反应以避开它们。尽管几何计算机视觉研究多年，但在对现实场景进行类似建模（例如处理非刚性、遮挡和缺乏纹理的场景）方面仍未达到类似的能力。

为什么人类能在这项任务上表现如此出色？一种假设是，我们通过大量的视觉经验（主要通过移动观察大量场景并开发**一致**的观察建模）发展出了一种丰富的结构化理解。从数百万次这样的观察中，我们了解了世界的规律性，例如道路是平坦的，建筑物是笔直的，汽车由道路支撑等，并且我们在感知新场景时即便是从单一单目图像中也能够应用这些知识。

![系统训练数据](path/to/figs/teaser.png)
_图 1: 系统仅使用未标注的图像序列作为训练数据_

在这项工作中，我们通过训练一个模型来模仿这种方法，该模型观察图像序列，并通过预测可能的相机运动和场景结构来解释其观察结果。我们采用端到端的方法，允许模型直接从输入像素映射到自身运动的估计（参数化为6自由度变换矩阵）和底层场景结构（参数化为参考视图下的逐像素深度图）。

我们的方法是无监督的，可以简单地使用图像序列进行训练，无需手动标记甚至相机运动信息。

我们的方法基于这样的洞察：几何视图合成系统只有在其中间预测的场景几何和相机姿态与物理真实值对应时，才能\emph{一致地}表现良好。虽然不完美的几何和/或姿态估计可以在某些类型的场景（例如，无纹理的场景）中通过合理的合成视图作弊，但相同的模型在面对另一组具有更多样化布局和外观结构的场景时会失败。因此，我们的目标是将整个视图合成流程制定为卷积神经网络的推理过程，以便通过在大型视频数据上训练网络进行视图合成的“元”任务，迫使网络学习深度和相机姿态估计的中间任务，以便对视觉世界提出一致的解释。在KITTI基准上的实验评估证明了我们在单视图深度和相机姿态估计上的有效性。
## 相关工作

### 基于运动的结构恢复
结构和运动的同时估计是一个被广泛研究的问题，并拥有一套成熟的技术工具链 [@furukawa2010towards; @wu2011visualsfm; @newcombe2011dtam]。尽管传统的工具链在许多情况下都非常有效和高效，但其对准确图像对应的依赖会在低纹理、复杂几何/光照、细小结构和遮挡区域引发问题。为了解决这些问题，处理流程的多个阶段最近使用深度学习进行了改进，例如特征匹配 [@han2015matchnet]、姿态估计 [@kendall2015posenet] 和立体匹配 [@flynn2016deepstereo; @kendall2017end; @zbontar2016stereo]。这些基于学习的技术具有吸引力，因为它们能够在训练过程中利用外部监督，并在测试数据中潜在地克服上述问题。

### 基于变形的视图合成
几何场景理解的一个重要应用是新视图合成任务，其目标是从新的相机视点合成场景的外观。经典的视图合成范式是首先显式估计底层 3D 几何结构或在输入视图间建立像素对应关系，然后通过从输入视图中组合图像块合成新视图（例如 [@chen1993view; @zitnick2004high; @seitz1996view; @debevec1996modeling]）。
最近，端到端学习被用于通过基于深度或光流的输入变换来重建新视图，例如 DeepStereo [@flynn2016deepstereo]、Deep3D [@xie2016deep] 和 Appearance Flows [@zhou2016view]。在这些方法中，底层几何分别由量化深度平面（DeepStereo）、概率视差图（Deep3D）和视点相关光流场（Appearance Flows）表示。与直接从输入视图映射到目标视图的方法不同（例如 [@tatarchenko2016multi]），基于变形的方法被强迫学习几何和/或对应关系的中间预测。在本工作中，我们旨在从训练进行基于变形视图合成的卷积神经网络中提取这种几何推理能力。

### 从配准的 2D 视图中学习单视图 3D
我们的工作与最近关于从配准的 2D 观察中学习单视图 3D 推理的研究密切相关。Garg 等人 [@garg2016unsupervised] 提出使用投影误差作为监督训练单视图深度估计 CNN，前提是与经过校准的立体双目图像对齐。同时，Deep3D [@xie2016deep] 从输入图像预测第二个立体视点，并将立体电影镜头用作训练数据。类似地，Godard 等人 [@godard2016unsupervised] 提出了一种左-右一致性约束，以及一种更优的架构设计，从而实现了令人印象深刻的性能。与我们的方法类似，这些技术仅从世界的图像观察中学习，而不像需要显式深度进行训练的方法，例如 [@hoiem2005photo; @saxena2009make3d; @eigen2014depth; @kendall2017end; @kuznietsov2017semi]。

这些技术与直接结构和运动估计方法 [@irani1999direct] 有一定相似之处，其中相机参数和场景深度通过最小化基于像素的误差函数进行调整。然而，与直接最小化误差以获得估计不同，基于 CNN 的方法仅对每批输入实例采取一次梯度步骤，从而允许网络从大量相关图像语料库中学习隐式先验。几位作者还探索了将可微渲染操作集成到他们通过这种方式训练的模型中，例如 [@handa2016gvnn; @kulkarni2015; @loper2014opendr]。

尽管上述大多数技术（包括我们的方法）主要集中于将深度图作为场景几何的输出，但最近的工作（例如 [@rezende2016unsupervised; @tulsiani2017multi; @yan2016perspective]）还表明，从 2D 观察中基于相似的投影几何原理学习 3D 体积表示也是可行的。Fouhey 等人 [@fouhey2015single] 进一步表明，通过利用场景规律性，甚至无需 3D 标签（或配准的 2D 视图）也可以实现 3D 推理的学习。

### 从视频中无监督/自监督学习
与我们的工作相关的另一研究方向是从视频中进行视觉表示学习，其总体目标是设计预任务，从视频数据中学习通用视觉特征，这些特征可以随后被重新用于其他视觉任务，例如目标检测和语义分割。这些预任务包括自身运动估计 [@agrawal2015learning; @jayaraman-iccv2015]、目标跟踪 [@wang2015unsupervised]、时间一致性 [@goroshin2015unsupervised]、时间顺序验证 [@misra2016shuffle] 和目标运动掩码预测 [@pathakCVPR17learning]。尽管我们在本工作中专注于明确的场景几何和自身运动的推理，但直觉上，深度网络学习的内部表示（特别是单视图深度 CNN）应该捕获某种程度的语义，这些语义可以推广到其他任务。

与我们的工作同时，Vijayanarasimhan 等人 [@Vijayanarasimhan2017SfM] 独立提出了一个从视频中联合训练深度、相机运动和场景运动的框架。尽管这两种方法在概念上相似，但我们的工作专注于无监督方面，而他们的框架增加了整合监督（例如深度、相机运动或场景运动）的能力。这两种方法在训练过程中对场景动态的建模方式上存在显著差异：他们显式解决了目标运动问题，而我们的可解释性掩码则忽略了运动、遮挡和其他因素作用的区域。


## 方法

在此，我们提出了一种框架，用于从未标注的视频序列中联合训练单视图深度卷积神经网络（CNN）和相机姿态估计 CNN。

### 基于视图合成的监督
我们的深度和姿态预测 CNN 的关键监督信号来自新视图合成任务：给定场景的一个输入视图，合成该场景在不同相机姿态下的新图像。

公式如下：

```math
\mathcal{L}_{vs} = \sum_s\sum_p | I_t(p) - \hat{I}_s(p) |
```

其中，\( \hat{I}_s \) 是基于深度图像渲染模块从源视图变换到目标视图的结果。

### 网络架构
#### 单视图深度
我们采用了 DispNet 架构，它基于带有跳跃连接的编码器-解码器设计，并具有多尺度的侧边预测。

#### 姿态估计
姿态网络的输入是目标视图与所有源视图沿颜色通道方向的级联，输出是目标视图与每个源视图之间的相对姿态。

#### 可解释性掩码
我们设计了可解释性预测网络来处理场景动态和遮挡问题。该网络为每个目标-源对输出逐像素的软掩码，用于权衡未考虑的因素。

### 损失函数
最终目标函数为：

```math
\mathcal{L}_{final} = \sum_l \mathcal{L}_{vs}^l + \lambda_s \mathcal{L}^l_{smooth} + \lambda_e \sum_{s} \mathcal{L}_{reg}(\hat{E}_s^l)
```
