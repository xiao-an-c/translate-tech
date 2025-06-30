# Translate Tech

一个基于 VitePress 的多语言技术翻译文档模板。

## 功能特性

- 🌐 **多语言支持** - 支持中文和英文双语
- 📚 **完整的翻译指南** - 从入门到进阶的翻译教程
- 🛠️ **工具推荐** - 专业翻译工具介绍和使用指南
- 📖 **翻译规范** - 统一的翻译标准和术语管理
- 🎨 **现代化界面** - 基于 VitePress 的美观文档界面
- 🔍 **本地搜索** - 内置搜索功能，快速查找内容

## 快速开始

### 安装依赖

```bash
# 使用 pnpm（推荐）
pnpm install

# 或使用 npm
npm install

# 或使用 yarn
yarn install
```

### 启动开发服务器

```bash
# 启动开发服务器
pnpm docs:dev

# 或
npm run docs:dev
```

访问 `http://localhost:5173` 查看文档。

### 构建生产版本

```bash
# 构建静态文件
pnpm docs:build

# 预览构建结果
pnpm docs:preview
```

## 项目结构

```
translate-tech/
├── docs/
│   ├── .vitepress/
│   │   └── config.js          # VitePress 配置文件
│   ├── public/
│   │   └── logo.svg           # 网站 Logo
│   ├── en/                    # 英文文档
│   │   ├── index.md           # 英文首页
│   │   ├── guide/             # 英文指南
│   │   ├── standards/         # 英文翻译规范
│   │   └── tools/             # 英文工具介绍
│   ├── guide/                 # 中文指南
│   │   ├── index.md           # 指南首页
│   │   └── getting-started.md # 快速开始
│   ├── standards/             # 中文翻译规范
│   │   └── index.md           # 规范首页
│   ├── tools/                 # 中文工具介绍
│   │   └── index.md           # 工具首页
│   └── index.md               # 中文首页
├── package.json
├── pnpm-lock.yaml
└── README.md
```

## 多语言配置

本项目支持中文（默认）和英文两种语言：

- **中文**: `/` (根路径)
- **英文**: `/en/`

### 添加新语言

1. 在 `docs/.vitepress/config.js` 中添加新的语言配置
2. 创建对应的文档目录结构
3. 翻译相应的内容文件

## 内容结构

### 翻译指南 (Guide)
- 技术翻译基础知识
- 翻译流程和最佳实践
- 常见问题和解决方案

### 翻译规范 (Standards)
- 翻译原则和标准
- 术语管理规范
- 质量检查标准

### 工具推荐 (Tools)
- CAT 工具介绍
- 术语管理工具
- 协作平台推荐

## 自定义配置

### 修改网站信息

编辑 `docs/.vitepress/config.js` 文件：

```javascript
export default defineConfig({
  title: '你的网站标题',
  description: '你的网站描述',
  // ... 其他配置
})
```

### 修改导航和侧边栏

在配置文件的 `themeConfig` 部分修改导航和侧边栏设置。

### 添加新页面

1. 在相应的语言目录下创建 Markdown 文件
2. 在配置文件中添加导航链接
3. 更新侧边栏配置

## 部署

### GitHub Pages

1. 构建项目：`pnpm docs:build`
2. 将 `docs/.vitepress/dist` 目录部署到 GitHub Pages

### Vercel

1. 连接 GitHub 仓库到 Vercel
2. 设置构建命令：`pnpm docs:build`
3. 设置输出目录：`docs/.vitepress/dist`

### Netlify

1. 连接 GitHub 仓库到 Netlify
2. 设置构建命令：`pnpm docs:build`
3. 设置发布目录：`docs/.vitepress/dist`

## 贡献指南

我们欢迎社区贡献！请遵循以下步骤：

1. Fork 本仓库
2. 创建功能分支：`git checkout -b feature/your-feature`
3. 提交更改：`git commit -am 'Add some feature'`
4. 推送分支：`git push origin feature/your-feature`
5. 提交 Pull Request

### 贡献内容

- 翻译指南和最佳实践
- 工具使用经验分享
- 翻译规范完善
- 文档错误修正
- 新语言支持

## 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件。

## 联系我们

- GitHub Issues: [提交问题](https://github.com/your-username/translate-tech/issues)
- 讨论区: [GitHub Discussions](https://github.com/your-username/translate-tech/discussions)

---

**让技术翻译更专业、更高效！**