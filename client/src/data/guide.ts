export type GuideAction =
  | "settings"
  | "workspace"
  | "chat"
  | "desktop-task"
  | "skills"
  | "experts"
  | "connectors"
  | "assistant"
  | "automation"
  | "more"
  | "project";
export type GuidePartId = "manual" | "cases" | "advanced" | "industry";

export interface GuideChapter {
  number: number;
  part: GuidePartId;
  title: string;
  summary: string;
  takeaways: [string, string];
  action: GuideAction;
  actionLabel: string;
  sourcePath: string;
  prompt?: string;
}

export interface GuidePart {
  id: GuidePartId;
  eyebrow: string;
  title: string;
  description: string;
  range: string;
  color: string;
}

export const GUIDE_REPO_URL = "https://github.com/AlephAITech/WorkBuddyGuide";

export const guideParts: GuidePart[] = [
  {
    id: "manual",
    eyebrow: "PART 01 · GET STARTED",
    title: "先把 WorkBuddy 用起来",
    description:
      "从安装、界面和第一个任务出发，再逐步接入 Skill、专家、连接器与自动化。",
    range: "01—10",
    color: "#9AE66E",
  },
  {
    id: "cases",
    eyebrow: "PART 02 · REAL WORK",
    title: "从一项任务到一支 AI 团队",
    description:
      "用办公、知识管理、生活、研究和内容增长等真实案例，理解可复用的工作流。",
    range: "11—21",
    color: "#5AD8FF",
  },
  {
    id: "advanced",
    eyebrow: "PART 03 · SYSTEMIZE",
    title: "把案例变成自己的工作系统",
    description:
      "将知识蒸馏成 Skill，设计多 Agent 协作，并为自动化补上可靠性与质量门禁。",
    range: "22—25",
    color: "#FFB45A",
  },
  {
    id: "industry",
    eyebrow: "PART 04 · SCALE",
    title: "岗位与行业落地",
    description:
      "按岗位成熟度和行业工作流规划能力组合，让个人经验变成团队可复制的方法。",
    range: "26—27",
    color: "#FF7D9B",
  },
];

const bases: Record<GuidePartId, string> = {
  manual: "第一篇 使用手册：先把 WorkBuddy 用起来",
  cases: "第二篇 案例篇：从一项任务到一支 AI 团队",
  advanced: "第三篇 进阶篇：把案例变成自己的工作系统",
  industry: "第四篇 岗位与行业落地",
};

function chapter(
  number: number,
  part: GuidePartId,
  title: string,
  sourceTitle: string,
  summary: string,
  takeaways: [string, string],
  action: GuideAction,
  actionLabel: string,
  prompt?: string
): GuideChapter {
  return {
    number,
    part,
    title,
    summary,
    takeaways,
    action,
    actionLabel,
    prompt,
    sourcePath: `${bases[part]}/第 ${number} 章 ${sourceTitle}/index.md`,
  };
}

export const guideChapters: GuideChapter[] = [
  chapter(
    1,
    "manual",
    "初识 WorkBuddy",
    "初识 WorkBuddy",
    "理解 WorkBuddy 与普通聊天工具的差别：目标不是只给答案，而是借助工作区、工具与过程记录交付结果。",
    ["从“回答问题”转向“交付结果”", "先定义目标、输入、输出与验收标准"],
    "chat",
    "体验一次完整对话"
  ),
  chapter(
    2,
    "manual",
    "下载、安装、登录与更新",
    "WorkBuddy的下载、安装、登录与更新",
    "完成 Windows 或 macOS 安装，处理常见的启动、登录、文件权限与更新问题。",
    ["按系统下载安装并完成登录", "遇到文件读写问题先检查系统权限"],
    "settings",
    "查看设置入口"
  ),
  chapter(
    3,
    "manual",
    "主界面、任务与工作区",
    "WorkBuddy 的主界面、任务与工作区",
    "认识任务、项目、工作区与输入区之间的关系，知道文件在哪里读、结果在哪里找。",
    ["任务承载一次交付过程", "工作区限定本地文件的读写范围"],
    "workspace",
    "选择一个工作空间"
  ),
  chapter(
    4,
    "manual",
    "快速完成第一个任务",
    "快速完成第一个 WorkBuddy 任务",
    "从整理文件、会议纪要或 Word 转 PPT 开始，用清楚的任务说明完成第一份可验收产物。",
    ["任务说明写清输入、动作与输出", "先用低风险素材跑通完整流程"],
    "desktop-task",
    "运行桌面整理模拟",
    "请整理当前文件夹中的文件。按文件类型和主题分类，执行前先给我一个整理方案，不要直接移动文件。"
  ),
  chapter(
    5,
    "manual",
    "加载一个真正用得上的 Skill",
    "WorkBuddy加载一个真正用得上的 Skill",
    "理解 Skill 与一次性提示词的差别，学习发现、加载、调用、关闭与卸载 Skill。",
    ["Skill 是可复用的执行方法与工具组合", "先从真实任务反推需要的 Skill"],
    "skills",
    "打开技能市场"
  ),
  chapter(
    6,
    "manual",
    "专家和专家团",
    "WorkBuddy的专家和专家团",
    "区分单个专家与专家团：前者负责垂直任务，后者把复杂交付拆给多个角色协作。",
    ["专家适合边界清晰的专业任务", "专家团适合有分工与交接的复杂项目"],
    "experts",
    "浏览专家与专家团"
  ),
  chapter(
    7,
    "manual",
    "使用连接器",
    "WorkBuddy 使用连接器",
    "通过 MCP 连接外部服务，让任务从本地对话延伸到邮件、文档、会议、知识库等系统。",
    ["连接器负责安全地调用外部服务", "连接前确认账号、权限与写入边界"],
    "connectors",
    "查看连接器入口"
  ),
  chapter(
    8,
    "manual",
    "接入小程序与 IM 助理",
    "WorkBuddy 接入小程序与 IM 助理",
    "理解云端模式、本机模式和 IM 消息链路，并认识微信、飞书与钉钉等助理接入方式。",
    ["先区分任务运行在云端还是本机", "消息入口不等于无限制的电脑权限"],
    "assistant",
    "查看助理入口"
  ),
  chapter(
    9,
    "manual",
    "接入外部 API",
    "如何接入外部 API",
    "把第三方 API 接到工作流中，明确密钥、接口参数、返回值与失败处理。",
    ["密钥不写进公开提示词或仓库", "先用只读接口验证，再逐步开放写操作"],
    "connectors",
    "从连接器开始"
  ),
  chapter(
    10,
    "manual",
    "自动化任务",
    "WorkBuddy 自动化任务",
    "把重复任务变成定时或条件触发的自动化，并查看执行记录、结果和异常。",
    ["先把手动流程跑稳定再自动化", "每次运行都要有可检查的输出"],
    "automation",
    "浏览自动化模板"
  ),
  chapter(
    11,
    "cases",
    "办公三件套：Word、Excel、PPT",
    "办公三件套：Word、Excel、PPT",
    "用“材料—结构—生成—复核”的共同流程处理正式文档、数据分析与汇报叙事。",
    ["先选对 Skill，再定义交付结构", "修改时描述差异，不要无条件整份重写"],
    "chat",
    "载入办公任务模板",
    "请根据这份 Word 文档生成一份 PPT 大纲。要求：10 页左右，每页包含标题、3—4 个要点和建议图表。风格正式，适合管理层汇报。"
  ),
  chapter(
    12,
    "cases",
    "从整理桌面文件这些小事做起",
    "从整理桌面文件这些小事做起",
    "用桌面文件和发票整理练习识别、分类、登记与金额复核，建立对执行过程的信任。",
    ["移动前先预览分类方案", "重要文件先复制，不覆盖、不删除"],
    "desktop-task",
    "体验桌面整理"
  ),
  chapter(
    13,
    "cases",
    "远程控制你的电脑",
    "远程控制你的电脑，不用发愁不在电脑前",
    "人在外面时，通过小程序或 IM 发起本机任务、传递文件并远程检查长任务进度。",
    ["明确云端模式与本机模式", "手机是任务入口和看板，不是跳过权限控制"],
    "assistant",
    "查看助理体验"
  ),
  chapter(
    14,
    "cases",
    "生活助手的价值，是减少琐碎",
    "生活助手的价值，是减少琐碎",
    "把旅行、天气、菜单、健康记录和日常提醒组织成有人复核、不过度决策的生活工作流。",
    ["实时价格、开放时间等信息需要再次核实", "健康与高风险决定保留人工边界"],
    "experts",
    "寻找生活服务专家"
  ),
  chapter(
    15,
    "cases",
    "资讯整合：把信息流变成每日通知",
    "资讯整合：把信息流变成每日通知",
    "从信息源采集、筛选、摘要到定时推送，搭建一条可追溯的每日资讯链路。",
    ["保留来源、日期与筛选规则", "先手动验证内容质量，再安排每日触发"],
    "automation",
    "体验每日资讯自动化"
  ),
  chapter(
    16,
    "cases",
    "收藏不是知识管理",
    "收藏不是知识管理，能再次用起来才是",
    "把灵感、微信收藏、ima、WPS 和 Obsidian 连接成可检索、可引用、可维护的知识系统。",
    ["先确定唯一主版本，再连接多个入口", "保留来源，不自动覆盖人工笔记"],
    "more",
    "查看知识库入口"
  ),
  chapter(
    17,
    "cases",
    "会议结束，工作才刚刚开始",
    "会议结束不是终点，工作才刚刚开始",
    "把录制、转写、纪要、待办、PRD、周报和汇报串成会议后的交付链路。",
    [
      "事实、决定、建议和未决问题要分开",
      "行动项必须有负责人、截止时间与验收物",
    ],
    "chat",
    "载入会议纪要模板",
    "请整理这段会议内容。输出：会议结论、待办事项、负责人、截止时间、风险点、未决问题。"
  ),
  chapter(
    18,
    "cases",
    "把投资分析变成你的日常",
    "把投资分析变成你的日常",
    "用事实底座、行业、业务、财务、治理、市场分歧和估值等层次组织研究，而不是让 AI 替你下结论。",
    ["事实、判断与假设分层呈现", "投资研究不等于自动交易或个性化建议"],
    "experts",
    "查看投资研究专家"
  ),
  chapter(
    19,
    "cases",
    "一句话召唤 AI 视频团队",
    "一句话召唤 AI 视频团队",
    "让策划、脚本、素材、制作和发布角色围绕共享产物协作，把视频任务从单点生成变成团队流水线。",
    ["先定义角色输入输出与交接物", "关键创意、事实与发布决定由人确认"],
    "experts",
    "浏览专家团"
  ),
  chapter(
    20,
    "cases",
    "自媒体增长闭环",
    "自媒体不只是靠努力，而是一条增长闭环",
    "把趋势、选题、标题、封面、长图、短视频、发布和复盘组成持续迭代的内容系统。",
    [
      "热度不等于账号适配，标题承诺必须由正文兑现",
      "发布前保留合规、版权和人工确认",
    ],
    "automation",
    "查看内容自动化"
  ),
  chapter(
    21,
    "cases",
    "WorkBuddy 也能做 GEO 专家",
    "WorkBuddy也能做GEO专家",
    "从品牌资料、用户意图、搜索可见性、数字基建与竞品语义份额出发完成 GEO 诊断。",
    ["先补可信资料，再谈 AI 搜索可见性", "诊断要落到可验证的行动路线图"],
    "experts",
    "寻找品牌诊断专家"
  ),
  chapter(
    22,
    "advanced",
    "把书和视频蒸馏为可执行 Skill",
    "打造skill：将书和视频蒸馏为可执行 Skill",
    "通过整材料理解、并行提取、验证筛选、Skill 构造和压力测试，把知识变成可重复执行的方法。",
    ["知识精馏的产物要可触发、可执行、可验证", "持续记录失败案例并迭代 Skill"],
    "skills",
    "打开技能入口"
  ),
  chapter(
    23,
    "advanced",
    "WorkBuddy 实操案例集",
    "其他用法补充：WorkBuddy 实操案例集",
    "用更多真实案例扩充自己的任务库，并从每次成功交付中提取可复用步骤、模板和检查点。",
    [
      "案例不是展示结果，而是记录可复用流程",
      "为每类任务保留输入样例与验收清单",
    ],
    "project",
    "建立一个案例项目"
  ),
  chapter(
    24,
    "advanced",
    "如何进行多 Agent 系统设计",
    "如何进行多 Agent 系统设计",
    "判断任务是否值得拆分，设计工序、角色契约、共享产物、并行边界和失败传播控制。",
    ["不是 Agent 越多越好，拆分要减少耦合", "主理人负责目标、验收与冲突裁决"],
    "experts",
    "查看专家团结构"
  ),
  chapter(
    25,
    "advanced",
    "自动化工作流的可靠性",
    "自动化工作流的可靠性",
    "用状态机、数据就绪检查、质量门禁、幂等、重试、断点、告警和降级交付守住长期运行。",
    [
      "自动化前先过输入稳定、质量可判和异常可处理三道门槛",
      "运行记录要回答“做了什么、结果在哪、为何失败”",
    ],
    "automation",
    "查看自动化运行面板"
  ),
  chapter(
    26,
    "industry",
    "岗位路线图",
    "岗位路线图：不同岗位如何把 WorkBuddy 用深",
    "按个人提效、稳定复用、跨工具协同和团队服务四级成熟度，为不同岗位规划 WorkBuddy 能力。",
    ["从岗位高频、可验收任务开始", "成熟后再扩展到部门模板、权限与审计"],
    "experts",
    "按岗位浏览专家"
  ),
  chapter(
    27,
    "industry",
    "行业路线图",
    "行业路线图：从通用能力到行业工作流",
    "从行业场景、数据来源、责任边界、交付对象和复核规则出发，把通用能力组合成行业工作流。",
    [
      "先回答五个场景问题，再选 Skill 与连接器",
      "行业落地优先保证合规、来源与人工签字点",
    ],
    "project",
    "创建行业工作流项目"
  ),
];

export const promptTemplates = [
  {
    id: "files",
    title: "文件整理",
    category: "基础办公",
    action: "desktop-task" as const,
    prompt:
      "请整理当前文件夹中的文件。\n按文件类型和主题分类，生成新的文件夹结构。\n在执行前先给我一个整理方案，不要直接移动文件。",
  },
  {
    id: "excel",
    title: "Excel 分析",
    category: "数据分析",
    action: "chat" as const,
    prompt:
      "请分析这个 Excel 文件。\n请输出：核心指标、异常数据、趋势变化、可能原因、建议行动。\n请生成一个摘要报告和图表。",
  },
  {
    id: "ppt",
    title: "PPT 生成",
    category: "管理汇报",
    action: "chat" as const,
    prompt:
      "请根据这份 Word 文档生成一份 PPT 大纲。\n要求：10 页左右，每页包含标题、3—4 个要点和建议图表。\n风格正式，适合管理层汇报。",
  },
  {
    id: "meeting",
    title: "会议纪要",
    category: "协同办公",
    action: "chat" as const,
    prompt:
      "请整理这段会议内容。\n输出：会议结论、待办事项、负责人、截止时间、风险点、未决问题。",
  },
  {
    id: "research",
    title: "行业调研",
    category: "研究",
    action: "chat" as const,
    prompt:
      "请调研【行业/公司/产品】。\n输出：市场背景、主要玩家、竞品对比、趋势判断、机会点、风险点。\n请附上信息来源链接。",
  },
  {
    id: "sales",
    title: "销售方案",
    category: "销售售前",
    action: "chat" as const,
    prompt:
      "请基于客户资料生成一份售前方案。\n包括：客户背景、痛点分析、推荐场景、实施路径、预期收益、演示流程。",
  },
];

export const roleRoutes = [
  {
    role: "普通职场人",
    start: "周报、会议纪要、PPT、Excel",
    chapters: "11 · 17",
  },
  {
    role: "内容创作者",
    start: "趋势、标题、封面、脚本、发布复盘",
    chapters: "15 · 20",
  },
  {
    role: "产品与研发",
    start: "PRD、用户反馈、测试、技术文档",
    chapters: "17 · 24",
  },
  {
    role: "销售与售前",
    start: "客户调研、方案生成、跟进邮件",
    chapters: "21 · 26",
  },
  {
    role: "知识管理",
    start: "灵感捕捉、剪藏、Wiki、每周复盘",
    chapters: "16 · 22",
  },
  {
    role: "管理层",
    start: "经营分析、异常预警、战略提案",
    chapters: "25 · 27",
  },
];

export function getGuideSourceUrl(sourcePath: string) {
  return `${GUIDE_REPO_URL}/blob/main/docs/bluebook/${sourcePath}`;
}
