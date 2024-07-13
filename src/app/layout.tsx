import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google"; //Gruppo
import "@/resource/styles/globals.css";
import { cn } from "@/lib/utils";
import NextAuthProvider from "@/core/providers/Provider";
import { ThemeProvider } from "@/core/providers/theme-provider";
import { Toaster } from "sonner";
import { SocketProvider } from "@/core/providers/socket-provider";
import { SpeedInsights } from "@vercel/speed-insights/next";

const fontSans = FontSans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans",
  weight: ["400"],
});
export const metadata: Metadata = {
  manifest: "/manifest.json",
  title: "Fitness Evolution",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning={true} lang="en">
      <body
        suppressHydrationWarning={true}
        className={cn(
          "max-h-dvh bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <NextAuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <SocketProvider>{children}</SocketProvider>
            <Toaster richColors />
            <SpeedInsights />
          </ThemeProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
