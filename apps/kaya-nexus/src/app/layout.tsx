import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Providers } from "@/contexts";
import { HubSelector, LanguageSwitcher, Nav, Logo, UserMenu, Sidebar } from "@/components";
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
      <body className={geistSans.className + " bg-gradient-to-br from-gray-950 to-indigo-950 min-h-screen"}>
        <Providers>
          <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col">
              <header className="flex justify-between items-center px-6 py-4 bg-gray-900/80 shadow-lg">
                <div className="flex items-center space-x-4">
                  <Logo />
                  <div className="relative hidden md:block">
                    <input
                      type="text"
                      placeholder="Rechercher..."
                      className="rounded-md px-3 py-1 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <HubSelector />
                  <LanguageSwitcher />
                  <UserMenu />
                </div>
              </header>
              <main className="flex-1 p-6 md:p-10">
                {children}
              </main>
              <footer className="text-center text-xs text-gray-500 py-4 bg-gray-900/60">
                2025 Kaya Nexus — Tous droits réservés
              </footer>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
