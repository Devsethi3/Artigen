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
  title: "ArtiGen | AI-Powered Content Creation Assistant",
  description:
    "Revolutionize your content strategy with ArtiGen, the advanced AI content assistant. Create engaging blog posts, social media content, and chatbot responses in minutes. Boost your productivity and creativity with our intelligent, easy-to-use platform.",
  keywords:
    "AI content generator, content creation tool, artificial intelligence writing, automated content, SEO content, social media posts, blog writing assistant, chatbot content, ArtiGen",
  authors: [
    {
      name: "Dev Prasad Sethi",
      url: "https://artigen-nine.vercel.app",
    },
  ],
  viewport: "width=device-width, initial-scale=1.0",
  openGraph: {
    title: "ArtiGen | Transform Your Content Creation with AI",
    description:
      "Unlock the power of AI for your content needs. ArtiGen helps you create high-quality, engaging content for blogs, social media, and chatbots in a fraction of the time. Experience the future of content creation today.",
    images: [
      {
        url: "https://artigen-nine.vercel.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ArtiGen AI Content Assistant",
      },
    ],
    url: "https://artigen-nine.vercel.app/",
    type: "website",
    siteName: "ArtiGen",
  },
  robots: "index, follow",
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
