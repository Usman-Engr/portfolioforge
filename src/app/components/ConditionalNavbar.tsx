"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/ui/Navbar";

export default function ConditionalNavbar() {
  const pathname = usePathname();

  // Hide navbar on preview pages
  const hideNavbar =
    pathname?.includes("/preview") ||
    pathname?.includes("/templates/preview") ||
    (pathname?.includes("/portfolio/") && pathname?.includes("/preview"));

  if (hideNavbar) {
    return null;
  }

  return <Navbar />;
}

