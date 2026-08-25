import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  ChevronRight,
  CircleAlert,
  Clock3,
  Download,
  FileAudio,
  FileText,
  FolderOpen,
  Languages,
  LoaderCircle,
  Play,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Table2,
  WandSparkles,
} from "lucide-react";

type PracticeId = "rename" | "meeting" | "video";

interface PracticeCase {
  id: PracticeId;
  number: string;
  title: string;
  subtitle: string;
  accent: string;
  icon: typeof FolderOpen;
  instruction: string;
  preparation: string[];
  permission: string;
  duration: string;
  deliverables: string[];
}

const SOURCE_URL =
  "https://www.workbuddy.cn/docs/workbuddy/From-Beginner-to-Expert-Guide/Practice-Cases/Practice-One";

const PRACTICES: PracticeCase[] = [
  {
    id: "rename",
    number: "01",
    title: "按内容批量重命名",
    subtitle: "先预览、再确认、可回退",
    accent: "#9AE66E",
    icon: FolderOpen,
    instruction:
      "请读取这个文件夹里的文件内容或属性，按「日期 + 主题 + 类型」规则批量重命名，先展示重命名预览，确认后再执行。",
    preparation: ["选择一个独立测试文件夹", "准备 PDF、Word、图片或视频样本", "先用少量文件试跑规则"],
    permission: "需要读取与改名权限；隐藏目录、系统目录和被占用文件自动跳过。",
    duration: "少量文件约 2—5 分钟",
    deliverables: ["新旧文件名对照表", "执行结果与跳过清单", "自动备份记录"],
  },
  {
    id: "meeting",
    number: "02",
    title: "会议记录变正式纪要",
    subtitle: "结论、行动项与负责人",
    accent: "#5AD8FF",
    icon: Table2,
    instruction:
      "请根据我提供的会议记录，整理成正式会议纪要，包含会议主题、关键结论、行动项、负责人和截止时间。",
    preparation: ["粘贴聊天记录或拖入 TXT、Markdown、Word", "录音先完成语音转写", "明确纪要结构与使用对象"],
    permission: "读取上传文件需要目录权限；输出写入当前工作区前会检查目标目录。",
    duration: "短记录约 1—3 分钟",
    deliverables: ["结构化会议纪要.md", "决议追踪表", "未决问题清单"],
  },
  {
    id: "video",
    number: "03",
    title: "外文视频字幕翻译",
    subtitle: "转写、翻译、术语与 SRT",
    accent: "#FFB45A",
    icon: Languages,
    instruction:
      "请提取这个外文视频的字幕，翻译成中文并整理摘要，重点标出关键观点和专业术语。",
    preparation: ["提供本地视频路径或 SRT/VTT 字幕", "无字幕时先转写音频", "长视频建议分段处理"],
    permission: "读取视频与字幕需要目录权限；在线来源需要明确链接与下载边界。",
    duration: "与视频时长正相关",
    deliverables: ["时间轴双语字幕", "中文重点摘要", "SRT 字幕文件"],
  },
];

const renameRows = [
  ["api文档预览.mp4", "2026-05-14", "API文档预览", "2026-05-14 API文档预览 视频.mp4"],
  ["cnb-skill-1.mp4", "2026-07-01", "CNB技能演示1", "2026-07-01 CNB技能演示1 视频.mp4"],
  ["meeting-final.docx", "2026-07-02", "六月项目复盘", "2026-07-02 六月项目复盘 文档.docx"],
  ["IMG_4832.png", "2026-07-03", "工作区权限说明", "2026-07-03 工作区权限说明 图片.png"],
];

const actionRows = [
  ["B站联合推广方案提交", "刘静", "7.4", "待办"],
  ["搜索结果优化排期", "陈浩", "即日启动", "进行中"],
  ["供应商结算流程核查", "赵阳", "7.1", "待办"],
  ["会议纪要整理发送", "周敏", "6.30", "已完成"],
];

const subtitleRows = [
  ["0:09–0:14", "It blends the modern and the classic beautifully.", "它把现代与经典很好地融合在了一起。"],
  ["0:14–0:19", "What I love most is its history and spirit.", "我最喜欢的是它背后的历史与精神。"],
  ["0:19–0:28", "The most beautiful woman may not know her own grace.", "最美的女人，也许并不知道自己有多优雅。"],
  ["0:28–0:35", "True beauty comes from within.", "真正的美源自内心。"],
];

function InfoCard({
  label,
  children,
  icon: Icon,
}: {
  label: string;
  children: React.ReactNode;
  icon: typeof Clock3;
}) {
  return (
    <div className="rounded-2xl border border-black/[0.07] bg-white/70 p-4 shadow-[0_8px_24px_rgba(24,30,24,0.035)]">
      <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-black/35">
        <Icon size={13} /> {label}
      </div>
      <div className="mt-3 text-xs leading-5 text-black/65">{children}</div>
    </div>
  );
}

function RenameLab({ stage, setStage, accent }: LabProps) {
  const [option, setOption] = useState(0);

  if (stage === 2) {
    return (
      <div className="flex min-h-[430px] flex-col justify-between p-6 md:p-8">
        <div>
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-full bg-emerald-100 text-emerald-700">
              <Check size={20} strokeWidth={2.5} />
            </div>
            <div>
              <p className="text-xs text-black/40">已完成 · 3m20s</p>
              <h3 className="mt-1 text-xl font-semibold">重命名已全部完成</h3>
            </div>
          </div>
          <p className="mt-6 text-sm leading-7 text-black/65">
            按「日期 + 主题 + 类型」规则重命名 29 个顶层常规文件，全部成功、无冲突。隐藏配置目录和 6 个子文件夹保持不变。
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {[["29", "成功改名"], ["0", "冲突文件"], ["6", "保留文件夹"]].map(([value, label]) => (
              <div key={label} className="rounded-xl border border-black/8 bg-[#F6F7F5] p-4">
                <p className="font-mono text-2xl font-bold">{value}</p>
                <p className="mt-1 text-[11px] text-black/40">{label}</p>
              </div>
            ))}
          </div>
          <div className="mt-5 rounded-xl border border-black/8 bg-white p-4">
            <p className="text-xs font-semibold">已保存回退依据</p>
            <p className="mt-1.5 text-xs leading-5 text-black/45">rename-map-2026-07-03.csv · 自动备份点 wb-backup-0715</p>
          </div>
        </div>
        <button type="button" onClick={() => setStage(0)} className="mt-6 flex items-center justify-center gap-2 self-start rounded-full border border-black/10 px-4 py-2.5 text-xs font-semibold hover:border-black/25">
          <RefreshCw size={13} /> 重新体验
        </button>
      </div>
    );
  }

  return (
    <div className="p-5 md:p-7">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-black/35">Rename preview</p>
          <h3 className="mt-1 text-lg font-semibold">按内容生成的重命名预览</h3>
        </div>
        <span className="rounded-full bg-black px-3 py-1.5 text-[10px] text-white">29 个文件</span>
      </div>

      {stage === 0 ? (
        <div className="mt-6 grid min-h-[330px] place-items-center rounded-2xl border border-dashed border-black/15 bg-[#F6F7F5] p-8 text-center">
          <div>
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-white shadow-sm">
              <FolderOpen size={25} style={{ color: accent }} />
            </div>
            <p className="mt-4 text-sm font-semibold">/Desktop/WorkBuddy-Practice</p>
            <p className="mt-1 text-xs text-black/40">29 个文件 · 6 个子文件夹 · 1.8 GB</p>
            <button type="button" onClick={() => setStage(1)} className="mt-6 inline-flex items-center gap-2 rounded-full bg-black px-5 py-3 text-xs font-semibold text-white hover:-translate-y-0.5">
              <WandSparkles size={14} /> 读取内容并生成预览
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="mt-5 overflow-hidden rounded-2xl border border-black/8">
            <div className="grid grid-cols-[1fr_90px_1fr_1.35fr] bg-[#F3F3F0] text-[10px] font-semibold text-black/45">
              {['当前文件名', '修改日期', '主题', '重命名后'].map(label => <div key={label} className="border-r border-black/[0.06] px-3 py-3 last:border-r-0">{label}</div>)}
            </div>
            {renameRows.map((row, index) => (
              <div key={row[0]} className={`grid grid-cols-[1fr_90px_1fr_1.35fr] text-[11px] ${index ? 'border-t border-black/[0.06]' : ''}`}>
                {row.map((cell, cellIndex) => <div key={cell} className={`border-r border-black/[0.06] px-3 py-3 last:border-r-0 ${cellIndex === 3 ? 'font-medium' : 'text-black/55'}`}>{cell}</div>)}
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-2xl border border-black/8 bg-[#FAFAF8] p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold">命名格式与处理方式是否确认？</p>
              <span className="font-mono text-[10px] text-black/30">1 / 2</span>
            </div>
            <div className="mt-3 space-y-1.5">
              {["确认执行（如上表）", "不含「类型」后缀", "包含子文件夹内的文件"].map((label, index) => (
                <button key={label} type="button" onClick={() => setOption(index)} className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-xs transition ${option === index ? 'bg-black text-white' : 'bg-black/[0.035] text-black/60 hover:bg-black/[0.07]'}`}>
                  <span className={`grid h-6 w-6 place-items-center rounded-full text-[10px] ${option === index ? 'bg-white text-black' : 'bg-white'}`}>{index + 1}</span>{label}
                  {option === index ? <ChevronRight size={13} className="ml-auto" /> : null}
                </button>
              ))}
            </div>
            <button type="button" onClick={() => setStage(2)} className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-xs font-semibold text-[#101510]" style={{ background: accent }}>
              <Check size={14} /> 确认并执行重命名
            </button>
          </div>
        </>
      )}
    </div>
  );
}

interface LabProps {
  stage: number;
  setStage: (stage: number) => void;
  accent: string;
}

function MeetingLab({ stage, setStage, accent }: LabProps) {
  if (stage === 0 || stage === 1) {
    return (
      <div className="grid min-h-[500px] place-items-center p-6 text-center">
        <div className="max-w-md">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-sky-50 text-sky-600"><FileAudio size={25} /></div>
          <h3 className="mt-5 text-lg font-semibold">6月月度会议记录.md</h3>
          <p className="mt-2 text-xs leading-5 text-black/45">48 分钟转写 · 6 位发言人 · 8,462 字<br/>目标：正式纪要 + 决议追踪表</p>
          <button type="button" onClick={() => setStage(1)} disabled={stage === 1} className="mt-6 inline-flex items-center gap-2 rounded-full bg-black px-5 py-3 text-xs font-semibold text-white disabled:opacity-60">
            {stage === 1 ? <LoaderCircle size={14} className="animate-spin" /> : <Sparkles size={14} />}
            {stage === 1 ? '正在识别结论与行动项…' : '整理成正式会议纪要'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-5 md:p-7">
      <div className="flex items-start justify-between gap-4">
        <div><p className="font-mono text-[9px] uppercase tracking-[0.16em] text-black/35">Meeting minutes</p><h3 className="mt-1 text-xl font-semibold">6月月度会议纪要</h3></div>
        <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-[10px] font-semibold text-emerald-700">已整理</span>
      </div>
      <div className="mt-5 grid gap-3 md:grid-cols-2">
        <div className="rounded-xl border border-black/8 bg-[#F6F7F5] p-4"><p className="text-[10px] font-semibold text-black/35">关键结论</p><p className="mt-2 text-xs leading-5 text-black/65">技术方案确认可行，目标将开发效率提升 30% 以上；需求池由李娜牵头，运营与技术共同参与。</p></div>
        <div className="rounded-xl border border-black/8 bg-[#F6F7F5] p-4"><p className="text-[10px] font-semibold text-black/35">待处理风险</p><p className="mt-2 text-xs leading-5 text-black/65">供应商结算流程偏慢；搜索排期需在后台重构后重新确认。</p></div>
      </div>
      <h4 className="mt-6 text-sm font-semibold">决议追踪</h4>
      <div className="mt-3 overflow-hidden rounded-2xl border border-black/8">
        <div className="grid grid-cols-[1.6fr_.7fr_.8fr_.7fr] bg-[#F3F3F0] text-[10px] font-semibold text-black/40">
          {['决议事项', '负责人', '截止日期', '状态'].map(label => <div key={label} className="px-3 py-3">{label}</div>)}
        </div>
        {actionRows.map((row, index) => (
          <div key={row[0]} className={`grid grid-cols-[1.6fr_.7fr_.8fr_.7fr] text-[11px] ${index ? 'border-t border-black/[0.06]' : ''}`}>
            {row.map((cell, cellIndex) => <div key={cell} className={`px-3 py-3 ${cellIndex === 3 && cell === '已完成' ? 'text-emerald-600' : 'text-black/60'}`}>{cell}</div>)}
          </div>
        ))}
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        {['6月月度会议纪要.md', '行动项看板.csv'].map(file => <div key={file} className="flex items-center gap-2 rounded-full border border-black/10 px-3 py-2 text-[11px]"><FileText size={12} style={{ color: accent }} /> {file}</div>)}
        <button type="button" onClick={() => setStage(0)} className="ml-auto flex items-center gap-2 rounded-full border border-black/10 px-3 py-2 text-[11px]"><RefreshCw size={12} /> 重置</button>
      </div>
    </div>
  );
}

function VideoLab({ stage, setStage, accent }: LabProps) {
  const [exported, setExported] = useState(false);

  if (stage === 0 || stage === 1) {
    return (
      <div className="grid min-h-[500px] place-items-center p-6 text-center">
        <div className="max-w-md">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-amber-50 text-amber-600"><Languages size={25} /></div>
          <h3 className="mt-5 text-lg font-semibold">品牌访谈片段.mp4</h3>
          <p className="mt-2 text-xs leading-5 text-black/45">00:57 · 英语 → 简体中文<br/>输出：时间轴翻译 + 摘要 + 术语说明</p>
          <button type="button" onClick={() => setStage(1)} disabled={stage === 1} className="mt-6 inline-flex items-center gap-2 rounded-full bg-black px-5 py-3 text-xs font-semibold text-white disabled:opacity-60">
            {stage === 1 ? <LoaderCircle size={14} className="animate-spin" /> : <Play size={14} fill="currentColor" />}
            {stage === 1 ? '正在转写并翻译…' : '提取字幕并翻译'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-5 md:p-7">
      <div className="flex items-start justify-between gap-4">
        <div><p className="font-mono text-[9px] uppercase tracking-[0.16em] text-black/35">Subtitle translation</p><h3 className="mt-1 text-xl font-semibold">品牌访谈 · 双语字幕</h3></div>
        <button type="button" onClick={() => setExported(true)} className="flex items-center gap-2 rounded-full px-3 py-2 text-[11px] font-semibold text-[#101510]" style={{ background: accent }}><Download size={12} /> {exported ? 'SRT 已生成' : '导出 SRT'}</button>
      </div>
      <div className="mt-5 overflow-hidden rounded-2xl border border-black/8">
        <div className="grid grid-cols-[95px_1fr_1fr] bg-[#F3F3F0] text-[10px] font-semibold text-black/40">
          {['时间', '英文原文', '中文翻译'].map(label => <div key={label} className="px-3 py-3">{label}</div>)}
        </div>
        {subtitleRows.map((row, index) => (
          <div key={row[0]} className={`grid grid-cols-[95px_1fr_1fr] text-[11px] leading-5 ${index ? 'border-t border-black/[0.06]' : ''}`}>
            <div className="px-3 py-3 font-mono text-black/35">{row[0]}</div><div className="px-3 py-3 text-black/55">{row[1]}</div><div className="px-3 py-3 text-black/70">{row[2]}</div>
          </div>
        ))}
      </div>
      <div className="mt-5 rounded-xl border border-black/8 bg-[#F6F7F5] p-4">
        <p className="text-xs font-semibold">识别与翻译说明</p>
        <ul className="mt-2 space-y-1.5 text-[11px] leading-5 text-black/50">
          <li>• 优先读取内嵌字幕；本案例无字幕，因此先进行本地语音转写。</li>
          <li>• 品牌名保留原文，专业词 grace 结合上下文译为“优雅”。</li>
          <li>• 已生成时间轴，导出前仍建议人工复核专有名词。</li>
        </ul>
      </div>
      <button type="button" onClick={() => { setStage(0); setExported(false); }} className="mt-5 flex items-center gap-2 rounded-full border border-black/10 px-3 py-2 text-[11px]"><RefreshCw size={12} /> 重置</button>
    </div>
  );
}

interface AdvancedModePageProps {
  onClose: () => void;
}

export default function AdvancedModePage({ onClose }: AdvancedModePageProps) {
  const [activeId, setActiveId] = useState<PracticeId>("rename");
  const [stage, setStage] = useState(0);
  const active = PRACTICES.find(item => item.id === activeId) ?? PRACTICES[0];

  useEffect(() => setStage(0), [activeId]);

  useEffect(() => {
    if (stage !== 1 || activeId === "rename") return;
    const timer = window.setTimeout(() => setStage(2), 1200);
    return () => window.clearTimeout(timer);
  }, [activeId, stage]);

  return (
    <div className="fixed inset-0 z-[90] flex flex-col overflow-hidden bg-[#0B0F0C] text-white">
      <header className="flex h-16 flex-none items-center gap-4 border-b border-white/10 px-4 md:px-6">
        <button type="button" onClick={onClose} className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-white/60 hover:border-white/25 hover:text-white" aria-label="返回初学者模式"><ArrowLeft size={16} /></button>
        <div>
          <p className="text-sm font-semibold">WorkBuddy 进阶实验室</p>
          <p className="font-mono text-[9px] uppercase tracking-[0.17em] text-white/30">official practice · interactive edition</p>
        </div>
        <div className="ml-auto flex rounded-full border border-white/10 bg-white/[0.035] p-1">
          <button type="button" onClick={onClose} className="rounded-full px-4 py-2 text-xs text-white/38 hover:text-white/70">初学者</button>
          <button type="button" className="rounded-full bg-[#9AE66E] px-4 py-2 text-xs font-semibold text-[#101510]">进阶模式</button>
        </div>
        <a href={SOURCE_URL} target="_blank" rel="noreferrer" className="hidden items-center gap-2 rounded-full border border-white/10 px-3 py-2 text-[11px] text-white/45 hover:border-white/25 hover:text-white md:flex">官方案例 <ArrowUpRight size={12} /></a>
      </header>

      <div className="grid min-h-0 flex-1 md:grid-cols-[280px_minmax(0,1fr)] xl:grid-cols-[310px_minmax(0,1fr)]">
        <aside className="hidden min-h-0 overflow-y-auto border-r border-white/10 bg-[#101511] p-4 md:block">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <div className="flex items-center gap-2 text-xs font-semibold"><Sparkles size={14} className="text-[#9AE66E]" /> 进阶模式</div>
            <p className="mt-2 text-[11px] leading-5 text-white/38">从“知道功能”进入“跑通案例”。每个实验都展示准备、权限、耗时、执行过程和交付物。</p>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center"><div><p className="font-mono text-lg font-bold">3</p><p className="text-[9px] text-white/25">实验</p></div><div><p className="font-mono text-lg font-bold">9</p><p className="text-[9px] text-white/25">交付物</p></div><div><p className="font-mono text-lg font-bold">4</p><p className="text-[9px] text-white/25">安全门</p></div></div>
          </div>
          <p className="mt-6 px-2 font-mono text-[9px] uppercase tracking-[0.18em] text-white/25">Practice cases</p>
          <div className="mt-2 space-y-2">
            {PRACTICES.map(item => {
              const Icon = item.icon;
              const activeCase = item.id === activeId;
              return <button key={item.id} type="button" onClick={() => setActiveId(item.id)} className={`group w-full rounded-2xl border p-3 text-left transition ${activeCase ? 'border-white/18 bg-white/[0.075]' : 'border-transparent hover:border-white/10 hover:bg-white/[0.035]'}`}>
                <div className="flex items-start gap-3"><div className="grid h-9 w-9 flex-none place-items-center rounded-xl" style={{ background: `${item.accent}18`, color: item.accent }}><Icon size={16} /></div><div className="min-w-0 flex-1"><div className="flex items-center justify-between"><span className="font-mono text-[9px]" style={{ color: item.accent }}>PRACTICE {item.number}</span><ChevronRight size={12} className="text-white/20" /></div><p className="mt-1 text-sm font-semibold text-white/80">{item.title}</p><p className="mt-1 text-[10px] text-white/30">{item.subtitle}</p></div></div>
              </button>;
            })}
          </div>
          <div className="mt-6 rounded-2xl border border-amber-300/15 bg-amber-300/[0.05] p-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-200/75"><CircleAlert size={13} /> 进阶原则</div>
            <p className="mt-2 text-[11px] leading-5 text-white/35">写入、改名、下载和外部发送前必须经过预览或明确确认；所有结果保留回退依据。</p>
          </div>
        </aside>

        <main className="min-h-0 overflow-y-auto bg-[#EEEDE6] text-[#171A17]">
          <div className="mx-auto max-w-[1260px] px-4 py-6 md:px-7 md:py-8 xl:px-10">
            <section className="relative overflow-hidden rounded-[28px] bg-[#151B16] p-6 text-white md:p-8">
              <div className="absolute -right-12 -top-16 h-52 w-52 rounded-full opacity-20 blur-3xl" style={{ background: active.accent }} />
              <div className="relative grid gap-6 lg:grid-cols-[1fr_320px] lg:items-end">
                <div><p className="font-mono text-[9px] uppercase tracking-[0.2em]" style={{ color: active.accent }}>Practice {active.number} · advanced lab</p><h1 className="mt-5 text-3xl font-semibold tracking-[-0.035em] md:text-4xl">{active.title}</h1><p className="mt-3 max-w-2xl text-sm leading-6 text-white/50">{active.subtitle}。本页不是功能说明，而是一条可以从输入运行到交付的完整练习链路。</p></div>
                <div className="rounded-2xl border border-white/10 bg-black/20 p-4"><p className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/30">示例指令</p><p className="mt-2 text-xs leading-5 text-white/68">{active.instruction}</p></div>
              </div>
            </section>

            <section className="mt-5 grid gap-3 lg:grid-cols-[1.1fr_.9fr_.9fr]">
              <InfoCard label="开始前准备" icon={FolderOpen}><ul className="space-y-1">{active.preparation.map(item => <li key={item}>• {item}</li>)}</ul></InfoCard>
              <InfoCard label="权限与安全" icon={ShieldCheck}>{active.permission}</InfoCard>
              <InfoCard label="耗时与交付" icon={Clock3}><p>{active.duration}</p><div className="mt-2 flex flex-wrap gap-1.5">{active.deliverables.map(file => <span key={file} className="rounded-full bg-black/[0.055] px-2 py-1 text-[9px] text-black/55">{file}</span>)}</div></InfoCard>
            </section>

            <section className="mt-5 overflow-hidden rounded-[24px] border border-black/8 bg-white shadow-[0_18px_55px_rgba(32,38,32,0.08)]">
              <div className="flex items-center justify-between border-b border-black/[0.06] px-5 py-4 md:px-7"><div><p className="font-mono text-[9px] uppercase tracking-[0.16em] text-black/30">Interactive simulator</p><p className="mt-1 text-sm font-semibold">{active.title} · 操作台</p></div><span className="rounded-full px-3 py-1.5 text-[10px] font-semibold" style={{ background: `${active.accent}30`, color: '#24311F' }}>{stage === 2 ? '已完成' : stage === 1 ? '执行中' : '等待开始'}</span></div>
              {activeId === 'rename' ? <RenameLab key={activeId} stage={stage} setStage={setStage} accent={active.accent} /> : activeId === 'meeting' ? <MeetingLab key={activeId} stage={stage} setStage={setStage} accent={active.accent} /> : <VideoLab key={activeId} stage={stage} setStage={setStage} accent={active.accent} />}
            </section>

            <footer className="flex flex-col gap-2 py-6 text-[10px] leading-5 text-black/35 md:flex-row md:items-center md:justify-between"><p>内容与交互依据 WorkBuddy 官方《实践一：文件内容识别与处理》及页面功能截图重构。</p><a href={SOURCE_URL} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 font-semibold text-black/50 hover:text-black">查看官方原文 <ArrowUpRight size={11} /></a></footer>
          </div>
        </main>
      </div>
    </div>
  );
}
