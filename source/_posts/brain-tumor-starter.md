---
title: 脑瘤相关论文笔记  
date: 2022-05-19 15:05:36
categories: 医学图像处理
author: Sidi Liang
tags:
    - 医学图像处理
    - English
    - 中文
---
## 机器学习领域
1. ***Deep Learning With Data Enhancement for the Differentiation of Solitary and Multiple Cerebral Glioblastoma, Lymphoma, and Tumefactive Demyelinating Lesion*** [详细笔记](./Deep_Learning_With_Data_Enhancement_for_the_Differentiation_of_Solitary_and_Multiple_Cerebral_Glioblastoma_Lymphoma_and_Tumefactive_Demyelinating_Lesion/notes.pdf)

2. Differentiating Primary Central Nervous System Lymphomas From Glioblastomas and Inflammatory Demyelinating Pseudotumor Using Relative Minimum Apparent Diffusion Coefficients   
为1引用的文章，从标题看也是区分淋巴瘤、胶质瘤和瘤样脱髓鞘病

3. Detection of pseudo brain tumors via stacked LSTM neural networks using MR spectroscopy signals.pdf 使用的是MRS   

4. Performance of machine learning algorithms for glioma segmentation of brain MRI: a systematic literature review and meta-analysis 综述，被引量只有4

5. Brain_Tumor_Segmentation_Using_Convolutional_Neural_Networks_in_MRI_Images 引用量很高，有点老  

6. N4ITK_Improved_N3_Bias_Correction N4ITK预处理方法  

### 脑瘤分类
* 待补充

### 脑瘤分割(BraTS)：一些其他的BraTS Challenge的论文  
有3D 2D 2.5D，以使用3D CNN居多
1. Efficient multi-scale 3D CNN with fully connected CRF for accurate brain lesion segmentation 被引量很高，使用3D CNN，使用CRF作为后处理  

2. Automatic Brain Tumor Segmentation Based on Cascaded Convolutional Neural Networks With Uncertainty Estimation 多个网络处理统一张图片，分别识别肿瘤，tumor core 和enhanced core 使用2.5D CNN

3. Machine Learning Based Brain Tumour Segmentation on Limited Data Using Local Textture and Abnormality 提到了预处理，统计数据集情况后发现不是所有人都有T2，因此使用T1ce 和 FLAIR  

4. A_Modified_U-Net_Convolutional_Network_Featuring_a_Nearest-neighbor_Re-sampling-based_Elastic-Transformation_for_Brain_Tissue_Characterization_and_Segmentation 使用了UNet  


### 脑瘤分割
1. Low-Grade Glioma Segmentation Based on CNN with Fully Connected CRF 自有数据集 上海华山医院 关注LGG的识别，发现LGG在T2 FLAIR中更有辨识度，因此使用T2 FLAIR 3DCNN+3DCRF  

2. Clinical Evaluation of a Multiparametric Deep Learning Model for Glioblastoma Segmentation Using Heterogeneous Magnetic Resonance Imaging Data From Clinical Routine 3DCNN+3DCRF 预处理：bias field correction +  T1w, T2w, and FLAIR coregisered to reference space defined by T1CE

## 医学领域
1. Cerebral tumor or pseudotumor   
关于如何分辨脑瘤与炎性假瘤, T2似乎比较重要
* Demyelinating lesions can present a pseudotumoral appearance related to a significant inflammatory reaction, with hyperT2 areas appearing extensive, more than 2cm in diameter.
* Lesions appear in T2 isosignal or hypersignal.
* Some MRI signs：
    * no or little mass effect compared with the size of the lesion
    * an incomplete ring enhancement, with in particular, “C-shape” enhancement of a sub-cortical lesions
    * a peripheral border with restricted diffusion consistent with a demyelinating front and the presence of a normal vessel within the lesion traducing the venular tropism of the lesions (more visible after injection or in magnetic susceptibility imaging)

### TIDD
1. Intracranial Demyelinating Pseudotumor_A Case Report and Review of the Literature
* Unlike astrocytoma, demyelinating pseudotumor is often accompanied with light edema and less mass effect, which can be observed on CT and MRI scans;
* Lesion enhancements of demyelinating pseudotumor tend to be perpendicular to the surface of the lateral ventricle;
