import "../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { getDictionary } from "./dictionaries";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Digital Solutions Platform",
  description: "Transform your business with our digital solutions",
};

export default async function RootLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  console.log({ langFromLayout: lang });
  const dict = await getDictionary(lang);
  return (
    <html lang={"lang"} suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar dictionary={dict} lang={lang} />
          <main className="pt-16">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
