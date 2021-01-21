# css-namespacing-loader

一个专门用于处理CSS命名空间的webpack loader。它是基于[css-namespacing](https://www.npmjs.com/package/css-namespacing)实现的。

这个loader主要有两个功能:

- 它用于避免因第三方CSS库的引入导致的全局样式污染。

- 在开发过程中，编译CSS代码时，它会根据配置自动将命名空间添加到指定的类名中。

## 快速入门

一开始，你要通过npm下载 `css-namespacing-loader`:

```console
$ npm install css-namespacing-loader --save-dev
```

然后把loader添加到 `webpack` 配置中。例如:

**entry.js**

```js
import 'bootstrap/dist/css/bootstrap.min.css'
```

**webpack.config.js**

```js
module.exports = {
  module: {
    rules:[
      {
        test: /\.css$/i,
        use: [
          "style-loader",
          "css-loader",
          {
            loader:"css-namespacing-loader",
            options:{
              namespace:[
                { value: 'bsp-', path: [/bootstrap/] }
              ]
            }
          }
        ]
      }
    ]
  }
}
```

在通过你偏好的方式运行`webpack`之后，当你使用bootstrap里面的样式时，将会以 `bsp-container` 替代 `container`，例如:
```html
<div class="bsp-container">
  <div class="bsp-row">
    <div class="bsp-col-sm">
      One of three columns
    </div>
    <div class="bsp-col-sm">
      One of three columns
    </div>
    <div class="bsp-col-sm">
      One of three columns
    </div>
  </div>
</div>
```

在`options`中, 你可以设置哪些类名不需要被添加命名空间，或者只有哪些类名需要被添加命名空间，以及命名空间的值。

另外，在CSS代码中，你可以使用`@namespacing`注解灵活地设置以上配置。如果你想了解更多，请查看[这里](https://github.com/Hitotsubashi/css-namespacing#atrulenamespacing)。

如果你想查看关于处理后的结果，请阅读[css-namespacing](https://github.com/Hitotsubashi/css-namespacing).

## Options配置

|Name|Type|Default|Necessary|Description|
|----|----|-------|-----------|--|
|[`namespace`](#namespace)|`{Array}`|`undefined` |`true`|包含多个配置的数组|

### namespace

Type: `Array`
Default: `undefined`

`namespace`数组中的元素是一个对象，它包含以下属性。

|Name|Type|Default|Necessary|Description|
|----|----|-------|-----------|---------|
|[`path`](#path)|`{Array<String/RegExp>}`|`undefined`|`false`|包含要添加命名空间的CSS文件的匹配路径的数组|
|[`value`](#value)|`{String}`|`undefined`|`false`|要添加前缀的名称空间的值|
|[`not`](#not)|`{Array<RegExp>}`|`undefined`|`false`|包含着不会被添加命名空间的类名的数组|
|[`only`](#only)|`{Array<RegExp>}`|`undefined`|`false`|包含着只会被添加命名空间的类名的数组|
### path

Type: `{Array<String|RegExp>}`
Default: `undefined`

**1.在数组中使用正则表达式**

例如:

```js
options:{
  namespace:[
    { value: 'bsp-', path: [/bootstrap/] }
  ]
}
```

它会通过 `Regexp.prototype.test` 以 `path.test(filepath)`的方式找到匹配的文件

**2.在数组中使用字符串**

例如:

```js
options:{
  namespace:[
    { value: 'bsp-', path: [path.resolve(___dirname,'./node_modules/bootstrap/dist/css/bootstrap.min.css']) }
  ]
}
```
他会通过 `String.prototype.includes` 以 `filepath.includes(path)`的方式找到匹配的文件

***注意:由于windows和linux之间的文件分隔符不同，所以最好使用path.resolve去获取文件路径。***

**3.path没有定义**

例如:
```js
options:{
  namespace:[
    { 
      value: 'my-',  
    }
  ]
}
```
这种设置下，所有被扫描的CSS文件里的类名都被添加名称空间。.

### value

Type: `{String}`
Default: `undefined`

若该值为`undefined`,例如:
```js
options:{
  namespace:[
    { 
      path:[/bootstrap/]
    }
  ]
}
```

这种配置下，被扫描到的文件不会有任何处理。
### not

Type:`{Array<RegExp>}`
Default:`undefined`

For example:
```js
options:{
  namespace:[
    { 
      path:[/bootstrap/],
      not:[/^box$/]
    }
  ]
}
```
这种配置下，在被扫描的CSS文件中，所有名为`box`的类名都不会被添加命名空间。

### only
For example:
```js
options:{
  namespace:[
    { 
      path:[/bootstrap/],
      not:[/^box$/]
    }
  ]
}
```
这种配置下，在被扫描的CSS文件中，只有名为`box`的类名才会被添加命名空间。
## License

[MIT](./LICENSE)