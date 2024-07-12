import Button from "@/components/common/Button";
import LoginForm from "@/components/login/organisms/LoginForm";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Button content="button" primary />
      <LoginForm />
    </main>
  );
}
