import type { Metadata } from "next";
import { Roboto_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import SideBarClient from "@/components/SideBarClient";

const robotoMono = Roboto_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="scrollbar-thumb-[#292929] scrollbar-track-slate-700/0"
    >
      <body className={`${robotoMono.className}`}>
        {/* <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider> */}
        {/* <div className="flex">
          <SideBarClient />
          <div className="mx-12 my-12 sm:ml-[200px]">{children}</div>
        </div> */}
        <div className="grid min-h-screen">
          {/* <SideBarClient /> */}
          {children}
        </div>
      </body>
    </html>
  );
}
