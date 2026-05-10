// LIVRES
const livres = [
  {id: 1, titre: "Mathématiques pour l'ingénieur", auteur: "Yannick Privat",editeur: "Dunod", image: "Images/Math-ingé.webp"},
  {id: 2, titre: "Physique quantique", auteur: "Guy-Louis Gavet", editeur: "Eyrolles", image: "Images/Phy-quant.webp"},
  {id: 3, titre: "Introduction à l'algorithmique", auteur: "Thomas Cormen", editeur: "Dunod", image: "Images/Intro-algo.webp"},
  {id: 4, titre: "Biologie cellulaire (QCM)", auteur: "Mounaim Ghorbal", editeur: "Ellipses", image: "Images/Bio-cel.webp"},
  {id: 5, titre: "Chimie organique", auteur: "Pierre Laurent", editeur: "Dunod", image: "Images/Chi-org.webp"},
  {id: 6, titre: "Économie du développement", auteur: "Jacques Brasseul", editeur: "Armand Collin", image: "Images/Eco-dév.webp"},
  {id: 7, titre: "Statistiques et probabilités", auteur: "Jean-Pierre Lecoute", editeur: "Dunod", image: "Images/Stat-pro.webp"},
  {id: 8, titre: "Histoire de l'Afrique", auteur: "Joseph Mbemba", editeur: "Médiaspaul", image: "Images/Hist-afr.webp"},
  {id: 9, titre: "S'initier à Arduino", auteur: "Frédéric Sillon", editeur: "Dunod", image: "Images/Arduino.webp"},
  {id: 10, titre: "Droit constitutionnel", auteur: "Félix Vunduawe te Pemako", editeur: "Academia", image: "Images/DCC.webp"},
  {id: 11, titre: "Evolution Politique", auteur: "Paul Nsapu", editeur: "Academia", image: "Images/Evp.webp"},
  {id: 12, titre: "Gestion de projet (Guide)", auteur: "Robert Buttrick", editeur: "Pearson", image: "Images/Gest-pro.webp"},
];

function filtrerLivres(livres, recherche = "") {
  return livres.filter(livre => recherche === "" || livre.titre.includes(recherche));
}

// CATALOGUE
function creerCarteLivre(livre) {
  const carte = document.createElement("div");
  carte.className = "book-card";
  carte.innerHTML = `
    <div class="book-image">
      <img src="${livre.image}" alt="${livre.titre}" loading="lazy" width="200" height="300">
    </div>
    <div class="book-info">
      <h3>${livre.titre}</h3>
      <p>Par: ${livre.auteur}</p>
      <p>Éditeur: ${livre.editeur}</p>
      <a href="#reservation" class="btn btn-primary">Je le prends</a>
    </div>
  `;
  carte.addEventListener("click", () => {
    document.getElementById("livre-selectionne").textContent = livre.titre;
  });
  return carte;
}

function afficherCatalogue(livres) {
  const container = document.getElementById("books-container");
  container.innerHTML = livres.length ? "" : '<p class="text-center">Aucun livre ne correspond à votre recherche.</p>';

  livres.forEach(l => container.appendChild(creerCarteLivre(l)));
}

// GESTION DES ÉVÉNEMENTS
function initialiserEvenements() {
  const searchInput = document.getElementById("search-input");
  const searchButton = document.getElementById("search-button");
  const effectuerRecherche = () => {
    searchButton.style.transform = "scale(0.95)";
    setTimeout(() => {
      searchButton.style.transform = "";
    }, 200);

    const recherche = searchInput.value;
    livresFiltres = filtrerLivres(livres, recherche);
    afficherCatalogue(livresFiltres);
  };
  searchButton.addEventListener("click", effectuerRecherche);
  
  // Formulaire de réservation
  const reservationForm = document.getElementById("reservation-form");
  reservationForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const submitBtn = reservationForm.querySelector(".submit-btn");
  submitBtn.style.transform = "scale(0.95)";
  submitBtn.innerHTML = 'Traitement...';

  const nom = document.getElementById("nom").value;
  const email = document.getElementById("email").value;
  const livreTitre = document.getElementById("livre-selectionne").textContent;
  const pointRetrait = document.getElementById("retrait").value;
  const dateRetrait = document.getElementById("date").value;

  setTimeout(() => {
    submitBtn.style.transform = "";
    submitBtn.innerHTML = '<span class="btn-text">Réserver maintenant</span>';

    confirmerReservation(nom, email, pointRetrait, dateRetrait, livreTitre);
    reservationForm.reset();
  }, 2000);
});
}

function confirmerReservation(nom, email, pointRetrait, dateRetrait, livreTitre) {
  const nomsPoints = {
    "bibliotheque-upc": "Bibliothèque de l'Université UPC",
    "bureau-comite": "Bureau du comité d'étudiants",
  };

  const nomPoint = nomsPoints[pointRetrait] || pointRetrait;

  // Modal de confirmation
  const modal = document.createElement("div");
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
  `;

  const modalContent = document.createElement("div");
  modalContent.style.cssText = `
    background: white;
    padding: 32px;
    border-radius: var(--border-radius);
    max-width: 500px;
    margin: 16px;
    text-align: center;
  `;

  modalContent.innerHTML = `
    <h3 style="color: var(--dark-color); margin-bottom:	16px;">Réservation confirmée !</h3>
    <p style="margin-bottom:	16px; color: var(--gray-color);">Bonjour <strong>${nom}</strong>,<br>
      Votre réservation a été enregistrée avec succès.
    </p>
    <div style="background: var(--light-color); padding: 16px; border-radius: var(--border-radius-sm); margin-bottom: 16px; text-align: left;">
      <p><strong>Email :</strong> ${email}</p>
      <p><strong>Livre réservé :</strong> ${livreTitre}</p>
      <p><strong>Point de retrait :</strong> ${nomPoint}</p>
      <p><strong>Date de retrait :</strong> ${dateRetrait}</p>
    </div>
    <p style="font-size: 14px; color: var(--gray-color); margin-bottom: 24px;">
      N'oubliez pas d'apporter une pièce d'identité lors du retrait.
    </p>
    <button class="btn btn-primary" onclick="this.parentElement.parentElement.remove()">
      <span>Parfait !</span>
    </button>
  `;
  modal.appendChild(modalContent);
  document.body.appendChild(modal);
}

// INITIALISATION DE LA PAGE
document.addEventListener("DOMContentLoaded", () => {
  afficherCatalogue(livres);
  initialiserEvenements();
});