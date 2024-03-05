import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/assets/styles/global.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer";
import AuthProvider from "@/components/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Property Pulse",
  description: "Find the perfect rental property",
  keywords: "rentals, find properties, find rentals",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="en">
        <body className={inter.className}>
          <Navbar />
          <main className="min-h-[calc(100vh-144px)]">{children}</main>
          <Footer />
        </body>
      </html>
    </AuthProvider>
  );
}
