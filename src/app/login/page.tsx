import LoginForm from "@/components/login/organisms/LoginForm";

export default function LoginPage() {
  const formAction = async (formData: FormData) => {
    "use server";
    console.log(formData);
  };

  return (
    <main className="flex justify-center mt-24 py-[150px]">
      <LoginForm formAction={formAction} />
    </main>
  );
}
