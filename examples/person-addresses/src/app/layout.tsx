import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TrpcProvider } from "@/providers/TrpcProvider";
import { AppLayout } from "@/components/AppLayout";
import { ClientProviders } from "@/components/ClientProviders";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "KUI Framework - Examples & Documentation",
  description: "Framework de UI Declarativa para React - Exemplos e Documentação",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className="dark">
      <body className={inter.className}>
        <TrpcProvider>
          <ClientProviders>
            <AppLayout>{children}</AppLayout>
          </ClientProviders>
        </TrpcProvider>
      </body>
    </html>
  );
}

