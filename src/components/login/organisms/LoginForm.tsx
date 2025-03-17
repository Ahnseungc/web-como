"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  saveAccessToken,
  saveDashboardType,
  saveRefreshToken,
} from "@/lib/cookies";
import { LOGIN_ENDPOINT } from "@/lib/constants";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import RadioSelect from "@/components/login/molecules/RadioSelect";
import BrandImage from "@/assets/images/brand_image.svg";
import LogoImage from "@/assets/logos/como_logo.svg";

interface UserLoginDto {
  id: string;
  password: string;
  role: string;
}

export default function LoginForm() {
  const { replace, refresh } = useRouter();
  const [formData, setFormData] = useState<UserLoginDto>({
    id: "",
    password: "",
    role: "club",
  });

  // 입력값 에러 상태 추가
  const [errors, setErrors] = useState({
    id: "",
    password: "",
  });
  // 로그인 에러 메시지를 위한 상태 추가
  const [loginError, setLoginError] = useState("");

  // 입력값 유효성 검사 함수
  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      id: "",
      password: "",
    };
   
    // 아이디 체크를 먼저 수행
    if (!formData.id.trim()) {
      newErrors.id = "필수 입력사항입니다.";
      isValid = false;
      setErrors(newErrors);
      return isValid;  // 아이디가 비어있으면 바로 리턴
    }

    // 아이디가 있을 때만 비밀번호 체크
    if (!formData.password.trim()) {
      newErrors.password = "필수 입력사항입니다.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // 로그인 시도 시 이전 에러 메시지 초기화
    setLoginError("");

    // 폼 데이터 확인을 위한 콘솔 로그
    console.log("로그인 시도:", {
      이메일: formData.id,
      비밀번호: formData.password,
      역할: formData.role,
    });

    // 폼 유효성 검사
    if (!validateForm()) {
      return;
    }

    const response = await fetch(`/api/server/login`, {
      method: "POST",
      body: JSON.stringify({
        email: formData.id,
        password: formData.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    // API 응답 확인을 위한 콘솔 로그
    console.log("API 응답 상태:", response.status);

    // 로그인 실패 시 에러 처리
    if (!response.ok) {
      const errorMessage = await response.text();
      setLoginError(errorMessage);
      console.error("로그인 실패:", errorMessage);
      return;
    }

    const accessToken = response.headers.get("Authorization");
    const refreshToken = accessToken;
    // const refreshToken = response.headers.get("Authorization-refresh");

    if (!accessToken || !refreshToken) {
      console.log("Error: No Access Token");
      return;
    }

    await saveAccessToken(accessToken);
    await saveRefreshToken(refreshToken);
    await saveDashboardType(formData.role);

    if (formData.role === "club") {
      replace(`${LOGIN_ENDPOINT}/club`);
    } else {
      refresh();
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-between gap-4 md:w-[1200px] md:p-8 rounded-4xl md:shadow md:bg-gray-0">
      <div className="relative w-[350px] md:w-[530px] h-[350px] md:h-[530px]">
        <Image src={BrandImage} alt="OMO" fill priority />
      </div>
      <form
        onSubmit={handleLogin}
        className="flex flex-col justify-between gap-4 md:w-[530px] md:h-[530px] py-6"
      >
        <Image
          src={LogoImage}
          alt="C'OMO for business"
          width={186}
          className="hidden md:block self-center"
        />
        <h2 className="hidden md:block h1 text-center font-bold text-gray-1000">
          {"로그인"}
        </h2>
        <div className="space-y-4">
          <div>
            <Input
              name="id"
              type="text"
              placeholder="아이디"
              currentValue={formData.id}
              handleInputChange={(e) =>
                setFormData((prev) => {
                  return { ...prev, id: e.target.value };
                })
              }
            />
            {errors.id && (
              <p
                className="mt-2 text-[16px] font-[500]"
                style={{ color: "#FF3D00" }}
              >
                {errors.id}
              </p>
            )}
          </div>
          <div>
            <Input
              name="password"
              type="password"
              placeholder="비밀번호"
              currentValue={formData.password}
              handleInputChange={(e) =>
                setFormData((prev) => {
                  return { ...prev, password: e.target.value };
                })
              }
            />
            {errors.password && (
              <p
                className="mt-2 text-[16px] font-[500]"
                style={{ color: "#FF3D00" }}
              >
                {errors.password}
              </p>
            )}
            {/* 로그인 에러 메시지를 비밀번호 필드 아래에 표시 */}
            {loginError && (
              <p
                className="mt-2 text-[16px] font-[500]"
                style={{ color: "#FF3D00" }}
              >
                {loginError}
              </p>
            )}
          </div>
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
