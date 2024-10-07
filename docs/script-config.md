# script 标签配置

虽然变量名称叫做 `window.zeoseven_Superload_JsObj` ，但实际上它其中可以放置任何 script 标签可以加载的文件，因为 Superload 支持自定义 type 。

## 必须：定义 URL - jsUrls

jsUrls 定义了首选链接和备用链接，其中至少存在 1 条 URL ，当存在多条 URL 时，你需要确保它们链接到的是同一个文件，Superload 会依次尝试加载它们。如果你在 Superload 配置中添加了 `https://example.org/main.js` ，则你无需再创建类似 `<script src="https://example.org/main.js"></script>` 这样的单独标签来引入 JavaScript 文件，因为 Superload 会使用 jsUrls 中的第一个链接和属性直接创建 script 标签到 head 中，当 jsUrls 中的第一个链接无法加载时， Superload 会直接删除刚才创建的 script 标签，并直接使用 jsUrls 中的下一个 URL 再次创建相同属性的 script 标签，直到正确加载。

```js
jsScript.src = jsUrl;
```

## 定义哈希 - jsSha

`jsSha 不存在 或 jsSha 为空` 都会指示生成的 script 标签中不添加 `integrity` 属性，当使用公共 CDN 时，为了确保安全性，最佳的方式是应该添加哈希值来确保文件正确。

```js
if (typeof jsSha === 'string' && jsSha !== '') {
    jsScript.integrity = jsSha;
}
```

## 定义延迟 - jsDefer

`jsDefer 不存在 、 jsDefer 为空 或 jsDefer 不是 on` 都会指示生成的 script 标签中不添加 `defer` 属性，当使用 `jsDefer: "on"` 时，它会为生成的 script 标签添加 defer 属性。

```js
if (jsDefer === 'on') {
    jsScript.defer = true;
}
```

## 定义类型 -  jsType

`jsType 不存在 或 jsType 为空` 都会指示生成的 script 标签使用默认值 `type="text/javascript"`

```js
if (typeof jsType === 'string') {
    jsScript.type = jsType;
} else {
    jsScript.type = "text/javascript";
}
```

## 定义异步 - jsAsync

`jsAsync 不存在 、 jsAsync 为空 或 jsAsync 不是 on` 都会指示生成的 script 标签不添加 `async` 属性，除非使用 `jsAsync: "on"` 。

```js
if (jsAsync === 'on') {
    jsScript.async = true;
}
```

## 定义跨域 - jsCors

`jsCors 不存在` 会指示生成的 script 标签不添加 `crossorigin` ，除非存在 jsCors ，不论它是什么值，都会被设置为 `anonymous` ，除非它是 `jsCors: "use-credentials"` 时，才会被设置为 `use-credentials` 。

```js
if (typeof jsCors === 'string') {
    jsScript.crossOrigin = jsCors === 'use-credentials' ? 'use-credentials' : 'anonymous';
}
```
