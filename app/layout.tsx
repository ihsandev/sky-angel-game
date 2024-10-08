import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Sky Angel",
  description: "Make your life fun with Sky Angel Game",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <main className="flex items-center justify-center h-screen w-full mx-auto xl:my-auto">
          <div className="w-full bg-sky-200 h-full relative lg:max-w-5xl lg:max-h-[768px] overflow-hidden">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
