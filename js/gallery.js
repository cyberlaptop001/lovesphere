// js/gallery.js

const usersPerPage = 20;
let currentPage = 1;
let users = [];
let filteredUsers = [];
let isDarkMode = true;

// Sample data pool
const names = ["Ritika", "Priya", "Roma", "Lovy", "Anamika", "Sonam", "Pooja", "Kajal", "Rani", "Simran"];
const subCategories = ["Model", "Celebrity", "News Anchor", "Bollywood Model"];
const descriptions = [
  "Hot, romantic, and full GFE experience with wild fantasies.",
  "Lingerie, roleplay, long hours, full night services.",
  "Desi fun, tight romance, soft touch and passionate moments.",
  "100% satisfaction, no rush service, sweet and naughty behavior."
];
const locations = [
  "Gomti Nagar", "Ashiyana", "Telebagh", "Para", "Aliganj", "Chinhat",
  "Indiranagar", "Mahanagar", "Kapoorthala", "Nishatganj", "Charbagh",
  "Naka", "Chauk", "Kaisarbagh", "Aishbagh", "PGI Road", "Patrakarpuram",
  "MunsiPuliya", "ThediPuliya", "BBD University city", "Lucknow University city", "Girls college"
];

function generateUsers() {
  users = [];
  for (let i = 1; i <= 100; i++) {
    const age = 18 + Math.floor(Math.random() * 23); // 18–40
    const category = age <= 19 ? "College Girl" : age <= 30 ? "Bhabhi" : "Aunty";
    const name = names[i % names.length] + " " + (i + 1);
    const location = locations[i % locations.length];
    const subCategory = subCategories[i % subCategories.length];
    const description = descriptions[i % descriptions.length];
    const isTopRated = i % 10 === 0;
    const image = `images/user${i}.jpg`;

    users.push({
      name,
      age,
      location,
      category,
      subCategory,
      description,
      image,
      verified: true,
      topRated: isTopRated
    });
  }
  filteredUsers = [...users];
}

function renderUsers() {
  const container = document.getElementById("userCards");
  container.innerHTML = "";

  const start = (currentPage - 1) * usersPerPage;
  const end = start + usersPerPage;

  filteredUsers.slice(start, end).forEach(user => {
    const card = document.createElement("div");
    card.className = "user-card";

    card.innerHTML = `
      <div class="user-image-container">
        <img src="${user.image}" alt="${user.name}" class="user-img" />
      </div>
      <div class="user-info">
        ${user.topRated ? `<span class="badge top-rated">Top Rated</span>` : ""}
        ${user.verified ? `<span class="verified-badge">✔ Verified</span>` : ""}
        <p><strong>Name:</strong> ${user.name}</p>
        <p><strong>Age:</strong> ${user.age}</p>
        <p><strong>Location:</strong> ${user.location}, Lucknow</p>
        <p><strong>Category:</strong> ${user.category}</p>
        <p><strong>Sub-Category:</strong> ${user.subCategory}</p>
        <p><strong>Description:</strong> ${user.description}</p>
        <div class="card-buttons">
          <a href="tel:7619937539" class="neon-button">📞 Call</a>
          <a href="https://wa.me/917619937539" target="_blank" class="neon-button">💬 Chat</a>
          <button class="like-button neon-button">❤️ Like</button>
        </div>
      </div>
    `;

    card.querySelector(".like-button").addEventListener("click", () => {
      alert(`You liked ${user.name}!`);
    });

    container.appendChild(card);
  });

  document.getElementById("pageNumber").textContent = `Page ${currentPage}`;
}

function applyFilters() {
  const name = document.getElementById("searchName").value.toLowerCase();
  const location = document.getElementById("locationFilter").value.toLowerCase();
  const subCategory = document.getElementById("subCategoryFilter").value.toLowerCase();
  const minAge = parseInt(document.getElementById("minAge").value) || 18;
  const maxAge = parseInt(document.getElementById("maxAge").value) || 40;
  const sortBy = document.getElementById("sortBy").value;

  filteredUsers = users.filter(user => {
    return (
      user.name.toLowerCase().includes(name) &&
      user.location.toLowerCase().includes(location) &&
      user.subCategory.toLowerCase().includes(subCategory) &&
      user.age >= minAge &&
      user.age <= maxAge
    );
  });

  if (sortBy === "name") {
    filteredUsers.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === "age") {
    filteredUsers.sort((a, b) => a.age - b.age);
  }

  currentPage = 1;
  renderUsers();
}

function clearFilters() {
  document.getElementById("searchName").value = "";
  document.getElementById("locationFilter").value = "";
  document.getElementById("subCategoryFilter").value = "";
  document.getElementById("minAge").value = "";
  document.getElementById("maxAge").value = "";
  document.getElementById("sortBy").value = "";
  filteredUsers = [...users];
  currentPage = 1;
  renderUsers();
}

function changePage(dir) {
  const maxPage = Math.ceil(filteredUsers.length / usersPerPage);
  if (dir === -1 && currentPage > 1) currentPage--;
  if (dir === 1 && currentPage < maxPage) currentPage++;
  renderUsers();
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function toggleTheme() {
  isDarkMode = !isDarkMode;
  document.body.classList.toggle("dark-mode", isDarkMode);
  document.body.classList.toggle("light-mode", !isDarkMode);
  localStorage.setItem("theme", isDarkMode ? "dark" : "light");
}

// Event Listeners
window.onload = () => {
  generateUsers();
  renderUsers();

  document.getElementById("applyFilter").onclick = applyFilters;
  document.getElementById("clearFilter").onclick = clearFilters;
  document.getElementById("prevPage").onclick = () => changePage(-1);
  document.getElementById("nextPage").onclick = () => changePage(1);
  document.getElementById("backToTop").onclick = scrollToTop;
  document.getElementById("themeToggle").onclick = toggleTheme;

  const theme = localStorage.getItem("theme");
  if (theme === "light") toggleTheme();
};
