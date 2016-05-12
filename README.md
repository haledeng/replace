# replace
在页面用使用replace('xxx')，被会替换成对应的文件。其中 html（模板） 文件会被转化成 JS，
css 被转化成字符串


### install
```
npm i replace-file -g
```

### usage
```
rep -w input.js output.js
// -w 表示开启监听
// input.js 是被处理文件，其中所有的replace('xxx.xxx')会被做相应的处理。
// output.js 是处理后生成的文件
```
