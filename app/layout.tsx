import type { Metadata } from "next";
import { Roboto, Roboto_Mono } from "next/font/google";
import "./assets/globals.css";
import { ThemeProvider } from "next-themes";
import { Navbar } from "../components/layout/navbar";
import Footer from "@/components/layout/footer";
import Content from "@/components/layout/content";
import { ServerStatus } from "@/components/layout/server-status";
import { getPageData } from "@/lib/api/pages";
import { IndexPageType } from "@/lib/types/pages";

const robotoSans = Roboto({
  variable: "--font-roboto-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const pageData: IndexPageType = getPageData("index");

export const metadata: Metadata = {
  title: pageData.title,
  description: pageData.description,
  openGraph: {
    title: pageData.title,
    description: pageData.description,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: pageData.title,
    description: pageData.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${robotoSans.variable} ${robotoMono.variable} font-sans antialiased min-h-screen flex flex-col justify-between items-center`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <Content>{children}</Content>
          <Footer />
          <ServerStatus />
        </ThemeProvider>
      </body>
    </html>
  );
}
