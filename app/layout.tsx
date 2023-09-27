import type { Metadata } from "next";
import { Inter } from "next/font/google";

import ChakraProvider from "@/provider/ChakraProvider";
import MainLayout from "@/components/layouts/MainLayout";
import ModalProvider from "@/provider/ModalProvider";
import ReactQueryProvider from "@/provider/ReactQueryProvider";
import AuthProvider from "@/provider/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SecuKey Vault",
  description:
    "SecuKey Vault is a highly secure and user-friendly web application designed to safeguard your most valuable digital secrets like passwords, secret phrase etc.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ChakraProvider>
            <ReactQueryProvider>
              <ModalProvider />
              <MainLayout>{children}</MainLayout>
            </ReactQueryProvider>
          </ChakraProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
