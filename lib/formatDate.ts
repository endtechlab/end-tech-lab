/** サーバー／クライアントで同じ文字列になるよう、表示用日付は日本時間に固定する（ハイドレーションずれ防止） */
export function formatDateJa(iso: string | undefined | null): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("ja-JP", { timeZone: "Asia/Tokyo" });
}
