import { ReactNode } from "react";

export default function PortfolioPreviewLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen w-full">
      {children}
    </div>
  );
}
