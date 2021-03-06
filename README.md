# css-namespacing-loader

[中文文档](./README_CN.md)

A WebPack Loader dedicated to handling CSS namespaces. It is based on [css-namespacing](https://www.npmjs.com/package/css-namespacing).

This loader has two functions:

- This loader is mainly used to prevent global contamination of styles caused by the introduction of third-party CSS.

- During development, when compiling CSS code, it will automatically add namespace to the specified classname according to the options. 

## Getting Started

To begin, you'll need to install `css-namespacing-loader`:

```console
$ npm install css-namespacing-loader --save-dev
```

In the entry file, you import `bootstrap` 

**entry.js**

```js
import 'bootstrap/dist/css/bootstrap.min.css'
```

Then add the loader to your `webpack` config. For example:

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

After running `webpack` via your preferred method,when you want to use bootstrap's style,use `bsp-container` instead of `container`,like:
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

In the `options`, you can set which classnames do not need to be prefixed, or only which classnames need to be prefixed, and the value of the namespace.

In addition, in the CSS code, you can use `@namespacing` flexibly set the above configuration.If you want to learn more,check [here](https://github.com/Hitotsubashi/css-namespacing#atrule).

If you want to learn more about the result after namespacing, please check [css-namespacing](https://github.com/Hitotsubashi/css-namespacing).

## Options

|Name|Type|Default|Necessary|Description|
|----|----|-------|-----------|--|
|[`namespace`](#namespace)|`{Array}`|`undefined` |`true`|An array containing multiple configurations|

### namespace

Type: `Array`
Default: `undefined`

element in `namespace` is an object,and it contains the following properties.

|Name|Type|Default|Necessary|Description|
|----|----|-------|-----------|---------|
|[`path`](#path)|`{Array<String/RegExp>}`|`undefined`|`false`|An array that contains the matching path for the CSS file to add the namespace to|
|[`value`](#value)|`{String}`|`undefined`|`false`|the value of namespace you want to prefix|
|[`not`](#not)|`{Array<RegExp>}`|`undefined`|`false`|An array that contains the matching classnames that are not prefixed by specified namespace|
|[`only`](#only)|`{Array<RegExp>}`|`undefined`|`false`|An array that contains the matching classnames that will only be prefixed by specified namespace|
### path

Type: `{Array<String|RegExp>}`
Default: `undefined`

**1.use RegExp in Array**

For example:

```js
options:{
  namespace:[
    { value: 'bsp-', path: [/bootstrap/] }
  ]
}
```

It will find matched files through `Regexp.prototype.test` like `path.test(filepath)`

**2.use String in Array**

For example:

```js
options:{
  namespace:[
    { value: 'bsp-', path: [path.resolve(___dirname,'./node_modules/bootstrap/dist/css/bootstrap.min.css']) }
  ]
}
```
It will find matched files through `String.prototype.includes` like `filepath.includes(path)`

***Attention: It would be better to use path.resolve to get your path thanks to the difference of file separators between window and linux.***

**3.path is not defined**

For example:
```js
options:{
  namespace:[
    { 
      value: 'my-',  
    }
  ]
}
```
At this time,it will adds a namespace to the class names of all the scanned CSS files.

### value

Type: `{String}`
Default: `undefined`

if value is `undefined`,for example:
```js
options:{
  namespace:[
    { 
      path:[/bootstrap/]
    }
  ]
}
```

At this time,the scanned files will not be processed.
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
At this time,all classnames named `box` will not be prefixed with namespace in the code of the CSS file being scanned.

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
At this time,in the code of the CSS file being scanned,only the classname named `box` will be prefixed with namespace
## License

[MIT](./LICENSE)