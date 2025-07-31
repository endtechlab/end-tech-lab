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
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1' : ''}`}></span>
              <span className={`w-6 h-0.5 bg-white mt-1 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`w-6 h-0.5 bg-white mt-1 transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1' : ''}`}></span>
            </div>
          </button>
        </div>
        
        {/* ナビゲーション（PC時は横並び、スマホ時はドロップダウン） */}
        <nav className={`md:flex flex-row flex-wrap md:flex-nowrap gap-4 md:gap-6 text-sm overflow-x-auto w-full md:w-auto justify-center md:justify-end ${isMenuOpen ? 'flex flex-col mt-4 md:mt-0' : 'hidden md:flex'}`}>
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
    </header>
  );
};

export default Header;
