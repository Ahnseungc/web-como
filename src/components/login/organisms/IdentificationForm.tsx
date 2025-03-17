"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";

interface userIdentificationDto {
  email: string;
  phone: string;
}

export default function IdentificationForm() {
  const { replace, refresh } = useRouter();
  const [formData, setFormData] = useState<userIdentificationDto>({
    email: "",
    phone: "",
  });

  // 입력값 에러 상태 추가
  const [errors, setErrors] = useState({
    email: "",
    phone: "",
  });

  // 본인 인증 에러 메시지를 위한 상태 추가
  const [identificationError, setIdentificationError] = useState("");

  // 모달 표시 상태 추가
  const [showModal, setShowModal] = useState(false);
  
  // 입력값 유효성 검사 함수
  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      email: "",
      phone: "",
    };

    // 이메일 체크
    if (!formData.email.trim()) {
      newErrors.email = "이메일 주소를 입력해주세요.";
      isValid = false;
      setErrors(newErrors);
      return isValid;  // 이메일이 비어있으면 바로 리턴
    }

    // 핸드폰 번호 체크
    if (!formData.phone.trim()) {
      newErrors.phone = "핸드폰 번호를 입력해주세요.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleIdentify = async (e: React.FormEvent) => {
    e.preventDefault();

      // 본인인증 시도 시 이전 에러 메시지 초기화
      setIdentificationError("");

     // 폼 데이터 확인을 위한 콘솔 로그
     console.log("본인인증 시도:", {
      이메일: formData.email,
      전화번호: formData.phone,
    });

    // 폼 유효성 검사
    if (!validateForm()) {
      return;
    }
    
    const response = await fetch(`/api/server/member/code`, {
      method: "POST",
      body: JSON.stringify({
        email: formData.email,
        phoneNumber: formData.phone,
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
      setIdentificationError("올바른 정보가 아닙니다.");
      console.error("본인인증 실패:", errorMessage);
      return;
    }

    if (response.ok) {
      // replace("/login/reset");
      console.log("본인인증 성공");
    } else {
      refresh(); // 실패 시 현재 페이지 새로고침
    }
  };

  return (
    <div className="p-8 rounded-4xl shadow bg-gray-0">
      <form onSubmit={handleIdentify} className="space-y-[38px] w-[530px] py-6">
        <h2 className="h1 text-center font-bold text-gray-1000">
          {"본인확인"}
        </h2>
        <div className="space-y-4">
          {/* <Input name="name" type="text" placeholder="이름" />
          <Input name="company" type="text" placeholder="기업명" />
          <Input name="carrier" type="text" placeholder="통신사" /> */}
               <div>
            <Input 
              name="email" 
              type="text" 
              placeholder="아이디(이메일)"
              currentValue={formData.email}
              handleInputChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  email: e.target.value,
                }))
              }
            />
            {errors.email && (
              <p className="mt-2 text-[16px] font-[500]" style={{ color: "#FF3D00" }}>
                {errors.email}
              </p>
            )}
          </div>
          <div>
            <Input 
              name="phone" 
              type="text" 
              placeholder="핸드폰 번호"
              currentValue={formData.phone}
              handleInputChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  phone: e.target.value,
                }))
              }
            />
            {errors.phone && (
              <p className="mt-2 text-[16px] font-[500]" style={{ color: "#FF3D00" }}>
                {errors.phone}
              </p>
            )}
              {/* 본인인증 에러 메시지를 전화번호 필드 아래에 표시 */}
              {identificationError && (
              <p
                className="mt-2 text-[16px] font-[500]" style={{ color: "#FF3D00" }}
              >
                {identificationError}
              </p>
            )}
          </div>
        </div>
        <Button content="인증번호 전송" primary />
      </form>
    </div>
  );
}
