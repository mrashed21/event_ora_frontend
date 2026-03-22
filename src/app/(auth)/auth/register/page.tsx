import RegisterForm from "@/components/auth/register-form/register-form";
export const metadata = {
  title: "Register - Eventora",
  description: "Create a new account on Eventora to manage your events.",
};
const RegisterPage = () => {
  return (
    <section>
      <RegisterForm />
    </section>
  );
};

export default RegisterPage;
