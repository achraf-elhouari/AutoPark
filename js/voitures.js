import { voituresInitiales } from "./data.js";
console.log(voituresInitiales)

const mainContent = document.querySelector("#contenu");
const formulaire = document.querySelector("#formulaire-voiture");
const voitureMarque = document.querySelector("#marque");
const voitureModele = document.querySelector("#modele");
const immatriculationVoiture = document.querySelector("#immatricualtion");
const categorieVoiture = document.querySelector("#categorie");
const statutVoiture = document.querySelector("#statut");
const prixParJour = document.querySelector("#prix-jour");
const saveBtn = document.querySelector("#bouton-enregistrer");
const annulerModification = document.querySelector("#annuler-modification");
const voitureListe = document.querySelector("#liste-voitures");
let index = voituresInitiales.length;

console.log(index);

function immaculatriceStyle(id){
  if (id < 0)
    return;
  else if (id < 10)
    return `AUTO-00${id}`;
  else if (id < 100)
    return `AUTO-0${id}`;
  else
    return `AUTO-${id}`;
}

function carCounter(){
    return index + 1;
}

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


function createCar(voiture){
    const carSection = createElement("tr");
    const marqueVoiture = createElement("td");
    const strongMarque = createElement("strong", "", voiture.marque);
    marqueVoiture.append(strongMarque);
    const modeleVoiture = createElement("td", "", voiture.modele);
    const immatricule = createElement("td");
    const spanImmatricule = createElement("span", "registration", "AUTO-"+carCounter());
    immatricule.append(spanImmatricule);
    const categorieDeVoiture = createElement("td", voiture.categorie);
    const prixVoiture = createElement("td", "price", voiture.prixJour + " ");
    const priceSpan = createElement("span", "", "DH / jour");
    prixVoiture.append(priceSpan);
    const statusDeVoiture = createElement("td");
    const statusSpan = createElement("span", "badge badge-disponible", voiture.statut);
    statusDeVoiture.append(statusSpan);
    const actions = createElement("td");
    const actionContainer = createElement("div", "row-actions");
    const modifierBtn = createElement("button", "button button-edit", "Modifier");
    modifierBtn.setAttribute("type", "button");
    modifierBtn.setAttribute("data-action", "modifier");
    modifierBtn.setAttribute("data-id", voiture.id);
    modifierBtn.setAttribute("aria-label", `Modifier Dacia Sandero, AUTO-001`);
    const supprimerBtn = createElement("button", "button button-delete", "Supprimer");
    supprimerBtn.setAttribute("type", "button");
    supprimerBtn.setAttribute("data-action", "supprimer");
    supprimerBtn.setAttribute("data-id", voiture.id);
    supprimerBtn.setAttribute("aria-label", "Supprimer Dacia Sandero, AUTO-001");
    actionContainer.append(modifierBtn, supprimerBtn);
    actions.append(actionContainer);
    carSection.append(marqueVoiture, modeleVoiture, immatricule, categorieDeVoiture, prixVoiture, statusDeVoiture, actions);
    return carSection;
}

function afficherVoiture(){
  voitureListe.replaceChildren(...voituresInitiales.map(createCar));
}

formulaire.addEventListener('submit', function (event){
  event.preventDefault();
  voituresInitiales.push({
    id: carCounter(),
    marque: voitureMarque.value.trim(),
    modele: voitureModele.value.trim(),
    immatriculation: immaculatriceStyle(carCounter()),
    categorie: categorieVoiture.value,
    prixJour: prixParJour.value.trim(),
    statut: statutVoiture.value
  })
  formulaire.reset()
  // formulaire.focus({
  //   preventScroll: true,fcc
  //   focusVisibility: true
  // });
  afficherVoiture()
})

console.log(immaculatriceStyle(carCounter()))