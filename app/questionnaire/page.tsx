"use client";

import Link from "next/link";

export default function QuestionnairePage() {
  return (
    <main className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">
        Questionnaire en cours de refonte
      </h1>
      <p className="mb-3">
        La version interactive du questionnaire sur cette page est en cours de
        développement. En attendant, vous pouvez utiliser le questionnaire
        principal déjà intégré sur le site.
      </p>
      <p>
        Revenez à la page d’accueil{" "}
        <Link href="/" className="text-blue-600 underline">
          en cliquant ici
        </Link>
        .
      </p>
    </main>
  );
}
