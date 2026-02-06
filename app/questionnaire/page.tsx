\"use client\";

import { useMemo, useState } from \"react\";
import Link from \"next/link\";

type Step = 1 | 2 | 3 | 4;

type Identite = {
  nom: string;
  prenom: string;
  age: string;
  ressortissantAlgerien: \"oui\" | \"non\" | \"\"; 
  dejaTs: \"oui\" | \"non\" | \"\"; 
};

type SituationKey =
  | \"enfantFrancais\"
  | \"conjointFrancais\"
  | \"pacsFrancais\"
  | \"parentEnfantRefugie\"
  | \"mnaAse\"
  | \"neEnFrance\"
  | \"aucuneSituation\";

type SituationReponses = {
  enfantFrancais: {
    aEnfantFrancais: \"oui\" | \"non\" | \"\";
  };
  conjointFrancais: {
    marie: \"oui\" | \"non\" | \"\";
    mariagePlus6Mois: \"oui\" | \"non\" | \"\";
    vieCommune: \"oui\" | \"non\" | \"\";
    visaLongSejour: \"oui\" | \"non\" | \"\";
    mariageTranscrit: \"oui\" | \"non\" | \"\";
  };
  pacsFrancais: {
    pacse: \"oui\" | \"non\" | \"\";
    pacsPlus1An: \"oui\" | \"non\" | \"\";
    anneeVieCommune: \"oui\" | \"non\" | \"\";
  };
  parentEnfantRefugie: {
    enfantRefugie: \"oui\" | \"non\" | \"\";
    enfantMineur: \"oui\" | \"non\" | \"\";
    entretienEducation: \"oui\" | \"non\" | \"\";
    resideEnFrance: \"oui\" | \"non\" | \"\";
  };
  mnaAse: {
    prisEnChargeAvant16: \"oui\" | \"non\" | \"\";
    age16a19: \"oui\" | \"non\" | \"\";
    aFormation: \"oui\" | \"non\" | \"\";
    liensFamillePaysOrigine: \"oui\" | \"non\" | \"\";
  };
  neEnFrance: {
    neEnFrance: \"oui\" | \"non\" | \"\";
    age16a21: \"oui\" | \"non\" | \"\";
    resid8AnsApres10: \"oui\" | \"non\" | \"\";
    scolarise5Ans: \"oui\" | \"non\" | \"\";
  };
  aucuneSituation: {
    coche: boolean;
  };
};

type AesReponses = {
  enfantResideHabituellement: \"oui\" | \"non\" | \"\";
  priseEnChargeDepuisNaissance: \"oui\" | \"non\" | \"\";
  vousDepuis2Ans: \"oui\" | \"non\" | \"\";
  etrangerMalade: \"oui\" | \"non\" | \"\";
  travail: \"oui\" | \"non\" | \"\";
  septAnsVieFrance: \"oui\" | \"non\" | \"\";
  etudiant: \"oui\" | \"non\" | \"\";
};

type ResultatProfil = {
  aProfilTsPleinDroit: boolean;
  aProfilAes: boolean;
};

const emptyIdentite: Identite = {
  nom: \"\",
  prenom: \"\",
  age: \"\",
  ressortissantAlgerien: \"\",
  dejaTs: \"\",
};

const emptySituations: SituationReponses = {
  enfantFrancais: { aEnfantFrancais: \"\" },
  conjointFrancais: {
    marie: \"\",
    mariagePlus6Mois: \"\",
    vieCommune: \"\",
    visaLongSejour: \"\",
    mariageTranscrit: \"\",
  },
  pacsFrancais: {
    pacse: \"\",
    pacsPlus1An: \"\",
    anneeVieCommune: \"\",
  },
  parentEnfantRefugie: {
    enfantRefugie: \"\",
    enfantMineur: \"\",
    entretienEducation: \"\",
    resideEnFrance: \"\",
  },
  mnaAse: {
    prisEnChargeAvant16: \"\",
    age16a19: \"\",
    aFormation: \"\",
    liensFamillePaysOrigine: \"\",
  },
  neEnFrance: {
    neEnFrance: \"\",
    age16a21: \"\",
    resid8AnsApres10: \"\",
    scolarise5Ans: \"\",
  },
  aucuneSituation: {
    coche: false,
  },
};

const emptyAes: AesReponses = {
  enfantResideHabituellement: \"\",
  priseEnChargeDepuisNaissance: \"\",
  vousDepuis2Ans: \"\",
  etrangerMalade: \"\",
  travail: \"\",
  septAnsVieFrance: \"\",
  etudiant: \"\",
};

function calculerProfil(
  situations: SituationReponses,
  aes: AesReponses
): ResultatProfil {
  let aTs = false;
  let aAes = false;

  if (situations.enfantFrancais.aEnfantFrancais === \"oui\") {
    aTs = true;
  }

  const conj = situations.conjointFrancais;
  if (conj.marie === \"oui\") {
    const toutesConditions =
      conj.mariagePlus6Mois === \"oui\" &&
      conj.vieCommune === \"oui\" &&
      conj.visaLongSejour === \"oui\" &&
      conj.mariageTranscrit === \"oui\";
    if (toutesConditions) {
      aTs = true;
    } else {
      aAes = true;
    }
  }

  const pacs = situations.pacsFrancais;
  if (pacs.pacse === \"oui\") {
    const okPacs =
      pacs.pacsPlus1An === \"oui\" && pacs.anneeVieCommune === \"oui\";
    if (okPacs) {
      aTs = true;
    } else {
      aAes = true;
    }
  }

  const pref = situations.parentEnfantRefugie;
  if (pref.enfantRefugie === \"oui\") {
    const okRefugie =
      pref.enfantMineur === \"oui\" &&
      pref.entretienEducation === \"oui\" &&
      pref.resideEnFrance === \"oui\";
    if (okRefugie) {
      aTs = true;
    } else {
      aAes = true;
    }
  }

  const mna = situations.mnaAse;
  if (mna.prisEnChargeAvant16 === \"oui\") {
    if (mna.age16a19 === \"oui\" && mna.aFormation === \"oui\") {
      aTs = true;
    } else {
      aAes = true;
    }
  }

  const ne = situations.neEnFrance;
  if (ne.neEnFrance === \"oui\") {
    const okNe =
      ne.age16a21 === \"oui\" &&
      ne.resid8AnsApres10 === \"oui\" &&
      ne.scolarise5Ans === \"oui\";
    if (okNe) {
      aTs = true;
    } else {
      aAes = true;
    }
  }

  if (situations.aucuneSituation.coche) {
    aAes = true;
  }

  if (
    aes.enfantResideHabituellement === \"oui\" ||
    aes.priseEnChargeDepuisNaissance === \"oui\" ||
    aes.vousDepuis2Ans === \"oui\" ||
    aes.etrangerMalade === \"oui\" ||
    aes.travail === \"oui\" ||
    aes.septAnsVieFrance === \"oui\" ||
    aes.etudiant === \"oui\"
  ) {
    aAes = true;
  }

  return { aProfilTsPleinDroit: aTs, aProfilAes: aAes };
}

function RadioOuiNon(props: {
  name: string;
  label: string;
  value: \"oui\" | \"non\" | \"\";
  onChange: (value: \"oui\" | \"non\") => void;
}) {
  return (
    <div className=\"space-y-1\">
      <p className=\"text-sm font-medium text-slate-800\">{props.label}</p>
      <div className=\"flex gap-4 text-sm\">
        <label className=\"inline-flex items-center gap-1\">
          <input
            type=\"radio\"
            name={props.name}
            value=\"oui\"
            checked={props.value === \"oui\"}
            onChange={() => props.onChange(\"oui\")}
            className=\"h-4 w-4 border-slate-300 text-indigo-600 focus:ring-indigo-500\"
          />
          <span>Oui</span>
        </label>
        <label className=\"inline-flex items-center gap-1\">
          <input
            type=\"radio\"
            name={props.name}
            value=\"non\"
            checked={props.value === \"non\"}
            onChange={() => props.onChange(\"non\")}
            className=\"h-4 w-4 border-slate-300 text-indigo-600 focus:ring-indigo-500\"
          />
          <span>Non</span>
        </label>
      </div>
    </div>
  );
}

function InfoBubble({ text }: { text: string }) {
  return (
    <span
      className=\"ml-1 inline-flex h-4 w-4 items-center justify-center rounded-full bg-slate-200 text-[10px] font-semibold text-slate-700\"
      title={text}
      aria-label={text}
    >
      i
    </span>
  );
}

export default function QuestionnairePage() {
  const [step, setStep] = useState<Step>(1);
  const [identite, setIdentite] = useState<Identite>(emptyIdentite);
  const [situations, setSituations] =
    useState<SituationReponses>(emptySituations);
  const [aes, setAes] = useState<AesReponses>(emptyAes);
  const [prefecture, setPrefecture] = useState<string>(\"\");

  const resultat = useMemo(
    () => calculerProfil(situations, aes),
    [situations, aes]
  );

  const canGoNextFromStep1 = identite.age.trim() !== \"\";
  const canGoNextFromStep2 = true;
  const canGoNextFromStep3 = true;

  const goNext = () => {
    if (step === 1 && canGoNextFromStep1) setStep(2);
    else if (step === 2 && canGoNextFromStep2) setStep(3);
    else if (step === 3 && canGoNextFromStep3) setStep(4);
  };

  const goPrev = () => {
    if (step > 1) setStep((s) => ((s - 1) as Step));
  };

  const progressLabel = (() => {
    switch (step) {
      case 1:
        return \"Étape 1/4 - Identité\";
      case 2:
        return \"Étape 2/4 - TS de plein droit\";
      case 3:
        return \"Étape 3/4 - Questionnaire AES\";
      case 4:
        return \"Étape 4/4 - Résultats & ressources\";
    }
  })();

  const progressPercent = step * 25;

  return (
    <div className=\"space-y-6\">
      <div className=\"flex items-center justify-between text-xs text-slate-600\">
        <div>
          <p className=\"font-medium text-slate-800\">Parcours de questions</p>
          <p>{progressLabel}</p>
        </div>
        <Link
          href=\"/\"
          className=\"text-xs font-medium text-indigo-700 hover:text-indigo-900\"
        >
          Retour à l&apos;accueil
        </Link>
      </div>

      <div className=\"h-2 w-full overflow-hidden rounded-full bg-slate-200\">
        <div
          className=\"h-full bg-indigo-600 transition-all\"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className=\"rounded-lg bg-white p-6 shadow-sm ring-1 ring-slate-200\">
        {step === 1 && (
          <section className=\"space-y-4\">
            <h2 className=\"text-lg font-semibold text-slate-900\">
              1. Identité
            </h2>
            <div className=\"grid gap-4 md:grid-cols-2\">
              <div className=\"space-y-1\">
                <label className=\"text-sm font-medium text-slate-800\">
                  Comment vous vous appelez ?
                </label>
                <input
                  type=\"text\"
                  autoComplete=\"off\"
                  className=\"w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500\"
                  value={identite.nom}
                  onChange={(e) =>
                    setIdentite((prev) => ({ ...prev, nom: e.target.value }))
                  }
                />
              </div>
              <div className=\"space-y-1\">
                <label className=\"text-sm font-medium text-slate-800\">
                  Prénom
                </label>
                <input
                  type=\"text\"
                  autoComplete=\"off\"
                  className=\"w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500\"
                  value={identite.prenom}
                  onChange={(e) =>
                    setIdentite((prev) => ({ ...prev, prenom: e.target.value }))
                  }
                />
              </div>
            </div>
            <div className=\"grid gap-4 md:grid-cols-3\">
              <div className=\"space-y-1\">
                <label className=\"text-sm font-medium text-slate-800\">
                  Quel est votre âge ?
                </label>
                <input
                  type=\"number\"
                  min={0}
                  max={120}
                  className=\"w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500\"
                  value={identite.age}
                  onChange={(e) =>
                    setIdentite((prev) => ({ ...prev, age: e.target.value }))
                  }
                />
              </div>
              <RadioOuiNon
                name=\"ressortissantAlgerien\"
                label=\"Êtes-vous ressortissant algérien ?\"
                value={identite.ressortissantAlgerien}
                onChange={(value) =>
                  setIdentite((prev) => ({
                    ...prev,
                    ressortissantAlgerien: value,
                  }))
                }
              />
              <RadioOuiNon
                name=\"dejaTs\"
                label=\"Avez-vous déjà eu un titre de séjour ?\"
                value={identite.dejaTs}
                onChange={(value) =>
                  setIdentite((prev) => ({
                    ...prev,
                    dejaTs: value,
                  }))
                }
              />
            </div>
          </section>
        )}

        {step === 2 && (
          <section className=\"space-y-4\">
            <h2 className=\"text-lg font-semibold text-slate-900\">
              2. TS de plein droit
            </h2>
            <p className=\"text-sm text-slate-700\">
              Cliquez sur les situations qui correspondent à votre cas et
              répondez aux questions.
            </p>
            <div className=\"grid gap-4 md:grid-cols-2\">
              <div className=\"space-y-2 rounded-md border border-slate-200 bg-slate-50 p-3\">
                <p className=\"text-sm font-semibold text-slate-900\">
                  A. Parent d&apos;enfant(s) français
                </p>
                <RadioOuiNon
                  name=\"enfantFrancais\"
                  label=\"Avez-vous un ou des enfants mineurs de nationalité française ?\"
                  value={situations.enfantFrancais.aEnfantFrancais}
                  onChange={(value) =>
                    setSituations((prev) => ({
                      ...prev,
                      enfantFrancais: { aEnfantFrancais: value },
                    }))
                  }
                />
              </div>

              <div className=\"space-y-2 rounded-md border border-slate-200 bg-slate-50 p-3\">
                <p className=\"text-sm font-semibold text-slate-900\">
                  C. Conjoint de Français
                </p>
                <RadioOuiNon
                  name=\"conjointMarie\"
                  label=\"Êtes-vous marié avec un ressortissant français ?\"
                  value={situations.conjointFrancais.marie}
                  onChange={(value) =>
                    setSituations((prev) => ({
                      ...prev,
                      conjointFrancais: { ...prev.conjointFrancais, marie: value },
                    }))
                  }
                />
                {situations.conjointFrancais.marie === \"oui\" && (
                  <div className=\"space-y-2\">
                    <RadioOuiNon
                      name=\"mariagePlus6Mois\"
                      label=\"Êtes-vous marié depuis plus de 6 mois ?\"
                      value={situations.conjointFrancais.mariagePlus6Mois}
                      onChange={(value) =>
                        setSituations((prev) => ({
                          ...prev,
                          conjointFrancais: {
                            ...prev.conjointFrancais,
                            mariagePlus6Mois: value,
                          },
                        }))
                      }
                    />
                    <RadioOuiNon
                      name=\"vieCommune\"
                      label=\"Vivez-vous avec votre conjoint ?\"
                      value={situations.conjointFrancais.vieCommune}
                      onChange={(value) =>
                        setSituations((prev) => ({
                          ...prev,
                          conjointFrancais: {
                            ...prev.conjointFrancais,
                            vieCommune: value,
                          },
                        }))
                      }
                    />
                    <RadioOuiNon
                      name=\"visaLongSejour\"
                      label=\"Êtes-vous entré en France avec un visa long séjour conjoint(e) de Français ?\"
                      value={situations.conjointFrancais.visaLongSejour}
                      onChange={(value) =>
                        setSituations((prev) => ({
                          ...prev,
                          conjointFrancais: {
                            ...prev.conjointFrancais,
                            visaLongSejour: value,
                          },
                        }))
                      }
                    />
                    <RadioOuiNon
                      name=\"mariageTranscrit\"
                      label=\"Si votre mariage a été fait à l&apos;étranger, est-il transcrit en France ?\"
                      value={situations.conjointFrancais.mariageTranscrit}
                      onChange={(value) =>
                        setSituations((prev) => ({
                          ...prev,
                          conjointFrancais: {
                            ...prev.conjointFrancais,
                            mariageTranscrit: value,
                          },
                        }))
                      }
                    />
                  </div>
                )}
              </div>

              <div className=\"space-y-2 rounded-md border border-slate-200 bg-slate-50 p-3\">
                <p className=\"text-sm font-semibold text-slate-900\">
                  D. PACS avec un Français
                </p>
                <RadioOuiNon
                  name=\"pacsFrancais\"
                  label=\"Êtes-vous pacsé avec un ressortissant français ?\"
                  value={situations.pacsFrancais.pacse}
                  onChange={(value) =>
                    setSituations((prev) => ({
                      ...prev,
                      pacsFrancais: { ...prev.pacsFrancais, pacse: value },
                    }))
                  }
                />
                {situations.pacsFrancais.pacse === \"oui\" && (
                  <div className=\"space-y-2\">
                    <RadioOuiNon
                      name=\"pacsPlus1An\"
                      label=\"Êtes-vous pacsé depuis plus d&apos;1 an ?\"
                      value={situations.pacsFrancais.pacsPlus1An}
                      onChange={(value) =>
                        setSituations((prev) => ({
                          ...prev,
                          pacsFrancais: {
                            ...prev.pacsFrancais,
                            pacsPlus1An: value,
                          },
                        }))
                      }
                    />
                    <RadioOuiNon
                      name=\"anneeVieCommune\"
                      label=\"Pouvez-vous justifier d&apos;1 année de vie commune ?\"
                      value={situations.pacsFrancais.anneeVieCommune}
                      onChange={(value) =>
                        setSituations((prev) => ({
                          ...prev,
                          pacsFrancais: {
                            ...prev.pacsFrancais,
                            anneeVieCommune: value,
                          },
                        }))
                      }
                    />
                  </div>
                )}
              </div>

              <div className=\"space-y-2 rounded-md border border-slate-200 bg-slate-50 p-3\">
                <p className=\"text-sm font-semibold text-slate-900\">
                  E. Parent d&apos;enfant réfugié
                </p>
                <RadioOuiNon
                  name=\"enfantRefugie\"
                  label=\"Avez-vous un enfant ayant le statut de réfugié ?\"
                  value={situations.parentEnfantRefugie.enfantRefugie}
                  onChange={(value) =>
                    setSituations((prev) => ({
                      ...prev,
                      parentEnfantRefugie: {
                        ...prev.parentEnfantRefugie,
                        enfantRefugie: value,
                      },
                    }))
                  }
                />
                {situations.parentEnfantRefugie.enfantRefugie === \"oui\" && (
                  <div className=\"space-y-2\">
                    <RadioOuiNon
                      name=\"enfantMineur\"
                      label=\"Est-ce que votre enfant est mineur ?\"
                      value={situations.parentEnfantRefugie.enfantMineur}
                      onChange={(value) =>
                        setSituations((prev) => ({
                          ...prev,
                          parentEnfantRefugie: {
                            ...prev.parentEnfantRefugie,
                            enfantMineur: value,
                          },
                        }))
                      }
                    />
                    <RadioOuiNon
                      name=\"entretienEducation\"
                      label=\"Contribuez-vous à l&apos;entretien et l&apos;éducation de votre enfant ?\"
                      value={situations.parentEnfantRefugie.entretienEducation}
                      onChange={(value) =>
                        setSituations((prev) => ({
                          ...prev,
                          parentEnfantRefugie: {
                            ...prev.parentEnfantRefugie,
                            entretienEducation: value,
                          },
                        }))
                      }
                    />
                    <RadioOuiNon
                      name=\"resideEnFrance\"
                      label=\"Résidez-vous en France ?\"
                      value={situations.parentEnfantRefugie.resideEnFrance}
                      onChange={(value) =>
                        setSituations((prev) => ({
                          ...prev,
                          parentEnfantRefugie: {
                            ...prev.parentEnfantRefugie,
                            resideEnFrance: value,
                          },
                        }))
                      }
                    />
                  </div>
                )}
              </div>

              <div className=\"space-y-2 rounded-md border border-slate-200 bg-slate-50 p-3\">
                <p className=\"text-sm font-semibold text-slate-900\">
                  F. MNA pris en charge par l&apos;ASE avant 16 ans
                </p>
                <RadioOuiNon
                  name=\"mnaAse\"
                  label=\"Avez-vous été pris en charge par l&apos;ASE avant vos 16 ans ?\"
                  value={situations.mnaAse.prisEnChargeAvant16}
                  onChange={(value) =>
                    setSituations((prev) => ({
                      ...prev,
                      mnaAse: {
                        ...prev.mnaAse,
                        prisEnChargeAvant16: value,
                      },
                    }))
                  }
                />
                {situations.mnaAse.prisEnChargeAvant16 === \"oui\" && (
                  <div className=\"space-y-2\">
                    <RadioOuiNon
                      name=\"age16a19\"
                      label=\"Avez-vous entre 16 et 19 ans ?\"
                      value={situations.mnaAse.age16a19}
                      onChange={(value) =>
                        setSituations((prev) => ({
                          ...prev,
                          mnaAse: {
                            ...prev.mnaAse,
                            age16a19: value,
                          },
                        }))
                      }
                    />
                    <RadioOuiNon
                      name=\"aFormation\"
                      label=\"Avez-vous une formation ?\"
                      value={situations.mnaAse.aFormation}
                      onChange={(value) =>
                        setSituations((prev) => ({
                          ...prev,
                          mnaAse: {
                            ...prev.mnaAse,
                            aFormation: value,
                          },
                        }))
                      }
                    />
                    <RadioOuiNon
                      name=\"liensFamille\"
                      label=\"Avez-vous des liens avec votre famille dans votre pays d&apos;origine ?\"
                      value={situations.mnaAse.liensFamillePaysOrigine}
                      onChange={(value) =>
                        setSituations((prev) => ({
                          ...prev,
                          mnaAse: {
                            ...prev.mnaAse,
                            liensFamillePaysOrigine: value,
                          },
                        }))
                      }
                    />
                  </div>
                )}
              </div>

              <div className=\"space-y-2 rounded-md border border-slate-200 bg-slate-50 p-3\">
                <p className=\"text-sm font-semibold text-slate-900\">
                  G. Étranger né en France
                </p>
                <RadioOuiNon
                  name=\"neEnFrance\"
                  label=\"Êtes-vous né en France ?\"
                  value={situations.neEnFrance.neEnFrance}
                  onChange={(value) =>
                    setSituations((prev) => ({
                      ...prev,
                      neEnFrance: { ...prev.neEnFrance, neEnFrance: value },
                    }))
                  }
                />
                {situations.neEnFrance.neEnFrance === \"oui\" && (
                  <div className=\"space-y-2\">
                    <RadioOuiNon
                      name=\"age16a21\"
                      label=\"Avez-vous entre 16 et 21 ans ?\"
                      value={situations.neEnFrance.age16a21}
                      onChange={(value) =>
                        setSituations((prev) => ({
                          ...prev,
                          neEnFrance: {
                            ...prev.neEnFrance,
                            age16a21: value,
                          },
                        }))
                      }
                    />
                    <RadioOuiNon
                      name=\"resid8AnsApres10\"
                      label=\"Avez-vous résidé habituellement en France pendant au moins 8 ans après vos 10 ans ?\"
                      value={situations.neEnFrance.resid8AnsApres10}
                      onChange={(value) =>
                        setSituations((prev) => ({
                          ...prev,
                          neEnFrance: {
                            ...prev.neEnFrance,
                            resid8AnsApres10: value,
                          },
                        }))
                      }
                    />
                    <RadioOuiNon
                      name=\"scolarise5Ans\"
                      label=\"Avez-vous été scolarisé en France pendant au moins 5 ans ?\"
                      value={situations.neEnFrance.scolarise5Ans}
                      onChange={(value) =>
                        setSituations((prev) => ({
                          ...prev,
                          neEnFrance: {
                            ...prev.neEnFrance,
                            scolarise5Ans: value,
                          },
                        }))
                      }
                    />
                  </div>
                )}
              </div>

              <div className=\"space-y-2 rounded-md border border-slate-200 bg-slate-50 p-3\">
                <p className=\"text-sm font-semibold text-slate-900\">
                  B. Aucune de ces situations
                </p>
                <label className=\"inline-flex items-center gap-2 text-sm text-slate-800\">
                  <input
                    type=\"checkbox\"
                    className=\"h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500\"
                    checked={situations.aucuneSituation.coche}
                    onChange={(e) =>
                      setSituations((prev) => ({
                        ...prev,
                        aucuneSituation: {
                          coche: e.target.checked,
                        },
                      }))
                    }
                  />
                  <span>Vous ne correspondez à aucune des situations ci-dessus.</span>
                </label>
              </div>
            </div>
          </section>
        )}

        {step === 3 && (
          <section className=\"space-y-4\">
            <h2 className=\"text-lg font-semibold text-slate-900\">
              3. Questionnaire AES
            </h2>
            <p className=\"text-sm text-slate-700\">
              Ces questions permettent d&apos;identifier un éventuel fondement
              d&apos;admission exceptionnelle au séjour (AES).
            </p>
            <div className=\"space-y-4\">
              <RadioOuiNon
                name=\"enfantResideHabituellement\"
                label={
                  <>
                    Votre enfant réside-t-il habituellement en France ?
                    <InfoBubble text=\"Résider habituellement signifie vivre de manière stable et principale en France, et non un simple séjour temporaire.\" />
                  </>
                    // @ts-expect-error: JSX in label type
                }
                value={aes.enfantResideHabituellement}
                onChange={(value) =>
                  setAes((prev) => ({
                    ...prev,
                    enfantResideHabituellement: value,
                  }))
                }
              />
              <RadioOuiNon
                name=\"priseEnChargeDepuisNaissance\"
                label={
                  <>
                    Assurez-vous la prise en charge de vos enfants depuis leur
                    naissance ?
                    <InfoBubble text=\"Il s'agit notamment de l'entretien matériel, de la présence et de la participation à l'éducation de l'enfant.\" />
                  </>
                    // @ts-expect-error: JSX in label type
                }
                value={aes.priseEnChargeDepuisNaissance}
                onChange={(value) =>
                  setAes((prev) => ({
                    ...prev,
                    priseEnChargeDepuisNaissance: value,
                  }))
                }
              />
              <RadioOuiNon
                name=\"vousDepuis2Ans\"
                label={
                  <>
                    Résidez-vous en France depuis au moins 2 ans ?
                    <InfoBubble text=\"Séjour continu ou avec de très courtes interruptions, avec centre de vie en France.\" />
                  </>
                    // @ts-expect-error: JSX in label type
                }
                value={aes.vousDepuis2Ans}
                onChange={(value) =>
                  setAes((prev) => ({
                    ...prev,
                    vousDepuis2Ans: value,
                  }))
                }
              />
            </div>
            <div className=\"mt-4 grid gap-4 md:grid-cols-2\">
              <RadioOuiNon
                name=\"etrangerMalade\"
                label=\"Êtes-vous étranger malade (suivi médical indispensable en France) ?\"
                value={aes.etrangerMalade}
                onChange={(value) =>
                  setAes((prev) => ({ ...prev, etrangerMalade: value }))
                }
              />
              <RadioOuiNon
                name=\"travail\"
                label=\"Travaillez-vous ou avez-vous un projet sérieux d'emploi en France ?\"
                value={aes.travail}
                onChange={(value) =>
                  setAes((prev) => ({ ...prev, travail: value }))
                }
              />
              <RadioOuiNon
                name=\"septAnsVieFrance\"
                label=\"Avez-vous au moins 7 ans de vie en France ?\"
                value={aes.septAnsVieFrance}
                onChange={(value) =>
                  setAes((prev) => ({
                    ...prev,
                    septAnsVieFrance: value,
                  }))
                }
              />
              <RadioOuiNon
                name=\"etudiant\"
                label=\"Êtes-vous actuellement étudiant en France ?\"
                value={aes.etudiant}
                onChange={(value) =>
                  setAes((prev) => ({ ...prev, etudiant: value }))
                }
              />
            </div>
          </section>
        )}

        {step === 4 && (
          <section className=\"space-y-4\">
            <h2 className=\"text-lg font-semibold text-slate-900\">
              4. Résultats & ressources
            </h2>
            <div className=\"space-y-3 rounded-md border border-slate-200 bg-slate-50 p-4 text-sm text-slate-800\">
              <p className=\"font-medium text-slate-900\">Synthèse rapide</p>
              {resultat.aProfilTsPleinDroit ? (
                <p>
                  D&apos;après vos réponses, vous semblez relever{" "}
                  <span className=\"font-semibold text-emerald-700\">
                    d&apos;au moins un cas de titre de séjour de plein droit
                  </span>
                  . Il est important de vérifier vos pièces avec un
                  accompagnement juridique.
                </p>
              ) : (
                <p>
                  Vous ne semblez pas relever clairement d&apos;un titre de
                  séjour de plein droit sur la base des informations fournies.
                </p>
              )}
              {resultat.aProfilAes && (
                <p>
                  Vos réponses indiquent également des éléments pouvant
                  soutenir une{" "}
                  <span className=\"font-semibold text-indigo-700\">
                    admission exceptionnelle au séjour (AES)
                  </span>{" "}
                  (par exemple : liens familiaux, durée de séjour, santé,
                  travail, scolarité...).
                </p>
              )}
              {!resultat.aProfilTsPleinDroit && !resultat.aProfilAes && (
                <p>
                  Sur la base de ces seules réponses, aucun fondement évident
                  n&apos;apparaît. Cela ne signifie pas qu&apos;aucun droit
                  n&apos;existe : rapprochez-vous de l&apos;association pour
                  une analyse plus détaillée.
                </p>
              )}
              <p className=\"text-xs text-slate-600\">
                Ce résultat est indicatif et ne remplace pas un examen
                personnalisé de votre dossier par un·e professionnel·le.
              </p>
            </div>

            <div className=\"space-y-3 rounded-md border border-slate-200 bg-white p-4 text-sm\">
              <label className=\"text-sm font-medium text-slate-800\">
                Précisez votre préfecture
              </label>
              <select
                className=\"mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500\"
                value={prefecture}
                onChange={(e) => setPrefecture(e.target.value)}
              >
                <option value=\"\">Sélectionnez une préfecture</option>
                <option value=\"paris\">Paris</option>
                <option value=\"seine-saint-denis\">Seine-Saint-Denis</option>
                <option value=\"hauts-de-seine\">Hauts-de-Seine</option>
                <option value=\"autre\">Autre préfecture</option>
              </select>

              {prefecture && (
                <div className=\"mt-3 space-y-2\">
                  <p className=\"font-medium text-slate-900\">
                    Modalités indicatives pour la préfecture sélectionnée
                  </p>
                  <p className=\"text-xs text-slate-600\">
                    Les informations ci-dessous sont génériques. L&apos;équipe
                    de l&apos;association pourra les adapter précisément pour
                    chaque préfecture (lien de prise de rendez-vous, liste de
                    pièces, formulaires, etc.).
                  </p>
                  {resultat.aProfilTsPleinDroit && (
                    <div className=\"rounded-md bg-emerald-50 p-3 text-xs text-emerald-900\">
                      <p className=\"font-semibold\">
                        Piste : titre de séjour de plein droit
                      </p>
                      <ul className=\"mt-1 list-disc space-y-1 pl-4\">
                        <li>
                          Rassembler toutes les pièces prouvant la situation
                          (actes d&apos;état civil, preuves de vie commune,
                          scolarité, décisions de l&apos;ASE, etc.).
                        </li>
                        <li>
                          Vérifier sur le site de la préfecture les modalités
                          de dépôt (en ligne, sur rendez-vous, par courrier).
                        </li>
                      </ul>
                    </div>
                  )}
                  {resultat.aProfilAes && (
                    <div className=\"rounded-md bg-indigo-50 p-3 text-xs text-indigo-900\">
                      <p className=\"font-semibold\">
                        Piste : admission exceptionnelle au séjour (AES)
                      </p>
                      <ul className=\"mt-1 list-disc space-y-1 pl-4\">
                        <li>
                          Préparer un récit précis de votre parcours en France
                          (durée, activités, vie familiale, santé, etc.).
                        </li>
                        <li>
                          Réunir les preuves : attestations, certificats
                          médicaux, contrats de travail, preuves de scolarité
                          des enfants, etc.
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          </section>
        )}

        <div className=\"mt-6 flex items-center justify-between\">
          <button
            type=\"button\"
            onClick={goPrev}
            disabled={step === 1}
            className=\"inline-flex items-center justify-center rounded-md border border-slate-300 px-3 py-2 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50\"
          >
            Précédent
          </button>
          <div className=\"text-xs text-slate-500\">
            Les réponses restent sur votre appareil et ne sont pas enregistrées.
          </div>
          {step < 4 ? (
            <button
              type=\"button\"
              onClick={goNext}
              disabled={step === 1 && !canGoNextFromStep1}
              className=\"inline-flex items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60\"
            >
              Continuer
            </button>
          ) : (
            <button
              type=\"button\"
              onClick={() => {
                setStep(1);
                setIdentite(emptyIdentite);
                setSituations(emptySituations);
                setAes(emptyAes);
                setPrefecture(\"\");
              }}
              className=\"inline-flex items-center justify-center rounded-md border border-indigo-600 px-4 py-2 text-xs font-medium text-indigo-700 shadow-sm hover:bg-indigo-50\"
            >
              Recommencer un nouveau parcours
            </button>
          )}
        </div>
      </div>
    </div>
  );
}


