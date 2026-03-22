"use client";
import { useGetMe } from "@/api/auth/auth.api";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const HomePage = () => {
  const { data } = useGetMe();
  console.log(data);
  return (
    <section className="flex items-center justify-center min-h-screen gap-5">
      <Link href="/auth/login">
        <Button variant="outline" size="lg">
          Login
        </Button>
      </Link>
      <Link href="/auth/register">
        <Button variant="default" size="lg">
          Register
        </Button>
      </Link>
    </section>
  );
};

export default HomePage;
