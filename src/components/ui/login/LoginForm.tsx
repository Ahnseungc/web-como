import Image from "next/image";
import Button from "@/components/ui/common/Button";
import RadioSelect from "@/components/ui/login/molecules/RadioSelect";
import BrandImage from "@/assets/images/brand_login.svg";
import LogoImage from "@/assets/logos/como_logo.svg";

export default function LoginForm() {
  const handleSubmit = () => {};

  return (
    <div className="flex justify-between w-[1200px] p-8 rounded-4xl shadow bg-gray-0">
      <Image src={BrandImage} alt="OMO" width={530} height={530} />
      <div className="flex flex-col justify-between w-[530px] h-[530px] py-6">
        <Image
          src={LogoImage}
          alt="C'OMO for business"
          width={186}
          className="self-center"
        />
        <h1 className="self-center font-bold text-gray-1000">{"로그인"}</h1>
        <form className="space-y-4">
          <input
            type="email"
            name="id"
            id="id"
            placeholder="아이디"
            className="w-full h-[60px] py-[18px] px-3 rounded-md outline-none h4 font-medium placeholder:text-gray-400 text-gray-900 bg-gray-100"
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="비밀번호"
            className="w-full h-[60px] py-[18px] px-3 rounded-md outline-none h4 font-medium placeholder:text-gray-400 text-gray-900 bg-gray-100"
          />
          <RadioSelect />
        </form>
        <Button content="로그인" primary onClick={handleSubmit} />
        <div className="self-center flex items-center gap-4">
          <span className="body-1 font-normal text-gray-500">
            {"비밀번호가 기억이 나지 않나요?"}
          </span>
          <span className="h-[15px] border-l border-gray-300" />
          <span className="body-1 font-semibold text-gray-900">
            {"비밀번호 재설정"}
          </span>
        </div>
      </div>
    </div>
  );
}
