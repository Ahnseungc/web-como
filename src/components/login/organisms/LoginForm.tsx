"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import RadioSelect from "@/components/login/molecules/RadioSelect";
import BrandImage from "@/assets/images/brand_login.svg";
import LogoImage from "@/assets/logos/como_logo.svg";
import { saveDashboardType, saveRefreshToken } from "@/lib/token";

interface UserLoginDto {
  id: string;
  password: string;
  role: string;
}

export default function LoginForm() {
  const { refresh } = useRouter();
  const [formData, setFormData] = useState<UserLoginDto>({
    id: "",
    password: "",
    role: "club",
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    saveRefreshToken("token");
    saveDashboardType(formData.role);
    refresh();
  };

  return (
    <div className="flex justify-between w-[1200px] p-8 rounded-4xl shadow bg-gray-0">
      <Image src={BrandImage} alt="OMO" width={530} height={530} priority />
      <form
        onSubmit={handleLogin}
        className="flex flex-col justify-between w-[530px] h-[530px] py-6"
      >
        <Image
          src={LogoImage}
          alt="C'OMO for business"
          width={186}
          className="self-center"
        />
        <h2 className="h1 text-center font-bold text-gray-1000">{"로그인"}</h2>
        <div className="space-y-4">
          <Input name="id" type="email" placeholder="아이디" />
          <Input name="password" type="password" placeholder="비밀번호" />
          <RadioSelect
            currentValue={formData.role}
            handleChange={(role: string) =>
              setFormData((prev) => {
                return { ...prev, role };
              })
            }
          />
        </div>
        <Button content="로그인" primary />
        <div className="self-center flex items-center gap-4">
          <span className="body-1 font-normal text-gray-500">
            {"비밀번호가 기억이 나지 않나요?"}
          </span>
          <span className="h-[15px] border-l border-gray-300" />
          <Link href={"/login/identify"}>
            <span className="body-1 font-semibold text-gray-900">
              {"비밀번호 재설정"}
            </span>
          </Link>
        </div>
      </form>
    </div>
  );
}
