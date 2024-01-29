"use client";

import Link from "next/link";

import { Separator } from "@/components/ui/separator";
import { ThemeSwitcher } from "../theme-switcher/theme-switcher";
import { UserIcon } from "../user-icon/user-icon";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 min-h-screen w-20 bg-foreground rounded-r-2xl">
      <div className="absolute top-0 bg-accent w-full aspect-square rounded-r-2xl">
        <Link href="/">Index</Link>
      </div>
      <div className="absolute bottom-0 w-full flex flex-col items-center pb-6 gap-8">
        <ThemeSwitcher />
        <Separator />
        <UserIcon />
      </div>
    </nav>
  );
};
