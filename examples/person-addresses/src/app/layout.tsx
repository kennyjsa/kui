import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/Navigation";
import { TrpcProvider } from "@/providers/TrpcProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "KUI Example - Person & Addresses",
  description: "Exemplo de uso do KUI Framework",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <TrpcProvider>
          <div className="min-h-screen flex flex-col">
            <header className="border-b bg-white shadow-sm">
              <div className="max-w-6xl mx-auto px-8 py-6">
                <h1 className="text-3xl font-bold">🧩 KUI Framework</h1>
                <p className="text-muted-foreground mt-1">
                  Framework de UI Declarativa para React
                </p>
              </div>
            </header>
            <Navigation />
            <div className="flex-1">{children}</div>
          </div>
        </TrpcProvider>
      </body>
    </html>
  );
}

