"use client";

import { usePathname } from "next/navigation";

import { StickyContactBar } from "@/components/layout/sticky-contact";

export function StickyContactShell(props: {
  whatsappPhone: string;
  phoneTel: string;
}) {
  const pathname = usePathname();
  if (pathname === "/") return null;
  return <StickyContactBar {...props} />;
}
