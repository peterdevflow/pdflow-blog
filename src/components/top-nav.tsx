"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ModeToggle } from "@/components/mode-toggle";
import { LanguageSwitcher } from "@/components/language-switcher";

const NAV_LINKS = [
  { href: "/about", label: "Rólam" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Kapcsolat" },
];

const SOCIAL_LINKS = [
  { href: "https://github.com", icon: "/icons/github.png", label: "GitHub" },
  { href: "https://twitter.com", icon: "/icons/twitter.png", label: "Twitter" },
  {
    href: "https://linkedin.com",
    icon: "/icons/linkedin.png",
    label: "LinkedIn",
  },
];

export function TopNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full py-8 px-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-4 rounded-full min-h-20 text-sm font-semibold text-foreground transition hover:text-foreground/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <span
            className="flex items-center justify-center rounded-full border border-border bg-muted p-1 text-base uppercase text-muted-foreground"
            style={{ height: "40px", width: "40px" }}
          >
            HH
          </span>
          <span className="text-lg font-semibold tracking-wide">Blog name</span>
        </Link>

        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="gap-4">
            {NAV_LINKS.map((link) => (
              <NavigationMenuItem key={link.href}>
                <NavigationMenuLink asChild>
                  <Link
                    href={link.href}
                    className="inline-flex items-center rounded-full px-4 py-2 text-base font-semibold text-muted-foreground transition hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    {link.label}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="hidden md:flex items-center gap-4">
          <LanguageSwitcher />
          <ModeToggle />
          {SOCIAL_LINKS.map((social) => (
            <Link
              key={social.href}
              href={social.href}
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label={social.label}
            >
              <Image
                src={social.icon}
                alt={social.label}
                width={20}
                height={20}
                className="h-5 w-5 dark:invert"
              />
            </Link>
          ))}
        </div>

        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <button className="text-muted-foreground hover:text-foreground">
                <Menu className="h-6 w-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <div className="flex flex-col gap-6 p-6">
                <div className="flex flex-col gap-4">
                  {NAV_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-lg font-semibold text-foreground hover:text-muted-foreground transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
                <div className="border-t pt-6">
                  <div className="flex items-center gap-4">
                    <ModeToggle />
                    {SOCIAL_LINKS.map((social) => (
                      <Link
                        key={social.href}
                        href={social.href}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                        aria-label={social.label}
                        onClick={() => setIsOpen(false)}
                      >
                        <Image
                          src={social.icon}
                          alt={social.label}
                          width={20}
                          height={20}
                          className="h-5 w-5 dark:invert"
                        />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
