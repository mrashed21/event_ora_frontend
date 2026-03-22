"use client";

import { useGetMe } from "@/api/auth/auth.api";
import Container from "@/components/custom/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const { data, isLoading } = useGetMe();
  const user = data?.data;
  console.log(user);

  const handleRidirect = () => {
    if (user?.user_role === "admin" || user?.user_role === "super_admin") {
      router.push("/admin/dashboard");
    } else {
      router.push("/user/dashboard");
    }
  };
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <Container>
        <div className="flex items-center justify-between h-16 gap-3">
          {/* LEFT: Logo */}
          <Link href="/" className="text-xl font-bold shrink-0">
            Eventora
          </Link>

          {/* CENTER: Desktop Menu */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium hover:text-primary">
              Home
            </Link>
            <Link
              href="/events"
              className="text-sm font-medium hover:text-primary"
            >
              Events
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium hover:text-primary"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium hover:text-primary"
            >
              Contact
            </Link>
          </nav>

          {/* RIGHT */}
          <div className="flex items-center gap-2 flex-1 justify-end">
            {/*  Search  */}
            <div className="relative w-full max-w-[180px] sm:max-w-[220px] md:max-w-[250px]">
              <Search className="absolute left-2 top-2.5 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search..." className="pl-8 h-9" />
            </div>

            {/* Desktop Auth */}
            <div className="hidden md:flex items-center gap-2">
              {user ? (
                <div className="flex items-center gap-2">
                  {/* {user?.} */}

                  <span
                    onClick={() => {
                      handleRidirect();
                    }}
                    className="text-sm font-medium cursor-pointer"
                  >
                    {user.name}
                  </span>
                </div>
              ) : (
                <>
                  <Link href="/auth/login" className="text-sm font-medium">
                    <Button variant="ghost">Login</Button>
                  </Link>
                  <Link href="/auth/register" className="text-sm font-medium">
                    <Button>Register</Button>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden shrink-0"
                >
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>

              <SheetContent
                side="right"
                className="w-[280px] sm:w-[320px] px-5 py-4"
              >
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>

                <div className="mt-6 flex flex-col gap-6">
                  {/* Links */}
                  <nav className="flex flex-col gap-4">
                    <Link href="/" className="text-sm font-medium">
                      Home
                    </Link>
                    <Link href="/events" className="text-sm font-medium">
                      Events
                    </Link>
                    <Link href="/about" className="text-sm font-medium">
                      About
                    </Link>
                    <Link href="/contact" className="text-sm font-medium">
                      Contact
                    </Link>
                  </nav>

                  {/* Auth */}
                  <div className="flex flex-col gap-3">
                    <Link href="/auth/login" className="text-sm font-medium">
                      <Button variant="outline" size="lg" className="w-full">
                        Login
                      </Button>
                    </Link>
                    <Link href="/auth/register" className="text-sm font-medium">
                      <Button size="lg" className="w-full">
                        Register
                      </Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Navbar;
