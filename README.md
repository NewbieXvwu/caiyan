# 猜盐 - 现代、功能完备的猜病游戏前端
> 知名**猜病 & 猜罪**游戏的前端重制。调用 xiaoce.fun 官方 API，带来 Material You 体验与强大功能。
> 
> 所有AI响应皆由原 xiaoce.fun 网站提供，本项目与原网站 xiaoce.fun 的开发者无关。侵权请联系删除。

<div align="center">

[![GitHub stars](https://img.shields.io/github/stars/NewbieXvwu/caiyan?style=flat&logo=github&color=FFD60A)](https://github.com/NewbieXvwu/caiyan)
[![GitHub license](https://img.shields.io/github/license/NewbieXvwu/caiyan?style=flat&color=00D1FF)](./LICENSE)
[![Cloudflare Pages](https://img.shields.io/website?url=https%3A%2F%2Fcaiyan.pages.dev&label=CF%20Pages&style=flat&logo=cloudflarepages&logoColor=f38020&color=f38020)](https://caiyan.pages.dev)
[![GitHub Pages](https://img.shields.io/website?url=https%3A%2F%2Fnewbiexvwu.github.io%2Fcaiyan&label=GitHub%20Pages&logo=github)](https://newbiexvwu.github.io/caiyan)
[![Netlify](https://api.netlify.com/api/v1/badges/b7246c76-e1f6-42f7-a388-191f2c2a154c/deploy-status)](https://caiyan.netlify.app)
[![Vercel](https://img.shields.io/website?url=https%3A%2F%2Fcaiyan.vercel.app&logo=vercel&label=Vercel&color=00E5A8)](https://caiyan.vercel.app)

</div>

<table align="center">
  <tr>
    <td align="center" width="65%">
      <picture>
        <source media="(prefers-color-scheme: dark)" srcset="https://youke1.picui.cn/s1/2025/07/17/6877cf4e64673.png" style="width:100%;">
        <img alt="PC截图" src="https://youke1.picui.cn/s1/2025/07/17/6877ced43b650.png" style="width:100%;">
      </picture>
    </td>
    <td align="center" width="35%">
      <picture>
        <source media="(prefers-color-scheme: dark)" srcset="https://youke1.picui.cn/s1/2025/07/17/6877d1f80019a.png" style="width:100%;">
        <img alt="手机截图" src="https://youke1.picui.cn/s1/2025/07/17/6877d1f871e23.png" style="width:100%;">
      </picture>
    </td>
  </tr>
</table>


---

## 🧭 在线体验  
| 节点 | 地址 | 备注 | 国内访问速度 |
|---|---|---|---|
| 🏠 主站 | [https://caiyan.rth2.xyz](https://caiyan.rth2.xyz) | 热铁盒网页托管 | ⭐⭐⭐⭐⭐ |
| 🔀 分流 1 | [https://caiyan.pages.dev](https://caiyan.pages.dev) | Cloudflare Pages | ⭐⭐⭐⭐ |
| 🔀 分流 2 | [https://newbiexvwu.github.io/caiyan](https://newbiexvwu.github.io/caiyan) | GitHub Pages | ⭐⭐⭐ |
| 🔀 分流 3 | [https://caiyan.netlify.app](https://caiyan.netlify.app) | Netlify | ⭐⭐⭐ |
| 🔀 分流 4 | [https://caiyan.vercel.app](https://caiyan.vercel.app) | Vercel | ❌ |

> 注：各节点间用户数据不互通，可用导入/导出功能实现迁移。

---

## 🚀 特性一览
- 🎨 **Material You** 动态主题：跟随系统自动切换深浅色  
- 💾 **对话历史持久化**：对话记录自动保存，刷新不丢  
- 📅 **往日谜题**：支持任意日期回溯挑战  
- 🔃 **数据导入/导出**：JSON 一键备份 & 还原  
- 🧩 **双玩法支持**：  
  - 🩺 猜病 
  - ⚖️ 猜罪
- 📱 **响应式布局**：手机、平板、桌面均完美适配  
- 🪶 **零后端**：纯 HTML + CSS + JS，可部署到任意静态托管  

---

## 🛠️ 本地开发与构建
```bash
# 克隆仓库
git clone https://github.com/NewbieXvwu/caiyan.git
cd caiyan

python -m http.server
```

---

## 📂 项目结构
```
caiyan/
├─ index.html          # 入口
├─ 404.html            # 404页面
├─ LICENSE             # MIT许可证
├─ manifest.json       # PWA清单文件
├─ sw.js               # Service Worker脚本，实现资源缓存
├─ icons/
│  └─ ……               # PWA 图标
```

---

## 🚢 部署
本项目为纯静态，可直接推送至任意静态托管：

| 平台 | 一键部署 |
|---|---|
| **Vercel** | [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/NewbieXvwu/caiyan) |
| **Netlify** | [![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/NewbieXvwu/caiyan) |

---

## 📄 许可证
[MIT](./LICENSE) © 2025 NewbieXvwu

---

## 🙏 致谢
- 谜题数据 & API 由 [xiaoce.fun](https://xiaoce.fun) 提供  
- Material You Design by Google  
- Google Gemini for 98% code 🤣

---

> **隐私与统计声明**  
> 本项目使用 [Microsoft Clarity](https://clarity.microsoft.com) 与 [Simple Analytics](https://simpleanalytics.com) 匿名收集访问数据，以帮助我们改进体验。  
> 若您不愿参与统计，只需开启常用广告拦截器即可，**不会对任何功能造成影响**。

> 若本项目帮到你，点个 ⭐ 就是最大的鼓励！
