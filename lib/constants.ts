// レイアウト関連の定数
export const LAYOUT = {
  MAX_WIDTH: 'max-w-6xl',
  CONTAINER_PADDING: 'px-4',
  MAIN_PADDING: 'py-12',
  MIN_HEIGHT_SCREEN: 'min-h-screen',
} as const;

// タイトル関連の定数
export const TITLE = {
  MAIN_SIZE: 'text-3xl',
  SUB_SIZE: 'text-xl',
  SECTION_SIZE: 'text-2xl',
  FONT_WEIGHT: 'font-bold',
  MARGIN_BOTTOM: 'mb-12',
  BORDER_BOTTOM: 'border-b-2',
  BORDER_COLOR: 'border-blue-300',
  PADDING_BOTTOM: 'pb-2',
  PADDING_X: 'px-2',
} as const;

// カード関連の定数
export const CARD = {
  PADDING: 'px-8 py-10',
  PADDING_SMALL: 'p-6',
  ROUNDED: 'rounded-xl',
  SHADOW: 'shadow-lg',
  HOVER_SHADOW: 'hover:shadow-xl',
  MARGIN_TOP: 'mt-10',
  MARGIN_BOTTOM: 'mb-4',
  MARGIN_BOTTOM_SMALL: 'mb-2',
} as const;

// 画像関連の定数
export const IMAGE = {
  HEIGHT: 'h-40',
  COVER: 'object-cover',
  ROUNDED: 'rounded',
  SHADOW: 'shadow-md',
} as const;

// ボタン関連の定数
export const BUTTON = {
  PADDING: 'px-5 py-2',
  ROUNDED: 'rounded',
  FONT_WEIGHT: 'font-medium',
  MARGIN_BOTTOM: 'mb-2',
} as const;

// アニメーション関連の定数
export const ANIMATION = {
  DURATION: 'duration-300',
  DURATION_LONG: 'duration-1000',
  TRANSITION: 'transition-all',
  TRANSITION_COLORS: 'transition-colors',
} as const;

// ハンバーガーメニュー関連の定数
export const HAMBURGER = {
  LINE_WIDTH: 'w-6',
  LINE_HEIGHT: 'h-0.5',
  ROTATE_45: 'rotate-45',
  ROTATE_NEG_45: '-rotate-45',
  TRANSLATE_Y_1_5: 'translate-y-1.5',
  TRANSLATE_Y_NEG_1_5: '-translate-y-1.5',
  Z_INDEX_MENU: 40,
  Z_INDEX_OVERLAY: 30,
} as const;

// ヒーローセクション関連の定数
export const HERO = {
  HEIGHT_MOBILE: 'h-[340px]',
  HEIGHT_DESKTOP: 'md:h-[420px]',
  OVERLAY_OPACITY: 'bg-black/40',
  Z_INDEX_OVERLAY: 'z-10',
  Z_INDEX_CONTENT: 'z-20',
} as const;

// フォーム関連の定数
export const FORM = {
  MIN_HEIGHT: '800px',
  HEIGHT: '800px',
} as const;

// スクロール関連の定数
export const SCROLL = {
  OFFSET: 60, // ヘッダーからのスクロールオフセット（px）
  DEFAULT_HEADER_HEIGHT: 80, // デフォルトのヘッダー高さ（px）
} as const;

// キャッシュ関連の定数
export const CACHE = {
  REVALIDATE_TIME: 60, // 秒
} as const;

// スライドショー関連の定数
export const SLIDESHOW = {
  INTERVAL: 4000, // ミリ秒
} as const; 