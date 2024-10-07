---
title: "概述"
---

# Superload 概述

提高网页加载的冗余性而制作的一个 JavaScript 文件，并可用于任何位置，它可以监测文件是否正确加载，并在可自定义的列表中逐个使用所有备用链接去加载，以做到强悍的冗余性和确保它们始终加载到页面中，支持 .css 和 script 标签引入的文件 (通常是 .js)。

```js
window.zeoseven_Superload_JsObj = {
    '1': {
        jsUrls: [
            // 立即创建它并尝试加载
            "https://example.org/main.js",
            // 当上一个 URL 无法加载，则会立即使用下一个
            "https://example.org/backup.js"
        ],
        jsSha: "sha384- ...",
        jsDefer: "on"
    },
    // 当然支持创建多个不同的 script 标签并监测它们的加载状态
    // '2': { ... }
};
// 引入 Superload
let zeoseven_Superload = document.createElement('script');zeoseven_Superload.src = "https://static-host.zeoseven.com/superload/main.min.js";zeoseven_Superload.defer = true;document.head.appendChild(zeoseven_Superload);
```

如果将需要加载的文件放置到 Superload 的配置中，则你无需创建单独的 script 标签，比如 `<script src="https://example.org/main.js" defer />` ，因为 Superload 在 DOMContentLoaded 事件触发前就会使用 jsUrls 的第一个链接和属性直接创建 script 标签到页面上，并在第一个链接加载失败时使用下一个。

## 配置

Superload 还支持 CSS 文件的监测和冗余，如果想要了解 Superload 支持的所有属性和如何使用，请查阅 [示例](https://github.com/zeoseven/superload/blob/main/docs/superload/demo/) 。

## 变量和用途

了解 Superload 变量的命名和作用，请查阅 [变量和用途](https://github.com/zeoseven/superload/blob/main/docs/superload/var/) 。

## CSS 配置

了解对于 CSS 的冗余措施配置可查阅 [CSS 配置](https://github.com/zeoseven/superload/blob/main/docs/css-config.md)

## Script 标签配置

了解对于 Script 标签的立即创建和冗余配置可查阅 [Script 配置](https://github.com/zeoseven/superload/blob/main/docs/script-config.md)

## 持续跟进新版本

[ZeoSeven CDN](https://github.com/zeoseven/superload/blob/main/docs/cdn.md)