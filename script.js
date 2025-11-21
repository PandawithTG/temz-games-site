// Shared JS for Temz Games site
// loadPets(file) will fetch the JSON file and render the list

let CURRENT_PETS = []; // <- Globális tároló, hogy működjön a filter

async function loadPets(file) {
  try {
    const res = await fetch(file);
    if (!res.ok) throw new Error('Failed to load data: ' + res.status);

    const pets = await res.json();
    console.log(pets);

    CURRENT_PETS = pets; 
    renderPets(pets);

  } catch (err) {
    console.error(err);
    const petList = document.getElementById('pet-list');
    if (petList) petList.innerHTML =
      '<p style="padding:12px">Could not load pet data.</p>';
  }
}

// ------------------------------
// SZŰRÉS
// ------------------------------

const searchInput = document.getElementById('search');
const categoryFilter = document.getElementById('categoryFilter');

function filterPets() {
  const searchValue = (searchInput.value || '').toLowerCase();
  const categoryValue = categoryFilter ? categoryFilter.value : 'all';

  const filtered = CURRENT_PETS.filter(pet => {
    const matchesName = pet.name.toLowerCase().includes(searchValue);
    const matchesCategory =
      categoryValue === 'all' || pet.category === categoryValue;
    return matchesName && matchesCategory;
  });

  renderPets(filtered);
}

if (searchInput) searchInput.addEventListener('input', filterPets);
if (categoryFilter) categoryFilter.addEventListener('change', filterPets);

// ------------------------------
// LISTA RENDER
// ------------------------------

function renderPets(pets) {
  const petList = document.getElementById('pet-list');
  if (!petList) return;
  petList.innerHTML = '';

  pets.forEach(pet => {
    const div = document.createElement('div');
    div.className = 'pet-card';
    div.innerHTML = `
      <img src="${pet.image}" alt="${pet.name}">
      <h3>${pet.name}</h3>
      <p>⭐ ${pet.category} • ${pet.rarity || '—'}</p>
      <p>💰 Value: ${pet.value}</p>
    `;
    petList.appendChild(div);
  });
}
