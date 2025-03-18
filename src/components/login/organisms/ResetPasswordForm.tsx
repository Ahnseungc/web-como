"use client";

import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { LOGIN_ENDPOINT } from "@/lib/constants";

interface ResetPasswordDto {
  email: string;
  phone: string;
  newPassword: string;
}

export default function ResetPasswordForm() {
  const { replace, refresh } = useRouter();
  const alertShown = useRef(false);
  // 초기 상태는 빈 값으로 설정
  const [formData, setFormData] = useState<ResetPasswordDto>({
    email: '',
    phone: '',
    newPassword: ''
  });

  const [isAuthorized, setIsAuthorized] = useState(false);
  // 입력값 에러 상태 추가
  const [errors, setErrors] = useState({
    newPassword: '',
    confirmPassword: ''
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetPasswordError, setResetPasswordError] = useState(""); // 비밀번호 재설정 에러 메시지를 위한 상태 추가

  useEffect(() => {
    const isVerified = sessionStorage.getItem('isVerified');
    const verifiedEmail = sessionStorage.getItem('verifiedEmail');
    const verifiedPhone = sessionStorage.getItem('verifiedPhone');

    if ((!isVerified || !verifiedEmail || !verifiedPhone) && !alertShown.current) {
      alertShown.current = true;
      alert("본인인증이 필요한 페이지입니다.");
      replace(`${LOGIN_ENDPOINT}`);
      return;
    }

    // 세션 스토리지에서 가져온 값으로 폼 데이터 업데이트
    if (verifiedEmail && verifiedPhone) {
      setFormData({
        email: verifiedEmail,
        phone: verifiedPhone,
        newPassword: ''
      });
    } else {
      // 세션 스토리지 값이 없는 경우 처리
      console.error('세션 스토리지에 필요한 값이 없습니다.');
      if (!alertShown.current) {
        alertShown.current = true;
        alert("세션 정보가 유효하지 않습니다. 다시 시도해주세요.");
        replace(`${LOGIN_ENDPOINT}`);
      }
      return;
    }
    
    setIsAuthorized(true);
  }, [replace]);

  // 입력값 유효성 검사 함수
  const validateForm = () => {
    const newErrors = {
      newPassword: "",
      confirmPassword: ""
    };

    /**
     * 비밀번호 유효성 검사를 위한 정규식
     * 다음 조건을 충족해야 함:
     * 1. 최소 8자, 최대 20자
     * 2. 최소 하나의 영문자(대문자 또는 소문자) 포함
     * 3. 최소 하나의 숫자 포함
     * 4. 최소 하나의 특수 문자 포함 (!@#$%^&*(),.?":{}|<> 중 하나)
     */
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,20}$/;
    
    // 1. 새 비밀번호 정규식 체크
    if (!passwordRegex.test(formData.newPassword)) {
      newErrors.newPassword = "영어, 숫자, 특수문자를 조합하여 8자 이상 20자 이하로 입력해주세요.";
      setErrors(newErrors);
      return false;
    }

    // 2. 새 비밀번호 확인 정규식 체크
    if (!passwordRegex.test(confirmPassword)) {
      newErrors.confirmPassword = "영어, 숫자, 특수문자를 조합하여 8자 이상 20자 이하로 입력해주세요.";
      setErrors(newErrors);
      return false;
    }

    // 3. 두 비밀번호 일치 여부 체크
    if (formData.newPassword !== confirmPassword) {
      newErrors.confirmPassword = "입력하신 비밀번호와 일치하지 않아요.";
      setErrors(newErrors);
      return false;
    }

    // 모든 검증을 통과한 경우
    setErrors(newErrors); // 에러 초기화
    return true;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'rePassword') {
      setConfirmPassword(value);
    } else if (name === 'password') {
      setFormData({
        ...formData,
        newPassword: value
      });
    }
  }

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    // 비밀번호 재설정 시도 시 이전 에러 메시지 초기화
    setResetPasswordError("");

    // 폼 데이터 확인을 위한 콘솔 로그
    console.log("비밀번호 재설정 시도:", {
        이메일: formData.email,
        전화번호: formData.phone,
        newPassword: formData.newPassword,
        confirmPassword: confirmPassword,
     });

    // 폼 유효성 검사
    if (!validateForm()) {
      return;
    }

    const response = await fetch(`/api/server/member/password`, {
      method: "POST",
      body: JSON.stringify({
        email: formData.email,
        phoneNumber: formData.phone,
        password: formData.newPassword
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    // API 응답 확인을 위한 콘솔 로그
    console.log("API 응답 상태:", response.status);

    if (!response.ok) {
      const errorMessage = await response.text();
      setResetPasswordError("비밀번호 재설정에 실패했습니다.");
      console.error("비밀번호 재설정 실패:", errorMessage);
      return;
    }

    if (response.ok) {
      alert("비밀번호 재설정이 완료되었습니다.");
      replace(`${LOGIN_ENDPOINT}`);
    } else {
      refresh();
    }
  };

  if (!isAuthorized) return null;

  return (
    <div className="p-8 rounded-4xl shadow bg-gray-0">
      <form
        onSubmit={handleResetPassword}
        className="space-y-[38px] w-[530px] py-6"
      >
        <h2 className="h1 text-center font-bold text-gray-1000">
          {"비밀번호 재설정"}
        </h2>
        <div className="space-y-4">
          <Input
            name="password"
            type="password"
            placeholder="새 비밀번호 입력(8~20자)"
            value={formData.newPassword}
            onChange={handleInputChange}
          />
          {errors.newPassword && (
            <p className="mt-2 text-[16px] font-[500]" style={{ color: "#FF3D00" }}>
              {errors.newPassword}
            </p>
          )}
          <Input
            name="rePassword"
            type="password"
            placeholder="새 비밀번호 재입력"
            value={confirmPassword}
            onChange={handleInputChange}
          />
          {errors.confirmPassword && (
            <p className="mt-2 text-[16px] font-[500]" style={{ color: "#FF3D00" }}>
              {errors.confirmPassword}
            </p>
          )}
        </div>
        <Button content="확인" primary />
      </form>
    </div>
  );
}
