import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wynsley",
  description:
    "Wynsley runs your firm's website, Google profile, CRM, AI assistants, compliance checks and property-software connection as one, around one record.",
  icons: {
    icon: [{ url: "/assets/favicon-32.png", sizes: "32x32", type: "image/png" }],
    apple: "/assets/apple-touch-icon-180.png",
  },
};

// The design's fonts, loaded exactly as the Claude Design source loads them.
const FONTS =
  "https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&family=Instrument+Sans:wght@400;500;600;700&family=Newsreader:ital,opsz,wght@1,6..72,400;1,6..72,500&family=IBM+Plex+Mono:wght@400;500;600;700&display=swap";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link rel="stylesheet" href={FONTS} />
      </head>
      <body>{children}</body>
    </html>
  );
}
