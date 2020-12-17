# css-namespacing-loader

A WebPack Loader that adds a namespace to a CSS file under the specified path. It is based on [css-namespacing](https://www.npmjs.com/package/css-namespacing).

This loader is mainly used to prevent global contamination of styles caused by the introduction of third-party CSS.

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
          },
          "postcss-loader"
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
If you are questioning the validity of the loader, can go to read the [CSS-namespacing example](https://github.com/Hitotsubashi/css-namespacing#availability).

## Options

|Name|Type|Default|Description|
|----|----|-------|-----------|
|[`namespace`](#namespace)|`{Array}`|`undefined` |an array contains different namespace and filepath that need to defined|

### namespace

Type: `Array`
Default: `undefined`

element in `namespace` is an object,and it contains the following properties.

|Name|Type|Default|Necessary|Description|
|----|----|-------|-----------|---------|
|[`path`](#path)|`{Array|String|RegExp}`|`undefined`|`false`|The matching path of the CSS file to add the namespace|
|[`value`](#value)|`{String}`|`undefined`|`false`|The value of namespace you want to prefix|

### path

Type: `{Array|String|RegExp}`
Default: `undefined`

**use RegExp(recommend)**

For example:

```js
options:{
  namespace:[
    { value: 'bsp-', path: [/bootstrap/] }
  ]
}
```

It will find matched files through `Regexp.prototype.test` like `path.test(filepath)`

**use String**

For example:

```js
options:{
  namespace:[
    { value: 'bsp-', path: path.resolve(___dirname,'./node_modules/bootstrap/dist/css/bootstrap.min.css') }
  ]
}
```
It will find matched files through `String.prototype.includes` like `filepath.includes(path)`

***Attention: It would be better to use path.resolve to get your path thanks to the difference of file separators between window and linux.***

**use Array**

The element in the array is also one of the strings and regular expressions.And Strings and regular expressions are used the same way as above.

For example:
```js
options:{
  namespace:[
    { 
      value: 'my-', 
      path: [
        path.resolve(___dirname,'./node_modules/bootstrap'),
        /animate.css/
        ] 
    }
  ]
}
```
And it will gives the "my-" namespace to all class names in the CSS files under bootstrap and animate.css .


**use Undefined**
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

**use Undefined**
For example:
```js
options:{
  namespace:[
    { 
      path:/bootstrap/ 
    }
  ]
}
```

At this time,No namespace will be added to any file scanned in bootstrap.