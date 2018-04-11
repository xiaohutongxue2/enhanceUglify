#!/usr/bin/env node

var program = require('commander');
var UglifyJS = require("uglify-js");
var fs = require('fs-extra');
var path = require('path');
var shell = require('shelljs');
var DEFALUT_CONFIGS = require('./config');

var PROCESS_DIR = process.cwd();
var TRAVERSAL_TYPE = {
  normal: 'NORMAL',
  recursive: 'RECURSIVE'
};

program.option("-f, --folder <foldername>", "Uglify folder.");
program.option("-r, --recursive", "Recursive uglify folder .");
program.option("-o, --output <filename>", "Output file (default none).");
program.option("-c, --combine", "Combined output");
program.parse(process.argv);

var uglifyFiles = [];
var args = program.args;

main();

/**
 * 进程
 * @return {[type]} [description]
 */
function main() {
  if (program.folder) {
    var folderDir = path.resolve(PROCESS_DIR, program.folder);
    var traverslType = TRAVERSAL_TYPE.normal;

    if (program.recursive) {
      traverslType = TRAVERSAL_TYPE.recursive;
    }
    traversalFolder(folderDir, traverslType);
  } else {
    args.forEach(function (item) {
      uglifyFiles.push(path.resolve(PROCESS_DIR, item));
    })
  }

  console.log(uglifyFiles);
  if (uglifyFiles.length) {
    if (program.combine) {
      uglifyFile(uglifyFiles);
    } else {
      for (var i = 0; i < uglifyFiles.length; i ++) {
        uglifyFile(uglifyFiles[i]);
      }
    }
  }
}

/**
 * 遍历文件夹下js文件
 * @param  {[type]} folderName 文件夹名
 * @param  {[type]} type       [normal]: 只遍历文件夹一级目录；[recursive]: 递归遍历
 * @return {[type]}            数组：js文件路径名
 */
function traversalFolder(folderDir, type) {
  try {
    var files = fs.readdirSync(folderDir);

    files.forEach(function(filename){
      var filedir = path.resolve(folderDir, filename);
      var stats = fs.statSync(filedir)
      var isFile = stats.isFile();
      var isDir = stats.isDirectory();

      if (isFile) {
        uglifyFiles.push(filedir);
      }
      if (isDir && type === TRAVERSAL_TYPE.recursive) {
        traversalFolder(filedir, TRAVERSAL_TYPE.recursive);
      }
    })
  } catch (e) {
    console.log(e);
  }
}

/**
 * 压缩文件
 * @param  {[type]} fileName 文件名: string/string[]
 * @return {[type]}          压缩结果
 */
function uglifyFile(fileDir) {
  try {
    const result = UglifyJS.minify(fileDir);

    console.log(fileDir + ' uglify success!');

    return result.code;
  } catch (e) {
    console.log(e);
  }
}
