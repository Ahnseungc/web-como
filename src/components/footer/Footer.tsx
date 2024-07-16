import Link from "next/link";
import { INFO, INQUIRY, RESPONSIBILITY } from "@/lib/message/footer";

const footerNav = [
  { name: "고객센터", link: "/" },
  { name: "이용약관", link: "/" },
  { name: "개인정보처리 방침", link: "/" },
  { name: "사업자정보 확인", link: "/" },
];

export default function Footer() {
  return (
    <footer className="relative z-10 w-full bg-gray-100">
      <div className="flex flex-col justify-between gap-12 w-full max-w-[1320px] mx-auto py-[60px] px-8">
        <ul className="flex gap-8">
          {footerNav.map((item) => (
            <Link key={item.name} href={item.link}>
              <li className="body-1 font-bold text-gray-900">{item.name}</li>
            </Link>
          ))}
        </ul>
        <div className="flex justify-between">
          <div className="space-y-2">
            <span className="body-1 font-bold text-gray-900">
              {"(주) 핀데브"}
            </span>
            <p className="body-1 font-medium text-gray-700">{INFO}</p>
          </div>
          <div className="space-y-2">
            <span className="body-1 font-bold text-gray-900">{"고객센터"}</span>
            <p className="body-1 font-medium text-gray-700">{INQUIRY}</p>
          </div>
        </div>
        <p className="body-1 font-medium text-gray-500">{RESPONSIBILITY}</p>
      </div>
    </footer>
  );
}
