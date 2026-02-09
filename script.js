// Helpers
function showSection(id) {
  document
    .querySelectorAll("main > section")
    .forEach((sec) => sec.classList.add("hidden"));
  const target = document.getElementById(id);
  if (target) target.classList.remove("hidden");
}

function getRadio(name) {
  const checked = document.querySelector(
    `input[name="${name}"]:checked`
  );
  return checked ? checked.value : "";
}

function anyYes(names) {
  return names.some((n) => getRadio(n) === "oui");
}

let lastProfil = { aTs: false, aAes: false };

// Navigation de base
document.getElementById("btn-demarrer").addEventListener("click", () => {
  showSection("section-step1");
});

// Nav barre tache (accueil + questionnaire / mentions / contact) : délégation pour les 2 barres
document.body.addEventListener("click", function (e) {
  var el = e.target.closest(".js-nav[data-section]");
  if (!el) return;
  var section = el.getAttribute("data-section");
  if (!section) return;
  showSection(section);
  if (section === "section-accueil") window.scrollTo({ top: 0, behavior: "smooth" });
  if (section === "section-step4") {
    var panel = document.getElementById("contact-panel");
    if (panel) panel.classList.remove("hidden");
  }
});

document
  .getElementById("btn-retour-accueil")
  .addEventListener("click", () => {
    showSection("section-accueil");
  });

// Bouton langue : hero + barres (mobile). Sync entre tous les switchers.
(function () {
  const langCodes = { fr: "FR", en: "EN", es: "ES", ru: "RU", ar: "AR" };

  function setLanguage(lang) {
    const code = langCodes[lang] || "FR";
    document.querySelectorAll(".lang-current").forEach(function (el) {
      el.textContent = code;
    });
    document.querySelectorAll(".hero-lang-option").forEach(function (opt) {
      opt.classList.toggle("active", opt.getAttribute("data-lang") === lang);
    });
    document.querySelectorAll(".lang-dropdown").forEach(function (d) {
      d.setAttribute("hidden", "");
    });
    document.querySelectorAll(".lang-btn").forEach(function (b) {
      b.setAttribute("aria-expanded", "false");
    });
  }

  document.body.addEventListener("click", function (e) {
    var opt = e.target.closest(".hero-lang-option");
    if (opt) {
      e.stopPropagation();
      setLanguage(opt.getAttribute("data-lang"));
      return;
    }
    var btn = e.target.closest(".lang-btn");
    if (btn) {
      e.stopPropagation();
      var wrap = btn.closest(".hero-lang-switch, .header-lang-switch");
      var dropdown = wrap ? wrap.querySelector(".lang-dropdown") : null;
      if (!dropdown) return;
      var isOpen = dropdown.getAttribute("hidden") == null;
      document.querySelectorAll(".lang-dropdown").forEach(function (d) {
        d.setAttribute("hidden", "");
      });
      document.querySelectorAll(".lang-btn").forEach(function (b) {
        b.setAttribute("aria-expanded", "false");
      });
      if (!isOpen) {
        dropdown.removeAttribute("hidden");
        btn.setAttribute("aria-expanded", "true");
        if (wrap && wrap.classList.contains("header-lang-switch")) {
          requestAnimationFrame(function () {
            dropdown.scrollIntoView({ block: "nearest", behavior: "smooth" });
          });
        }
      }
      return;
    }
    var inWrap = e.target.closest(".hero-lang-switch, .header-lang-switch");
    if (!inWrap) {
      document.querySelectorAll(".lang-dropdown").forEach(function (d) {
        d.setAttribute("hidden", "");
      });
      document.querySelectorAll(".lang-btn").forEach(function (b) {
        b.setAttribute("aria-expanded", "false");
      });
    }
  });
})();

// Infos pratiques : carte interactive des préfectures
(function () {
  var detail = document.getElementById("prefecture-detail");
  var detailName = document.getElementById("prefecture-detail-name");
  var panEl = document.getElementById("prefecture-pan");
  var numeriqueEl = document.getElementById("prefecture-numerique");
  var guichetEl = document.getElementById("prefecture-guichet");

  var modalitiesByDep = {
    "75": {
      pan: "Préfecture de police de Paris. Procédure d’accueil au séjour selon votre situation (titre de séjour, AES).",
      numerique: "Prise de rendez-vous en ligne sur le site de la préfecture de police. Dépôt de pièces selon les cas (téléprocédure ou envoi).",
      guichet: "Accueil sur rendez-vous. Se présenter avec le récépissé et les pièces demandées."
    },
    "69": {
      pan: "Préfecture du Rhône (Lyon). PAN selon votre situation.",
      numerique: "Rendez-vous et téléprocédures sur le site de la préfecture du Rhône.",
      guichet: "Préfecture de Lyon, accueil sur rendez-vous."
    },
    "13": {
      pan: "Préfecture des Bouches-du-Rhône (Marseille). Procédure d’accueil au séjour.",
      numerique: "Prise de rendez-vous en ligne, dépôt dématérialisé selon les démarches.",
      guichet: "Accueil sur rendez-vous à la préfecture ou en sous-préfectures."
    },
    "33": {
      pan: "Préfecture de la Gironde (Bordeaux). PAN et instructions selon votre dossier.",
      numerique: "Site de la préfecture : rendez-vous et téléprocédures.",
      guichet: "Accueil sur rendez-vous."
    },
    "31": {
      pan: "Préfecture de la Haute-Garonne (Toulouse). Procédure d’accueil au séjour.",
      numerique: "Rendez-vous et dépôt en ligne selon les cas.",
      guichet: "Préfecture de Toulouse, accueil sur rendez-vous."
    }
  };

  function getModalities(dep) {
    return modalitiesByDep[dep] || {
      pan: "Procédure d’accueil au séjour selon votre situation. Consultez le site de la préfecture ou appelez pour les modalités à jour.",
      numerique: "Rendez-vous et téléprocédures possibles selon les préfectures. Vérifier sur le site de la préfecture du département.",
      guichet: "Accueil généralement sur rendez-vous. Horaires et pièces à vérifier sur le site de la préfecture."
    };
  }

  document.body.addEventListener("click", function (e) {
    var btn = e.target.closest(".prefecture-btn");
    if (!btn || !detail) return;
    var dep = btn.getAttribute("data-dep");
    var name = btn.getAttribute("data-name");
    if (!dep || !name) return;
    var mod = getModalities(dep);
    detailName.textContent = name + " (" + dep + ")";
    panEl.textContent = mod.pan;
    numeriqueEl.textContent = mod.numerique;
    guichetEl.textContent = mod.guichet;
    detail.removeAttribute("hidden");
    detail.scrollIntoView({ block: "nearest", behavior: "smooth" });
  });
})();

// Étape 1 -> Étape 2 (vérifie juste que l'âge est rempli)
document.getElementById("to-step2").addEventListener("click", () => {
  const age = document.getElementById("age").value.trim();
  if (!age) {
    alert("Merci d’indiquer au moins votre âge pour continuer.");
    return;
  }
  showSection("section-step2");
});

// Affichage conditionnel des sous-blocs à l'étape 2
function toggleBloc(radioName, expected, blocId) {
  const radios = document.querySelectorAll(`input[name="${radioName}"]`);
  const bloc = document.getElementById(blocId);
  if (!bloc) return;
  radios.forEach((r) => {
    r.addEventListener("change", () => {
      bloc.classList.toggle("hidden", r.value !== expected || !r.checked);
    });
  });
}

toggleBloc("conjMarie", "oui", "bloc-conjoint-details");
toggleBloc("pacs", "oui", "bloc-pacs-details");
toggleBloc("enfantRef", "oui", "bloc-ref-details");
toggleBloc("ase16", "oui", "bloc-mna-details");
toggleBloc("neFr", "oui", "bloc-ne-details");

// Boutons "Précédent" génériques
document.querySelectorAll("button[data-back]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const step = btn.getAttribute("data-back");
    if (step === "1") showSection("section-step1");
    if (step === "2") showSection("section-step2");
    if (step === "3") showSection("section-step3");
  });
});

// Étape 2 -> Étape 3
document.getElementById("to-step3").addEventListener("click", () => {
  showSection("section-step3");
});

// Étape 3 -> Étape 4 : calcul du profil
document.getElementById("to-step4").addEventListener("click", () => {
  const resultatDiv = document.getElementById("resultat");
  resultatDiv.innerHTML = "";

  // Profil TS plein droit
  let aTs = false;
  let aAes = false;

  // A. Enfant français
  if (getRadio("enfantFr") === "oui") {
    aTs = true;
  }

  // C. Conjoint de Français
  if (getRadio("conjMarie") === "oui") {
    const toutesConditions =
      getRadio("mariage6") === "oui" &&
      getRadio("vieCommune") === "oui" &&
      getRadio("visa") === "oui" &&
      getRadio("transcrit") === "oui";
    if (toutesConditions) {
      aTs = true;
    } else {
      aAes = true;
    }
  }

  // D. PACS
  if (getRadio("pacs") === "oui") {
    const okPacs =
      getRadio("pacs1an") === "oui" && getRadio("vie1an") === "oui";
    if (okPacs) {
      aTs = true;
    } else {
      aAes = true;
    }
  }

  // E. Parent d’enfant réfugié
  if (getRadio("enfantRef") === "oui") {
    const okRef =
      getRadio("refMineur") === "oui" &&
      getRadio("refEntretien") === "oui" &&
      getRadio("refFrance") === "oui";
    if (okRef) {
      aTs = true;
    } else {
      aAes = true;
    }
  }

  // F. MNA
  if (getRadio("ase16") === "oui") {
    const okMna =
      getRadio("age16_19") === "oui" &&
      getRadio("formation") === "oui";
    if (okMna) {
      aTs = true;
    } else {
      aAes = true;
    }
  }

  // G. Né en France
  if (getRadio("neFr") === "oui") {
    const okNe =
      getRadio("age16_21") === "oui" &&
      getRadio("res8") === "oui" &&
      getRadio("sco5") === "oui";
    if (okNe) {
      aTs = true;
    } else {
      aAes = true;
    }
  }

  // B. Aucune situation => AES
  if (document.getElementById("aucune").checked) {
    aAes = true;
  }

  // AES : autres critères
  if (
    anyYes([
      "aesEnfantRes",
      "aesPriseNaissance",
      "aes2ans",
      "aesMalade",
      "aesTravail",
      "aes7ans",
      "aesEtud",
    ])
  ) {
    aAes = true;
  }

  lastProfil = { aTs, aAes };

  // Affichage
  const lines = [];
  lines.push(
    "<p><strong>Synthèse indicative :</strong></p>"
  );

  if (aTs) {
    lines.push(
      '<p>Vous semblez relever <strong>d’au moins un cas possible de titre de séjour de plein droit</strong>. Il est important de vérifier vos documents avec un accompagnement juridique.</p>'
    );
  } else {
    lines.push(
      "<p>Vous ne semblez pas relever clairement d’un titre de séjour de plein droit sur la base de ces seules réponses.</p>"
    );
  }

  if (aAes) {
    lines.push(
      '<p>Vos réponses indiquent des éléments pouvant soutenir une <strong>admission exceptionnelle au séjour (AES)</strong> (liens familiaux, durée de présence, santé, travail, scolarité, etc.).</p>'
    );
  }

  if (!aTs && !aAes) {
    lines.push(
      "<p>Aucun fondement évident n’apparaît ici, mais cela ne veut pas dire qu’aucun droit n’existe. Rapprochez-vous de l’association pour une analyse plus détaillée.</p>"
    );
  }

  lines.push(
    '<p style="font-size:0.8rem;color:#64748b;">Ce résultat est indicatif et ne remplace pas un avis personnalisé.</p>'
  );

  resultatDiv.innerHTML = lines.join("");

  showSection("section-step4");
});

// Bouton "Prendre contact" : prépare un mail avec le questionnaire
document
  .getElementById("btn-contact-send")
  .addEventListener("click", () => {
    const nom = document.getElementById("nom").value || "";
    const prenom = document.getElementById("prenom").value || "";
    const age = document.getElementById("age").value || "";

    const lignes = [];
    lignes.push("Bonjour,");
    lignes.push("");
    lignes.push(
      "Je vous contacte après avoir rempli l'assistant titre de séjour."
    );
    lignes.push("");
    lignes.push("----- À RENSEIGNER PAR MOI (qui je suis) -----");
    lignes.push("Je m'appelle : ");
    lignes.push("Je souhaite vous parler de : ");
    lignes.push("");
    lignes.push("----- QUESTIONNAIRE REMPLI AUTOMATIQUEMENT -----");
    lignes.push("");
    lignes.push("Identité (indicative) :");
    lignes.push(`- Nom / Prénom : ${nom} ${prenom}`);
    lignes.push(`- Âge : ${age}`);
    lignes.push(`- Ressortissant algérien : ${getRadio("alg") || "non renseigné"}`);
    lignes.push(
      `- A déjà eu un titre de séjour : ${getRadio("ts") || "non renseigné"}`
    );
    lignes.push("");
    lignes.push("Situations déclarées :");
    lignes.push(
      `- Enfant(s) français : ${getRadio("enfantFr") || "non renseigné"}`
    );
    lignes.push(
      `- Conjoint de Français : ${getRadio("conjMarie") || "non renseigné"}`
    );
    lignes.push(`- PACS avec Français : ${getRadio("pacs") || "non renseigné"}`);
    lignes.push(
      `- Parent d'enfant réfugié : ${getRadio("enfantRef") || "non renseigné"}`
    );
    lignes.push(
      `- MNA / ASE avant 16 ans : ${getRadio("ase16") || "non renseigné"}`
    );
    lignes.push(`- Né(e) en France : ${getRadio("neFr") || "non renseigné"}`);
    lignes.push(
      `- Aucune des situations : ${
        document.getElementById("aucune").checked ? "oui" : "non"
      }`
    );
    lignes.push("");
    lignes.push("Éléments AES :");
    lignes.push(
      `- Enfant résidant habituellement en France : ${
        getRadio("aesEnfantRes") || "non renseigné"
      }`
    );
    lignes.push(
      `- Prise en charge depuis la naissance : ${
        getRadio("aesPriseNaissance") || "non renseigné"
      }`
    );
    lignes.push(
      `- Résidence en France depuis au moins 2 ans : ${
        getRadio("aes2ans") || "non renseigné"
      }`
    );
    lignes.push(
      `- Étranger malade : ${getRadio("aesMalade") || "non renseigné"}`
    );
    lignes.push(
      `- Travail / projet d'emploi : ${getRadio("aesTravail") || "non renseigné"}`
    );
    lignes.push(
      `- 7 ans de vie en France : ${getRadio("aes7ans") || "non renseigné"}`
    );
    lignes.push(
      `- Étudiant en France : ${getRadio("aesEtud") || "non renseigné"}`
    );
    lignes.push("");
    lignes.push("Synthèse de l'assistant (indicative) :");
    lignes.push(
      `- Profil titre de séjour de plein droit : ${
        lastProfil.aTs ? "oui (à vérifier)" : "non évident"
      }`
    );
    lignes.push(
      `- Profil admission exceptionnelle au séjour (AES) : ${
        lastProfil.aAes ? "oui (à étudier)" : "non évident"
      }`
    );
    lignes.push("");
    lignes.push(
      "Merci de me dire si je peux prendre rendez-vous pour un accompagnement."
    );

    const summaryEl = document.getElementById("contact-summary");
    if (summaryEl) {
      summaryEl.value = lignes.join("\n");
    }
    const panel = document.getElementById("contact-panel");
    if (panel) panel.classList.remove("hidden");
  });

// Préfecture : texte générique
document.getElementById("prefecture").addEventListener("change", (e) => {
  const value = e.target.value;
  const box = document.getElementById("pref-details");
  if (!value) {
    box.classList.add("hidden");
    box.innerHTML = "";
    return;
  }

  let titre = "";
  if (value === "paris") titre = "Préfecture de police de Paris";
  else if (value === "93") titre = "Préfecture de la Seine-Saint-Denis";
  else if (value === "92") titre = "Préfecture des Hauts-de-Seine";
  else titre = "Autre préfecture";

  box.innerHTML = `
    <p><strong>${titre}</strong></p>
    <p>Ces informations sont générales. L’association pourra adapter les consignes pour chaque préfecture (prise de rendez-vous, formulaires, pièces à fournir...).</p>
    <ul>
      <li>Vérifiez sur le site officiel de la préfecture les modalités de dépôt (en ligne, par courrier, sur rendez-vous).</li>
      <li>Rassemblez tous les justificatifs utiles : état civil, vie familiale, scolarité, travail, santé, décisions de l’ASE, etc.</li>
      <li>Gardez des copies de tous les documents que vous remettez.</li>
    </ul>
  `;
  box.classList.remove("hidden");
});

// Reset total
document.getElementById("btn-reset").addEventListener("click", () => {
  document
    .querySelectorAll("input[type=text], input[type=number]")
    .forEach((el) => (el.value = ""));
  document
    .querySelectorAll("input[type=radio]")
    .forEach((el) => (el.checked = false));
  document
    .querySelectorAll("input[type=checkbox]")
    .forEach((el) => (el.checked = false));
  document.getElementById("prefecture").value = "";
  document.getElementById("pref-details").classList.add("hidden");
  document.getElementById("pref-details").innerHTML = "";
  document.getElementById("resultat").innerHTML = "";

  // Re-cacher les blocs conditionnels
  ["bloc-conjoint-details", "bloc-pacs-details", "bloc-ref-details", "bloc-mna-details", "bloc-ne-details"].forEach(
    (id) => {
      const b = document.getElementById(id);
      if (b) b.classList.add("hidden");
    }
  );

  showSection("section-step1");
});


