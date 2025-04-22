import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Providers } from "@/contexts";
import { HubSelector, LanguageSwitcher, Nav } from "@/components";
import { cookies } from 'next/headers';

const geistSans = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kaya Nexus",
  description: "Plateforme de gestion de projets et de ressources",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Récupérer la langue depuis les cookies ou utiliser fr par défaut
  const cookieStore = await cookies();
  const locale = cookieStore.get('NEXT_LOCALE')?.value || 'fr';

  return (
    <html lang={locale}>
      <body className={geistSans.className}>
        <Providers>
          <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
            <div className="text-xl font-bold">Kaya Nexus</div>
            <Nav />
            <div className="flex items-center gap-4">
              <HubSelector />
              <LanguageSwitcher />
            </div>
          </nav>
          <main className="container mx-auto p-4">
            {children}
          </main>
          <footer className="bg-gray-800 text-white p-4 text-center mt-8">
            <p> 2025 Kaya Nexus - Tous droits réservés</p>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
