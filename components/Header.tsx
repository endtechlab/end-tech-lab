// components/Header.tsx
import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-gray-800 text-white">
      <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center md:justify-between gap-2 md:gap-0">
        <h1 className="text-xl font-bold flex-shrink-0 whitespace-nowrap">
          <Link href="/">End-Tech-Lab</Link>
        </h1>
        <nav className="flex flex-row flex-wrap md:flex-nowrap gap-4 md:gap-6 text-sm overflow-x-auto w-full md:w-auto justify-center md:justify-end">
          <Link href="/services" className="hover:underline whitespace-nowrap">
            事業内容
          </Link>
          <Link href="/activities" className="hover:underline whitespace-nowrap">
            活動報告
          </Link>
          <Link href="/works" className="hover:underline whitespace-nowrap">
            実績紹介
          </Link>
          <Link href="/contact" className="hover:underline whitespace-nowrap">
            お問い合わせ
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
