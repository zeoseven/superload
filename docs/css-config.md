# CSS 文件 配置

使用变量 `window.zeoseven_Superload_CssObj` ，它和 script 不同，必须项除了 URL 还需要提供一个 `rootVariable` ，因为 Superload 根据根变量是否存在来判断是否使用备用 URL 。

## 必须：定义备用 URL - cssUrls

cssUrls 定义了备用链接， cssUrls 中甚至可以不填写任何一个 URL ，但也会导致使用 Superload 不会有什么作用，它不会立即生成一个 link 标签到 head ，因为动态生成 CSS 文件链接会导致页面闪烁，`而是应该你主动硬编码一个 link 或 @import` ， 当你为 Superload 提供这个 CSS 的根变量或你创建的根变量后， Superload 会检测它并确定是否使用备用 URL 。

```js
cssLink.href = cssUrl;
```

## 必须：定义根变量 - rootVariable

你需要提供要检测的 CSS 文件根变量，你可以创建一个根变量专门用于 Superload 检测，当 Superload 没有检测到根变量时，会使用备用 URL 生成 link 。你需要确保多个 CSS 文件的根变量是不一致的，因为 Superload 根据根变量是否存在来判断是否使用备用 URL ，这就会导致如果你提供了重复的根变量， Superload 可能无法正确工作。

```css
:root {
    /* 你甚至可以将其定义为空值，因为 Superload 只关注变量是否存在 */
    --superload-1: "";
}
```

源码如下

```js
const rootStyle = window.getComputedStyle(document.documentElement).getPropertyValue(rootVariable);
if (rootStyle) {
    console.log(`${c} cssObj, id = ${cssId} 是正常的.`);
} else {
    loadcss( /* ... */ )
}
```

## 定义放置位置 - cssHead

CSS 具有样式优先级覆盖机制，所以生成备用 link 标签时，默认会将其设置到 head 最开始，因为这样可以保持最低优先级，以便被之后的样式覆盖，当然，你也可以设置生成的 link 标签直接放置在 head 最后，以保持更高的优先级。

`cssHead 不存在 或 cssHead 的值不为 last` 都会指示生成的 link 标签应该放置在 head 最开始以保持低优先级，除非 `cssHead: "last"` 。

```js
if (typeof cssGroup.cssHead === 'string' && cssGroup.cssHead === 'last') {
    document.head.appendChild(cssLink)
} else {
    firstHead.insertBefore(cssLink, firstHead.firstChild);
}
```

## 定义哈希 - cssSha

`cssSha 不存在 或 cssSha 为空` 都会指示生成的 link 标签中不添加 `integrity` 属性，当使用公共 CDN 时，为了确保安全性，最佳的方式是应该添加哈希值来确保文件正确。

```js
if (typeof cssSha === 'string' && cssSha !== '') {
    cssLink.integrity = cssSha;
}
```

## 定义跨域 - cssCors

`cssCors 不存在` 会指示生成的 link 标签不添加 `crossorigin` ，除非存在 cssCors ，不论它是什么值，都会被设置为 `anonymous` ，除非它是 `jsCors: "use-credentials"` 时，才会被设置为 `use-credentials` 。

```js
if (typeof cssCors === 'string') {
    cssLink.crossOrigin = cssCors === 'use-credentials' ? 'use-credentials' : 'anonymous';
}
```

## 无法自定义的

Superload 清楚的知道，这样的监听方法只支持 CSS 文件。它们可自定义实际上没有什么意义。

```js
cssLink.rel = 'stylesheet';
cssLink.type = 'text/css';
```
