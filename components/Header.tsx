// components/Header.tsx
import Link from "next/link";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-gray-800 text-white sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center md:justify-between gap-2 md:gap-0">
        <div className="flex items-center justify-between w-full md:w-auto">
          <h1 className="text-xl font-bold flex-shrink-0 whitespace-nowrap">
            <Link href="/">End-Tech-Lab</Link>
          </h1>
          {/* ハンバーガーメニューボタン（スマホのみ表示） */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="メニュー"
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center relative">
              <span className={`${isMenuOpen ? 'w-3' : 'w-6'} h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45' : ''}`}></span>
              <span className={`${isMenuOpen ? 'w-3' : 'w-6'} h-0.5 bg-white mt-1 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`${isMenuOpen ? 'w-3' : 'w-6'} h-0.5 bg-white mt-1 transition-all duration-300 ${isMenuOpen ? '-rotate-45' : ''}`}></span>
            </div>
          </button>
        </div>
        
        {/* PC用ナビゲーション */}
        <nav className="hidden md:flex flex-row gap-6 text-sm">
          <Link href="/services" className="hover:underline whitespace-nowrap py-2 md:py-0">
            事業内容
          </Link>
          <Link href="/activities" className="hover:underline whitespace-nowrap py-2 md:py-0">
            活動報告
          </Link>
          <Link href="/works" className="hover:underline whitespace-nowrap py-2 md:py-0">
            実績紹介
          </Link>
          <Link href="/contact" className="hover:underline whitespace-nowrap py-2 md:py-0">
            お問い合わせ
          </Link>
        </nav>
      </div>

      {/* メニュー開時用のオーバーレイ（他のコンテンツをクリックできないように） */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-30"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}

      {/* スマホ用ドロップダウンメニュー（裏から出てくるアニメーション） */}
      <div className={`absolute top-full left-0 right-0 bg-gray-800 border-t border-gray-700 md:hidden z-40 transition-all duration-300 ease-out ${isMenuOpen ? 'opacity-100 transform scale-y-100 origin-top' : 'opacity-0 transform scale-y-0 origin-top pointer-events-none'}`}>
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-4">
          <Link href="/services" className="hover:underline whitespace-nowrap py-2 text-white">
            事業内容
          </Link>
          <Link href="/activities" className="hover:underline whitespace-nowrap py-2 text-white">
            活動報告
          </Link>
          <Link href="/works" className="hover:underline whitespace-nowrap py-2 text-white">
            実績紹介
          </Link>
          <Link href="/contact" className="hover:underline whitespace-nowrap py-2 text-white">
            お問い合わせ
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
