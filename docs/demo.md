# 示例

你需要告诉 Superload 一些信息，来让 Superload 进行加载它们并监控加载状态。使用熟悉的 JavaScript 进行配置。现在使用 Bootstrap 框架进行演示。

## 开始

在 .css 文件或 style 标签中，当然 .html 的 link 也一样可以被 Superload 监测，为什么不使用动态创建 link 来直接检测？因为那会导致页面闪烁。

```css
@import url('https://unpkg.com/bootstrap@5.3.3/dist/css/bootstrap.min.css');
```

在 .js 文件或 script 标签中

```js
window.zeoseven_Superload_CssObj = {
    cssGroups: [
        {
            // id 可任意输入，它是唯一标识符，用于控制台输出
            id: 'bootstrap',
            // Bootstrap 的根变量有一个 --bs-font-sans-serif ，Superload 根据此判断是否使用备用 URL
            rootVariable: '--bs-font-sans-serif',
            cssUrls: [
                // 它们都会被用作备用，不会直接生成 link 标签，除非 --bs-font-sans-serif 不存在
                // 它们将在 rootVariable 定义的根变量不存在时被依次使用
                'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
                'https://example.org/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css'
            ],
            cssSha: ''
        },
        // 更多 CSS 文件
        // { ... }
    ]
};

window.zeoseven_Superload_JsObj = {
    '1': {
        jsUrls: [
            // 你不需要设置单独的 script 标签，因为第一个 URL 将被直接生成 script 标签
            "https://unpkg.com/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js",
            "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js",
            "https://example.org/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js",
            // ... 你甚至可以设置一百个，它们会被 Superload 从上至下逐个尝试
        ],
        jsSha: "sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz",
        jsDefer: "on",
        jsType: "text/javascript",
        jsCors: "", // 空值 = crossorigin="anonymous"
    },
    /* 更多 script 标签
    '2': { ... },
    ... */
};
// 引入 Superload
let zeoseven_Superload = document.createElement('script');zeoseven_Superload.src = "https://static-host.zeoseven.com/superload/main.min.js";zeoseven_Superload.defer = true;document.head.appendChild(zeoseven_Superload);
```

## 测试

当你将开始中的代码全部粘贴到你的测试 Superload 的项目中后，你可以故意让 @import 中引入 CSS 文件的 URL 和 jsUrls 中的第一个 URL 不可用，通常来说， Superload 会尝试后在页面上删除不可用 URL 生成的标签并立即使用下一个 URL 重试。

当然， Superload 追求冗余性，任何人都会想到如果引入 Superload 的 static-host.zeoseven.com 失效呢？你可以将它下载下来并上传到你自己的服务器中。
