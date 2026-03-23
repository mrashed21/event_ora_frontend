"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

const NotFound = () => {
  const router = useRouter();

  return (
    <section className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="text-center space-y-6">
        <h1 className="text-6xl font-bold text-primary">404</h1>

        <p className="text-lg font-medium">Page not found</p>

        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          The page you are looking for doesn’t exist or may have been moved.
        </p>

        <div className="flex items-center justify-center gap-3 pt-4">
          <Button variant="outline" onClick={() => router.back()}>
            Go Back
          </Button>

          <Link href="/">
            <Button>Go Home</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
