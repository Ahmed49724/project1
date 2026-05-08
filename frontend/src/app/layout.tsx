import type { Metadata } from "next";
import "./globals.css";
import "./main.css";
import "./verb-lab.css";
import { AppProvider } from "@/context/AppContext";
import { AppNav } from "@/components/Navigation/AppNav";
import { ToolsOverlay } from "@/components/Tools/ToolsOverlay";

export const metadata: Metadata = {
  title: "Jamea Platform — Interactive Arabic Learning",
  description: "Homeschooling platform for Arabic learning",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        <script src="https://cdn.jsdelivr.net/npm/phaser@3.90.0/dist/phaser.min.js" async></script>
        <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2" async></script>
      </head>
      <body>
        <AppProvider>
          <AppNav />
          <ToolsOverlay />
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
