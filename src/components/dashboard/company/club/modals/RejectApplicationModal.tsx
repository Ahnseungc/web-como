"use client";

import { closeModal } from "@/lib/utils";
import Backdrop from "@/components/common/Backdrop";
import Button from "@/components/common/Button";
import Textarea from "@/components/common/Textarea";
import { useState, useEffect } from "react";
import { getAccessToken } from "@/lib/cookies";

export default function RejectApplicationModal() {
  const [modalParams, setModalParams] = useState<any>(null);
  const [reason, setReason] = useState(''); // 이유 상태 추가
  const [error, setError] = useState(''); // 에러 상태 추가

  useEffect(() => {
    const modal = document.getElementById('reject-application');
    // console.log('모달 엘리먼트:', modal); // 모달 엘리먼트 확인
    
    if (modal) {
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'attributes' && mutation.attributeName === 'data-modal-params') {
            const newParams = modal.dataset.modalParams;
            console.log('새로운 모달 파라미터:', newParams); // 파라미터 확인
            if (newParams) {
              const parsedParams = JSON.parse(newParams);
              console.log('파싱된 파라미터:', parsedParams); // 파싱된 파라미터 확인
              setModalParams(parsedParams);
            }
          }
        });
      });

      observer.observe(modal, {
        attributes: true,
        attributeFilter: ['data-modal-params']
      });

      return () => observer.disconnect(); // 컴포넌트 언마운트 시 옵저버 해제
    }
  }, []); // 빈 배열을 의존성으로 설정하여 컴포넌트가 마운트될 때만 실행

  
  const handleReject = async () => {
    const token = await getAccessToken();

    if (!reason) {
      setError("반려 사유를 입력해주세요."); // 에러 메시지 설정
      return;
    }

    try {
      const response = await fetch(`/api/server/v1/manager/club/${modalParams.clubId}/reject`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ reason }), // 반려 사유를 포함
      });

      if (!response.ok) {
        throw new Error('반려 처리 실패');
      }

      const data = await response.json();
      if (data.resultCode === 'OK') {
        // 성공 메시지 표시
        alert("신청이 성공적으로 반려되었습니다."); 
        
        // 2초 후에 페이지를 새로고침
        setTimeout(() => {
          window.location.reload(); // 페이지 새로고침
        }, 2000);
      }
    } catch (error) {
      // alert("동호회 반려 처리 오류"); 
      console.error('동호회 반려 처리 오류:', error);
    }
  };

  return (
    <div id="reject-application" className="hidden modal">
      <Backdrop />
      <form className="fixed bottom-1/2 right-1/2 translate-y-1/2 translate-x-1/2 z-40 space-y-8 w-full max-w-[524px] p-8 rounded-xl bg-gray-0 shadow">
        <h2 className="text-center h1 font-bold text-gray-900">
          {"정말 반려하시겠습니까?"}
        </h2>
        <div className="space-y-3">
        <p className="text-center h4 font-normal text-gray-800">
          {modalParams ? 
            `${modalParams.clubName}을(를) 개설 신청한 임직원에게\n반려 사유와 함께 안내 메일이 송신됩니다.` : 
            "동호회를 개설 신청한 임직원에게\n반려 사유와 함께 안내 메일이 송신됩니다." // 기본 메시지
          }
        </p>
          <Textarea
            required
            name="reason"
            placeholder="반려사유 입력창"
            rows={6}
            value={reason} // 상태와 연결
            onChange={(e) => {
              setReason(e.target.value); // 입력값 업데이트
              setError(''); // 에러 초기화
            }}
          />
          {error && <p className="mt-2 text-[16px] font-[500]" style={{ color: "#FF3D00" }}>{error}</p>} {/* 에러 메시지 표시 */}
        </div>
        <div className="flex space-x-3">
          <Button content="닫기" onClick={() => closeModal()} type="button" />
          <Button content="반려하기" primary type="submit" onClick={handleReject} />
        </div>
      </form>
    </div>
  );
}
