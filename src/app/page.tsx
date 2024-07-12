import Button from "@/components/common/Button";
import IdentificationForm from "@/components/login/organisms/IdentificationForm";
import LoginForm from "@/components/login/organisms/LoginForm";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between gap-6 p-24">
      <Button content="button" primary />
      <LoginForm />
      <IdentificationForm />
    </main>
  );
}
