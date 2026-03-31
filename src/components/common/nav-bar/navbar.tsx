"use client";

import { useGetMe, useLogout } from "@/api/auth/auth.api";
import Container from "@/components/custom/container";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  const { mutateAsync: logout } = useLogout();
  const user = data?.data;

  // if (isLoading) {
  //   return (
  //     <div className="flex items-center justify-center h-screen">
  //       <p>Loading...</p>
  //     </div>
  //   );
  // }

  const handleRidirect = () => {
    if (user?.user_role === "admin" || user?.user_role === "super_admin") {
      router.push("/admin/dashboard");
    } else {
      router.push("/user/dashboard");
    }
  };

  const handle_logout = async () => {
    await logout();
    router.push("/");
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
            {/* Search */}
            <div className="relative w-full max-w-45 sm:max-w-55 md:max-w-62.5">
              <Search className="absolute left-2 top-2.5 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search..." className="pl-8 h-9" />
            </div>

            {/* Desktop Auth */}
            <div className="hidden md:flex items-center gap-2">
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-2 hover:opacity-80 transition">
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-semibold">
                        {user.name?.charAt(0)}
                      </div>
                    </button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end" className="w-40">
                    <DropdownMenuItem onClick={handleRidirect}>
                      Dashboard
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={handle_logout}
                      className="text-red-500"
                    >
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <Link href="/auth/login">
                    <Button variant="ghost">Login</Button>
                  </Link>
                  <Link href="/auth/register">
                    <Button>Register</Button>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Drawer */}
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
                className="w-70 sm:w-[320px] px-5 py-4"
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

                  {/* Mobile Auth */}
                  {user ? (
                    <div className="flex flex-col gap-3 border-t pt-4">
                      {/* User Info */}
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-sm font-semibold">
                          {user.name?.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{user.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {user.email}
                          </p>
                        </div>
                      </div>

                      {/* Actions */}
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={handleRidirect}
                      >
                        Dashboard
                      </Button>

                      <Button
                        variant="destructive"
                        className="w-full"
                        onClick={handle_logout}
                      >
                        Logout
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3">
                      <Link href="/auth/login">
                        <Button variant="outline" size="lg" className="w-full">
                          Login
                        </Button>
                      </Link>
                      <Link href="/auth/register">
                        <Button size="lg" className="w-full">
                          Register
                        </Button>
                      </Link>
                    </div>
                  )}
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
