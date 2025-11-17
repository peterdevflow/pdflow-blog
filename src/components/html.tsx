"use client";

import { usePathname } from "next/navigation";

interface HtmlProps {
  children: React.ReactNode;
}

export function Html({ children }: HtmlProps) {
  const pathname = usePathname();
  const locale = pathname.startsWith("/hu") ? "hu" : "en";

  return (
    <html lang={locale} suppressHydrationWarning>
      {children}
    </html>
  );
}
