import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QueryProvider from "@/providers/queryProvider";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "Lumière Beauty – Premium Beauty & Wellness",
  description: "Discover premium skincare, haircare, fragrance, and wellness products curated for you.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className="min-h-screen flegx flex-col,">

        <QueryProvider>
          <Header />
          {children}
          </QueryProvider>

        <Toaster />
        
        <Footer />
      </body>
    </html>
  );
}
