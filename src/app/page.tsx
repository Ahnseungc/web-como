import Button from "@/components/ui/common/Button";
import LoginForm from "@/components/ui/login/LoginForm";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Button content="button" primary />
      <LoginForm />
    </main>
  );
}
