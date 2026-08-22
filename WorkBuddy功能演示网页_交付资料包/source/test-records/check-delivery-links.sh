#!/usr/bin/env bash
set -euo pipefail

PACK_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
REPORT="$PACK_DIR/source/test-records/delivery-link-check.md"

docs=(
  "$PACK_DIR/00_导出说明.md"
  "$PACK_DIR/01_提示词与素材清单.md"
  "$PACK_DIR/02_设计思路与信息架构.md"
  "$PACK_DIR/03_项目结构地图.md"
  "$PACK_DIR/04_References原始文件清单.md"
  "$PACK_DIR/05_迭代复盘图.md"
  "$PACK_DIR/assets/README.md"
  "$PACK_DIR/source/core-knowledge/prompt-provenance.md"
  "$PACK_DIR/source/core-knowledge/material-url-record.md"
)

checked=0
failed=0

{
  echo "# 资料包链接核验记录"
  echo
  echo "核验时间（UTC）：$(date -u '+%Y-%m-%dT%H:%M:%SZ')"
  echo
  echo "| 来源文档 | 相对链接 | 结果 |"
  echo "|---|---|---|"

  for doc in "${docs[@]}"; do
    doc_dir="$(dirname "$doc")"
    while IFS= read -r target; do
      target="${target%%#*}"
      [[ -z "$target" ]] && continue
      [[ "$target" =~ ^https?:// ]] && continue
      [[ "$target" =~ ^mailto: ]] && continue
      checked=$((checked + 1))
      if [[ -e "$doc_dir/$target" ]]; then
        echo "| $(basename "$doc") | \`$target\` | ✅ 存在 |"
      else
        failed=$((failed + 1))
        echo "| $(basename "$doc") | \`$target\` | ❌ 缺失 |"
      fi
    done < <(grep -oE '\]\([^)]*\)' "$doc" | sed -E 's/^\]\((.*)\)$/\1/' || true)
  done

  echo
  echo "**汇总**：检查 ${checked} 个相对链接；缺失 ${failed} 个目标。"
} > "$REPORT"

if [[ "$failed" -gt 0 ]]; then
  exit 1
fi
