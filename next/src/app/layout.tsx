import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import "./material-symbols.css";
import { AppStateProvider } from "@/contexts/App/appContext";
import GlobalLoading from "@/components/GlobalLoading";
import Script from "next/script";
import { SiteUrl, SiteName, SiteDescription } from "@/utils/utils";

const roboto = Roboto({
  weight: ["400", "500"],
  subsets: ["latin", "cyrillic"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  metadataBase: new URL(SiteUrl),
  title: SiteName,
  description: SiteDescription,
  openGraph: {
    title: SiteName,
    description: SiteDescription,
    url: process.env.NEXT_PUBLIC_SITE_URL || SiteUrl,
    siteName: SiteName,
    locale: "en-US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Script src="https://accounts.google.com/gsi/client"></Script>
      <body className={`h-dvh w-screen font-sans ${roboto.variable}`}>
        <AppStateProvider>
          <GlobalLoading />
          {children}
        </AppStateProvider>
      </body>
    </html>
  );
}
