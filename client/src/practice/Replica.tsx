import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type CSSProperties,
} from "react";
import { Link } from "wouter";
import {
  Plus,
  Search,
  Bell,
  Users,
  Folder,
  BookOpen,
  Sparkles,
  Link2,
  Clock,
  MessageSquare,
  ChevronDown,
  ChevronRight,
  ArrowUp,
  Mic,
  X,
  Check,
  Copy,
  ArrowRight,
  RotateCcw,
  PanelLeft,
  Cloud,
  FileText,
  ShieldCheck,
  Share2,
  MoreHorizontal,
  Coffee,
  Code2,
  Palette,
  Presentation,
  ChartPie,
  Wallet,
  LayoutGrid,
  Filter,
  Monitor,
  Bot,
  SquarePlus,
  Megaphone,
  ThumbsUp,
  ThumbsDown,
  Volume2,
  PanelRight,
  CircleHelp,
  Send,
  Calendar,
  ClipboardCheck,
} from "lucide-react";
import "./replica.css";

export type Unit = "A" | "B" | "C" | "D";
export interface PracticeLaunch {
  unit: Unit;
  id: number;
  prompt?: string;
}
interface ReplicaProps {
  embedded?: boolean;
  active?: boolean;
  launch?: PracticeLaunch;
  onUnitChange?: (unit: Unit) => void;
  onProgress?: (progress: Record<Unit, number>) => void;
  onCourse?: () => void;
}
type Screen = "home" | "catalog" | "library" | "project" | "chat" | "result";
type Popup =
  | "skill"
  | "expert"
  | "invite"
  | "experts"
  | "skills"
  | "folder"
  | "meeting"
  | "reference"
  | null;
const base = import.meta.env.BASE_URL;
const ref = (name: string) => `${base}practice/reference/${name}.png`;
const labels: Record<Unit, string> = {
  A: "腾讯会议",
  B: "小红书文案",
  C: "知识库到页面",
  D: "多人协作",
};
const steps: Record<Unit, string[]> = {
  A: [
    "找到腾讯会议技能",
    "启用技能，点击去试试",
    "填写会议信息",
    "核对预约结果",
  ],
  B: [
    "搜索小红书专家",
    "查看并召唤专家",
    "补充背景和要求",
    "检查文案，继续调优",
  ],
  C: [
    "新建资料文件夹",
    "上传小红书表格",
    "引用并读取资料",
    "生成页面，核对内容",
  ],
  D: [
    "进入项目",
    "邀请团队成员",
    "右侧添加专家和技能",
    "选择云端任务，开始协作",
  ],
};
const tasks = [
  "读取资料库文档并提取…",
  "使用腾讯会议skill帮我预…",
  "优化小红书AI体验课文案…",
  "腾讯会议技能授权检查…",
  "翻译奥德赛剧本PDF并保持…",
  "设计麻将预约小程序架构",
  "润色朋友圈培训感悟长文",
  "根据图片编写培训流程表",
  "根据需求调用workbuddy…",
  "制作小学生午休活动Excel表",
  "构建Astra更新内容展示网站",
  "提取抖音视频中的文字",
  "单摆物理交互模型",
  "撰写英才学校AI品牌故事",
];
const expertRows = [
  [
    "小红书运营专家",
    "种草草",
    "深谙小红书种草生态和推荐机制，打造高互动率种草内容",
    "小红书运营|种草营销|笔记创作",
  ],
  [
    "小红书爆款内容创作专家",
    "",
    "基于真实更新爆款笔记打法，把灵感变成可发布的小红书笔记：爆款生成、封面设计、违禁词检测、文案标题优化…",
    "笔记创作|标题封面|合规检测",
  ],
  [
    "小红书运营专家",
    "",
    "用大白话帮你做好小红书运营：定目标选题写笔记、合规发布、数据复盘与转化闭环，不做达人投放。",
    "内容运营|笔记种草|复盘转化",
  ],
  [
    "小红书运营专家",
    "",
    "服务品牌方、创作者、代运营与个人IP，提供陪伴式小红书起号、合规、内容与数据复盘方案。",
    "小红书运营|账号起号|合规种草",
  ],
  [
    "小红书内容灵感专家",
    "",
    "专注小红书爆款风向：搜索爆款笔记、追品类风向、挖低粉黑马、锁热门账号，灵感神器",
    "爆款风向|关键词挖掘|账号对标",
  ],
  [
    "小红书种草增长专家",
    "青禾",
    "拆解小红书爆款公式，搭建达人投放矩阵，交付选题日历、笔记模板与排期，提升互动率、收藏与搜索卡位。",
    "爆款笔记|达人投放|搜索卡位",
  ],
  [
    "小红书内容运营师",
    "小红书图文",
    "完成小红书选题、种草笔记、小红书文案、封面和图文套图，支持账号持续更新。",
    "自媒体图文|热点创作|美图设计室",
  ],
  [
    "小红书内容营销与自动化发布专家",
    "小红书种草助手",
    "挖掘爆款选题，生成种草文案与3:4竖屏配图，广告法违禁词检测，人工确认后自动发布。",
    "小红书种草|爆款文案|自动化发布",
  ],
  [
    "小红书垂直内容运营顾问",
    "小红书家庭内容运营顾问",
    "面向小学至高中家庭成长内容，完成热点选题、图文文案定稿及逐页配图提示词设计，提升内容产出效率。",
    "小红书运营|家庭成长|图文创作",
  ],
  [
    "小红书种草操盘手专家",
    "小红书种草操盘手",
    "把账号定位、品牌合作、多图设计等11项功能串成多条流水线，经合规与质量闸门统一复核",
    "账号定位|品牌合作|多图设计",
  ],
  [
    "小红书爆款笔记",
    "小红书爆款笔记专家",
    "一句话生成标题、封面、正文、标签内容并逐条合规自检。",
    "小红书运营|内容创作|爆款笔记",
  ],
  [
    "内容种草策划",
    "小红书抖音内容种草专家",
    "挖掘爆款内容种草，直播脚本排品复盘与短视频种草文案，一站式策划并落地执行。",
    "内容种草|直播运营|短视频",
  ],
  [
    "小红书运营专家",
    "种草官",
    "深谙小红书种草生态与推荐机制，擅长账号定位、爆款笔记创作、选题库搭建与种草营销。",
    "小红书运营|种草营销|笔记创作",
  ],
  [
    "小红书美妆内容创作专家",
    "小桃",
    "深耕小红书护肤美妆，产出测评、干货、成分科普等高转化笔记，配爆款标题与AI配图提示词。",
    "爆款笔记创作|美妆成分科普|AI配图提示词",
  ],
  [
    "小红书爆款笔记策划",
    "笔记侠",
    "精通小红书种草逻辑，从标题、封面到正文结构与关键词埋点一气呵成，产出高赞高收藏的种草笔记文案。",
    "小红书笔记|种草文案|标题优化",
  ],
  [
    "小红书爆款文案创作专家",
    "小两",
    "告诉我要种草的产品与卖点，为你创作真实口吻的种草笔记，含吸睛标题和emoji排版。",
    "小红书|种草文案|爆款笔记",
  ],
];
expertRows.push(
  [
    "小红书爆款笔记写手",
    "小红书爆款专家",
    "专产小红书爆款标题，一次给多个候选随便挑，顺手优化旧标题、分级检测违禁词、按爆款结构出成稿。",
    "小红书|标题优化|内容创作",
  ],
  [
    "小红书电商运营专家",
    "红姐",
    "覆盖小红书专业号、上架挂车、内容种草、聚光投放、体验分与蒲公英，把运营问题变成可照做清单。",
    "电商运营|内容种草|运营清单",
  ],
  [
    "小红书图文教练",
    "",
    "小红书创作与种草内容运营的图文全流程教练：账号定位、爆款选题、标题封面、种草文案、图文排版。",
    "图文创作|种草文案|标题封面",
  ],
  [
    "小红书小工具开发专家",
    "小红书工具专家",
    "擅长小红书小工具容器规范，从零开发改写小工具，处理离线沙箱约束和端能力API调用。",
    "工具开发|小红书|开发指南",
  ]
);
const skillRows = [
  [
    "腾讯会议",
    "腾讯会议管理助手，支持预约/创建/修改/取消会议、查询录制与转写、获取AI智能纪要",
  ],
  [
    "WorkBuddy会议助手",
    "把会议的采集、提炼、确认、分发串成流水线：腾讯会议飞书/钉钉/IMA/企业微信多端取料，15类场景…",
  ],
  [
    "腾讯会议甲方跟进",
    "腾讯会议甲方沟通全流程跟进技能：会前需求采集（邮件/企业微信）、会议通知发送、实时转录…",
  ],
  [
    "中层领导工作助理",
    "中层领导日常工作助理：日志/日历/任务/员工/1对1/OKR/汇报PPT/邮件/内容撰写/绩效/搜索…",
  ],
  [
    "会议纪要助手",
    "会议纪要助手（腾讯会议增强版）。基于腾讯会议MCP原生能力（预约/修改/取消/查询会议、参会成员…",
  ],
  [
    "一人农业公司协同运营",
    "一人经营「种植+养殖+加工+销售」综合农业公司的协同运营Skill：老板Agent调度10个子Agent…",
  ],
  [
    "腾讯会议 HR 面试",
    "腾讯会议+HR招聘面试全流程技能。六大阶段：简历筛选与JD匹配、面试日历安排、通知与会议…",
  ],
];
const expertPrompt =
  "我想做小红书内容运营,需要专业的运营策略和用户增长方案,请小红书运营专家帮我分析账号定位、内容规划和爆款打造方法。";
const material =
  "我们准备组织一次AI办公体验课，2026年9月20日下午2点到4点，20人参加，零基础也可以。大家自带电脑，现场演示会议纪要、文案优化和资料库问答。";
const sampleText =
  "主题,数量,说明\n内容排期,16,30天的内容安排\n选题储备,19,可继续筛选的选题\n内容支柱,4,内容方向分类\n计划周期,90,天";
function Sprite({
  file,
  x,
  y,
  w,
  h,
  scale = 1,
  className = "",
}: {
  file: string;
  x: number;
  y: number;
  w: number;
  h: number;
  scale?: number;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={`rep-sprite ${className}`}
      style={{
        width: w * scale,
        height: h * scale,
        backgroundImage: `url("${ref(file)}")`,
        backgroundSize: `${2048 * scale}px auto`,
        backgroundPosition: `${-x * scale}px ${-y * scale}px`,
      }}
    />
  );
}
function IconButton({
  label,
  children,
  onClick,
}: {
  label: string;
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      className="rep-icon-button"
      title={label}
      aria-label={label}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
function ExpertAvatar({
  index = 0,
  size = 36,
}: {
  index?: number;
  size?: number;
}) {
  return (
    <Sprite
      file="experts"
      x={383 + (index % 4) * 437}
      y={196 + Math.floor(index / 4) * 212}
      w={48}
      h={48}
      scale={size / 48}
      className="rep-avatar"
    />
  );
}
function MeetingIcon({ size = 36 }: { size?: number }) {
  return (
    <Sprite
      file="skill-detail"
      x={662}
      y={123}
      w={87}
      h={87}
      scale={size / 87}
      className="rep-avatar"
    />
  );
}
export default function Replica({
  embedded = false,
  active = true,
  launch,
  onUnitChange,
  onProgress,
  onCourse,
}: ReplicaProps) {
  const host = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(() =>
    Math.min(window.innerWidth / 1650, window.innerHeight / 900)
  );
  const [unit, setUnit] = useState<Unit>("A");
  const [screen, setScreen] = useState<Screen>("home");
  const [catalogTab, setCatalogTab] = useState("技能");
  const [query, setQuery] = useState("腾讯会议");
  const [popup, setPopup] = useState<Popup>(null);
  const [tour, setTour] = useState(false);
  const [step, setStep] = useState<Record<Unit, number>>({
    A: 0,
    B: 0,
    C: 0,
    D: 0,
  });
  const [toast, setToast] = useState("");
  const dialogRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [summoned, setSummoned] = useState(false);
  const [selectedExpert, setSelectedExpert] = useState(0);
  const [input, setInput] = useState("");
  const [conversation, setConversation] = useState<"idle" | "ask" | "done">(
    "idle"
  );
  const [topic, setTopic] = useState("线上会议");
  const [date, setDate] = useState("2026-09-14");
  const [time, setTime] = useState("10:00");
  const [minutes, setMinutes] = useState("60");
  const [submitted, setSubmitted] = useState("");
  const [question, setQuestion] = useState(0);
  const [answers, setAnswers] = useState(["", "", ""]);
  const [draftInput, setDraftInput] = useState(material);
  const [short, setShort] = useState(false);
  const [folder, setFolder] = useState(false);
  const [folderName, setFolderName] = useState("小红书表格");
  const [newName, setNewName] = useState("小红书表格");
  const [addMenu, setAddMenu] = useState(false);
  const [file, setFile] = useState<{ name: string; text: string } | null>(null);
  const [fileSelected, setFileSelected] = useState(false);
  const upload = useRef<HTMLInputElement>(null);
  const [project, setProject] = useState(false);
  const [projectTab, setProjectTab] = useState("动态");
  const [members, setMembers] = useState(1);
  const [projectExpert, setProjectExpert] = useState(false);
  const [projectSkill, setProjectSkill] = useState(false);
  const [cloud, setCloud] = useState(true);
  const [owner, setOwner] = useState(true);
  const [model, setModel] = useState("Deepseek-V4.1-Flash");
  const [collab, setCollab] = useState(false);
  useEffect(() => {
    if (embedded) return;
    const resize = () => {
      if (host.current)
        setScale(
          Math.min(
            host.current.clientWidth / 1650,
            host.current.clientHeight / 900
          )
        );
    };
    resize();
    const observer = new ResizeObserver(resize);
    if (host.current) observer.observe(host.current);
    return () => observer.disconnect();
  }, [embedded]);
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 3500);
    return () => clearTimeout(t);
  }, [toast]);
  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setPopup(null);
        setAddMenu(false);
        setTour(false);
      }
    };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, []);
  useEffect(() => {
    if (!popup) return;
    const prior = document.activeElement as HTMLElement | null;
    dialogRef.current?.focus();
    const trap = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const items = dialogRef.current?.querySelectorAll<HTMLElement>(
        "button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea,a[href]"
      );
      if (!items?.length) return;
      const first = items[0],
        last = items[items.length - 1];
      if (
        e.shiftKey &&
        (document.activeElement === first ||
          document.activeElement === dialogRef.current)
      ) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", trap);
    return () => {
      document.removeEventListener("keydown", trap);
      prior?.focus();
    };
  }, [popup]);
  const advance = (u: Unit, n: number) =>
    setStep(s => ({ ...s, [u]: Math.max(s[u], n) }));
  const enter = (u: Unit) => {
    setUnit(u);
    setScreen(u === "C" ? "library" : u === "D" ? "project" : "catalog");
    setCatalogTab(u === "B" ? "专家" : "技能");
    setQuery(u === "B" ? "小红书" : "腾讯会议");
    setPopup(null);
    setInput("");
    setConversation("idle");
    setTour(false);
  };
  useEffect(() => {
    if (launch) {
      enter(launch.unit);
      if (launch.prompt) setInput(launch.prompt);
    }
  }, [launch]);
  useEffect(() => {
    onUnitChange?.(unit);
  }, [unit, onUnitChange]);
  useEffect(() => {
    onProgress?.(step);
  }, [step, onProgress]);
  useEffect(() => {
    if (!active) {
      setPopup(null);
      setAddMenu(false);
      setTour(false);
    }
  }, [active]);
  const reset = () => {
    setStep(s => ({ ...s, [unit]: 0 }));
    setConversation("idle");
    setSubmitted("");
    setInput("");
    if (unit === "A") setEnabled(false);
    if (unit === "B") {
      setSummoned(false);
      setQuestion(0);
      setAnswers(["", "", ""]);
      setShort(false);
    }
    if (unit === "C") {
      setFolder(false);
      setFile(null);
      setFileSelected(false);
    }
    if (unit === "D") {
      setProject(false);
      setMembers(1);
      setProjectExpert(false);
      setProjectSkill(false);
      setCollab(false);
      setOwner(true);
    }
    enter(unit);
  };
  const beginSkill = () => {
    if (!enabled) return;
    setPopup(null);
    setScreen("home");
    setInput("使用腾讯会议skill帮我预约会议");
    advance("A", 2);
  };
  const summon = () => {
    setSummoned(true);
    setPopup(null);
    setScreen("home");
    setInput(expertPrompt);
    advance("B", 2);
  };
  const send = () => {
    if (!input.trim()) {
      setToast("请先输入这次需要完成的工作");
      return;
    }
    if (unit === "D") {
      if (!cloud) {
        setToast("请在输入框下方选择「云端任务」");
        return;
      }
      if (members < 2) {
        setToast("请先邀请成员加入项目");
        return;
      }
      if (!projectExpert || !projectSkill) {
        setToast("请先在右侧项目配置中添加专家和技能");
        return;
      }
    }
    if (unit === "A" && !enabled) {
      setToast("请先启用腾讯会议技能");
      return;
    }
    if (unit === "B" && !summoned) {
      setToast("请先召唤小红书专家");
      return;
    }
    setSubmitted(input);
    setScreen("chat");
    if (unit === "A" || unit === "B") {
      setConversation("ask");
      advance(unit, 3);
    } else if (unit === "C") {
      if (!file) {
        setToast("请先在资料库添加文件");
        setScreen("library");
        return;
      }
      setConversation("done");
      advance("C", 3);
    } else {
      if (!cloud) {
        setToast("请在输入框下方选择「云端任务」");
        return;
      }
      if (members < 2) {
        setToast("请先邀请成员加入项目");
        return;
      }
      if (!projectExpert || !projectSkill) {
        setToast("请先在右侧项目配置中添加专家和技能");
        return;
      }
      setConversation("done");
      setCollab(true);
      advance("D", 4);
    }
    setInput("");
  };
  const addSample = () => {
    setFile({ name: "创芽OPC_小红书_0-1_起号作战表.xlsx", text: sampleText });
    setAddMenu(false);
    advance("C", 2);
    setToast("示例文件已添加（教学数据）");
  };
  const readSource = () => {
    setUnit("C");
    setFileSelected(true);
    setScreen("home");
    setInput(
      "请读取这篇资料库文档的正文，一键可视化生成 HTML 页面。并推送到workbuddy空间"
    );
    advance("C", 3);
  };
  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setToast("已复制");
    } catch {
      setToast("请选中文字后复制");
    }
  };
  const sideNav = [
    {
      name: "新建任务",
      icon: SquarePlus,
      to: () => {
        setScreen("home");
        setInput("");
      },
    },
    { name: "助理", icon: Bot, to: () => setToast("本页复刻 ABCD 四项实操") },
    { name: "项目", icon: Share2, to: () => enter("D") },
    {
      name: "专家·技能·连接器",
      icon: Bot,
      to: () => {
        setScreen("catalog");
        setCatalogTab(unit === "B" ? "专家" : "技能");
        advance(unit === "B" ? "B" : "A", 1);
      },
    },
    {
      name: "定时任务",
      icon: Clock,
      to: () => setToast("定时任务不在本次 ABCD 实操范围内"),
    },
    { name: "资料库", icon: BookOpen, to: () => enter("C") },
    { name: "更多", icon: LayoutGrid, to: () => setTour(true) },
  ];
  const activeNav =
    screen === "catalog"
      ? "专家·技能·连接器"
      : screen === "library"
        ? "资料库"
        : screen === "project"
          ? "项目"
          : screen === "home"
            ? "新建任务"
            : "";
  const modelControl = (
    <label className="rep-model">
      <Sprite file="home" x={1370} y={607} w={24} h={22} scale={0.8} />
      <select
        aria-label="选择模型"
        disabled={unit === "D" && !owner}
        value={model}
        onChange={e => setModel(e.target.value)}
      >
        <option>Deepseek-V4.1-Flash</option>
        <option>Hy4 preview</option>
        <option>标准模型（模拟）</option>
      </select>
      <ChevronDown size={12} />
    </label>
  );
  const compose = (home = false) => (
    <div className={`rep-composer-wrap ${home ? "at-home" : ""}`}>
      <div className="rep-composer">
        {((unit === "A" && enabled) || (unit === "C" && fileSelected)) && (
          <span className="rep-skill-chip">
            <Code2 size={15} />
            {unit === "A" ? "腾讯会议" : "library"}
          </span>
        )}
        <textarea
          aria-label="任务输入框"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder={
            unit === "D"
              ? "今天帮你做些什么？@ 引用资产文件、项目待办或调用技能"
              : "今天帮你做些什么？"
          }
          onKeyDown={e => {
            if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
              e.preventDefault();
              send();
            }
          }}
        />
        <div className="rep-composer-tools">
          <IconButton
            label="添加材料"
            onClick={() =>
              unit === "C"
                ? setScreen("library")
                : setToast("将材料粘贴到输入框即可参与练习")
            }
          >
            <Plus size={20} />
          </IconButton>
          {unit === "B" && summoned ? (
            <button
              className="rep-current-expert"
              onClick={() => setPopup("expert")}
            >
              <ExpertAvatar size={18} />
              小红书运营专家
            </button>
          ) : home && unit !== "C" ? (
            <span className="rep-current-expert">
              <Sprite file="home" x={774} y={606} w={22} h={23} scale={0.8} />
              思维蒸馏师
            </span>
          ) : null}
          <Sprite file="home" x={907} y={603} w={36} h={28} scale={0.8} />
          <div className="rep-compose-right">
            <Sparkles size={18} />
            {modelControl}
            <IconButton
              label="语音输入"
              onClick={() => setToast("仿真练习使用文字输入")}
            >
              <Mic size={19} />
            </IconButton>
            <button className="rep-send" aria-label="发送任务" onClick={send}>
              <ArrowUp size={22} />
            </button>
          </div>
        </div>
      </div>
      <div className="rep-compose-bottom">
        {unit === "D" ? (
          <label>
            <select
              aria-label="任务模式"
              value={cloud ? "cloud" : "local"}
              onChange={e => setCloud(e.target.value === "cloud")}
            >
              <option value="cloud">云端任务</option>
              <option value="local">本地任务</option>
            </select>
            <ChevronDown size={12} />
          </label>
        ) : (
          <>
            <span>
              <Folder size={16} />
              选择工作空间 <ChevronDown size={12} />
            </span>
            <span>
              <ShieldCheck size={16} />
              默认权限 <ChevronDown size={12} />
            </span>
          </>
        )}
      </div>
    </div>
  );
  const popupTitle =
    popup === "skill"
      ? "腾讯会议"
      : popup === "expert"
        ? "小红书运营专家"
        : popup === "invite"
          ? "项目团队成员"
          : popup === "experts"
            ? "专家"
            : popup === "skills"
              ? "技能"
              : popup === "folder"
                ? "新建文件夹"
                : popup === "meeting"
                  ? "会议详情"
                  : "原图对照";
  return (
    <div className={`rep-host ${embedded ? "rep-embedded" : ""}`} ref={host}>
      <div
        className="rep-stage"
        style={
          embedded
            ? undefined
            : ({ transform: `scale(${scale})` } as CSSProperties)
        }
      >
        {!embedded && (
          <aside className="rep-sidebar">
            <div className="rep-window">
              <span />
              <span />
              <span />
              <div>
                <PanelLeft size={16} />
                <Search size={17} />
                <Filter size={17} />
              </div>
            </div>
            <div className="rep-brand">
              <strong>WorkBuddy</strong>
              <small>5.5.6</small>
              <button onClick={() => setTour(true)}>
                <Bot size={14} />
                发现应用
                <ChevronDown size={13} />
              </button>
            </div>
            <nav>
              {sideNav.map(({ name, icon: Icon, to }) => (
                <button
                  key={name}
                  className={activeNav === name ? "active" : ""}
                  onClick={to}
                >
                  <Icon size={18} />
                  {name}
                  {name === "更多" && <small>灵感</small>}
                </button>
              ))}
            </nav>
            <div className="rep-task-label">
              任务 (57)
              <ChevronDown size={12} />
            </div>
            <div className="rep-task-list">
              {tasks.map((t, i) => (
                <button
                  key={t}
                  onClick={() =>
                    enter(
                      i === 0
                        ? "C"
                        : i === 1 || i === 3
                          ? "A"
                          : i === 2
                            ? "B"
                            : "D"
                    )
                  }
                  className={
                    screen === "chat" &&
                    ((unit === "A" && i === 1) ||
                      (unit === "B" && i === 2) ||
                      (unit === "C" && i === 0))
                      ? "active"
                      : ""
                  }
                >
                  <span>{t}</span>
                  <small>
                    {i < 4
                      ? "10小时前"
                      : i < 8
                        ? "3天前"
                        : i < 11
                          ? "5天前"
                          : "15天前"}
                  </small>
                </button>
              ))}
            </div>
            <div className="rep-profile">
              <Sprite file="home" x={23} y={1066} w={43} h={44} scale={0.8} />
              <b>Avec moi</b>
              <Bell size={18} />
              <Monitor size={18} />
            </div>
          </aside>
        )}
        <main className="rep-main">
          {screen === "home" && (
            <>
              <button
                className="rep-reward"
                onClick={() => setToast("活动入口为静态外观复刻")}
              >
                <ClipboardCheck size={14} />
                做任务赢积分好礼
                <ChevronRight size={14} />
              </button>
              <section className="rep-home">
                <h1>WorkBuddy，我帮你</h1>
                <div className="rep-mode-pills">
                  <b>
                    <Coffee size={17} />
                    日常办公
                  </b>
                  <span>
                    <Code2 size={17} />
                    代码开发
                  </span>
                  <span>
                    <Palette size={17} />
                    设计创意
                  </span>
                </div>
                <div className="rep-promo">
                  <span>
                    <Megaphone size={17} />
                    活动
                  </span>
                  <button
                    aria-label="关闭活动"
                    onClick={e => {
                      e.currentTarget.parentElement!.style.visibility =
                        "hidden";
                    }}
                  >
                    <X size={12} />
                  </button>
                  <p>DeepSeek-V4.1-Flash 国内独家官方合作，享限时优惠两周</p>
                  <b>立即使用</b>
                </div>
                <div className="rep-home-chips">
                  {[
                    [FileText, "文档处理"],
                    [Wallet, "金融服务"],
                    [ChartPie, "数据分析及可视化"],
                    [LayoutGrid, "个人工作台"],
                    [Presentation, "幻灯片"],
                  ].map(([Icon, name]) => {
                    const I = Icon as typeof FileText;
                    return (
                      <span key={name as string}>
                        <I size={17} />
                        {name as string}
                      </span>
                    );
                  })}
                  <ChevronRight size={21} />
                </div>
                <Sprite
                  file="home"
                  x={1573}
                  y={418}
                  w={100}
                  h={62}
                  scale={0.81}
                  className="rep-home-robot"
                />
                {compose(true)}
                <div className="rep-examples-head">
                  不知道做什么，试试最佳实践案例
                  <span>
                    <RotateCcw size={14} />
                    换一批　×
                  </span>
                </div>
                <div className="rep-examples">
                  {[
                    "品牌活动宣传海报",
                    "五只持仓诊断体检",
                    "交互式年度数据报告",
                    "SEO 长文内容创作",
                  ].map((name, i) => (
                    <div key={name}>
                      <Sprite
                        file="home"
                        x={698 + i * 250}
                        y={887}
                        w={242}
                        h={136}
                        scale={0.8}
                      />
                      <p>{name}</p>
                    </div>
                  ))}
                </div>
              </section>
            </>
          )}
          {screen === "catalog" && (
            <>
              <header className="rep-catalog-bar">
                <div>
                  {["专家", "技能", "连接器"].map((t, i) => {
                    const I = [Bot, Code2, Link2][i];
                    return (
                      <button
                        className={catalogTab === t ? "active" : ""}
                        key={t}
                        onClick={() => {
                          setCatalogTab(t);
                          if (t === "专家") setUnit("B");
                          if (t === "技能") setUnit("A");
                          setQuery(
                            t === "专家"
                              ? "小红书"
                              : t === "技能"
                                ? "腾讯会议"
                                : ""
                          );
                        }}
                      >
                        <I size={17} />
                        {t}
                      </button>
                    );
                  })}
                </div>
                <label>
                  <Search size={17} />
                  <input
                    aria-label="搜索专家或技能"
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                  />
                  <button aria-label="清空搜索" onClick={() => setQuery("")}>
                    <X size={15} />
                  </button>
                </label>
                <button
                  className="rep-border"
                  onClick={() => setToast("课程中展示已安装的腾讯会议技能")}
                >
                  <ClipboardCheck size={17} />
                  {catalogTab === "专家" ? "我的专家" : "我安装的"}
                  <small>47</small>
                </button>
                <button
                  className="rep-border"
                  onClick={() => setToast("点击卡片可以查看并添加")}
                >
                  <Plus size={18} />
                  添加{catalogTab === "专家" ? "专家" : "技能"}
                </button>
              </header>
              <section
                className={`rep-catalog ${catalogTab === "专家" ? "expert-grid" : ""}`}
              >
                <div className="rep-catalog-sub">
                  {catalogTab === "专家" ? (
                    <>
                      <b>专家</b>
                      <span>专家团</span>
                    </>
                  ) : (
                    <>
                      <b>
                        推荐 <small>7</small>
                      </b>
                      <span>
                        SkillHub <small>79</small>
                      </span>
                      <span>
                        套件 <small>0</small>
                      </span>
                    </>
                  )}
                </div>
                {catalogTab === "专家" && (
                  <p className="rep-found">
                    搜索 <b>"{query}"</b> 找到{" "}
                    <b>
                      {query === "小红书"
                        ? 26
                        : expertRows.filter(r => r[0].includes(query)).length}
                    </b>{" "}
                    位专家
                  </p>
                )}
                <div className="rep-grid">
                  {catalogTab === "专家" ? (
                    expertRows.map(
                      (r, i) =>
                        (query === "小红书" || r[0].includes(query)) && (
                          <button
                            className="rep-expert-card"
                            key={i}
                            onClick={() => {
                              setUnit("B");
                              setSelectedExpert(i);
                              setPopup("expert");
                              advance("B", 1);
                            }}
                          >
                            <div className="rep-card-title">
                              <ExpertAvatar index={i} />
                              <div>
                                <b>{r[0]}</b>
                                {r[1] && <span>{r[1]}</span>}
                              </div>
                              <em>召唤</em>
                            </div>
                            <p>{r[2]}</p>
                            <div className="rep-tags">
                              {r[3].split("|").map(t => (
                                <span key={t}>{t}</span>
                              ))}
                            </div>
                          </button>
                        )
                    )
                  ) : catalogTab === "技能" ? (
                    skillRows.map(
                      (r, i) =>
                        (query === "腾讯会议" ||
                          r[0].toLowerCase().includes(query.toLowerCase())) && (
                          <button
                            className="rep-skill-card"
                            key={r[0]}
                            onClick={() => {
                              if (i === 0) {
                                setUnit("A");
                                setPopup("skill");
                                advance("A", 1);
                              } else
                                setToast(
                                  "本课使用「腾讯会议」技能，点击第一张卡片继续"
                                );
                            }}
                          >
                            <div className="rep-card-title">
                              {i === 0 ? (
                                <MeetingIcon size={29} />
                              ) : (
                                <Sprite
                                  file="skills"
                                  x={
                                    i < 4 ? 383 + i * 422 : 383 + (i - 4) * 422
                                  }
                                  y={i < 4 ? 187 : 337}
                                  w={35}
                                  h={35}
                                  scale={0.83}
                                />
                              )}
                              <b>{r[0]}</b>
                              {i === 0 ? (
                                <>
                                  <MoreHorizontal size={15} />
                                  <Check size={14} />
                                </>
                              ) : (
                                <span className="rep-card-plus">
                                  <Plus size={19} />
                                </span>
                              )}
                            </div>
                            <p>{r[1]}</p>
                          </button>
                        )
                    )
                  ) : (
                    <p className="rep-muted">
                      连接器用于连接外部服务，本课不需要配置。
                    </p>
                  )}
                </div>
                {((catalogTab === "专家" &&
                  !expertRows.some(r => r[0].includes(query))) ||
                  (catalogTab === "技能" &&
                    query !== "腾讯会议" &&
                    !skillRows.some(r =>
                      r[0].toLowerCase().includes(query.toLowerCase())
                    ))) && <p className="rep-muted">没有找到匹配结果</p>}
              </section>
            </>
          )}
          {screen === "library" && (
            <div className="rep-library">
              <aside className="rep-library-side">
                <h2>
                  资料库
                  <Megaphone size={17} />
                </h2>
                <div className="rep-library-links">
                  <span>
                    <Search />
                    搜索
                  </span>
                  <span>
                    <Clock />
                    最近
                  </span>
                  <span>
                    <Folder />
                    本地产物
                  </span>
                </div>
                <div className="rep-library-label">
                  我的资料
                  <ChevronDown size={12} />
                  <button
                    aria-label="新建资料文件夹"
                    onClick={() => setPopup("folder")}
                  >
                    <Plus size={18} />
                  </button>
                </div>
                {folder && (
                  <button
                    className="active"
                    onClick={() => setFileSelected(false)}
                  >
                    <Folder fill="#65a7e1" strokeWidth={0} />
                    {folderName}
                  </button>
                )}
                <button
                  onClick={() => setToast("本课以「小红书表格」为材料进行练习")}
                >
                  <ChevronDown size={12} />
                  <Folder fill="#65a7e1" strokeWidth={0} />
                  青芽体验课_新手教程演示
                </button>
                <button className="indent">
                  <FileText color="#49abb3" />
                  青芽体验课_教学样例.md
                </button>
                <button className="indent deep">
                  <Code2 color="#548bda" />
                  青芽AI办公体验课资料.h…
                </button>
                {[
                  "google-2024-environmental…",
                  "WorkBuddy实战蓝皮书_咨询…",
                  "download-1699a2e1.pdf",
                ].map(n => (
                  <button key={n}>
                    <FileText color="#e56879" />
                    {n}
                  </button>
                ))}
                <p>查看更多</p>
                <div className="rep-library-label">
                  团队空间
                  <ChevronDown size={12} />
                  <Plus size={17} />
                </div>
                <button>🚀资料库的100种用法</button>
                <footer>
                  已使用 133.9 MB / 5.0 GB <span>升级 ›</span>
                </footer>
              </aside>
              <div className="rep-library-main">
                <header>
                  <PanelLeft size={16} />
                  我的资料{" "}
                  {folder && (
                    <>
                      / <b>{folderName}</b>
                    </>
                  )}
                  <Share2 size={18} />
                  <MoreHorizontal size={18} />
                </header>
                <section>
                  <h1>
                    <span>
                      <Folder size={20} fill="#64a3dc" strokeWidth={0} />
                    </span>
                    {folder ? folderName : "我的资料"}
                  </h1>
                  <div className="rep-quick-add">
                    <button
                      className="rep-border"
                      onClick={() =>
                        folder ? setAddMenu(!addMenu) : setPopup("folder")
                      }
                    >
                      <Plus size={20} />
                      {folder ? "快速添加" : "新建文件夹"}
                    </button>
                    {addMenu && (
                      <div className="rep-add-menu">
                        <button onClick={() => upload.current?.click()}>
                          <FileText color="#4aabb2" />
                          新建文档 (.md)
                        </button>
                        <button onClick={addSample}>
                          <LayoutGrid color="#4ba566" />
                          新建表格 (.csv)
                        </button>
                        <button
                          onClick={() => {
                            setPopup("folder");
                            setAddMenu(false);
                          }}
                        >
                          <Folder color="#69a7e2" />
                          新建文件夹
                        </button>
                        <hr />
                        <button onClick={addSample}>
                          <ArrowUp />
                          上传和导入 <ChevronRight size={14} />
                        </button>
                        <button
                          onClick={() =>
                            setToast("本练习使用已导入资料，暂不连接外部链接")
                          }
                        >
                          <Link2 />
                          添加链接
                        </button>
                      </div>
                    )}
                  </div>
                  {file ? (
                    <>
                      <div className="rep-file-head">
                        <span>名称（1项）</span>
                        <span>更新人</span>
                        <span>更新时间</span>
                      </div>
                      <button
                        className="rep-file-row"
                        onClick={() => setFileSelected(!fileSelected)}
                      >
                        <span>
                          <LayoutGrid color="#4ea968" />
                          {file.name}
                        </span>
                        <span>Avec moi</span>
                        <span>刚刚</span>
                      </button>
                      {fileSelected && (
                        <div className="rep-file-panel">
                          <h3>{file.name}</h3>
                          <pre>{file.text}</pre>
                          <button className="rep-black" onClick={readSource}>
                            引用到新任务 <ArrowRight size={16} />
                          </button>
                        </div>
                      )}
                      <p className="rep-end">已经到底了</p>
                    </>
                  ) : (
                    <div className="rep-library-empty">
                      <Folder size={43} />
                      <h3>
                        {folder ? "文件夹是空的" : "整理资料，从新建文件夹开始"}
                      </h3>
                      <p>
                        点击右上角「{folder ? "快速添加" : "新建文件夹"}
                        」新建内容
                      </p>
                    </div>
                  )}
                </section>
                <input
                  ref={upload}
                  hidden
                  type="file"
                  accept=".txt,.csv,.md"
                  onChange={async e => {
                    const f = e.target.files?.[0];
                    if (!f) return;
                    if (f.size > 1024 * 1024) {
                      setToast("本地练习支持1MB以内的文本");
                      return;
                    }
                    setFile({ name: f.name, text: await f.text() });
                    setAddMenu(false);
                    advance("C", 2);
                    e.target.value = "";
                  }}
                />
              </div>
            </div>
          )}
          {screen === "project" &&
            (!project ? (
              <section className="rep-project-list">
                <h1>项目</h1>
                <p>多人协同，打造超级团队</p>
                <Sprite
                  file="project-list"
                  x={1472}
                  y={103}
                  w={576}
                  h={196}
                  scale={0.8}
                  className="rep-project-art"
                />
                <button
                  className="rep-black"
                  onClick={() => {
                    setProject(true);
                    advance("D", 1);
                  }}
                >
                  <Plus size={18} />
                  新建项目
                </button>
                <h3>我的项目</h3>
                <div className="rep-project-grid">
                  {[
                    "新手教程协作演示",
                    "workbuddy培训流程",
                    "项目新手指引",
                    "workbuddy怀化推广",
                  ].map((n, i) => (
                    <button
                      key={n}
                      onClick={() => {
                        setProject(true);
                        advance("D", 1);
                      }}
                    >
                      <span>
                        <Share2 size={21} />
                      </span>
                      <div>
                        <b>{n}</b>
                        <small>
                          添加于{" "}
                          {i === 0 ? "20小时前" : i === 1 ? "3天前" : "3个月前"}
                        </small>
                      </div>
                      <MoreHorizontal size={16} />
                    </button>
                  ))}
                </div>
                <h3>从模板创建</h3>
                <div className="rep-project-grid">
                  {[
                    "产品需求全流程",
                    "市场调研与竞品分析",
                    "团队知识库",
                    "项目交付",
                    "Bug 跟踪/测试验收",
                  ].map((n, i) => (
                    <button
                      key={n}
                      onClick={() => {
                        setProject(true);
                        advance("D", 1);
                      }}
                    >
                      <span>
                        <Share2 size={21} />
                      </span>
                      <div>
                        <b>{n}</b>
                        <small>
                          {
                            [
                              "从需求规划、PRD 到研发测试验收",
                              "深度调研、竞品拆解、报告评审",
                              "持续沉淀 SOP、经验和 FAQ",
                              "管理客户需求、计划风险和周报",
                              "持续跟踪 Bug，统一测试用例与验收结论",
                            ][i]
                          }
                        </small>
                      </div>
                    </button>
                  ))}
                </div>
              </section>
            ) : (
              <>
                <header className="rep-project-header">
                  <Folder size={17} />
                  项目 / <b>workbuddy培训流程</b>
                  <button
                    className="rep-black"
                    onClick={() => setPopup("invite")}
                  >
                    邀请
                  </button>
                </header>
                <div className="rep-project-work">
                  <div className="rep-project-center">
                    <nav>
                      {["动态", "计划", "任务", "资产"].map(t => (
                        <button
                          className={projectTab === t ? "active" : ""}
                          key={t}
                          onClick={() => setProjectTab(t)}
                        >
                          {t}
                        </button>
                      ))}
                    </nav>
                    <div className="rep-project-stream">
                      {projectTab === "动态" ? (
                        <>
                          <button
                            className="rep-black"
                            onClick={() =>
                              setToast("在下方输入框发起任务，即可练习共同协作")
                            }
                          >
                            <Plus size={17} />
                            发布留言
                          </button>
                          <div className="rep-buddy-welcome">
                            <img
                              src={`${base}assets/workbuddy-logo.png`}
                              alt=""
                            />
                            <div>
                              <b>
                                BuddyBot <small>20小时前</small>
                              </b>
                              <strong>
                                🎉 欢迎来到 WorkBuddy
                                项目——这里是团队和AI共同协作的工作台
                              </strong>
                              <p>来带你认识项目空间的核心功能：</p>
                              <p>
                                📁 <b>资产与项目配置：团队资源，全员共用</b>
                                <br />
                                项目文档、参考资料放进「资产」，团队成员都能看到，我也会自动读取参考。任务产出的文件，也可以直接让我存进资产里——团队随时能查到最新产出。手头好用的专家、Skill、连接器，配置到项目里，团队成员发起任务都能用。
                              </p>
                              <p>
                                📋 <b>计划看板：分配、管理团队工作</b>
                                <br />
                                想给团队分工，直接跟我说，我会在「计划」看板里建好待办，谁做什么一目了然。之后有进展、有变化，我能在待办中评论、@对应成员提醒。
                              </p>
                              <p>
                                🤝 <b>任务协同：实时协作，或者接力转交</b>
                                <br />
                                有任务要几个人同时对着我讨论、修改，在输入框下方切换到「云端任务」模式，之后在任务对话页右上角发起「协作」，大家就能在同一个对话里一起干活。
                              </p>
                              <p>
                                ⚙️ <b>定时任务：让重复工作自己跑起来</b>
                                <br />
                                有些流程需要定期处理，可以在「定时任务」里配好规则，到时间我会自动执行。
                              </p>
                              <p>项目已经就位，祝顺利开工 🙂</p>
                            </div>
                          </div>
                        </>
                      ) : projectTab === "任务" ? (
                        <>
                          <div className="rep-task-filters">
                            <button className="rep-border">
                              全部任务
                              <ChevronDown size={14} />
                            </button>
                            <button className="rep-border">
                              全部来源
                              <ChevronDown size={14} />
                            </button>
                            <span>你的任务是私密的，除非你共享它们</span>
                          </div>
                          <button
                            className="rep-project-task"
                            onClick={() => {
                              setScreen("chat");
                              setConversation("done");
                              setCollab(members > 1);
                            }}
                          >
                            <MessageSquare size={18} />
                            打招呼问候 <span>🟠 {members}　　4天前　　…</span>
                          </button>
                          <div className="rep-project-task">
                            <MessageSquare size={18} />
                            上传培训流程表PDF资产 <small>本地</small>
                          </div>
                        </>
                      ) : projectTab === "资产" ? (
                        <div className="rep-assets">
                          <FileText />
                          培训流程表.pdf{" "}
                          <button
                            className="rep-border"
                            onClick={() => {
                              setInput(
                                "请读取培训流程表，和同伴一起完善活动安排。"
                              );
                              setProjectTab("任务");
                            }}
                          >
                            引用文件
                          </button>
                        </div>
                      ) : (
                        <div className="rep-plan">
                          <h3>培训活动筹备</h3>
                          {["确认活动安排", "准备课程文案", "整理资料页面"].map(
                            n => (
                              <label key={n}>
                                <input type="checkbox" />
                                {n}
                              </label>
                            )
                          )}
                        </div>
                      )}
                    </div>
                    {compose()}
                    <div className="rep-project-rule">
                      模型由发起者控制，积分由发起者承担。
                      <button onClick={() => setOwner(!owner)}>
                        {owner ? "查看成员视角" : "返回发起者视角"}
                      </button>
                      {!owner && <b>当前：协作成员</b>}
                    </div>
                  </div>
                  <aside className="rep-project-config">
                    <h3>
                      项目配置
                      <PanelRight size={16} />
                    </h3>
                    {["指令", "连接器", "专家", "技能", "定时任务"].map(t => (
                      <button
                        className="rep-config-card"
                        key={t}
                        onClick={() =>
                          t === "专家"
                            ? setPopup("experts")
                            : t === "技能"
                              ? setPopup("skills")
                              : setToast("本课在「专家」和「技能」中配置能力")
                        }
                      >
                        <b>
                          {t}{" "}
                          {(t === "专家" && projectExpert) ||
                          (t === "技能" && projectSkill) ? (
                            <small>1</small>
                          ) : null}
                          <Plus size={17} />
                        </b>
                        {t === "专家" && projectExpert ? (
                          <ExpertAvatar size={26} />
                        ) : t === "技能" && projectSkill ? (
                          <MeetingIcon size={26} />
                        ) : (
                          <p>
                            {t === "指令"
                              ? "设定项目背景与规范，让 AI 与你高效协作"
                              : t === "连接器"
                                ? "连接外部服务，扩展 AI 能力"
                                : t === "专家"
                                  ? "配置项目专家，为成员提供更专业的服务"
                                  : t === "技能"
                                    ? "配置项目技能，让 AI 精准执行任务"
                                    : "让 AI 按计划自动执行任务"}
                          </p>
                        )}
                      </button>
                    ))}
                  </aside>
                </div>
              </>
            ))}
          {screen === "chat" && (
            <>
              <header className="rep-chat-header">
                <b>
                  {unit === "A"
                    ? "使用腾讯会议skill预约会议"
                    : unit === "B"
                      ? "小红书内容运营与增长策略"
                      : unit === "C"
                        ? "读取文档并生成可视化HTML页面"
                        : "workbuddy培训流程 / 打招呼问候"}
                </b>
                <Search size={19} />
                {unit === "D" ? (
                  <button
                    className="rep-collab-badge"
                    onClick={() => setPopup("invite")}
                  >
                    {collab ? "● 协同中" : "协作"}
                  </button>
                ) : (
                  <Share2 size={19} />
                )}
                <Clock size={19} />
                {unit === "D" ? <Users size={19} /> : <PanelRight size={19} />}
              </header>
              <div className="rep-chat-scroll">
                <div className="rep-chat-body">
                  <div className="rep-user-message">
                    {submitted || "一起完善培训活动的安排。"}
                  </div>
                  <div className="rep-response">
                    <div className="rep-response-name">
                      {unit === "B" ? (
                        <ExpertAvatar size={25} />
                      ) : (
                        <span className="rep-botmark">◈</span>
                      )}
                      <b>{unit === "B" ? "小红书运营专家" : "WorkBuddy"}</b>
                    </div>
                    <p className="rep-processing">
                      {conversation === "ask" ? "已处理 3m34s" : "已完成 1m4s"}{" "}
                      <ChevronRight size={15} />
                    </p>
                    {unit === "A" ? (
                      conversation === "done" ? (
                        <>
                          <p>会议已创建成功。</p>
                          <h3>{topic}</h3>
                          <ul>
                            <li>
                              <b>时间：</b>
                              {date}　{time}（北京时间，共 {minutes} 分钟）
                            </li>
                            <li>
                              <b>会议号：</b>
                              <code>DEMO-515902140</code>
                            </li>
                            <li>
                              <b>入会链接：</b>
                              <button
                                className="rep-text-link"
                                onClick={() => setPopup("meeting")}
                              >
                                查看模拟会议详情
                              </button>
                            </li>
                            <li>
                              <b>受邀人：</b>无
                            </li>
                          </ul>
                          <p className="rep-simulation-note">
                            教学模拟结果，未创建真实会议。
                          </p>
                        </>
                      ) : (
                        <>
                          <p>
                            会议工具已连通。预约会议还差几个关键信息，你直接一行发我就行：
                          </p>
                          <h4>必填</h4>
                          <p>
                            1. <b>会议主题</b> —— 例如“产品周会”
                          </p>
                          <p>
                            2. <b>开始时间</b> —— 例如“9月15日 14:00”
                          </p>
                          <h4>选填（不说我就按默认）</h4>
                          <p>
                            3. <b>时长/结束时间</b> —— 默认1小时
                          </p>
                          <p>
                            4. <b>受邀人</b> —— 给姓名 / 手机号 / 邮箱
                          </p>
                          <p>一行示例：</p>
                          <blockquote>
                            产品周会 / 9月15日上午10点 / 1.5小时
                          </blockquote>
                          <button
                            className="rep-border"
                            onClick={() => setPopup("meeting")}
                          >
                            填写会议信息
                          </button>
                        </>
                      )
                    ) : unit === "B" ? (
                      conversation === "ask" ? (
                        <>
                          <p className="rep-processing">深度思考</p>
                          <p>
                            我先确认几个关键信息，这样才能给出真正可落地的定位和增长方案，而不是通用模板。
                          </p>
                          <p className="rep-processing">等待你的回答…</p>
                        </>
                      ) : (
                        <>
                          <h3>
                            {short
                              ? "一起动手，体验 AI 办公"
                              : "零基础，也可以从一次 AI 办公体验开始"}
                          </h3>
                          <p>
                            {short
                              ? "把日常问题带到课堂，边做边学。"
                              : "还没用过 AI，也不必着急。先从真实的日常工作开始，亲手试一试。"}
                          </p>
                          <p>{draftInput}</p>
                          <p>
                            面向{answers[1] || "零基础学习者"}
                            ，一起把想法变成可以动手完成的小任务。
                          </p>
                          <p>#AI办公　#零基础学习　#动手实践</p>
                          <div className="rep-inline-actions">
                            <button
                              className="rep-border"
                              onClick={() => setShort(!short)}
                            >
                              {short ? "恢复完整表达" : "语气再简洁一点"}
                            </button>
                            <button
                              className="rep-border"
                              onClick={() => copy(draftInput)}
                            >
                              复制活动材料
                            </button>
                            <button
                              className="rep-black"
                              onClick={() => {
                                advance("B", 4);
                                setToast("已完成：核对材料与文案");
                              }}
                            >
                              核对完成
                              <Check size={15} />
                            </button>
                          </div>
                        </>
                      )
                    ) : unit === "C" ? (
                      <>
                        <p>已读取并整理完成。</p>
                        <p>
                          <b>读取结果：</b>资料位于「{folderName}」，文件为{" "}
                          <b>{file?.name}</b>。
                        </p>
                        <p>
                          <b>生成的可视化页面：</b>
                          把资料中的信息按主题整理，方便阅读和核对。
                        </p>
                        <table className="rep-result-table">
                          <thead>
                            <tr>
                              <th>版块</th>
                              <th>呈现方式</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>01 计划概览</td>
                              <td>呈现原资料的周期、排期和选题信息</td>
                            </tr>
                            <tr>
                              <td>02 资料正文</td>
                              <td>保留当前导入的原文，方便逐项核对</td>
                            </tr>
                          </tbody>
                        </table>
                        <button
                          className="rep-text-link"
                          onClick={() => {
                            setScreen("result");
                            advance("C", 4);
                          }}
                        >
                          打开可视化 HTML 页面 →
                        </button>
                        <p className="rep-simulation-note">
                          页面在本地生成预览，未推送到真实 WorkBuddy 空间。
                        </p>
                      </>
                    ) : (
                      <>
                        <p>收到，我们在同一个云端任务里共同完善材料。</p>
                        <p>
                          小林补充活动信息，发起者确认时间与人数；专家根据大家提供的材料整理文案。
                        </p>
                        <div className="rep-member-message">
                          <span>林</span>
                          <b>同伴小林</b>
                          <p>
                            我来核对活动时间和参加人数，请保留资料里的原始信息。
                          </p>
                        </div>
                        <p className="rep-simulation-note">
                          模型由发起者控制，积分由发起者承担。本页为协作演示，不消耗积分。
                        </p>
                      </>
                    )}
                    <div className="rep-response-actions">
                      <IconButton
                        label="复制内容"
                        onClick={() =>
                          copy(unit === "B" ? draftInput : submitted)
                        }
                      >
                        <Copy size={16} />
                      </IconButton>
                      <ThumbsUp size={17} />
                      <ThumbsDown size={17} />
                      <Volume2 size={17} />
                      <RotateCcw size={17} />
                      <Share2 size={17} />
                      <MoreHorizontal size={18} />
                    </div>
                  </div>
                </div>
              </div>
              {unit === "B" && conversation === "ask" ? (
                <div className="rep-clarification">
                  <header>
                    {
                      [
                        "这次要运营的账号，核心赛道是什么？",
                        "内容主要写给哪些人看？",
                        "补充这次的真实材料和输出要求",
                      ][question]
                    }
                    <span>{question + 1}/3</span>
                    <button
                      aria-label="关闭问题"
                      onClick={() => setConversation("idle")}
                    >
                      <X size={18} />
                    </button>
                  </header>
                  {question < 2 ? (
                    <div>
                      {(question === 0
                        ? [
                            "一人公司 + AI 军团",
                            "创芽 OPC 社区",
                            "知识付费/商业干货",
                            "其他赛道（我来补充）",
                          ]
                        : [
                            "零基础上班族",
                            "学校老师",
                            "社区活动参与者",
                            "有内容运营经验的同伴",
                          ]
                      ).map((a, i) => (
                        <button
                          key={a}
                          onClick={() => {
                            setAnswers(v =>
                              v.map((x, k) => (k === question ? a : x))
                            );
                            setQuestion(question + 1);
                          }}
                        >
                          <span>{i + 1}</span>
                          {a}
                          <ArrowRight size={17} />
                        </button>
                      ))}
                    </div>
                  ) : (
                    <>
                      <textarea
                        aria-label="活动原始材料"
                        value={draftInput}
                        onChange={e => setDraftInput(e.target.value)}
                      />
                      <button
                        className="rep-black"
                        onClick={() => {
                          if (!draftInput.trim()) {
                            setToast("请补充材料");
                            return;
                          }
                          setConversation("done");
                          advance("B", 3);
                        }}
                      >
                        生成文案
                      </button>
                    </>
                  )}
                  <footer>
                    <button
                      onClick={() =>
                        question < 2
                          ? setQuestion(question + 1)
                          : setConversation("done")
                      }
                    >
                      跳过
                    </button>
                  </footer>
                </div>
              ) : (
                <div className="rep-chat-composer">
                  {compose()}
                  <p>内容由 AI 生成，请核实重要信息</p>
                </div>
              )}
            </>
          )}
          {screen === "result" && (
            <section className="rep-generated">
              <button
                className="rep-generated-back"
                onClick={() => setScreen("chat")}
              >
                ← 返回任务
              </button>
              <div className="rep-page-hero">
                <div>
                  <span>● 创芽OPC · 内容运营作战手册</span>
                  <h1>
                    {file?.text === sampleText ? (
                      <>
                        小红书 <em>0-1</em>
                        <br />
                        起号作战表
                      </>
                    ) : (
                      file?.name
                    )}
                  </h1>
                  <p>
                    {file?.text === sampleText
                      ? "90 天计划周期　 |　16 篇内容排期　 |　19 条选题储备"
                      : "根据导入资料生成的阅读页面"}
                  </p>
                  {file?.text === sampleText && (
                    <div className="rep-page-metrics">
                      {[
                        ["90", "天计划周期"],
                        ["16", "篇内容排期"],
                        ["4", "大内容支柱"],
                        ["19", "条选题储备"],
                      ].map(([n, t]) => (
                        <div key={t}>
                          <b>{n}</b>
                          {t}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <aside>
                  <h3>资料概览</h3>
                  <p>来源：{file?.name}</p>
                  <p>当前页保留导入的教学资料。</p>
                  <button
                    className="rep-black"
                    onClick={() => {
                      advance("C", 4);
                      setToast("已完成页面内容核对");
                    }}
                  >
                    核对完成
                  </button>
                </aside>
              </div>
              <div className="rep-page-source">
                <h2>01　资料正文</h2>
                <pre>{file?.text}</pre>
              </div>
            </section>
          )}
        </main>
        {tour && (
          <aside className="rep-tour">
            <header>
              <b>ABCD 实操</b>
              <IconButton label="收起练习导航" onClick={() => setTour(false)}>
                <X size={16} />
              </IconButton>
            </header>
            <p>主界面按截图复刻。这里切换练习、查看步骤。</p>
            <div className="rep-tour-units">
              {(["A", "B", "C", "D"] as Unit[]).map(u => (
                <button
                  key={u}
                  className={u === unit ? "active" : ""}
                  onClick={() => enter(u)}
                >
                  <b>{u}</b>
                  {labels[u]}
                  <small>{step[u]}/4</small>
                </button>
              ))}
            </div>
            <ol>
              {steps[unit].map((s, i) => (
                <li key={s} className={step[unit] > i ? "done" : ""}>
                  <span>{i + 1}</span>
                  {s}
                </li>
              ))}
            </ol>
            <div className="rep-tour-links">
              <button onClick={reset}>
                <RotateCcw size={14} />
                重新练习
              </button>
              <button onClick={() => setPopup("reference")}>原图对照</button>
              {embedded ? (
                <button onClick={onCourse}>功能指南</button>
              ) : (
                <Link href="/">原课程</Link>
              )}
            </div>
            <small>本地教学仿真，不调用模型或真实外部服务。</small>
          </aside>
        )}
        <button
          className={`rep-tour-toggle ${tour ? "is-open" : ""}`}
          onClick={() => setTour(!tour)}
          aria-label="打开ABCD练习导航"
        >
          <CircleHelp size={16} />
          <span>{tour ? "收起" : "ABCD 实操"}</span>
          <i>{unit}</i>
        </button>
        {toast && (
          <div className="rep-toast" role="status">
            {toast}
          </div>
        )}
        {popup && (
          <div
            className={`rep-overlay ${popup === "invite" ? "invite-overlay" : ""}`}
            onClick={() => setPopup(null)}
          >
            <div
              className={`rep-modal modal-${popup}`}
              ref={dialogRef}
              tabIndex={-1}
              role="dialog"
              aria-modal="true"
              aria-label={popupTitle}
              onClick={e => e.stopPropagation()}
            >
              <IconButton label="关闭弹窗" onClick={() => setPopup(null)}>
                <X size={20} />
              </IconButton>
              {popup === "skill" && (
                <>
                  <div className="rep-skill-detail-head">
                    <MeetingIcon size={68} />
                    <div>
                      <h2>腾讯会议</h2>
                      <button
                        className="rep-black"
                        disabled={!enabled}
                        onClick={beginSkill}
                      >
                        <MessageSquare size={16} />
                        去试试
                      </button>
                      <MoreHorizontal size={17} />
                    </div>
                    <button
                      className={`rep-switch ${enabled ? "on" : ""}`}
                      role="switch"
                      aria-checked={enabled}
                      aria-label="启用腾讯会议"
                      onClick={() => {
                        setEnabled(!enabled);
                        if (!enabled) advance("A", 2);
                      }}
                    >
                      <span />
                    </button>
                  </div>
                  <p>
                    腾讯会议管理助手，支持预约/创建/修改/取消会议、查询录制与转写、获取AI智能纪要
                  </p>
                  <h3>☷ 基本信息</h3>
                  <div className="rep-version">
                    版本　 <b>v1.0.12</b>
                  </div>
                  <h3>
                    <FileText size={16} />
                    概述 <Search size={17} />
                  </h3>
                  <div className="rep-skill-description">
                    <hr />
                    <p>
                      name: tencent-meeting-skill
                      <br />
                      description:
                      "腾讯会议：会议管理与音视频协作助手。预约/创建/修改/取消会议、查询会议详情与会议号转换、查看参会成员/受邀人/等候室成员、查询用户会议列表（即将开始/进行中/已结束）、搜索会议列表、导出参会成员统计与获取异步任务结果、查询录制列表与播放地址、搜索录制文件、获取转写全文/段落/搜索、获取AI智能纪要（支持多语言翻译）、搜索与查询元宝纪要（支持关键词/时间过滤、获取概览/要点/待办/滚动总结）、录制权限申请。"
                    </p>
                    <p>
                      当用户需要预约或管理腾讯会议、查看参会人员、查询会议录制或转写内容、获取智能纪要时使用。
                    </p>
                    <p className="rep-simulation-note">
                      以上为截图中的技能说明。此复刻页面仅演示交互，不会连接腾讯会议。
                    </p>
                  </div>
                </>
              )}
              {popup === "expert" && (
                <>
                  <div className="rep-expert-detail-head">
                    <ExpertAvatar index={selectedExpert} size={70} />
                    <div>
                      <h2>
                        {expertRows[selectedExpert][0]}{" "}
                        <span>
                          | {expertRows[selectedExpert][1] || "内容专家"}
                        </span>
                      </h2>
                      <button className="rep-black" onClick={summon}>
                        <Send size={16} />
                        召唤专家
                      </button>
                    </div>
                    <small>200.23万次使用</small>
                  </div>
                  <p>{expertRows[selectedExpert][2]}</p>
                  <div className="rep-tags">
                    {expertRows[selectedExpert][3].split("|").map(t => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                  <h3>☼ 专家帮你做</h3>
                  {[
                    "写3篇爆款种草笔记",
                    expertPrompt,
                    "设计KOL/KOC达人合作方案",
                  ].map(t => (
                    <button
                      className="rep-expert-example"
                      key={t}
                      onClick={() => {
                        summon();
                        setInput(t);
                      }}
                    >
                      “{t}”<MessageSquare size={17} />
                    </button>
                  ))}
                </>
              )}
              {popup === "folder" && (
                <form
                  onSubmit={e => {
                    e.preventDefault();
                    if (!newName.trim()) return;
                    setFolderName(newName.trim());
                    setFolder(true);
                    advance("C", 1);
                    setPopup(null);
                  }}
                >
                  <h2>新建文件夹</h2>
                  <label>
                    名称
                    <input
                      autoFocus
                      required
                      value={newName}
                      onChange={e => setNewName(e.target.value)}
                    />
                  </label>
                  <footer>
                    <button
                      type="button"
                      className="rep-border"
                      onClick={() => setPopup(null)}
                    >
                      取消
                    </button>
                    <button className="rep-black" type="submit">
                      创建
                    </button>
                  </footer>
                </form>
              )}
              {popup === "invite" && (
                <>
                  <h2>项目团队成员 · {members}</h2>
                  <div className="rep-members">
                    <div>
                      <span>A</span>
                      <b>Avec moi</b>
                      <em>所有者</em>
                    </div>
                    {members > 1 && (
                      <div>
                        <span>林</span>
                        <b>同伴小林</b>
                        <em>管理员⌄</em>
                        <MoreHorizontal size={15} />
                      </div>
                    )}
                  </div>
                  <button
                    className="rep-black rep-invite-copy"
                    onClick={() => {
                      copy(
                        "教学模拟邀请：在当前练习中点击“模拟成员加入”继续，不是真实邀请链接。"
                      );
                    }}
                  >
                    <Link2 size={18} />
                    复制链接
                  </button>
                  <div className="rep-invite-options">
                    <span>获得链接的人</span>
                    <span>
                      申请后加入 <ChevronDown size={15} />
                    </span>
                  </div>
                  <button
                    className="rep-join"
                    disabled={members > 1}
                    onClick={() => {
                      setMembers(2);
                      advance("D", 2);
                    }}
                  >
                    {members > 1 ? "模拟成员已加入" : "模拟成员加入"}
                  </button>
                </>
              )}
              {(popup === "experts" || popup === "skills") && (
                <>
                  <h2>{popup === "experts" ? "专家" : "技能"}</h2>
                  <div className="rep-config-summary">
                    <span>
                      当前项目已添加{" "}
                      {popup === "experts"
                        ? projectExpert
                          ? 1
                          : 0
                        : projectSkill
                          ? 1
                          : 0}{" "}
                      个{popup === "experts" ? "专家" : "技能"}
                    </span>
                    <button
                      className="rep-border"
                      onClick={() =>
                        popup === "experts"
                          ? setProjectExpert(true)
                          : setProjectSkill(true)
                      }
                    >
                      <Plus size={17} />
                      添加
                    </button>
                  </div>
                  <button
                    className="rep-chosen-tool"
                    onClick={() =>
                      popup === "experts"
                        ? setProjectExpert(!projectExpert)
                        : setProjectSkill(!projectSkill)
                    }
                  >
                    {popup === "experts" ? (
                      <ExpertAvatar size={34} />
                    ) : (
                      <MeetingIcon size={34} />
                    )}
                    <div>
                      <b>
                        {popup === "experts" ? "小红书运营专家" : "腾讯会议"}
                      </b>
                      <small>
                        {popup === "experts"
                          ? "深谙小红书种草生态和推荐机制，打造高互动率种草内容"
                          : "预约、创建和查询会议，获取AI智能纪要"}
                      </small>
                    </div>
                    {(popup === "experts" ? projectExpert : projectSkill) ? (
                      <Check size={18} />
                    ) : (
                      <Plus size={18} />
                    )}
                  </button>
                  <footer>
                    <button
                      className="rep-border"
                      onClick={() => setPopup(null)}
                    >
                      取消
                    </button>
                    <button
                      className="rep-black"
                      onClick={() => {
                        if (projectExpert && projectSkill) advance("D", 3);
                        setPopup(null);
                      }}
                    >
                      确定
                    </button>
                  </footer>
                </>
              )}
              {popup === "meeting" &&
                (conversation === "done" ? (
                  <div className="rep-meeting-result">
                    <MeetingIcon size={55} />
                    <h2>腾讯会议</h2>
                    <h3>{topic}</h3>
                    <b>DEMO-515 902 140</b>
                    <strong>
                      {time}
                      <span>{minutes} 分钟</span>
                    </strong>
                    <p>{date}　（GMT+08:00）北京时间</p>
                    <hr />
                    <p>发起人 Avec moi</p>
                    <button
                      className="rep-meeting-blue"
                      onClick={() => {
                        advance("A", 4);
                        setToast("已核对会议主题、日期和时长");
                        setPopup(null);
                      }}
                    >
                      核对完成
                    </button>
                    <small>教学模拟，不连接真实会议</small>
                  </div>
                ) : (
                  <form
                    onSubmit={e => {
                      e.preventDefault();
                      setConversation("done");
                      setPopup(null);
                      advance("A", 3);
                    }}
                  >
                    <h2>补充会议信息</h2>
                    <label>
                      会议主题
                      <input
                        required
                        value={topic}
                        onChange={e => setTopic(e.target.value)}
                      />
                    </label>
                    <label>
                      日期
                      <input
                        aria-label="会议日期"
                        required
                        type="date"
                        value={date}
                        onChange={e => setDate(e.target.value)}
                      />
                    </label>
                    <label>
                      开始时间
                      <input
                        aria-label="开始时间"
                        required
                        type="time"
                        value={time}
                        onChange={e => setTime(e.target.value)}
                      />
                    </label>
                    <label>
                      会议时长
                      <select
                        value={minutes}
                        onChange={e => setMinutes(e.target.value)}
                      >
                        <option value="30">30分钟</option>
                        <option value="60">1小时</option>
                        <option value="120">2小时</option>
                      </select>
                    </label>
                    <footer>
                      <button className="rep-black" type="submit">
                        确认预约（模拟）
                      </button>
                    </footer>
                  </form>
                ))}
              {popup === "reference" && (
                <>
                  <h2>{unit} · 原始截图</h2>
                  <img
                    className="rep-reference"
                    src={ref(
                      screen === "catalog"
                        ? catalogTab === "专家"
                          ? "experts"
                          : "skills"
                        : screen === "home"
                          ? "home"
                          : unit === "C"
                            ? "library-folder"
                            : unit === "D"
                              ? "project-config"
                              : unit === "B"
                                ? "expert-detail"
                                : "skill-detail"
                    )}
                    alt="用户提供的WorkBuddy界面截图"
                  />
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
