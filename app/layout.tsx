import type { ReactNode } from "react";
import "./globals.css";

export const metadata = {
  title: "Assistant titre de séjour - Association",
  description:
    "Parcours de questions anonyme pour identifier vos droits au séjour (TS plein droit, AES, etc.).",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body className="min-h-screen bg-white text-slate-900 antialiased">
        <div className="flex min-h-screen flex-col">
          <header className="mx-auto w-full max-w-4xl border-b border-slate-200 px-4 pb-4 pt-6">
            <h1 className="text-2xl font-semibold text-slate-900">
              Assistant titre de séjour
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Outil anonyme proposé par l&apos;association pour vous aider à
              comprendre vos droits. Aucune donnée n&apos;est enregistrée.
            </p>
          </header>
          <main className="min-h-0 flex-1 w-full overflow-x-visible">
            {children}
          </main>
          <footer className="mx-auto mt-8 w-full max-w-4xl border-t border-slate-200 px-4 pt-4 text-xs text-slate-500">
            <p>
              Cet outil ne remplace pas un conseil juridique personnalisé. Pour
              toute situation complexe, rapprochez-vous de l&apos;association.
            </p>
          </footer>
        </div>
      </body>
    </html>
  );
}


