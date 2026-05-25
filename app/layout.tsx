import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Properties in Delhi NCR | PropTech NCR — A Helping Hand For A Happy Home",
    template: "%s | PropTech NCR",
  },
  description:
    "Find your dream property in Delhi NCR — Noida, Gurgaon, Greater Noida, Faridabad, Ghaziabad & Delhi. Residential, commercial, new launches and plots.",
  keywords: ["real estate", "property", "Delhi NCR", "Noida", "Gurgaon", "flats", "apartments", "plots"],
  openGraph: {
    siteName: "PropTech NCR",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&family=DM+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-white text-brand-dark">
        {children}
      </body>
    </html>
  );
}
