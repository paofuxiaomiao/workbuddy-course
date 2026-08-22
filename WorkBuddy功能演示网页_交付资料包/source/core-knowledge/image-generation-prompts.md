# WorkBuddy Demo — AI 生图提示词记录

> 项目：WorkBuddy 功能演示网页
> 生图工具：Manus 内置 AI 图像生成
> 生成时间：2026-07-04

---

## 1. WorkBuddy 品牌 Logo / 图标

**用途**：网页左上角品牌标识 + 浏览器 favicon
**输出文件**：`client/public/assets/workbuddy-logo.png`
**规格**：透明背景 PNG，512×512px

### 原始提示词（英文）

```
A cute robot cat mascot icon for WorkBuddy AI assistant app.
The character is a small friendly robot with cat ears, big round glowing eyes,
and a sleek metallic body in teal-green (#00C48C) and white color scheme.
The robot cat is sitting upright in a confident pose, holding a small glowing
document or file in its paws, symbolizing AI office work assistance.
Bold graphic symbol style, no text, clean vector-like illustration,
transparent background, suitable for use as an app icon or logo mark.
Modern, professional yet approachable aesthetic.
The overall shape should be compact and recognizable at small sizes.
```

### 中文说明

一个可爱的机器猫吉祥物图标，用于 WorkBuddy AI 助理应用。角色是一个小巧友好的机器人，有猫耳朵、大圆形发光眼睛，以及流线型金属身体，配色为品牌绿（#00C48C）和白色。机器猫以自信的姿势坐立，爪子里拿着一个发光的小文件，象征 AI 办公助理。粗体图形符号风格，无文字，简洁矢量插画风格，透明背景，适合用作应用图标或 Logo 标志。现代、专业但平易近人的美感。整体形状紧凑，小尺寸下也清晰可辨。

---

## 生图使用规范（本项目）

| 区域 | 图片来源 | 说明 |
|------|---------|------|
| 品牌 Logo / Favicon | AI 生成 | 唯一生成图，其余均为截图 |
| 主界面 Hero | 无（纯 CSS 还原） | 直接还原 WorkBuddy 界面，不需要背景图 |
| 功能截图 | 用户上传真实截图 | 14 张，存放于 `client/public/assets/screenshots/` |
| 图标 | lucide-react 图标库 | 所有 UI 图标均来自 lucide-react，无需生成 |

---

## 截图文件清单（用户提供的真实界面截图）

| 文件名 | 内容描述 |
|--------|---------|
| `wb-main.webp` | WorkBuddy 主界面（三栏布局，对话区域） |
| `wb-expert.webp` | 专家面板（精选场景 + 专家列表） |
| `wb-project.webp` | 项目面板（项目列表 + 模板创建） |
| `wb-automation.webp` | 自动化面板（自动化模板列表） |
| `wb-settings.webp` | 设置弹窗（系统设置子页面） |
| `wb-memory.webp` | 记忆设置页面（生成对话记忆开关） |
| `wb-model.webp` | 模型设置页面（添加模型弹窗） |
| `wb-chat.webp` | 对话界面（流式输出效果） |
| `wb-workspace.webp` | 工作空间选择界面 |
| `wb-craft.png` | Craft 模式工具栏（技能/权限/模式选择） |
| `wb-task.webp` | 任务执行进度界面 |
| `wb-security.webp` | 安全中心设置页面 |
| `wb-buddy.webp` | 小扶设置页面 |
| `wb-personal.png` | 个性化设置页面 |

---

## 如需重新生成 Logo

**更简约风格**：
```
Minimal flat icon of a robot cat for WorkBuddy AI app.
Simple geometric shapes, teal-green (#00C48C) primary color,
white accent, transparent background, no text, app icon style.
```

**更专业商务风格**：
```
Professional AI assistant logo mark. Abstract robot face with
subtle cat ear silhouette. Teal-green (#00C48C) monochrome,
clean geometric design, transparent background, scalable icon.
```

**更可爱卡通风格**：
```
Chibi cute robot cat character icon. Oversized head, tiny body,
cat ears with inner glow, holding a glowing document.
Teal-green and white color scheme, transparent background,
cartoon illustration style, no text.
```
