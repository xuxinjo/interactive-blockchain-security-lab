import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { DisclaimerBanner } from "@/components/layout/DisclaimerBanner";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { ExploreNext } from "@/components/layout/ExploreNext";
import { AxeDevCheck } from "@/components/layout/AxeDevCheck";
import { RouteTransitionProvider } from "@/components/layout/RouteTransitionProvider";
import type { ReactNode } from "react";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter"
});

export const metadata: Metadata = {
  title: "Interactive Blockchain Security Lab",
  description: "Bachelor thesis web lab on blockchain security"
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <RouteTransitionProvider>
          <AxeDevCheck />
          <DisclaimerBanner />
          <SiteHeader />
          <main id="main-content" role="main" tabIndex={-1}>
            {children}
            <ExploreNext />
          </main>
          <SiteFooter />
        </RouteTransitionProvider>
      </body>
    </html>
  );
}
