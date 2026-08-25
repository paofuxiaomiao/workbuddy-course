# WorkBuddyGuide 内容集成说明

本项目的「WorkBuddy 实战蓝皮书」交互模块基于 [AlephAITech/WorkBuddyGuide](https://github.com/AlephAITech/WorkBuddyGuide) 的公开内容整理，覆盖其 27 章目录、四篇学习路径、附录 A 常用指令模板与附录 B 场景速查表。

## 集成方式

- `client/src/data/guide.ts`：将 27 章整理为适合演示应用的章节摘要、关键要点、原文路径和界面动作映射。
- `client/src/components/GuidePage.tsx`：提供章节搜索、四篇导航、阅读进度、原章链接、提示词复制与岗位起步路线。
- `client/src/pages/Home.tsx`：把章节动作接回现有的设置、工作空间、对话、桌面任务、专家、连接器、自动化和项目界面。

## 来源与许可

WorkBuddyGuide 采用 MIT License。章节标题、附录模板和内容摘要在本演示中用于学习导航与交互演示；完整正文、图片与最新修订请以原仓库为准。

- 来源仓库：https://github.com/AlephAITech/WorkBuddyGuide
- 原站：https://workbuddy.homes/
- 许可证：https://github.com/AlephAITech/WorkBuddyGuide/blob/main/LICENSE
