import type { Metadata } from "next";
import { Khmer } from "next/font/google";
import "./globals.css";

import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Appoint ",
  description: "Schedule Your meetings with professionals",

};
import {
  ClerkProvider,

} from '@clerk/nextjs'
import { Toaster } from "@/components/ui/toaster"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

      <link rel="icon" href="/icons/favicon.ico" sizes="any" />
      <ClerkProvider appearance={

        {
          layout: {
            logoImageUrl: '/images/logo-image.png',
            socialButtonsVariant: 'iconButton'
          },
          variables: {
            colorText: '#15171C',
            colorPrimary: '#0E78F9',
            colorBackground: '#EDF6FF',
            // colorInputBackground: '#EDF6FF',
            colorInputText: '#15171C'
            
          }
        }
      } >
        <body className={inter.className}>
          {children}
          <Toaster />

          </body>

      </ClerkProvider>
    </html>
  );
}
