const pathways = [
  { name: "Fool", logo: "fool.png" },
  { name: "Door", logo: "door.png" },
  { name: "Error", logo: "error.png" },
  { name: "Visionary", logo: "visionary.png" },
  { name: "Sun", logo: "sun.png" },
  { name: "Tyrant", logo: "tyrant.png" },
  { name: "White Tower", logo: "white_tower.png" },
  { name: "Hanged Man", logo: "hanged_man.png" },
  { name: "Red Priest", logo: "red_priest.png" },
  { name: "Demoness", logo: "demoness.png" },
  { name: "Hermit", logo: "hermit.png" },
  { name: "Paragon", logo: "paragon.png" },
  { name: "Wheel of Fortune", logo: "wheel_of_fortune.png" },
  { name: "Mother", logo: "mother.png" },
  { name: "Moon", logo: "moon.png" },
  { name: "Abyss", logo: "abyss.png" },
  { name: "Chained", logo: "chained.png" },
  { name: "Black Emperor", logo: "black_emperor.png" },
  { name: "Justiciar", logo: "justiciar.png" },
  { name: "Darkness", logo: "darkness.png" },
  { name: "Death", logo: "death.png" },
  { name: "Twilight Giant", logo: "twilight_giant.png" }
];
const grid = document.getElementById('pathwayGrid');
pathways.forEach((p) => {
  const card = document.createElement('div');
  card.className = 'card';
  card.onclick = () => window.location.href = `pathway.html?name=${encodeURIComponent(p.name)}`;
  card.innerHTML = `<img src="assets/logos/${p.logo}" alt="${p.name}"><div class="card-title">${p.name}</div>`;
  grid.appendChild(card);
});
