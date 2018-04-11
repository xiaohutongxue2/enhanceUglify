# enhanceUglify
node开发的可以批量测试uglify文件

### 背景
老项目改版过程中（jquery-->react），老代码需要逐步进行迁移，迁移过程中，还需要跟进业务需求，
开发同学会出现在老代码中使用ES6语法的情况，导致最终在uglify代码的时候报错，此时，报的错误往
往是在最终打包成的index.js指示错误位置，非常难以定位到真实发生错误代码位置，因此，开发了这个
小工具，旨在出现问题是，快速定位到老代码中错误位置。

### 搭建环境

####1. 安装 node.js

####2. 安装依赖
文件目录内执行<br>

```
npm install
```
####3. 创建软链（快捷方式）
文件目录内执行<br>

```
npm link
```
####4. 命令行执行

```
enhanceUglify XXXX XXXX
```

### 使用介绍

####1. 文件压缩
a.单个文件压缩(相对路径/绝对路径)

```
euglify ./index.js
```
```
euglify /Users/myfolder/index.js
```

b.文件夹中文件压缩

1. 只压缩指定文件夹中文件

	```
	euglify -f foldername
	```
2. 递归压缩指定文件夹中文件（子文件夹中文件也会进行压缩）

	```
	euglify -rf foldername
	```
	```
	euglify -r -f foldername
	```
	<br>

### TODO
#### 1. 目前只是输出能都成功压缩文件的信息，后续会加上对压缩结果的处理
#### 2. 实现uglify参数可配置
