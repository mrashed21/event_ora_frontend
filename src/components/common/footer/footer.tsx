"use client";

import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          {/* Brand / Copyright */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold text-foreground">EventHub</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Discover, create, and join meaningful events with ease.
            </p>
          </div>

          {/* Footer Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-medium">
            <Link
              href="/about"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              About
            </Link>

            <Link
              href="/contact"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Contact
            </Link>

            <Link
              href="/privacy-policy"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Privacy Policy
            </Link>
          </div>
        </div>

        <div className="mt-8 border-t pt-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} EventHub. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
