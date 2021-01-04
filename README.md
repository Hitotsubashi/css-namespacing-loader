# css-namespacing-loader

A WebPack Loader that adds a namespace to a CSS file under the specified path. It is based on [css-namespacing](https://www.npmjs.com/package/css-namespacing).

This loader has two functions:

- This loader is mainly used to prevent global contamination of styles caused by the introduction of third-party CSS.

- During development, when compiling CSS code, it will automatically add namespace to the specified classname according to the options. 

## Getting Started

To begin, you'll need to install `css-namespacing-loader`:

```console
$ npm install css-namespacing --save-dev
```

Then add the plugin to your `webpack` config. For example:

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

In addition, in the CSS code, you can use `@namespacing` flexibly set the above configuration.If you want to learn more,check [here](https://github.com/Hitotsubashi/css-namespacing#atrulenamespacing).

If you want to learn more about the result after namespacing, please check [css-namespacing](https://github.com/Hitotsubashi/css-namespacing).

## Options

|Name|Type|Default|Necessary|Description|
|----|----|-------|-----------|--|
|[`namespace`](#namespace)|`{Array}`|`undefined` |`true`|an array contains different namespace and filepath that need to defined|

### namespace

Type: `Array`
Default: `undefined`

element in `namespace` is an object,and it contains the following properties.

|Name|Type|Default|Necessary|Description|
|----|----|-------|-----------|---------|
|[`path`](#path)|`{Array<String|RegExp>}`|`undefined`|`false`|the matching path of the CSS file to add the namespace|
|[`value`](#value)|`{String}`|`undefined`|`false`|the value of namespace you want to prefix|
|`not`|`{Array<RegExp>}`|`undefined`|`false`|the classname that is not be prefixed with namespace|
|`only`|`{Array<RegExp>}`|`undefined`|`false`|only the classname  will be prefixed, and the classname that is not matched by a regular expression in only will not be added|
### path

Type: `{Array<String|RegExp>}`
Default: `undefined`

1.use RegExp in Array

For example:

```js
options:{
  namespace:[
    { value: 'bsp-', path: [/bootstrap/] }
  ]
}
```

It will find matched files through `Regexp.prototype.test` like `path.test(filepath)`

2.use String in Array

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

3.path is empty

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
At this time,it will adds a namespace to the class names of all the SCANNED CSS files.

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

At this time,No namespace will be added to any file scanned in bootstrap.
### not and only

If you want to learn more about `not` and `only` ,check [here](https://github.com/Hitotsubashi/css-namespacing#atrulenamespacing).

## License

[MIT](./LICENSE)