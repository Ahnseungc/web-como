import Image from "next/image";
import Link from "next/link";
import Logo from "@/assets/logos/logo.svg";
import ChevronDown from "@/assets/icons/chevron_down.svg";

export default function LoginHeader() {
  const profileImage = null;
  return (
    <header className="fixed top-0 inset-x-0 border-b-2 border-gray-200 bg-gray-0">
      <div className="flex items-center justify-between w-[1194px] h-[34px] my-8 mx-auto">
        <Link href={"/"}>
          <h1>
            <Image src={Logo} alt="OMO" width={36} height={36} />
          </h1>
        </Link>
        <div className="flex items-center gap-[60px]">
          <Link href={"/"}>
            <span className="h3 font-semibold text-gray-900">{"공지사항"}</span>
          </Link>
          <div className="flex items-center gap-2">
            {profileImage ? (
              <Image
                src={profileImage}
                alt="프로필"
                className="w-8 h-8 rounded-full"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-gray-400" />
            )}
            <Image src={ChevronDown} alt="▼" width={24} height={24} />
          </div>
        </div>
      </div>
    </header>
  );
}
