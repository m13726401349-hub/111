# RUIYUAN 瑞元中文网站

这是依据《pa66瑞元-Codex中文独立站信息填写表.xlsx》生成的静态中文网站。

## 页面

- `index.html`：首页
- `products.html`：产品中心
- `product-pa66.html`：PA66 产品详情
- `about.html`：关于瑞元
- `contact.html`：联系我们
- `blog.html`：博客中心
- `blog-pa66-selection-guide.html`：PA66 选型指南
- `blog-flame-retardant-pa66.html`：阻燃 PA66 文章
- `blog-reinforced-pa66-molding.html`：增强 PA66 注塑文章
- `BLOG-CONTENT-PLAN.md`：SEO、图片、CTA、弹窗与发布优先级规划
- `blog-en.html`：英文博客中心
- `pa6-vs-pa66-material-selection-guide.html`：PA6 与 PA66 英文选型长文
- `flame-retardant-pa66-electrical-connectors-guide.html`：阻燃 PA66 电气连接器英文长文
- `glass-filled-pa66-injection-molding-guide.html`：玻纤增强 PA66 注塑问题英文长文
- `BLOG-SEO-EN-PLAN.md`：英文 SEO、GEO、AIO、图片及 CTA 完整规划

全站页眉提供中文、英文、韩文和俄文语言切换。中文与英文博客使用站内对应页面；韩文、俄文及尚无独立译文的页面使用公开网页翻译入口。

联系我们页面已加入 OpenStreetMap 地图。由于 OpenStreetMap 暂未精确收录“常平镇大京九塑胶城塑通六路680”门牌，地图中心使用常平镇大京九片区参考位置，页面显示的公司地址以企业提供信息为准。

## B2B 询盘表单

- HTML 实现：`contact.html`
- React 模板：`templates/B2BInquiryForm.jsx`
- 后端接口模板：`api/inquiry.js`

前端默认向 `/api/inquiry` 发送 JSON。接口模板支持：

- 使用 Resend 将询盘发送至指定邮箱
- 使用 Supabase REST API 保存到 `inquiries` 表
- 同时发送邮件并保存数据库
- 蜜罐字段、最短填写时间与可选 Cloudflare Turnstile 验证

`api/inquiry.js` 使用标准 Web `Request` / `Response` 写法，适合 Edge Function 或作为服务端路由核心逻辑。使用 Next.js、Vercel Node Function、Express 等环境时，可在外层做一次请求/响应适配。

可配置环境变量：

```text
RESEND_API_KEY=
INQUIRY_TO_EMAIL=
INQUIRY_FROM_EMAIL=
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
TURNSTILE_SECRET_KEY=
```

至少配置邮件或数据库中的一种，否则接口会返回“尚未配置收件邮箱或数据库”，不会伪装成提交成功。

启用 Turnstile 时，还需要在前端渲染 Turnstile 小组件，并把获得的 token 作为 `turnstileToken` 一并提交。

## 本地预览

可使用任意静态文件服务器打开本目录。表单目前提供前端校验和成功反馈，正式上线前需要接入企业邮箱、CRM 或后端表单接口。

## 上线前必须补充

- 企业 Logo 原文件
- 联系人、收件邮箱、电话与 WhatsApp
- 真实产品图、工厂图和产品画册
- 经技术审核的牌号、物性参数及认证资料
- 表单收件接口和隐私政策
