"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import Backdrop from "@/components/common/Backdrop";

interface userIdentificationDto {
  email: string;
  phone: string;
}

interface verificationDto {
  email: string;
  phoneNumber: string;
  code: string;
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
  const [showModal, setShowModal] = useState(false); // 모달 표시 상태 추가
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180); // 3분 = 180초
  const [verificationError, setVerificationError] = useState("");
  const [verificationCode, setVerificationCode] = useState("");

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showModal]);

  useEffect(() => {
    if (showModal && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [showModal, timeLeft]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

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

  const resetModalState = () => {
    setShowModal(false);
    setTimeLeft(180); // 타이머 초기화
    setVerificationError(""); // 에러 메시지 초기화
    setVerificationCode(""); // 인증번호 입력값 초기화
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
      setShowModal(true); // 성공 시 모달 표시
      console.log("본인인증 성공");
    } else {
      refresh(); // 실패 시 현재 페이지 새로고침
    }
  };

  const handleVerification = async (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
    }

    // 인증 번호 입력 시도 시 이전 에러 메시지 초기화
    setVerificationError("");

    // 타이머 만료 체크를 먼저 수행
    if (timeLeft <= 0) {
      setVerificationError("인증 시간이 만료되었습니다. 인증번호를 다시 요청해주세요.");
      return;
    }

    // 그 다음 인증번호 빈 값 체크
    if (!verificationCode.trim()) {
      setVerificationError("인증번호를 입력해주세요.");
      return;
    }

    // 폼 데이터 확인을 위한 콘솔 로그
    console.log("인증 번호 입력:", {
      이메일: formData.email,
      전화번호: formData.phone,
      인증번호: verificationCode,
    });

    const verificationData: verificationDto = {
      email: formData.email,
      phoneNumber: formData.phone,
      code: verificationCode
    };

    const response = await fetch(`/api/server/member/validation`, {
      method: "POST",
      body: JSON.stringify(verificationData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    // API 응답 확인을 위한 콘솔 로그
    console.log("API 응답 상태:", response.status);

    // 인증번호 인증 실패 시 에러 처리
    if (!response.ok) {
      const errorMessage = await response.text();
      setVerificationError("인증번호가 일치하지 않습니다.");
      console.error("인증번호 인증 실패:", errorMessage);
      return;
    }

    if (response.ok) {
      // 인증 상태와 함께 이메일, 전화번호도 저장
      sessionStorage.setItem('isVerified', 'true');
      sessionStorage.setItem('verifiedEmail', formData.email);
      sessionStorage.setItem('verifiedPhone', formData.phone);
      console.log("인증번호 인증 성공");
      replace("/login/reset");
    } else {
      refresh();
    }
};

  return (
    <>
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

      {mounted && showModal && createPortal(
        <div className="fixed inset-0 w-screen h-screen bg-black/50 z-[9999]">
          <Backdrop modalId="identification-modal" handleClose={resetModalState} />
          <div className="fixed inset-0 flex items-center justify-center z-[10000]">
            <div className="relative w-[594px] p-[32px] rounded-4xl shadow bg-gray-0">
              <div className="relative h-[88px] flex flex-col justify-center items-center border-b border-gray-100">
                <div>
                  <div className="relative flex items-center justify-between w-full">
                    <h2 className="h1 text-center font-bold text-gray-1000 w-[450px]">
                      {"인증번호 입력"}
                    </h2>
                    <button 
                      onClick={resetModalState}
                      className="flex items-center justify-center"
                    >
                      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                        <path d="M24 12L12 24M12 12L24 24" stroke="#666666" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </button>
                  </div>
                </div>
                <p className="text-[16px] text-gray-600 mt-2">
                  입력하신 전화번호로 인증번호가 전송되었습니다.
                </p>
              </div>
              <div className="space-y-[40px] mt-[32px]">
                <div>
                  <div className="relative">
                    <Input 
                      name="code" 
                      type="text" 
                      placeholder="인증번호를 입력해주세요."
                      currentValue={verificationCode}
                      handleInputChange={(e) => setVerificationCode(e.target.value)}
                    />
                    <span className="absolute right-[16px] top-1/2 -translate-y-1/2 text-primary-500 text-[16px] font-medium">
                      {formatTime(timeLeft)}
                    </span>
                  </div>
                  {verificationError && (
                    <p
                      className="mt-2 text-[16px] font-[500]"
                      style={{ color: "#FF3D00" }}
                    >
                      {verificationError}
                    </p>
                  )}
                </div>
              </div>
              <div className="mt-[40px]">
                <Button onClick={handleVerification} content="인증하기" primary />
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
