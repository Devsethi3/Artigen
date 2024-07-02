import type { Metadata } from "next";
import { Merienda } from "next/font/google";
import "./globals.css";
import ToastProvider from "@/providers/ToastProvider";
import { SessionProvider } from "@/providers/SessionProvider";
import { ClerkProvider } from "@clerk/nextjs";
import NextTopLoader from "nextjs-toploader";

const font = Merienda({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ArtiGen | Smart AI Content Assistant",
  description:
    "ArtiGen is your AI-powered content generation assistant, helping you create engaging content effortlessly. Whether you need blog posts, social media content, or chatbot interactions, ArtiGen makes it easy and efficient.",
  keywords:
    "AI content generator, AI assistant, content creation, AI-powered, ArtiGen, blog posts, social media content, chatbot",
  authors: [
    {
      name: "Dev Prasad Sethi",
      url: "https://www.artigen.com",
    },
  ],
  viewport: "width=device-width, initial-scale=1.0",
  openGraph: {
    title: "ArtiGen | Smart AI Content Assistant",
    description:
      "Transform your content creation process with ArtiGen's AI-powered assistant. Create compelling content for blogs, social media, and more with ease.",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 600,
        alt: "ArtiGen Open Graph Image",
      },
    ],
    url: "https://artigen.vercel.com",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link rel="shortcut icon" href="/logo.png" type="image/x-icon" />
        </head>
        <body className={font.className}>
          <NextTopLoader
            color="#10B77F"
            crawlSpeed={200}
            height={4}
            crawl={true}
            easing="ease"
          />
          <ToastProvider />
          <SessionProvider>{children}</SessionProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
