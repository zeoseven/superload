# 变量和用途

Superload 尽量避免和你的变量产生冲突导致无法工作，所以使用了 `zeoseven_Superload_*` 这样的前缀。

## let zeoseven_Superload

在 static-host.zeoseven.com 中获取并动态添加 Superload 主文件，当然， Superload 追求冗余性，任何人都会想到如果 static-host.zeoseven.com 失效呢？你可以将它下载下来并上传到你自己的服务器中，因为 Superload 基于 MIT 协议开源。

## window.zeoseven_Superload_JsObj

它用于动态生成 script 标签并且在数组中的第一个 URL 无法加载时使用数组中的下一个 URL 重新加载，直到正确加载。虽然名称是 JsObj ，但它其中可以放置的文件类型包括 script 标签可以引入的所有文件类型，如 application/json 或 module ，因为你可以使用 jsType 来自定义生成的 script 标签的 type 是什么。

## window.zeoseven_Superload_CssObj

这里可以放置 CSS 文件的备用链接， Superload 不希望动态生成 CSS 文件的 link 标签，因为那会导致页面闪烁，所以 CssObj 中的配置方式和 JsObj 略有不同，因为 Superload 根据 CSS 文件的根变量来确定 CSS 文件是否正确加载，如果没有检测到提供的 CSS 根变量， Superload 的行为和 JsObj 就差不多了，它会依次尝试数组中的 URL ，直到正确加载。
