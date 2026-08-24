import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  Bot,
  Check,
  FileText,
  LoaderCircle,
  Play,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import type { GuideChapter, GuideDemoKind } from "@/data/guide";

interface GuideDemoSimulatorProps {
  chapter: GuideChapter;
  color: string;
  onClose: () => void;
  onOpenFeature: () => void;
}

const KIND_LABELS: Record<GuideDemoKind, string> = {
  conversation: "对话任务",
  setup: "安装设置",
  workspace: "工作空间",
  task: "本地任务",
  skill: "Skill 安装",
  team: "专家协作",
  connector: "连接器",
  assistant: "远程助理",
  api: "API 调用",
  automation: "自动化",
  office: "办公交付",
  research: "研究任务",
  knowledge: "知识管理",
  media: "内容增长",
  system: "工作系统",
  industry: "行业工作流",
};

function getStatusText(kind: GuideDemoKind, done: boolean) {
  if (!done) {
    if (kind === "skill") return "正在核对权限并安装 Skill";
    if (kind === "automation") return "正在执行自动化运行";
    if (kind === "team") return "专家角色正在并行协作";
    if (kind === "connector" || kind === "api") return "正在进行只读连接与数据校验";
    return "WorkBuddy 正在执行案例";
  }
  if (kind === "skill") return "Skill 已安装并通过首次调用";
  if (kind === "automation") return "自动化已运行，记录已保存";
  return "案例执行完成，交付物已生成";
}

export default function GuideDemoSimulator({
  chapter,
  color,
  onClose,
  onOpenFeature,
}: GuideDemoSimulatorProps) {
  const [phase, setPhase] = useState(0);
  const running = phase > 0 && phase < 4;
  const done = phase === 4;

  useEffect(() => {
    setPhase(0);
  }, [chapter.number]);

  useEffect(() => {
    if (!running) return;
    const timer = window.setTimeout(
      () => setPhase(current => Math.min(current + 1, 4)),
      720
    );
    return () => window.clearTimeout(timer);
  }, [phase, running]);

  const start = () => setPhase(1);

  return (
    <div className="fixed inset-0 z-[120] grid place-items-center bg-black/65 p-4 backdrop-blur-sm">
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="guide-demo-title"
        className="flex max-h-[min(780px,calc(100vh-32px))] w-full max-w-5xl flex-col overflow-hidden rounded-[28px] border border-white/10 bg-[#111612] text-white shadow-2xl"
      >
        <header className="flex flex-none items-center justify-between border-b border-white/10 px-5 py-4 md:px-7">
          <div className="flex min-w-0 items-center gap-3">
            <div
              className="grid h-10 w-10 flex-none place-items-center rounded-xl text-[#101510]"
              style={{ background: color }}
            >
              <Play size={16} fill="currentColor" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/35">
                  CH {String(chapter.number).padStart(2, "0")}
                </span>
                <span
                  className="rounded-full px-2 py-0.5 text-[10px] font-semibold text-[#101510]"
                  style={{ background: color }}
                >
                  {KIND_LABELS[chapter.demo.kind]}
                </span>
              </div>
              <h2 id="guide-demo-title" className="mt-1 truncate text-base font-semibold">
                {chapter.demo.title}
              </h2>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-white/45 transition hover:border-white/25 hover:text-white"
            aria-label="关闭案例体验"
          >
            <X size={16} />
          </button>
        </header>

        <div className="grid min-h-0 flex-1 overflow-y-auto lg:grid-cols-[0.9fr_1.1fr]">
          <div className="border-b border-white/10 p-5 md:p-7 lg:border-b-0 lg:border-r">
            <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/35">
              Real case brief
            </p>
            <p className="mt-3 text-sm leading-6 text-white/65">
              {chapter.demo.brief}
            </p>

            <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <div className="mb-3 flex items-center gap-2 text-xs font-semibold text-white/70">
                <div className="grid h-6 w-6 place-items-center rounded-full bg-white/10">
                  你
                </div>
                真实任务输入
              </div>
              <p className="text-sm leading-6 text-white/82">
                {chapter.demo.input}
              </p>
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-between">
                <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/35">
                  Execution plan
                </p>
                <span className="text-[10px] text-white/25">3 steps</span>
              </div>
              <div className="mt-3 space-y-2">
                {chapter.demo.steps.map((step, index) => {
                  const complete = phase > index;
                  const active = running && phase === index + 1;
                  return (
                    <div
                      key={step}
                      className={`flex items-center gap-3 rounded-xl border px-3 py-3 transition ${complete ? "border-white/10 bg-white/[0.05]" : "border-white/[0.06] text-white/35"}`}
                    >
                      <span
                        className="grid h-6 w-6 flex-none place-items-center rounded-full border text-[10px]"
                        style={
                          complete
                            ? { borderColor: color, background: color, color: "#101510" }
                            : undefined
                        }
                      >
                        {complete && !active ? (
                          <Check size={12} strokeWidth={2.6} />
                        ) : active ? (
                          <LoaderCircle size={12} className="animate-spin" />
                        ) : (
                          index + 1
                        )}
                      </span>
                      <span className="text-xs leading-5">{step}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex min-h-[420px] flex-col bg-[#0B0F0C] p-5 md:p-7">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-semibold text-white/70">
                <Bot size={14} style={{ color }} /> WorkBuddy 执行台
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-white/35">
                <span className={`h-1.5 w-1.5 rounded-full ${running ? "animate-pulse" : ""}`} style={{ background: done || running ? color : "#6B7280" }} />
                {phase === 0 ? "等待开始" : getStatusText(chapter.demo.kind, done)}
              </div>
            </div>

            {phase === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center text-center">
                <div className="relative grid h-20 w-20 place-items-center rounded-3xl border border-white/10 bg-white/[0.04]">
                  <Sparkles size={26} style={{ color }} />
                  <div className="absolute inset-0 rounded-3xl opacity-20 blur-xl" style={{ background: color }} />
                </div>
                <h3 className="mt-5 text-lg font-semibold">运行这一节的专属案例</h3>
                <p className="mt-2 max-w-sm text-xs leading-5 text-white/38">
                  这不是通用跳转。系统会按本章案例依次演示输入、执行步骤、结果和交付物。
                </p>
                <button
                  type="button"
                  onClick={start}
                  className="mt-6 flex items-center gap-2 rounded-full px-5 py-3 text-xs font-semibold text-[#101510] transition hover:-translate-y-0.5"
                  style={{ background: color }}
                >
                  <Play size={13} fill="currentColor" /> 开始案例模拟
                </button>
              </div>
            ) : (
              <div className="mt-5 flex flex-1 flex-col">
                <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
                  <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-white/35">
                    <ShieldCheck size={13} style={{ color }} /> 边界已确认
                  </div>
                  <p className="mt-2 text-xs leading-5 text-white/52">
                    只处理案例指定范围；不编造缺失信息，不覆盖原文件，关键写入与外部发送保留人工确认。
                  </p>
                </div>

                <div className="mt-3 space-y-2 font-mono text-[11px] leading-5">
                  {chapter.demo.steps.slice(0, Math.min(phase, 3)).map((step, index) => (
                    <div key={step} className="flex gap-3 rounded-lg bg-black/25 px-3 py-2.5">
                      <span style={{ color }}>[{String(index + 1).padStart(2, "0")}]</span>
                      <span className="text-white/60">{step}</span>
                      {phase > index + 1 || done ? <Check size={12} className="ml-auto mt-1" style={{ color }} /> : <LoaderCircle size={12} className="ml-auto mt-1 animate-spin text-white/30" />}
                    </div>
                  ))}
                </div>

                {done ? (
                  <div className="mt-4 animate-[demoReveal_.35s_ease-out]">
                    <div className="rounded-2xl border p-4" style={{ borderColor: `${color}55`, background: `${color}10` }}>
                      <div className="flex items-center gap-2 text-xs font-semibold" style={{ color }}>
                        <Check size={14} /> 案例结果
                      </div>
                      <p className="mt-2 text-sm leading-6 text-white/78">{chapter.demo.result}</p>
                    </div>
                    <div className="mt-3 grid gap-2 sm:grid-cols-2">
                      {chapter.demo.artifacts.map(artifact => (
                        <div key={artifact} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-3">
                          <div className="grid h-8 w-8 place-items-center rounded-lg" style={{ background: `${color}1F`, color }}>
                            <FileText size={14} />
                          </div>
                          <span className="min-w-0 flex-1 truncate text-xs font-medium text-white/65">{artifact}</span>
                          <ArrowUpRight size={12} className="text-white/25" />
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            )}
          </div>
        </div>

        <footer className="flex flex-none items-center justify-between gap-3 border-t border-white/10 px-5 py-4 md:px-7">
          <p className="hidden text-[11px] text-white/30 sm:block">
            每个章节都有独立案例、输入、执行过程和结果。
          </p>
          <div className="ml-auto flex gap-2">
            {done ? (
              <button
                type="button"
                onClick={start}
                className="flex items-center gap-2 rounded-full border border-white/12 px-4 py-2.5 text-xs text-white/60 hover:border-white/25 hover:text-white"
              >
                <RotateCcw size={13} /> 重新运行
              </button>
            ) : null}
            <button
              type="button"
              onClick={onOpenFeature}
              className="flex items-center gap-2 rounded-full border border-white/12 px-4 py-2.5 text-xs text-white/70 hover:border-white/25 hover:text-white"
            >
              打开对应功能 <ArrowUpRight size={13} />
            </button>
          </div>
        </footer>
        <style>{`@keyframes demoReveal { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }`}</style>
      </section>
    </div>
  );
}
