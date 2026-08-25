import { useDeferredValue, useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  BookOpen,
  Check,
  ChevronRight,
  Circle,
  Copy,
  ExternalLink,
  Play,
  Search,
  Sparkles,
  X,
} from "lucide-react";
import {
  GUIDE_REPO_URL,
  getGuideSourceUrl,
  guideChapters,
  guideParts,
  promptTemplates,
  roleRoutes,
  type GuideAction,
  type GuideChapter,
  type GuidePartId,
} from "@/data/guide";

const STORAGE_KEY = "workbuddy-guide-progress-v1";

export interface GuideLaunch {
  action: GuideAction;
  prompt?: string;
}

interface GuidePageProps {
  onClose: () => void;
  onLaunch: (launch: GuideLaunch) => void;
}

function readProgress() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return new Set<number>(
      Array.isArray(parsed) ? parsed.filter(Number.isInteger) : []
    );
  } catch {
    return new Set<number>();
  }
}

function ChapterNumber({
  chapter,
  complete,
}: {
  chapter: GuideChapter;
  complete: boolean;
}) {
  return (
    <span
      className={`flex h-9 w-9 flex-none items-center justify-center rounded-full border font-mono text-xs font-bold transition-colors ${
        complete
          ? "border-[#9AE66E] bg-[#9AE66E] text-[#101510]"
          : "border-white/15 bg-white/[0.04] text-white/55"
      }`}
    >
      {complete ? (
        <Check size={15} strokeWidth={2.5} />
      ) : (
        String(chapter.number).padStart(2, "0")
      )}
    </span>
  );
}

export default function GuidePage({ onClose, onLaunch }: GuidePageProps) {
  const [activePart, setActivePart] = useState<GuidePartId>("manual");
  const [activeNumber, setActiveNumber] = useState(1);
  const [showAppendix, setShowAppendix] = useState(false);
  const [query, setQuery] = useState("");
  const [completed, setCompleted] = useState<Set<number>>(readProgress);
  const [copied, setCopied] = useState<string | null>(null);
  const deferredQuery = useDeferredValue(query.trim().toLowerCase());

  const activeChapter =
    guideChapters.find(chapter => chapter.number === activeNumber) ??
    guideChapters[0];
  const activePartInfo =
    guideParts.find(part => part.id === activePart) ?? guideParts[0];
  const visibleChapters = useMemo(() => {
    if (!deferredQuery)
      return guideChapters.filter(chapter => chapter.part === activePart);
    return guideChapters.filter(chapter => {
      const haystack = [chapter.title, chapter.summary, ...chapter.takeaways]
        .join(" ")
        .toLowerCase();
      return haystack.includes(deferredQuery);
    });
  }, [activePart, deferredQuery]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(Array.from(completed).sort((a, b) => a - b))
    );
  }, [completed]);

  const selectChapter = (chapter: GuideChapter) => {
    setActivePart(chapter.part);
    setActiveNumber(chapter.number);
    setShowAppendix(false);
  };

  const selectPart = (part: GuidePartId) => {
    setActivePart(part);
    setShowAppendix(false);
    const firstChapter = guideChapters.find(chapter => chapter.part === part);
    if (firstChapter) setActiveNumber(firstChapter.number);
  };

  const toggleComplete = (number: number) => {
    setCompleted(current => {
      const next = new Set(current);
      if (next.has(number)) next.delete(number);
      else next.add(number);
      return next;
    });
  };

  const copyPrompt = async (id: string, prompt: string) => {
    await navigator.clipboard?.writeText(prompt);
    setCopied(id);
    window.setTimeout(() => setCopied(null), 1400);
  };

  const progress = Math.round((completed.size / guideChapters.length) * 100);

  return (
    <div className="fixed inset-0 z-[80] flex flex-col overflow-hidden bg-[#0D110E] text-white">
      <header className="flex h-16 flex-none items-center gap-4 border-b border-white/10 px-4 md:px-6">
        <button
          type="button"
          onClick={onClose}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/65 transition hover:border-white/25 hover:text-white"
          aria-label="返回 WorkBuddy 演示"
        >
          <ArrowLeft size={17} />
        </button>
        <div className="flex min-w-0 items-center gap-3">
          <div className="grid h-9 w-9 flex-none place-items-center rounded-lg bg-[#9AE66E] text-[#101510] shadow-[0_0_32px_rgba(154,230,110,0.2)]">
            <BookOpen size={18} strokeWidth={2.2} />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold tracking-tight">
              WorkBuddy 实战蓝皮书
            </p>
            <p className="truncate font-mono text-[10px] uppercase tracking-[0.18em] text-white/35">
              27 chapters · interactive edition
            </p>
          </div>
        </div>

        <label className="ml-auto hidden h-9 w-[min(34vw,360px)] items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 md:flex">
          <Search size={14} className="text-white/35" />
          <span className="sr-only">搜索章节</span>
          <input
            value={query}
            onChange={event => setQuery(event.target.value)}
            placeholder="搜索章节、能力或场景"
            className="min-w-0 flex-1 bg-transparent text-xs text-white outline-none placeholder:text-white/28"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="text-white/35 hover:text-white"
              aria-label="清空搜索"
            >
              <X size={13} />
            </button>
          ) : null}
        </label>

        <div className="hidden items-center gap-3 lg:flex">
          <div className="w-24">
            <div className="mb-1 flex items-center justify-between font-mono text-[9px] uppercase tracking-wider text-white/35">
              <span>progress</span>
              <span>{progress}%</span>
            </div>
            <div className="h-1 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-[#9AE66E] transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          <a
            href={GUIDE_REPO_URL}
            target="_blank"
            rel="noreferrer"
            className="flex h-9 items-center gap-2 rounded-full border border-white/10 px-3 text-xs text-white/55 transition hover:border-[#9AE66E]/45 hover:text-[#9AE66E]"
          >
            GitHub <ExternalLink size={12} />
          </a>
        </div>
      </header>

      <div className="border-b border-white/10 px-4 py-3 md:hidden">
        <label className="flex h-9 items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3">
          <Search size={14} className="text-white/35" />
          <span className="sr-only">搜索章节</span>
          <input
            value={query}
            onChange={event => setQuery(event.target.value)}
            placeholder="搜索章节、能力或场景"
            className="min-w-0 flex-1 bg-transparent text-xs text-white outline-none placeholder:text-white/28"
          />
        </label>
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-1 md:grid-cols-[220px_310px_minmax(0,1fr)] xl:grid-cols-[250px_360px_minmax(0,1fr)]">
        <aside className="hidden min-h-0 flex-col border-r border-white/10 bg-[#111713] p-3 md:flex">
          <div className="space-y-2">
            {guideParts.map(part => {
              const isActive = !showAppendix && activePart === part.id;
              const partChapters = guideChapters.filter(
                chapter => chapter.part === part.id
              );
              const done = partChapters.filter(chapter =>
                completed.has(chapter.number)
              ).length;
              return (
                <button
                  type="button"
                  key={part.id}
                  onClick={() => selectPart(part.id)}
                  className={`group w-full rounded-xl border p-3 text-left transition ${isActive ? "border-white/18 bg-white/[0.07]" : "border-transparent hover:border-white/10 hover:bg-white/[0.035]"}`}
                >
                  <div className="mb-3 flex items-center justify-between">
                    <span
                      className="font-mono text-[9px] uppercase tracking-[0.14em]"
                      style={{ color: part.color }}
                    >
                      {part.eyebrow}
                    </span>
                    <span className="font-mono text-[10px] text-white/25">
                      {part.range}
                    </span>
                  </div>
                  <p className="text-sm font-semibold leading-snug text-white/88">
                    {part.title}
                  </p>
                  <div className="mt-3 flex items-center gap-2">
                    <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${(done / partChapters.length) * 100}%`,
                          background: part.color,
                        }}
                      />
                    </div>
                    <span className="font-mono text-[9px] text-white/30">
                      {done}/{partChapters.length}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => setShowAppendix(true)}
            className={`mt-2 flex items-center justify-between rounded-xl border px-3 py-3 text-left transition ${showAppendix ? "border-[#9AE66E]/30 bg-[#9AE66E]/10 text-[#B9F392]" : "border-white/8 text-white/55 hover:border-white/15 hover:text-white"}`}
          >
            <span>
              <span className="block font-mono text-[9px] uppercase tracking-[0.15em] opacity-60">
                Appendix
              </span>
              <span className="mt-1 block text-sm font-semibold">
                模板与场景速查
              </span>
            </span>
            <ChevronRight size={15} />
          </button>

          <div className="mt-auto rounded-xl border border-white/8 bg-black/20 p-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-white/70">
              <Sparkles size={13} className="text-[#9AE66E]" /> 学习原则
            </div>
            <p className="mt-2 text-[11px] leading-relaxed text-white/35">
              从低风险、可验收的真实任务开始；手动跑稳后，再做自动化和团队复用。
            </p>
          </div>
        </aside>

        <section
          className="min-h-0 overflow-y-auto border-r border-white/10 bg-[#0F1410]"
          style={{ contentVisibility: "auto" }}
        >
          <div className="sticky top-0 z-10 border-b border-white/10 bg-[#0F1410]/95 px-4 py-4 backdrop-blur">
            <p
              className="font-mono text-[9px] uppercase tracking-[0.18em]"
              style={{ color: activePartInfo.color }}
            >
              {deferredQuery
                ? `${visibleChapters.length} search results`
                : activePartInfo.eyebrow}
            </p>
            <h2 className="mt-1 text-lg font-semibold tracking-tight">
              {showAppendix ? "模板与场景速查" : activePartInfo.title}
            </h2>
          </div>

          <div className="flex gap-2 overflow-x-auto border-b border-white/8 p-3 md:hidden">
            {guideParts.map(part => (
              <button
                type="button"
                key={part.id}
                onClick={() => selectPart(part.id)}
                className={`flex-none rounded-full border px-3 py-1.5 text-xs ${activePart === part.id && !showAppendix ? "border-white/25 bg-white/10 text-white" : "border-white/10 text-white/45"}`}
              >
                {part.range}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setShowAppendix(true)}
              className="flex-none rounded-full border border-white/10 px-3 py-1.5 text-xs text-white/45"
            >
              附录
            </button>
          </div>

          {!showAppendix ? (
            <div className="p-2">
              {visibleChapters.length > 0 ? (
                visibleChapters.map(chapter => (
                  <button
                    type="button"
                    key={chapter.number}
                    onClick={() => selectChapter(chapter)}
                    className={`group flex w-full items-start gap-3 rounded-xl border p-3 text-left transition ${activeNumber === chapter.number ? "border-white/18 bg-white/[0.07]" : "border-transparent hover:border-white/8 hover:bg-white/[0.035]"}`}
                  >
                    <ChapterNumber
                      chapter={chapter}
                      complete={completed.has(chapter.number)}
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-semibold leading-snug text-white/85">
                        {chapter.title}
                      </span>
                      <span className="mt-1.5 line-clamp-2 block text-[11px] leading-relaxed text-white/35">
                        {chapter.summary}
                      </span>
                    </span>
                    <ChevronRight
                      size={14}
                      className="mt-2 flex-none text-white/20 transition group-hover:translate-x-0.5 group-hover:text-white/50"
                    />
                  </button>
                ))
              ) : (
                <div className="px-5 py-14 text-center">
                  <Search size={22} className="mx-auto text-white/20" />
                  <p className="mt-3 text-sm text-white/55">没有匹配的章节</p>
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    className="mt-2 text-xs text-[#9AE66E]"
                  >
                    清空搜索
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="p-3">
              <p className="mb-3 px-2 text-xs leading-relaxed text-white/40">
                来自蓝皮书附录 A 的 6
                组常用指令。选择后可复制，或直接载入演示输入框。
              </p>
              {promptTemplates.map(template => (
                <button
                  type="button"
                  key={template.id}
                  onClick={() => copyPrompt(template.id, template.prompt)}
                  className="mb-2 w-full rounded-xl border border-white/8 bg-white/[0.025] p-3 text-left transition hover:border-white/15"
                >
                  <span className="font-mono text-[9px] uppercase tracking-wider text-[#9AE66E]/65">
                    {template.category}
                  </span>
                  <span className="mt-1 block text-sm font-semibold text-white/80">
                    {template.title}
                  </span>
                  <span className="mt-2 line-clamp-2 block whitespace-pre-line text-[11px] leading-relaxed text-white/35">
                    {template.prompt}
                  </span>
                </button>
              ))}
            </div>
          )}
        </section>

        <main
          className="min-h-0 overflow-y-auto bg-[#F1F0E9] text-[#171A17]"
          style={{ contentVisibility: "auto" }}
        >
          {!showAppendix ? (
            <article className="mx-auto max-w-4xl px-5 py-7 md:px-8 md:py-10 xl:px-12">
              <div className="relative overflow-hidden rounded-[28px] bg-[#151B16] px-6 py-7 text-white md:px-9 md:py-9">
                <div
                  className="absolute -right-16 -top-20 h-56 w-56 rounded-full opacity-20 blur-3xl"
                  style={{ background: activePartInfo.color }}
                />
                <div className="relative">
                  <div className="flex items-center justify-between">
                    <span
                      className="font-mono text-[10px] uppercase tracking-[0.2em]"
                      style={{ color: activePartInfo.color }}
                    >
                      Chapter {String(activeChapter.number).padStart(2, "0")}
                    </span>
                    <span className="rounded-full border border-white/10 px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider text-white/40">
                      {activePartInfo.range}
                    </span>
                  </div>
                  <h1 className="mt-8 max-w-2xl text-3xl font-semibold leading-[1.08] tracking-[-0.035em] md:text-5xl">
                    {activeChapter.title}
                  </h1>
                  <p className="mt-5 max-w-2xl text-sm leading-7 text-white/55 md:text-base">
                    {activeChapter.summary}
                  </p>
                  <div className="mt-7 flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        onLaunch({
                          action: activeChapter.action,
                          prompt: activeChapter.prompt,
                        })
                      }
                      className="flex items-center gap-2 rounded-full px-4 py-2.5 text-xs font-semibold text-[#101510] transition hover:-translate-y-0.5"
                      style={{ background: activePartInfo.color }}
                    >
                      <Play size={13} fill="currentColor" />{" "}
                      {activeChapter.actionLabel}
                    </button>
                    <a
                      href={getGuideSourceUrl(activeChapter.sourcePath)}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 rounded-full border border-white/15 px-4 py-2.5 text-xs text-white/65 transition hover:border-white/35 hover:text-white"
                    >
                      阅读原章 <ArrowUpRight size={13} />
                    </a>
                  </div>
                </div>
              </div>

              <div className="grid gap-5 py-7 lg:grid-cols-[minmax(0,1fr)_240px]">
                <section className="rounded-2xl border border-black/8 bg-white/65 p-5 md:p-6">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-black/35">
                        Chapter notes
                      </p>
                      <h2 className="mt-1 text-lg font-semibold">
                        这一章要带走什么
                      </h2>
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleComplete(activeChapter.number)}
                      aria-pressed={completed.has(activeChapter.number)}
                      className={`flex flex-none items-center gap-2 rounded-full border px-3 py-2 text-xs font-medium transition ${completed.has(activeChapter.number) ? "border-[#63A53B]/20 bg-[#9AE66E]/30 text-[#31551F]" : "border-black/10 bg-white text-black/50 hover:border-black/20 hover:text-black/75"}`}
                    >
                      {completed.has(activeChapter.number) ? (
                        <Check size={13} />
                      ) : (
                        <Circle size={13} />
                      )}
                      {completed.has(activeChapter.number)
                        ? "已完成"
                        : "标记已读"}
                    </button>
                  </div>
                  <div className="mt-5 space-y-3">
                    {activeChapter.takeaways.map((takeaway, index) => (
                      <div
                        key={takeaway}
                        className="flex items-start gap-3 rounded-xl border border-black/[0.06] bg-white p-4"
                      >
                        <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-[#171A17] font-mono text-[10px] text-white">
                          {index + 1}
                        </span>
                        <p className="pt-0.5 text-sm leading-6 text-black/70">
                          {takeaway}
                        </p>
                      </div>
                    ))}
                  </div>
                  {activeChapter.prompt ? (
                    <div className="mt-5 overflow-hidden rounded-xl border border-black/8 bg-[#151B16] text-white">
                      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
                        <span className="font-mono text-[9px] uppercase tracking-[0.17em] text-[#9AE66E]">
                          Practice prompt
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            copyPrompt(
                              `chapter-${activeChapter.number}`,
                              activeChapter.prompt!
                            )
                          }
                          className="flex items-center gap-1.5 text-[11px] text-white/45 hover:text-white"
                        >
                          {copied === `chapter-${activeChapter.number}` ? (
                            <Check size={12} />
                          ) : (
                            <Copy size={12} />
                          )}
                          {copied === `chapter-${activeChapter.number}`
                            ? "已复制"
                            : "复制"}
                        </button>
                      </div>
                      <p className="whitespace-pre-line px-4 py-4 text-xs leading-6 text-white/60">
                        {activeChapter.prompt}
                      </p>
                    </div>
                  ) : null}
                </section>

                <aside className="space-y-4">
                  <div className="rounded-2xl border border-black/8 bg-[#E5E3D9] p-5">
                    <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-black/35">
                      From the guide
                    </p>
                    <p className="mt-3 text-sm font-semibold leading-6">
                      先做一遍，再读一遍。
                    </p>
                    <p className="mt-2 text-xs leading-5 text-black/50">
                      蓝皮书以真实任务为主线。点击体验按钮，把本章概念映射到界面中的实际入口。
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const next = guideChapters.find(
                        chapter => chapter.number === activeChapter.number + 1
                      );
                      if (next) selectChapter(next);
                    }}
                    disabled={activeChapter.number === guideChapters.length}
                    className="group w-full rounded-2xl bg-[#171A17] p-5 text-left text-white transition hover:-translate-y-0.5 disabled:cursor-default disabled:opacity-40"
                  >
                    <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/35">
                      Next chapter
                    </span>
                    <span className="mt-3 flex items-center justify-between gap-3 text-sm font-semibold">
                      {activeChapter.number === guideChapters.length
                        ? "你已来到最后一章"
                        : guideChapters[activeChapter.number]?.title}
                      <ChevronRight
                        size={15}
                        className="transition group-hover:translate-x-1"
                      />
                    </span>
                  </button>
                </aside>
              </div>
            </article>
          ) : (
            <div className="mx-auto max-w-5xl px-5 py-7 md:px-8 md:py-10 xl:px-12">
              <div className="rounded-[28px] bg-[#9AE66E] p-7 md:p-9">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#31551F]">
                  Appendix A + B
                </p>
                <h1 className="mt-5 max-w-2xl text-3xl font-semibold leading-tight tracking-[-0.035em] md:text-5xl">
                  不用从空白输入框开始
                </h1>
                <p className="mt-4 max-w-2xl text-sm leading-6 text-[#31551F]">
                  复制蓝皮书的基础指令，再补充你的文件、业务背景和验收标准；或直接载入演示，看看它如何进入真实交互。
                </p>
              </div>

              <section className="py-7">
                <div className="mb-4 flex items-end justify-between gap-4">
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-black/35">
                      Prompt kit
                    </p>
                    <h2 className="mt-1 text-xl font-semibold">6 组常用指令</h2>
                  </div>
                  <a
                    href={getGuideSourceUrl(
                      "附录/附录 A 常用指令模板/index.md"
                    )}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 text-xs text-black/45 hover:text-black"
                  >
                    查看原附录 <ArrowUpRight size={12} />
                  </a>
                </div>
                <div className="grid gap-4 lg:grid-cols-2">
                  {promptTemplates.map(template => (
                    <article
                      key={template.id}
                      className="flex min-h-64 flex-col rounded-2xl border border-black/8 bg-white/70 p-5"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-black/35">
                            {template.category}
                          </p>
                          <h3 className="mt-1 text-lg font-semibold">
                            {template.title}
                          </h3>
                        </div>
                        <button
                          type="button"
                          onClick={() =>
                            copyPrompt(template.id, template.prompt)
                          }
                          className="flex items-center gap-1.5 rounded-full border border-black/10 px-3 py-1.5 text-[11px] text-black/50 hover:border-black/20 hover:text-black"
                        >
                          {copied === template.id ? (
                            <Check size={12} />
                          ) : (
                            <Copy size={12} />
                          )}
                          {copied === template.id ? "已复制" : "复制"}
                        </button>
                      </div>
                      <pre className="mt-4 flex-1 whitespace-pre-wrap rounded-xl bg-[#171A17] p-4 font-sans text-xs leading-6 text-white/60">
                        {template.prompt}
                      </pre>
                      <button
                        type="button"
                        onClick={() =>
                          onLaunch({
                            action: template.action,
                            prompt: template.prompt,
                          })
                        }
                        className="mt-4 flex items-center justify-between rounded-xl bg-[#171A17] px-4 py-3 text-xs font-semibold text-white transition hover:bg-black"
                      >
                        载入演示 <Play size={13} fill="currentColor" />
                      </button>
                    </article>
                  ))}
                </div>
              </section>

              <section className="pb-10">
                <div className="mb-4 flex items-end justify-between gap-4">
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-black/35">
                      Role routes
                    </p>
                    <h2 className="mt-1 text-xl font-semibold">
                      按岗位选择起点
                    </h2>
                  </div>
                  <a
                    href={getGuideSourceUrl("附录/附录 B 场景速查表/index.md")}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 text-xs text-black/45 hover:text-black"
                  >
                    查看完整速查表 <ArrowUpRight size={12} />
                  </a>
                </div>
                <div className="overflow-hidden rounded-2xl border border-black/8 bg-white/65">
                  {roleRoutes.map((route, index) => (
                    <div
                      key={route.role}
                      className={`grid gap-2 px-5 py-4 md:grid-cols-[160px_minmax(0,1fr)_100px] md:items-center ${index ? "border-t border-black/[0.06]" : ""}`}
                    >
                      <p className="text-sm font-semibold">{route.role}</p>
                      <p className="text-xs leading-5 text-black/50">
                        {route.start}
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          const firstNumber = Number.parseInt(
                            route.chapters,
                            10
                          );
                          const chapter = guideChapters.find(
                            item => item.number === firstNumber
                          );
                          if (chapter) selectChapter(chapter);
                        }}
                        className="flex items-center justify-end gap-2 font-mono text-[10px] text-black/40 hover:text-black"
                      >
                        CH {route.chapters} <ChevronRight size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
