"use client";

import { useState, useEffect } from "react";
import { closeModal, openModal } from "@/lib/utils";
import Backdrop from "@/components/common/Backdrop";
import Input, { InputLabel } from "@/components/common/Input";
import Button from "@/components/common/Button";
import Checkbox from "@/components/common/Checkbox";
import { Close } from "@/assets/icons/action";
import { getData } from "@/api/action";
import { getAccessToken } from "@/lib/cookies";

export default function EditEmployeeInfoModal() {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [memberData, setMemberData] = useState<any>(null);
  const [modalParams, setModalParams] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    department: '',
    position: '',
    email: '',
    phoneNumber: '',
  });
  const [role, setRole] = useState<'MEMBER' | 'ADMIN'>('MEMBER');

  useEffect(() => {
    const modal = document.getElementById('employee-edit');
    if (modal) {
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'attributes' && mutation.attributeName === 'data-modal-params') {
            const newParams = modal.dataset.modalParams;
            if (newParams) {
              setModalParams(JSON.parse(newParams));
            }
          }
        });
      });

      observer.observe(modal, {
        attributes: true,
        attributeFilter: ['data-modal-params']
      });

      return () => observer.disconnect();
    }
  }, []);

  useEffect(() => {
    const loadMemberData = async () => {
      if (!modalParams?.memberId) return;

      try {
        const res = await getData(`v1/manager/member/${modalParams.memberId}`, true);
        console.log("모달 데이터", res.data);
        setMemberData(res.data);
      } catch (error) {
        console.error("직원 정보 로딩 오류:", error);
      }
    };

    loadMemberData();
  }, [modalParams]);

  useEffect(() => {
    if (memberData) {
      setFormData({
        name: memberData.name || '',
        department: memberData.department || '',
        position: memberData.position || '',
        email: memberData.email || '',
        phoneNumber: memberData.phoneNumber || '',
      });
    }
  }, [memberData]);

  const handleClose = () => {
    const modal = document.getElementById('employee-edit');
    if (modal) {
      delete modal.dataset.modalParams;  // params 제거
    }
    closeModal();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      const token = await getAccessToken();
      const submitData = {
        ...formData,
        role: role  // isAdmin 대신 role 사용
      };
      
      console.log("수정할 데이터:", submitData);

      const response = await fetch(`/api/server/v1/manager/member/${modalParams.memberId}`, {
        method: 'PATCH',
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData)
      }); 

      const result = await response.json();
      console.log("수정 결과:", result);  // API 응답 확인

      if (result.resultCode === 'OK') {
        closeModal("employee-edit");
        openModal("edit-success");
      } else {
        console.error("수정 실패:", result.resultMessage);
      }
    } catch (error) {
      console.error("수정 요청 오류:", error);
    }
  };

  return (
    <div id="employee-edit" className="hidden modal">
      <Backdrop />
      <div className="fixed bottom-1/2 right-1/2 translate-y-1/2 translate-x-1/2 z-50 w-full max-w-[600px] p-4 rounded-xl bg-gray-0 shadow">
        <div className="space-y-6 h-full max-h-screen overflow-y-auto p-4 scrollbar-custom">
          <div className="flex items-center justify-between">
            <h2 className="text-center h1 font-bold text-gray-900">
              {"회원 정보 수정"}
            </h2>
            <button onClick={handleClose}>
              <Close className="w-8 h-8" />
            </button>
          </div>
          <div className="space-y-4">
            <Input 
              id="name" 
              label="이름" 
              value={formData.name}
              onChange={handleChange}
            />
            <Input 
              id="department" 
              label="부서" 
              value={formData.department}
              onChange={handleChange}
            />
            <Input 
              id="position" 
              label="직책" 
              value={formData.position}
              onChange={handleChange}
            />
            <Input
              id="email"
              type="email"
              label="이메일 주소"
              value={formData.email}
              onChange={handleChange}
            />
            <Input 
              id="phoneNumber" 
              label="핸드폰 번호" 
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-3">
            <InputLabel label="권한 부여" />
            <Checkbox
              name="none"
              content="권한 없음"
              checked={role === 'MEMBER'}
              onChange={(e) => setRole(e.target.checked ? 'MEMBER' : 'ADMIN')}
            />
            <Checkbox
              name="admin"
              content="동호회 관리자 권한"
              checked={role === 'ADMIN'}
              onChange={(e) => setRole(e.target.checked ? 'ADMIN' : 'MEMBER')}
            />
          </div>
          <Button
            primary
            content="수정하기"
            onClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}
