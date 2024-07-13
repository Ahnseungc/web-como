import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import LoginHeader from "@/components/header/LoginHeader";
import IdentificationForm from "@/components/login/organisms/IdentificationForm";
import LoginForm from "@/components/login/organisms/LoginForm";
import ResetPasswordForm from "@/components/login/organisms/ResetPasswordForm";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between gap-6 p-24">
      <Button content="버튼" primary />
      <Input name="input" type="text" placeholder="텍스트를 작성해보세요!" />
      <LoginForm />
      <IdentificationForm />
      <ResetPasswordForm />
      <LoginHeader />
    </main>
  );
}
