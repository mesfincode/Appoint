import type { Metadata } from "next";
import { Khmer } from "next/font/google";
import "./globals.css";

const inter = Khmer({ weight:"400",preload:false});

export const metadata: Metadata = {
  title: "Appoint ",
  description: "Schedule Your meetings with professionals",

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
            <link rel="icon" href="/icons/favicon.ico" sizes="any" />
      <body className={inter.className}>{children}</body>
    </html>
  );
}
