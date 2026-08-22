# WorkBuddy 功能演示网页 — 完整设计文档

> 版本：v5.8（最终版）
> 项目地址：workbuddy-ltzhejeb.manus.space
> GitHub：paofuxiaomiao/workbuddy-demo-7-5
> 最后更新：2026-07-05

---

## 一、项目定位

**目标用户**：WorkBuddy 初学者（教师、职场新人等零基础用户）
**核心目标**：让用户在不安装软件的情况下，通过交互式演示了解 WorkBuddy 的所有核心功能
**设计原则**：交互体验与真实软件一致，但每个功能区域都有教学说明，降低学习门槛

---

## 二、设计方案选型

### 方案 A：原生复刻（未选）
完全像素级还原 WorkBuddy 桌面客户端界面，灰白色调，macOS 风格窗口，让用户产生"真实使用"的沉浸感。

### 方案 B：教学导览式（未选）
在原界面基础上叠加明亮的高亮引导层，像产品 Tour 一样逐步引导，适合完全不了解产品的新手。

### ✅ 方案 C：轻量仿真 + 弹窗介绍（选定）
高度还原 WorkBuddy 界面外观，但每个可点击区域有微妙的悬停提示，点击后弹出精致的功能介绍卡片，兼顾真实感与教学目的。

---

## 三、视觉设计规范

### 3.1 设计运动（Design Movement）
macOS 原生应用风格（Human Interface Guidelines）+ 现代 SaaS 产品演示页风格

### 3.2 核心原则
1. **高保真还原**：界面布局、颜色、字体尽量贴近真实 WorkBuddy 截图
2. **交互直觉**：所有可点击元素有 hover 状态，点击后弹出功能介绍，不破坏界面结构
3. **教学优先**：弹窗内容简洁清晰，配合图标和分点说明，适合零基础用户
4. **轻量动效**：弹窗出现/消失有流畅动画，不过度炫技

### 3.3 色彩系统

| 用途 | 颜色值 | 说明 |
|------|--------|------|
| 品牌主色 | `#00C48C` | WorkBuddy 品牌绿，用于选中状态、CTA、强调 |
| 背景色 | `#FFFFFF` | 主内容区纯白背景 |
| 侧边栏背景 | `#F5F5F5` | 左侧导航栏浅灰背景 |
| 主文字 | `#1A1A1A` | 深灰，高对比度 |
| 次要文字 | `#6B7280` | 中灰，用于描述性文字 |
| 边框 | `#E5E7EB` | 浅灰边框 |
| 悬停高亮 | `#00C48C` 虚线边框 | 可交互区域的 hover 状态 |
| 彩蛋弹窗背景 | `#030712` | 深黑，配绿色光晕 |

### 3.4 字体系统

```css
/* 主字体栈 */
font-family: 'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', system-ui, sans-serif;

/* 标题：字重 600-700 */
/* 正文：字重 400，行高 1.6 */
/* 代码/标签：等宽字体 */
/* 数字/英文：Inter（Google Fonts） */
```

### 3.5 布局范式
三栏布局（完全模拟桌面应用，非传统网页居中布局）：
- **左侧导航栏**：260px，任务列表 + 空间列表，可折叠
- **中央主内容区**：flex-1，对话区域 + 功能面板
- **右侧**：可选，功能介绍抽屉从右侧滑入（360px）

### 3.6 标志性视觉元素
1. 左侧导航栏：任务列表（16条历史任务）+ 空间列表
2. 中央对话区：Craft / Ask / Plan 模式切换 + 技能/权限工具栏
3. 底部三个模拟入口卡片（体验对话 / 任务执行 / 工作空间）
4. 右下角探索进度条（追踪 9 类交互行为，圆形进度环）
5. 黑色功能指南横幅（点击进入全屏长页面）

---

## 四、交互设计规范

### 4.1 可交互区域标识
所有可交互区域统一使用 `wb-interactive` CSS class：
```css
.wb-interactive:hover {
  outline: 2px dashed #00C48C;
  outline-offset: 2px;
  border-radius: 4px;
}
```
悬停时同时显示绿色问号图标，提示用户可以点击查看介绍。

### 4.2 功能介绍抽屉（FeatureDrawer）
- **位置**：从右侧滑入，宽度 360px，不遮挡主界面
- **内容**：功能名称 + 图标 + 描述 + 编号要点列表 + 小贴士
- **关闭**：点击「明白了」按钮 或 点击背景遮罩
- **动画**：translateX(100%) → translateX(0)，250ms cubic-bezier(0.23,1,0.32,1)

### 4.3 设置弹窗教学卡片（自动弹出）
- **触发**：切换到任意设置子页面时自动显示（带 tipSlideIn 动画）
- **位置**：内容区顶部，占据全宽
- **内容**：彩色 i 图标 + 标题 + 描述 + 要点列表（4条）
- **关闭**：点击右上角 × 关闭，同一页面本次不再显示
- **重置**：切换到其他页面再切回来，重新显示

设置页面主题色对照：

| 页面 | 主题色 |
|------|--------|
| 账户管理 | `#00C48C` 绿 |
| 系统设置 | `#6B7280` 灰 |
| 智能体设置 | `#6366F1` 靛蓝 |
| 记忆 | `#8B5CF6` 紫 |
| 模型 | `#F59E0B` 琥珀 |
| 小扶设置 | `#14B8A6` 青 |
| 个性化 | `#EC4899` 粉 |
| 数据管理 | `#6366F1` 靛蓝 |
| 安全中心 | `#EF4444` 红 |
| 帮助与反馈 | `#00C48C` 绿 |

### 4.4 设置项问号悬浮提示（Tooltip）
- **触发**：鼠标悬停在设置项标签旁的 ? 图标
- **位置**：`fixed` 定位，动态计算（getBoundingClientRect()），z-index 99999
- **关键**：必须用 fixed 定位，避免被弹窗 overflow:hidden 裁剪

### 4.5 动效规范

| 元素 | 动画 | 时长 | 缓动 |
|------|------|------|------|
| 功能介绍抽屉 | translateX(100%) → 0 | 250ms | cubic-bezier(0.23,1,0.32,1) |
| 设置弹窗 | scale(0.95) opacity(0) → 正常 | 200ms | cubic-bezier(0.23,1,0.32,1) |
| 教学卡片 | translateY(-8px) opacity(0) → 正常 | 250ms | cubic-bezier(0.23,1,0.32,1) |
| 彩蛋弹窗 | scale(0.8) translateY(30px) → 正常 | 400ms | cubic-bezier(0.23,1,0.32,1) |
| 悬停边框 | outline 渐变 | 100ms | ease |
| Tooltip | scale(0.95) opacity(0) → 正常 | 120ms | ease |
| 进度条填充 | width 变化 | 500ms | ease |

---

## 五、功能模块设计

### 5.1 对话模拟（ChatSimulator）
- 5个预设问题（文件整理/表格分析/周报/PPT/自动化场景）
- AI 回复流式打字输出（每字 30-50ms 间隔）
- Markdown 渲染（标题/表格/列表/代码块）
- 多 Agent 标签（主会话 + agent-xxx）
- 名词解释：AI 回复完成后检测专业名词，悬停弹出定义

### 5.2 桌面整理任务模拟（DesktopTaskSimulator）
- 8个执行步骤依次展示（扫描→分析→分类→移动→生成报告）
- 每步可展开查看文件操作详情
- 完成后生成整理报告（文件数量统计）

### 5.3 工作空间选择（WorkspaceModal）
- 最近使用列表（5个示例路径）
- 收藏夹 + 搜索功能
- 新建/打开本地文件夹按钮

### 5.4 功能指南页（GuidePage）
- **飞书文档 Tab**：13章完整内容（一到十三章，保姆级入门）
- **教师手册 Tab**：PDF手册01-12章 + 附录A两页 + 附录B
- 顶部章节快速导航，滚动自动高亮
- 所有专业名词绿色虚线下划线，悬停弹出解释卡片（20+个名词）
- 右侧边栏：每章对应的补充内容
- Hero 区：黑底大字，超大章节编号（awwwards messenger 风格）

### 5.5 彩蛋系统（EasterEgg + useProgress）

| 行为类型 | 目标次数 | 触发方式 |
|---------|---------|---------|
| feature_click | ×5 | 点击功能介绍抽屉 |
| chat_complete | ×1 | 完成对话模拟 |
| task_complete | ×1 | 完成桌面整理任务 |
| workspace_select | ×1 | 选择工作空间 |
| guide_chapter | ×3 | 阅读功能指南 |
| settings_tab | ×3 | 打开设置子页面 |
| expert_click | ×1 | 查看专家面板 |
| automation_click | ×1 | 查看自动化面板 |
| preset_chat | ×1 | 使用预设对话问题 |

彩蛋内容：邀请码 `fuya2066`，带粒子动画 + 一键复制
进度存入 localStorage，刷新不丢失

---

## 六、模型设置弹窗（真实数据还原）

### 提供商列表
```
Token Plan 分组：
  腾讯云 Token Plan / Token Plan 企业版专业
  腾讯云 Token Plan / Token Plan 企业版轻享
  腾讯云 Token Plan / 通用 Token Plan（个人版）← 默认选中
  腾讯云 Token Plan / Hy Token Plan（个人版）

Coding Plan 分组：
  腾讯云 Coding Plan / Tencent Cloud Coding
  智谱 Coding Plan / GLM Coding Plan
  Kimi Coding Plan

自定义 API 分组：
  自定义 / Custom ← 展开高级配置
```

### 接口地址
- 腾讯云：https://api.lkeap.cloud.tencent.com/plan/v3/chat/completions
- 智谱：https://open.bigmodel.cn/api/paas/v4/chat/completions
- Kimi：https://api.moonshot.cn/v1/chat/completions

### 高级配置（自定义 API 时显示）
- 工具调用 / 图片输入 / 思考模式 / 自定义协议（复选框）
- 输入 token 限制：32K / 64K / 128K / 256K 快捷选择
- 输出 token 限制：8K / 16K / 32K / 64K 快捷选择

---

## 七、品牌声音（Brand Voice）

**品牌定位**：WorkBuddy 演示站 — 为初学者而生的交互式产品导览，让每一次点击都是一次发现。
**个性形容词**：亲切、清晰、专业

**标题示例**：
- "点击任意功能，立即了解它能为你做什么"
- "WorkBuddy · 你的职场超能力"

**引导示例**：
- "试试点击左侧的「专家」，看看 100+ 行业专家如何为你服务"
- "悬停任意功能区域查看介绍，点击下方按钮体验真实交互模拟"

---

## 八、技术实现要点

### 8.1 关键 CSS class
```css
.wb-interactive:hover { outline: 2px dashed #00C48C; }

@keyframes modalIn {
  from { opacity: 0; transform: scale(0.95) translateY(8px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}

@keyframes tipSlideIn {
  from { opacity: 0; transform: translateY(-8px); }
  to { opacity: 1; transform: translateY(0); }
}
```

### 8.2 已知坑点
1. JSX 属性里的中文引号 "..." 会破坏解析 → 改用 {'...'} 或书名号「」
2. Set 展开 TS 报错：new Set([...prev]) → new Set(Array.from(prev))
3. 弹窗内 Tooltip 不显示：overflow:hidden 裁剪 → 改用 fixed 定位
4. 图片不要放 src/assets：会导致部署超时 → 统一放 client/public/assets/
5. 飞书文档虚拟滚动：需登录后逐章点击目录锚点触发加载

### 8.3 静态资源
- Logo：/assets/workbuddy-logo.png（GitHub 托管）
- 截图：/assets/screenshots/wb-*.webp（GitHub 托管）
- 图标：lucide-react（无需额外资源）
- 字体：Google Fonts CDN（Noto Sans SC + Inter）

---

## 九、后续扩展方向

1. 新手引导步骤：分步高亮 + 箭头指向特定功能（Step 1/8 形式）
2. 专家召唤模拟：点击专家卡片后以该专家身份回复对话
3. 提示词优化按钮：把简短描述扩展成包含六要素的完整提示词
4. 章节完成打勾：指南页每章加勾选框追踪学习进度
5. 打印友好版：导出 PDF 作为培训讲义
6. 模型名称自动补全：选择提供商后下拉显示该提供商支持的具体模型列表
7. 教学卡片「不再提示」：存入 localStorage，让熟悉用户永久关闭
8. 分享彩蛋：生成带邀请码的图片，方便传播
