# Superload - 更好的文件加载冗余性

在一些不频繁变化的资源链接中，偶尔会出现资源不可用的情况，尤其是在使用公共 CDN 时更为突出， Superload 允许你立即创建和提供多个备用资源链接进行逐个加载尝试，并在出现错误时删除创建的标签然后从你提供的备用资源链接数组中再创建一个相同属性的标签再次加载，直到正确加载。支持 CSS 和部分 HTML 标准属性，尤其是哈希完整性检查，这在公共 CDN 引入的链接中使用可避免 XSS 攻击。

了解更多信息和查阅文档可直接访问 [docs/](https://github.com/zeoseven/superload/blob/main/docs/start.md)

### 使用 min 版本并跟进更新

```
https://static-host.zeoseven.com/superload/main.min.js
```

Superload 希望你使用 defer 来延迟执行 superload/main.min.js ，这有助于执行时你的配置已赋值到 window 对象。

## 特点

### 冗余性
Superload 设计专门用于 .js 文件的立即加载的备用加载，以提高在首选资源 URL 出错时提高用户体验。

### 配置
在 Obj 中输入首选和备用资源 URL 及属性， Superload 会逐个尝试，直到正确加载。

### CSS 支持
对于 CSS 文件的冗余处理， Superload 使用了非常奇怪的方法，使用 :root 变量是否存在来判断。
