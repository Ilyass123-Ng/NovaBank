import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";
import AppShell from "./components/AppShell";

export const metadata: Metadata = {
  title: "NovaBank — Plateforme de Trésorerie Digitale & Banque Redux",
  description:
    "Application bancaire fintech moderne développée avec Next.js 16, Redux Toolkit et TypeScript par Ilyas Ennajy.",
  keywords: [
    "Ilyas Ennajy",
    "NovaBank",
    "Redux Toolkit",
    "Next.js 16",
    "Fintech Dashboard",
    "TypeScript",
    "Antigravity Design",
  ],
  authors: [{ name: "Ilyas Ennajy" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="light">
      <body>
        <Providers>
          <AppShell>{children}</AppShell>
        </Providers>
      </body>
    </html>
  );
}
