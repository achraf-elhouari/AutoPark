import { chargerVoitures, sauvegarderVoitures } from "./storage.js";
import { afficherVoitures } from "./affichage.js";

let voitures = chargerVoitures().map(voiture => voiture);

const formulaire = document.querySelector("#formulaire-voiture");
const inputMarque = document.querySelector("#marque");
const inputModele = document.querySelector("#modele");
const inputImmat = document.querySelector("#immatriculation");
const selectCategorie = document.querySelector("#categorie");
const selectStatut = document.querySelector("#statut");
const inputPrix = document.querySelector("#prix-jour");
const messageFormulaire = document.querySelector("#message-formulaire");
const filtreRecherche = document.querySelector("#recherche");
const filtreStatut = document.querySelector("#filtre-statut");
const filtreCategorie = document.querySelector("#filtre-categorie");
const triPrix = document.querySelector("#tri-prix");
const initBouton = document.querySelector("#reinitialiser-filtres");

const immatriculeRegex = /^[a-zA-Z]{4}-\d{3}$/;

function setError(selector, message){
  document.querySelector(selector).textContent = message;
}

function clearErrors(){
  const erreurs = document.querySelectorAll(".field-error");
  for (let i = 0; i < erreurs.length; i++){
    erreurs[i].textContent = "";
  }
}

function afficherListe(){
  const liste = obtenirListe();
  afficherVoitures(liste);
  document.querySelector("#texte-etat-vide").textContent = voitures.length === 0 ? "Le parc est vide. Ajoutez une voiture." : "Aucun resultat. Modifiez vos criteres.";
}

function mettreAJour(){
  sauvegarderVoitures(voitures);
  afficherListe();
}

function voitureId(){
  let max = 0;
  for (let i = 0; i < voitures.length; i++){
    if (max < voitures[i].id)
      max = voitures[i].id;
  }
  return max + 1;
}

function immatExisteDeja(immat){
  for (let i = 0; i < voitures.length; i++){
    if (voitures[i].immatriculation === immat){
        if (inputId != 0 && inputId.value == voitures[i].id)
          return true;
      return false;
    }
  }
  return true;
}

formulaire.addEventListener('submit', function (event){
  event.preventDefault();
  clearErrors();
  messageFormulaire.textContent = "";

  const marque = inputMarque.value.trim();
  const modele = inputModele.value.trim();
  const immat = inputImmat.value.trim().toUpperCase();
  const categorie = selectCategorie.value;
  const statut = selectStatut.value;
  const prix = Number(inputPrix.value.trim());
  const voitureNeuf = {
    id: voitureId(),
    marque: marque,
    modele: modele,
    immatriculation: immat,
    categorie: categorie,
    prixJour: prix,
    statut: statut
  }
  let valideInput = true;

  if (marque === ""){
    setError("#erreur-marque", "Ce champ est obligatoire.");
    valideInput = false;
  }
  if (modele === ""){
    setError("#erreur-modele", "Ce champ est obligatoire.");
    valideInput = false;
  }
  if (immat === ""){
    setError("#erreur-immatriculation", "Ce champ est obligatoire.");
    valideInput = false;
  }
  else if (!immatriculeRegex.test(immat)){
    setError("#erreur-immatriculation", "Format invalid. Ex: AUTO-007.");
    valideInput = false;
  }
  else if (!immatExisteDeja(immat)){
    setError("#erreur-immatriculation", "Immatriculation existe Deja.");
    valideInput = false;
  }
  if (categorie === ""){
    setError("#erreur-categorie", "Ce champ est obligatoire.");
    valideInput = false;
  }
  if (prix <= 0){
    setError("#erreur-prix-jour", "Ce champ doit etre strictement positive.");
    valideInput = false;
  }

  if (!valideInput)
    return;
  if (inputId.value == 0)
    voitures.push(voitureNeuf);
  else {
    const voiture = voitures.find(element => element.id == inputId.value);
    voiture.marque = marque;
    voiture.modele = modele;
    voiture.immatriculation = immat;
    voiture.categorie = categorie;
    voiture.prixJour = prix;
    voiture.statut = statut;
    messageFormulaire.textContent = "Voiture modifiée avec succès.";
  }
  mettreAJour();

  formulaire.reset();
  inputId.value = "";
  boutonEnregistrer.textContent = "Ajouter la voiture";
  boutonAnnuler.hidden = true;
  clearErrors();
  inputMarque.focus();
})

const tbody = document.querySelector("#liste-voitures");
const inputId = document.querySelector("#voiture-id");
const boutonEnregistrer = document.querySelector("#bouton-enregistrer");
const boutonAnnuler = document.querySelector("#annuler-modification");

function remplirFormulaire(voiture){
  inputId.value = voiture.id;
  inputMarque.value = voiture.marque;
  inputModele.value = voiture.modele;
  inputImmat.value = voiture.immatriculation;
  selectCategorie.value = voiture.categorie;
  inputPrix.value = voiture.prixJour;
  selectStatut.value = voiture.statut;
  boutonEnregistrer.textContent = "Enregistrer les modifications";
  boutonAnnuler.hidden = false;
}

boutonAnnuler.addEventListener("click", function (){
  formulaire.reset();
  inputId.value = "";
  boutonEnregistrer.textContent = "Ajouter la voiture";
  boutonAnnuler.hidden = true;
  clearErrors();
});

function supprimerVoiture(id){
  const voiture = voitures.find(element => element.id == id);

  if (!confirm("Supprimer " + voiture.marque + " " + voiture.modele + " ?")){
    return;
  }
  voitures = voitures.filter(element => element.id != id);

  if (inputId.value == id){
    formulaire.reset();
    inputId.value = "";
    clearErrors();
  }
  mettreAJour();
}

tbody.addEventListener("click", function (event){
  const bouton = event.target.closest("[data-action]");
  if (!bouton){
    return;
  }

  const id = bouton.dataset.id;
  if (bouton.dataset.action === "supprimer"){
    supprimerVoiture(id);
  }
  else {
    remplirFormulaire(voitures.find(element => element.id == id));
  }
});

function obtenirListe(){
  const recherche = filtreRecherche.value.trim().toLowerCase();
  const statut = filtreStatut.value;
  const categorie = filtreCategorie.value;
  const tri = triPrix.value;

  const resultat = voitures.filter(function (voiture){
    const texte = (voiture.marque + " " + voiture.modele + " " + voiture.immatriculation).toLowerCase();
    const rechercheValid = texte.includes(recherche);
    const statutValid = voiture.statut === statut || statut === "";
    const CategorieValid = voiture.categorie === categorie || categorie === "";
    return rechercheValid && statutValid && CategorieValid;
  });

  if (tri === "croissant"){
    resultat.sort(function(a, b){
      return a.prixJour - b.prixJour
    });
  }
  if (tri === "decroissant"){
    resultat.sort(function(a, b){
      return b.prixJour - a.prixJour
    });
  }
  return resultat;
}

initBouton.addEventListener("click", function (){
  filtreRecherche.value = "";
  filtreStatut.value = "";
  filtreCategorie.value = "";
  triPrix.value = "";
  afficherListe();
});

filtreRecherche.addEventListener("input", afficherListe);
filtreStatut.addEventListener("change", afficherListe);
filtreCategorie.addEventListener("change", afficherListe);
triPrix.addEventListener("change", afficherListe);

console.log(voitures);
afficherListe();