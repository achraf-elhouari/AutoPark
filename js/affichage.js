function creerTableData(texte){
  const td = document.createElement("td");
  td.textContent = texte;
  return td;
}

function creerBouton(texte, action, id, classe){
  const bouton = document.createElement("button");
  bouton.type = "button";
  bouton.className = classe;
  bouton.textContent = texte;
  bouton.dataset.action = action;
  bouton.dataset.id = id;
  return bouton;
}

function classeStatut(statut){
  if (statut === "Disponible")
    return "badge-disponible";
  if (statut === "Louée")
    return "badge-louee";
  return "badge-maintenance";
}

function creerTableRow(voiture){
  const tr = document.createElement("tr");

  const tdStatut = document.createElement("td");
  const badge = document.createElement("span");
  badge.className = "badge " + classeStatut(voiture.statut);
  badge.textContent = voiture.statut;
  tdStatut.append(badge);
  
  const tdActions = document.createElement("td");
  tdActions.append(
    creerBouton("Modifier", "modifier", voiture.id, "button button-edit"),
    creerBouton("Supprimer", "supprimer", voiture.id, "button button-delete")
  );

  tr.append(
    creerTableData(voiture.marque),
    creerTableData(voiture.modele),
    creerTableData(voiture.immatriculation),
    creerTableData(voiture.categorie),
    creerTableData(voiture.prixJour + " DH / jour"),
    tdStatut,
    tdActions
  );
  return tr;
}

export function afficherVoitures(voiture){
  const tbody = document.querySelector("#liste-voitures");
  const etatVide = document.querySelector("#etat-vide")
  tbody.textContent = "";

  for (let i = 0; i < voiture.length; i++){
    tbody.append(creerTableRow(voiture[i]));
  }

  etatVide.hidden = voiture.length > 0;
  tbody.append(etatVide)
}