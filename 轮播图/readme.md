# 轮播图

使用原生JS编写的轮播图demo,实现了以下功能:
+ 自动轮播
+ 图片无缝循环切换
+ 左右按钮切换
+ 数字按钮切换
+ 数字按钮选中效果
+ 鼠标移入停止自动轮播

体验网页: [GitHub Pages](https://mingeax.github.io/FE-Practice/%E8%BD%AE%E6%92%AD%E5%9B%BE/index.html).

## 实现方式

构建一个对象,包含轮播图专有的各种属性和方法.使用时在外部修改该对象的`idx`属性,来触发其setter/getter,以切换到对应的图片.

