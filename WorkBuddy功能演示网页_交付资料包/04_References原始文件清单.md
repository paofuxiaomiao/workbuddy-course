# References 原始文件清单

本清单将资料包内所有说明文档引用的依据映射为可离线打开的文件。外部 URL 只作为补充来源记录，不作为本资料包完成阅读所依赖的唯一证据。

## 说明文档与 References 对照

| 说明文档 | 引用编号 | 离线文件 | 文件类型 | 可打开性 |
|---|---:|---|---|---|
| `00_导出说明.md` | [1] | [Git 版本历史](source/version-history/git-history.txt) | 原始导出记录 | 相对链接 |
| `00_导出说明.md` | [2] | [构建与类型检查记录](source/test-records/build-and-typecheck.md) | 测试记录 | 相对链接 |
| `00_导出说明.md` | [3] | [提示词原始记录](source/core-knowledge/prompt-provenance.md) | 核心知识文档 | 相对链接 |
| `00_导出说明.md` | [4] | [素材与外部地址记录](source/core-knowledge/material-url-record.md) | 素材记录 | 相对链接 |
| `01_提示词与素材清单.md` | [1] | [提示词原始记录](source/core-knowledge/prompt-provenance.md) | 核心知识文档 | 相对链接 |
| `01_提示词与素材清单.md` | [2] | [素材与外部地址记录](source/core-knowledge/material-url-record.md) | 素材记录 | 相对链接 |
| `01_提示词与素材清单.md` | [3] | [既有提示词整理文档](source/core-knowledge/image-generation-prompts.md) | 既有整理文档 | 相对链接 |
| `01_提示词与素材清单.md` | [4] | [原始输入校验表](source/original-inputs/SHA256SUMS.txt) | 校验记录 | 相对链接 |
| `02_设计思路与信息架构.md` | [1] | [原始设计构思](source/core-knowledge/ideas-original.md) | 设计草稿副本 | 相对链接 |
| `02_设计思路与信息架构.md` | [2] | [完整设计文档](source/core-knowledge/design-document.md) | 既有设计文档 | 相对链接 |
| `02_设计思路与信息架构.md` | [3] | [Git 版本历史](source/version-history/git-history.txt) | 原始导出记录 | 相对链接 |
| `02_设计思路与信息架构.md` | [4] | [教师入门手册 PDF 的项目内恢复位置说明](source/original-inputs/WorkBuddy教师入门手册_人民路小学版.pdf.external-location.md) | 原始文件定位说明 | 相对链接 |
| `02_设计思路与信息架构.md` | [5] | [项目结构地图](03_项目结构地图.md) | 本资料包说明文档 | 相对链接 |
| `03_项目结构地图.md` | [1] | [package.json](source-code/package.json) | 项目配置副本 | 相对链接 |
| `03_项目结构地图.md` | [2] | [构建与类型检查记录](source/test-records/build-and-typecheck.md) | 测试记录 | 相对链接 |
| `03_项目结构地图.md` | [3] | [Git 版本历史](source/version-history/git-history.txt) | 原始导出记录 | 相对链接 |
| `03_项目结构地图.md` | [4] | [设计思路与信息架构](02_设计思路与信息架构.md) | 本资料包说明文档 | 相对链接 |
| `05_迭代复盘图.md` | [1] | [可读版聊天过程归档](source/core-knowledge/workbuddy-chat-process.md) | 对话过程整理 | 相对链接 |
| `05_迭代复盘图.md` | [2] | [设计思路与信息架构](02_设计思路与信息架构.md) | 本资料包说明文档 | 相对链接 |
| `05_迭代复盘图.md` | [3] | [提示词原始记录](source/core-knowledge/prompt-provenance.md) | 核心知识文档 | 相对链接 |
| `05_迭代复盘图.md` | [4] | [Git 版本历史](source/version-history/git-history.txt) | 原始导出记录 | 相对链接 |

## 未作为离线 References 的外部资源

| 资源 | 原因 | 替代材料 |
|---|---|---|
| 飞书 Wiki 在线页面 | 动态虚拟滚动页面，未保留完整原始 HTML。 | 原始 PDF、PDF 文本提取、聊天过程整理和功能指南源码。 |
| Awwwards Messenger | 仅作为风格参考，非本项目内容的原始数据来源。 | 设计规则和复盘说明。 |
| GitHub 仓库 / 在线演示站 | 在线状态不可作为离线资料包的稳定依赖。 | 完整 `source-code/` 快照与 Git 历史。 |

## 链接校验规则

本资料包使用相对路径，不使用必须联网的 References。最终导出前会以脚本检查 Markdown 链接目标是否存在；检查结果写入 `source/test-records/delivery-link-check.md`。

## References

[1]: [素材与外部地址记录](source/core-knowledge/material-url-record.md)
[2]: [原始输入文件校验表](source/original-inputs/SHA256SUMS.txt)
[3]: [构建与类型检查记录](source/test-records/build-and-typecheck.md)
