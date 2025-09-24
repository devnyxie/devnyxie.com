import type { Metadata } from "next";
import { Roboto, Roboto_Mono } from "next/font/google";
import "./assets/globals.css";
import { ThemeProvider } from "next-themes";
import { Navbar } from "../components/layout/navbar";
import Footer from "@/components/layout/footer";
import { ServerStatus } from "@/components/layout/server-status";
import { getPageData } from "@/lib/api/pages";
import { IndexPageType } from "@/lib/types/pages";
import { APP_CONFIG } from "@/lib/app.config";

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
  metadataBase: new URL(APP_CONFIG.domain),
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
          <div className="relative w-full flex-grow px-3 md:px-0 py-16 sm:py-20 lg:py-24 flex justify-center overflow-x-hidden">
            {children}
          </div>
          <Footer />
          <ServerStatus />
        </ThemeProvider>
      </body>
    </html>
  );
}
