"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  saveAccessToken,
  saveDashboardType,
  saveRefreshToken,
  saveRole,
} from "@/lib/cookies";
import { LOGIN_ENDPOINT, COMPANY_DASHBOARD_ENDPOINT } from "@/lib/constants";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import RadioSelect from "@/components/login/molecules/RadioSelect";
import BrandImage from "@/assets/images/brand_image.svg";
import LogoImage from "@/assets/logos/como_logo.svg";
import { SHA256 } from "crypto-js";
import { enc } from "crypto-js";

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
    role: "club", // 기본값은 동호회 임원
  });

  // 입력값 에러 상태 추가
  const [errors, setErrors] = useState({
    id: "",
    password: "",
  });
  // 로그인 에러 메시지를 위한 상태 추가
  const [loginError, setLoginError] = useState("");
  // ADMIN 계정 여부 상태
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminAccessToken, setAdminAccessToken] = useState("");

  // RadioSelect에서 role 변경 시 호출되는 handleChange
  const handleRoleChange = (newValue: string) => {
    // role 타입 체크
    if (newValue === "club" || newValue === "company") {
      setFormData((prev) => ({ ...prev, role: newValue }));
      // console.log('선택된 role:', newValue);
    }
  };

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
      return isValid; // 아이디가 비어있으면 바로 리턴
    }

    // 아이디가 있을 때만 비밀번호 체크
    if (!formData.password.trim()) {
      newErrors.password = "필수 입력사항입니다.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // ADMIN이 선택을 완료한 후 처리
  const handleAdminSelection = async () => {
    const dashboardType = formData.role; // "club" 또는 "company"

    await saveAccessToken(adminAccessToken);
    await saveRefreshToken(adminAccessToken);
    await saveDashboardType(dashboardType);
    await saveRole("admin"); // role은 "admin"으로 저장하여 middleware에서 양쪽 접근 허용

    if (dashboardType === "club") {
      replace(`${LOGIN_ENDPOINT}/club`);
    } else if (dashboardType === "company") {
      replace(COMPANY_DASHBOARD_ENDPOINT);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    if (!validateForm()) {
      return;
    }

    try {
      // const hashedPassword = SHA256(formData.password).toString(enc.Hex);
      const response = await fetch(`/api/login`, {
        method: "POST",
        body: JSON.stringify({
          email: formData.id,
          // password: hashedPassword,
          password: formData.password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        setLoginError("올바른 정보가 아닙니다.");
        return;
      }

      const accessToken = response.headers.get("Authorization");

      if (!accessToken) {
        return;
      }
      const tokenPayload = JSON.parse(atob(accessToken.split(".")[1]));
      const authorities = tokenPayload.role; // This might be an array or a single string
      const userRoles = Array.isArray(authorities)
        ? authorities
        : [authorities];
      console.log("실제 role:", userRoles);

      // ADMIN인 경우 선택할 수 있도록 RadioSelect 표시
      if (userRoles.includes("ROLE_ADMIN")) {
        setAdminAccessToken(accessToken);
        setIsAdmin(true);
        return;
      }

      // EXECUTIVE 또는 MANAGER는 자동으로 대시보드 타입 결정
      let dashboardType = "company"; // 기본값
      if (userRoles.includes("ROLE_EXECUTIVE")) {
        dashboardType = "club";
      } else if (userRoles.includes("ROLE_MANAGER")) {
        dashboardType = "company";
      }
      console.log("대시보드 타입:", dashboardType);

      await saveAccessToken(accessToken);
      await saveRefreshToken(accessToken);
      await saveDashboardType(dashboardType);
      await saveRole(dashboardType);

      if (dashboardType === "club") {
        replace(`${LOGIN_ENDPOINT}/club`);
      } else if (dashboardType === "company") {
        replace(COMPANY_DASHBOARD_ENDPOINT);
      }
    } catch (error) {
      console.error("에러 발생:", error);
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
          로그인
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
          {isAdmin && (
            <RadioSelect
              currentValue={formData.role}
              handleChange={handleRoleChange}
            />
          )}
        </div>
        {isAdmin ? (
          <Button
            content="확인"
            primary
            onClick={handleAdminSelection}
            type="button"
          />
        ) : (
          <Button content="로그인" primary />
        )}
        <div className="self-center flex items-center gap-4">
          <span className="body-1 font-normal text-gray-500">
            비밀번호가 기억이 나지 않나요?
          </span>
          <span className="h-[15px] border-l border-gray-300" />
          <Link href={"/login/identify"}>
            <span className="body-1 font-semibold text-gray-900">
              비밀번호 재설정
            </span>
          </Link>
        </div>
      </form>
    </div>
  );
}
