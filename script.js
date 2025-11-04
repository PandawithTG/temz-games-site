// Shared JS for Temz Games site
// loadPets(file) will fetch the JSON file and render the list
async function loadPets(file) {
  try {
    const res = await fetch(file);
    if (!res.ok) throw new Error('Failed to load data: ' + res.status);
    const pets = await res.json();
    renderPets(pets);

    const searchInput = document.getElementById('search');
    const categoryFilter = document.getElementById('categoryFilter');

    function filterPets() {
      const searchValue = (searchInput.value || '').toLowerCase();
      const categoryValue = categoryFilter ? categoryFilter.value : 'all';
      const filtered = pets.filter(pet => {
        const matchesName = pet.name.toLowerCase().includes(searchValue);
        const matchescategory = categoryValue === 'all' || pet.category === categoryValue;
        return matchesName && matchescategory;
      });
      renderPets(filtered);
    }

    if (searchInput) searchInput.addEventListener('input', filterPets);
    if (categoryFilter) categoryFilter.addEventListener('change', filterPets);

    const lastUpdated = document.getElementById('lastUpdated');
    if (lastUpdated) lastUpdated.textContent = new Date().toLocaleDateString('en-US');

  } catch (err) {
    console.error(err);
    const petList = document.getElementById('pet-list');
    if (petList) petList.innerHTML = '<p style="padding:12px">Could not load pet data.</p>';
  }
}

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
      <p>⭐ ${pet.category}</p>
      <p>💰 Value: ${pet.value}</p>
    `;
    petList.appendChild(div);
  });
}

