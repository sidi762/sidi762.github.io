---
title: opencv_mac
date: 2023-03-19 21:59:47
tags:
---
```
sudo cmake \                                          
  -DWITH_OPENJPEG=OFF \
  -DWITH_IPP=OFF \
  -D CMAKE_BUILD_TYPE=RELEASE \
  -D CMAKE_INSTALL_PREFIX=/usr/local \
  -D OPENCV_EXTRA_MODULES_PATH=/Users/liangsidi/Documents/Study/TDPS/opencv_contrib-4.7.0/modules \
  -D PYTHON3_EXECUTABLE=/Users/liangsidi/.pyenv/shims/python3 \
  -D BUILD_opencv_python2=OFF \
  -D BUILD_opencv_python3=ON \
  -D INSTALL_PYTHON_EXAMPLES=ON \
  -D INSTALL_C_EXAMPLES=OFF \
  -D OPENCV_ENABLE_NONFREE=ON \
  -DBUILD_ZLIB=OFF ..

```
不加sudo似乎会卡死
提示找不到JNI解决方法：在环境变量中添加`JAVA_HOME`

```
sudo make -j8      
sudo make install  
```
