import Link from "next/link";

export default function HomePage() {
  return (
    <>
      {/* Hero : uniquement Bienvenue + image. Le bloc YD + questionnaire est en dessous, il faut scroller. */}
      <section className="hero">
        <div className="hero-headline">
          <h2 className="hero-bienvenue">Bienvenue</h2>
          <p className="hero-asso">
            sur le site de l’association
            <br />
            You Don’t Need To Pay For That
          </p>
        </div>
        <div className="hero-image-wrap">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/MAISONS%20YD.jpg"
            alt="YD – You Don't Have To"
            className="hero-image"
          />
        </div>
      </section>

      {/* Bloc en dessous : il faut faire défiler pour le voir */}
      <section className="accueil-suite">
        <div className="hero-content">
          <div className="hero-text">
            <h2 className="text-xl font-semibold text-slate-900">
              YD – You Don’t Have To
            </h2>
            <p className="hero-lead">
              Association d’accompagnement des personnes étrangères dans leurs
              démarches de séjour. Gratuit, bienveillant, sans jugement.
            </p>
            <p className="hero-sub">
              Ce site vous propose un{" "}
              <strong>assistant simple et anonyme</strong> pour préparer un
              rendez-vous : en quelques questions, vous voyez si vous relevez
              plutôt d’un <strong>titre de séjour de plein droit</strong> ou
              d’une{" "}
              <strong>admission exceptionnelle au séjour (AES)</strong>.
            </p>
            <Link
              href="/questionnaire"
              className="mt-2 inline-flex rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              Commencer le questionnaire
            </Link>
          </div>
          <div className="rounded-md border border-slate-200 bg-white p-3 text-sm">
            <h3 className="mb-2 font-semibold text-slate-900">
              Comment ça marche ?
            </h3>
            <ol className="list-inside list-decimal space-y-1 text-slate-700">
              <li>Vous répondez aux questions (aucune donnée n’est enregistrée).</li>
              <li>Vous voyez une synthèse indicative de votre situation.</li>
              <li>
                Si besoin, vous contactez l’association avec un récap de vos
                réponses.
              </li>
            </ol>
          </div>
        </div>
      </section>
    </>
  );
}
