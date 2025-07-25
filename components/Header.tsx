// components/Header.tsx
import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-gray-800 text-white">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">
          <Link href="/">End-Tech-Lab</Link>
        </h1>
        <nav className="space-x-6 text-sm">
          <Link href="/services" className="hover:underline">
            事業内容
          </Link>
          <Link href="/activities" className="hover:underline">
            活動報告
          </Link>
          <Link href="/works" className="hover:underline">
            実績紹介
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
