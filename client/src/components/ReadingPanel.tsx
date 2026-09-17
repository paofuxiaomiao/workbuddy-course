import { useState } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  BookOpen,
  Download,
  FileText,
} from "lucide-react";

const pdf = `${import.meta.env.BASE_URL}reading/an-alien-mind-annotated.pdf`;
const filename = "改-An_Alien_Mind_中文注释高亮版_参考字体版.pdf";

export default function ReadingPanel() {
  const [reading, setReading] = useState(false);
  return (
    <section
      className="flex flex-1 min-h-0 flex-col bg-[#fafafa] select-text"
      aria-label="阅读素材"
    >
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 bg-white px-6 py-4">
        <div className="flex items-center gap-3">
          {reading ? (
            <button
              onClick={() => setReading(false)}
              aria-label="返回阅读素材"
              className="rounded-lg p-2 hover:bg-gray-100"
            >
              <ArrowLeft size={18} />
            </button>
          ) : (
            <BookOpen size={22} className="text-[#009d71]" />
          )}
          <div>
            <h1 className="text-lg font-semibold text-gray-900">
              {reading ? "An Alien Mind" : "阅读素材"}
            </h1>
            <p className="mt-1 text-xs text-gray-500">
              {reading
                ? "一种异于人类的智能 · 中文注释高亮版 · 16 页"
                : "课程延伸阅读，保留原文与批注"}
            </p>
          </div>
        </div>
        {reading && (
          <div className="flex items-center gap-4 text-sm">
            <a
              href={pdf}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 text-gray-600 hover:text-[#009d71]"
            >
              新窗口打开
              <ArrowUpRight size={15} />
            </a>
            <a
              href={pdf}
              download={filename}
              className="flex items-center gap-1 text-[#009d71]"
            >
              <Download size={15} />
              下载 PDF
            </a>
          </div>
        )}
      </header>
      {reading ? (
        <div
          className="flex-1 min-h-0 overflow-auto bg-[#e8e8e8] p-3 md:p-6"
          aria-label="An Alien Mind 全文预览"
        >
          <p className="mx-auto mb-4 max-w-3xl text-xs text-gray-600">
            以下为原 PDF 逐页预览。需要复制文字或添加批注时，请下载 PDF。
          </p>
          {Array.from({ length: 16 }, (_, i) => (
            <figure key={i} className="mx-auto mb-6 max-w-3xl">
              <img
                src={`${import.meta.env.BASE_URL}reading/an-alien-mind-pages/page-${String(i + 1).padStart(2, "0")}.png`}
                alt={`An Alien Mind 中文注释高亮版，第 ${i + 1} 页，共 16 页`}
                width={1191}
                height={1684}
                loading={i === 0 ? "eager" : "lazy"}
                className="block w-full h-auto bg-white shadow-sm"
              />
              <figcaption className="mt-2 text-center text-xs text-gray-500">
                {i + 1} / 16
              </figcaption>
            </figure>
          ))}
        </div>
      ) : (
        <div className="overflow-auto p-6 md:p-10">
          <article className="max-w-3xl rounded-2xl border border-gray-200 bg-white p-6 md:p-8">
            <div className="mb-5 flex items-center gap-2 text-xs text-gray-500">
              <FileText size={16} className="text-[#009d71]" />
              PDF<span>·</span>16 页<span>·</span>1.8 MB
            </div>
            <h2 className="text-2xl font-semibold text-gray-900">
              An Alien Mind
            </h2>
            <p className="mt-2 text-lg text-gray-700">一种异于人类的智能</p>
            <p className="mt-4 text-sm text-gray-500">
              Jakub Pachocki · 中文注释高亮版 · 参考字体版
            </p>
            <p className="mt-5 text-sm leading-7 text-gray-600">
              这份阅读材料保留了所提供 PDF
              中的中文注释、重点高亮和原有排版，可在线阅读，也可下载后做笔记。
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-5">
              <button
                onClick={() => setReading(true)}
                className="flex items-center gap-2 rounded-lg bg-[#009d71] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#00845e]"
              >
                <BookOpen size={16} />
                开始阅读
              </button>
              <a
                href={pdf}
                download={filename}
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#009d71]"
              >
                <Download size={16} />
                下载原文件
              </a>
            </div>
          </article>
        </div>
      )}
    </section>
  );
}
