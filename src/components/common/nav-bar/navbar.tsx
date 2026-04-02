"use client";

import { useGetMe, useLogout } from "@/api/auth/auth.api";
import { useSearchEvents } from "@/api/event/event.api";
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
import { useDebounce } from "@/hooks/use-debounce";
import { format } from "date-fns";
import { Loader2, Menu, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const Navbar = () => {
  const router = useRouter();
  const { data } = useGetMe();
  const { mutateAsync: logout } = useLogout();
  const user = data?.data;

  const [search, setSearch] = useState("");
  const [openSearch, setOpenSearch] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);

  const debouncedSearch = useDebounce(search, 400);

  const { data: searchData, isLoading: searchLoading } = useSearchEvents(
    debouncedSearch.trim(),
  );

  const results = searchData?.data || [];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setOpenSearch(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleRedirect = () => {
    if (user?.user_role === "admin" || user?.user_role === "super_admin") {
      router.push("/admin/dashboard");
    } else {
      router.push("/user/dashboard");
    }
  };

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  const handleSearchClick = (id: string) => {
    setOpenSearch(false);
    setSearch("");
    router.push(`/events/${id}`);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <Container>
        <div className="flex h-16 items-center justify-between gap-3">
          {/* LEFT: Logo */}
          <Link href="/" className="shrink-0 text-xl font-bold">
            Eventora
          </Link>

          {/* CENTER: Desktop Menu */}
          <nav className="hidden items-center gap-6 md:flex">
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
          <div className="flex flex-1 items-center justify-end gap-2">
            {/* Search */}
            <div
              ref={searchRef}
              className="relative w-full max-w-45 sm:max-w-55 md:max-w-72"
            >
              <Search className="text-muted-foreground absolute top-2.5 left-2 h-4 w-4" />
              <Input
                placeholder="Search events..."
                className="h-9 pl-8"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setOpenSearch(true);
                }}
                onFocus={() => {
                  if (search.trim()) setOpenSearch(true);
                }}
              />

              {/* Search Modal / Dropdown */}
              {openSearch && search.trim() && (
                <div className="absolute top-11 left-0 z-50 max-h-105 w-full overflow-y-auto rounded-xl border bg-background p-2 shadow-xl">
                  {searchLoading ? (
                    <div className="text-muted-foreground flex items-center justify-center gap-2 py-8 text-sm">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Searching...
                    </div>
                  ) : results.length > 0 ? (
                    <div className="space-y-2">
                      {results.map((item: any) => (
                        <button
                          key={item.id}
                          onClick={() => handleSearchClick(item.id)}
                          className="hover:bg-muted flex w-full items-center gap-3 rounded-lg p-2 text-left transition"
                        >
                          <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-md bg-muted">
                            <Image
                              src={item.event_image || "/placeholder.jpg"}
                              alt={item.event_title}
                              fill
                              className="object-cover"
                            />
                          </div>

                          <div className="min-w-0 flex-1">
                            <h4 className="line-clamp-1 text-sm font-semibold">
                              {item.event_title}
                            </h4>
                            <p className="text-muted-foreground mt-1 text-xs">
                              {format(new Date(item.event_date), "dd MMM yyyy")}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="text-muted-foreground py-8 text-center text-sm">
                      No events found
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Desktop Auth */}
            <div className="hidden items-center gap-2 md:flex">
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-2 transition hover:opacity-80">
                      <div className="bg-muted flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold">
                        {user.name?.charAt(0)}
                      </div>
                    </button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end" className="w-40">
                    <DropdownMenuItem onClick={handleRedirect}>
                      Dashboard
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={handleLogout}
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
                  className="shrink-0 md:hidden"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>

              <SheetContent
                side="right"
                className="w-70 px-5 py-4 sm:w-[320px]"
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
                      <div className="flex items-center gap-3">
                        <div className="bg-muted flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold">
                          {user.name?.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{user.name}</p>
                          <p className="text-muted-foreground text-xs">
                            {user.email}
                          </p>
                        </div>
                      </div>

                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={handleRedirect}
                      >
                        Dashboard
                      </Button>

                      <Button
                        variant="destructive"
                        className="w-full"
                        onClick={handleLogout}
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
