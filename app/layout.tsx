import type { Metadata } from "next";
import localFont from "next/font/local"; 
import "./globals.css";
import LenisProvider from "./_components/LenisProvider";

const normalText = localFont({
  src: "../public/fonts/normal-text.woff2",
  variable: "--font-normal-text", 
  display: "swap",
});

const headingBold = localFont({
  src: "../public/fonts/heading-bold.woff2",
  variable: "--font-heading-bold", 
  display: "swap",
});

const headingXBold = localFont({
  src: "../public/fonts/heading-xbold.woff2",
  variable: "--font-heading-xbold",
  display: "swap",
});

export const metadata: Metadata = {
  title: "FlowFest 2025 - Friday 8th August, Manchester, UK",
  description: "Join us for FlowFest 2025 - the ultimate festival experience in Manchester",
  openGraph: {
    title: "FlowFest 2025 - Friday 8th August, Manchester, UK",
    description: "Join us for FlowFest 2025 - the ultimate festival experience in Manchester",
    images: [
      {
        url: "https://i.ibb.co/5WLTppNv/meta.png",
        width: 1200,
        height: 630,
        alt: "FlowFest 2025",
      },
    ],
    type: "website",
    locale: "en_GB",
    siteName: "FlowFest 2025",
  },
  twitter: {
    card: "summary_large_image",
    title: "FlowFest 2025 - Friday 8th August, Manchester, UK",
    description: "Join us for FlowFest 2025 - the ultimate festival experience in Manchester",
    images: ["https://i.ibb.co/5WLTppNv/meta.png"], 
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${normalText.variable} ${headingBold.variable} ${headingXBold.variable} antialiased`}
      >
         <LenisProvider>  
          {children}
         </LenisProvider>
        
      </body>
    </html>
  );
}