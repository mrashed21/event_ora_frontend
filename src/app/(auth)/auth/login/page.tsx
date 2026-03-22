import LoginForm from "@/components/auth/login-form/login-form";

export const mertadata = {
  title: "Login",
  description:
    "Login to your account to access your dashboard and manage your settings.",
};

const LoginPage = () => {
  return (
    <section>
      <LoginForm />
    </section>
  );
};

export default LoginPage;
