"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/ui/Navbar";
import { ReactNode } from "react";

interface ConditionalNavbarWrapperProps {
  children: ReactNode;
}

/**
 * Wrapper that conditionally shows navbar and adds proper spacing
 */
export default function ConditionalNavbarWrapper({
  children,
}: ConditionalNavbarWrapperProps) {
  const pathname = usePathname();

  // Hide navbar on preview pages and builder
  const hideNavbar =
    pathname?.includes("/preview") ||
    pathname?.includes("/templates/preview") ||
    pathname?.includes("/builder") ||
    (pathname?.includes("/portfolio/") && pathname?.includes("/preview"));

  return (
    <>
      {!hideNavbar && <Navbar />}
      <div className={hideNavbar ? "" : "pt-20"}>
        {children}
      </div>
    </>
  );
}
