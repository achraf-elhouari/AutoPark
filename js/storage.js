import { voituresInitiales } from "./data.js";

const CLE = "voitures";

export function chargerVoitures(){
  const texte = localStorage.getItem(CLE);

  if (!texte){
    return voituresInitiales.map(voiture => voiture);
  }
  return JSON.parse(texte);
}

export function sauvegarderVoitures(voitures){
  localStorage.setItem(CLE, JSON.stringify(voitures));
}