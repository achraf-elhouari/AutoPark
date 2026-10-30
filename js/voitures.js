import { voituresInitiales } from "./data.js";
console.log(voituresInitiales)

const mainContent = document.querySelector("#contenu");
const formulaire = document.querySelector("#formulaire-voiture");
const voitureMarque = document.querySelector("#marque");
const voitureModele = document.querySelector("#modele");
const immatriculationVoiture = document.querySelector("#immatriculation");
const categorieVoiture = document.querySelector("#categorie");
const statutVoiture = document.querySelector("#statut");
const prixParJour = document.querySelector("#prix-jour");
const saveBtn = document.querySelector("#bouton-enregistrer");
const annulerModification = document.querySelector("#annuler-modification");
const voitureListe = document.querySelector("#liste-voitures");
const voitureId = document.querySelector("#voiture-id");

let voitures = [...voituresInitiales];

const index = () => {
return Math.max(0, ...voitures.map(v => v.id)) + 1;
};

const immatriculeRegex = /^[a-zA-Z]{4}-\d{3}$/;

console.log(index);

function createElement(balise, className, contenu){
    const element = document.createElement(balise);
    if (className)
        element.className = className;
    if (contenu)
        element.textContent = contenu;
    return element;
}

const header = createElement("p", "text-[red]", "Achraf");
mainContent.append(header)

// {
//     "id": 1,
//     "marque": "Dacia",
//     "modele": "Sandero",
//     "immatriculation": "AUTO-001",
//     "categorie": "Citadine",
//     "prixJour": 250,
//     "statut": "Disponible"
//   }


/* <tr>
    <td><strong>Dacia</strong></td>
    <td>Sandero</td>
    <td><span class="registration">AUTO-001</span></td>
    <td>Citadine</td>
    <td class="price">250 <span>DH / jour</span></td>
    <td><span class="badge badge-disponible">Disponible</span></td>
    <td>
    <div class="row-actions">
    <button
        type="button"
        class="button button-edit"
        data-action="modifier"
        data-id="1"
        aria-label="Modifier Dacia Sandero, AUTO-001"
        >
          Modifier
        </button>
        <button
          type="button"
          class="button button-delete"
          data-action="supprimer"
          data-id="1"
          aria-label="Supprimer Dacia Sandero, AUTO-001"
        >
          Supprimer
        </button>
      </div>
    </td>
</tr> */

function isDisponible(status){
  switch (status){
    case "Disponible":
      return "badge-disponible";
    case "Louée":
      return "badge-louee";
    case "En maintenance":
      return "badge-maintenance";
    default:
      return "";
  }
}

function createCar(voiture){
    const carSection = createElement("tr");
    const marqueVoiture = createElement("td");
    const strongMarque = createElement("strong", "", voiture.marque);
    marqueVoiture.append(strongMarque);
    const modeleVoiture = createElement("td", "", voiture.modele);
    const immatricule = createElement("td");
    const spanImmatricule = createElement("span", "registration", voiture.immatriculation);
    immatricule.append(spanImmatricule);
    const categorieDeVoiture = createElement("td", "", voiture.categorie);
    const prixVoiture = createElement("td", "price", voiture.prixJour + " ");
    const priceSpan = createElement("span", "", "DH / jour");
    prixVoiture.append(priceSpan);
    const statusDeVoiture = createElement("td");
    const statusSpan = createElement("span", `badge ${isDisponible(voiture.statut)}`, voiture.statut);
    statusDeVoiture.append(statusSpan);
    const actions = createElement("td");
    const actionContainer = createElement("div", "row-actions");
    const modifierBtn = createElement("button", "button button-edit", "Modifier");
    modifierBtn.setAttribute("type", "button");
    modifierBtn.setAttribute("data-action", "modifier");
    modifierBtn.setAttribute("data-id", voiture.id);
    modifierBtn.setAttribute("aria-label", `Modifier ${voiture.marque} ${voiture.modele}, ${voiture.immatriculation}`);
    const supprimerBtn = createElement("button", "button button-delete", "Supprimer");
    supprimerBtn.setAttribute("type", "button");
    supprimerBtn.setAttribute("data-action", "supprimer");
    supprimerBtn.setAttribute("data-id", voiture.id);
    supprimerBtn.setAttribute("aria-label", `Supprimer ${voiture.marque} ${voiture.modele}, ${voiture.immatriculation}`);
    actionContainer.append(modifierBtn, supprimerBtn);
    actions.append(actionContainer);
    carSection.append(marqueVoiture, modeleVoiture, immatricule, categorieDeVoiture, prixVoiture, statusDeVoiture, actions);
    return carSection;
}

function afficherVoiture(){
  voitureListe.replaceChildren(...voitures.map(createCar));
}

function supprimerVoiture(id){
  const voiture = voitures.find(v => v.id === id);
  if (!confirm("Supprimer " + voiture.marque + " " + voiture.modele + " ?"))
    return;
  voitures = voitures.filter(v => v.id !== id);
  afficherVoiture();
}

function modifierVoiture(id){
  const voiture = voitures.find(v => v.id === id);
  voitureId.value = voiture.id;
  voitureMarque.value = voiture.marque;
  voitureModele.value = voiture.modele;
  immatriculationVoiture.value = voiture.immatriculation;
  categorieVoiture.value = voiture.categorie;
  prixParJour.value = voiture.prixJour;
  statutVoiture.value = voiture.statut;
  saveBtn.textContent = "Enregistrer les modifications";
  annulerModification.hidden = false;
}

function annuler(){
  formulaire.reset();
  voitureId.value = "";
  saveBtn.textContent = "Ajouter la voiture";
  annulerModification.hidden = true;
}

annulerModification.addEventListener("click", annuler);

voitureListe.addEventListener("click", function (event){
  const bouton = event.target.closest("[data-action]");
  if (!bouton)
    return;
  const id = Number(bouton.dataset.id);
  if (bouton.dataset.action === "supprimer")
    supprimerVoiture(id);
  else
    modifierVoiture(id);
});

formulaire.addEventListener('submit', function (event){
  event.preventDefault();
  if (!voitureMarque.value.trim() || !voitureModele.value.trim() || !categorieVoiture.value || !prixParJour.value.trim() || !statutVoiture.value){
      console.log("Empty Fields");
      return;
  }

  const immatriculeMaj = immatriculationVoiture.value.trim().toUpperCase();
  if (!immatriculeRegex.test(immatriculeMaj)) {
    console.log("Wrong regex input");
    return;
  }

  for (let i = 0; i < voitures.length; i++){
    if (voitures[i].immatriculation == immatriculeMaj && voitures[i].id != voitureId.value){
      console.log("already exists");
      return;
    }
  }

  if (Number(prixParJour.value) <= 0){
    console.log("Positive numbers only");
    return;
  }

  if (voitureId.value){
    const voiture = voitures.find(v => v.id === Number(voitureId.value));
    voiture.marque = voitureMarque.value.trim();
    voiture.modele = voitureModele.value.trim();
    voiture.immatriculation = immatriculeMaj;
    voiture.categorie = categorieVoiture.value;
    voiture.prixJour = Number(prixParJour.value);
    voiture.statut = statutVoiture.value;
  } else {
    voitures.push({
      id: index(),
      marque: voitureMarque.value.trim(),
      modele: voitureModele.value.trim(),
      immatriculation: immatriculeMaj,
      categorie: categorieVoiture.value,
      prixJour: Number(prixParJour.value),
      statut: statutVoiture.value
    });
  }

  annuler();
  voitureMarque.focus({ preventScroll: true });
  afficherVoiture();
})

afficherVoiture();