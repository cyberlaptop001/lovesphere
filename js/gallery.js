const usersPerPage = 12;
let currentPage = 1;
let users = [];
let filteredUsers = [];

// Load and initialize
window.onload = () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") document.body.classList.add("dark-mode");

  users = JSON.parse(localStorage.getItem("galleryUsers")) || [];
  if (users.length === 0) {
    generateUsers(100);
    users = JSON.parse(localStorage.getItem("galleryUsers"));
  }
  filteredUsers = [...users];
  renderUsers();
  setupEvents();
};

function generateUsers(count) {
  const categories = ["College Girl", "Bhabhi", "Aunty"];
  const subCategories = ["Model", "Celebrity", "News Anchor", "Bollywood Model"];
  const descriptions = [
    "Happy endings, Role Play, Custom makeups, Hot dresses, full moanings",
    "Blowjob, Hairjob, All positions, Kamasutra Positions, Full satisfaction",
    "69 style, shower romance, tight experience, fantasy moves, kissing passion",
    "Late night passion, body worship, full girlfriend vibe, wild experiments",
    "GFE, dance shows, strip tease, foreplay master, creamy touch, full romance"
  ];
  const locations = [
    "Charbagh", "Aliganj", "Gomtinagar", "Chinhat", "Naka", "Alambagh", "Para", "Ashiyana",
    "Indiranagar", "Mahanagar", "Kaisharbagh", "BBD City", "Lucknow University", "Matiyari"
  ];

  const names = ["Priya", "Sonam", "Riya", "Moni", "Simran", "Kavya", "Pooja", "Megha", "Isha", "Tanya"];
  const generated = [];

  for (let i = 0; i < count; i++) {
    generated.push({
      id: i + 1,
      name: names[i % names.length],
      age: 18 + (i % 15),
      height: 150 + (i % 30),
      location: locations[i % locations.length],
      description: descriptions[i % descriptions.length],
      category: categories[i % categories.length],
      subCategory: subCategories[i % subCategories.length],
      image: `images/user${(i % 10) + 1}.jpg`,
      topRated: i % 5 === 0,
      verified: true,
      online: i % 2 === 0,
      rank: i + 1,
      mobileNumbers: [
        { number: `82996705${String(i).padStart(2, '0')}`, type: "call" },
        { number: `82996705${String(i).padStart(2, '0')}`, type: "chat" }
      ]
    });
  }

  localStorage.setItem("galleryUsers", JSON.stringify(generated));
}

function renderUsers() {
  const container = document.getElementById("userCards");
  const startIndex = (currentPage - 1) * usersPerPage;
  const pagedUsers = filteredUsers.slice(startIndex, startIndex + usersPerPage);
  document.getElementById("resultCount").textContent = `Total Results: ${filteredUsers.length}`;
  document.getElementById("pageNumber").textContent = `Page ${currentPage}`;
  container.innerHTML = "";

  pagedUsers.forEach(user => {
    const card = document.createElement("div");
    card.className = "user-card";
    card.innerHTML = `
      <div class="status-indicator ${user.online ? 'online' : 'offline'}"></div>
      <div class="user-card-layout">
        <div class="user-image-container">
          <img src="${user.image}" alt="${user.name}" class="user-img">
        </div>
        <div class="user-info">
          ${user.topRated ? '<p class="badge top-rated">Top Rated</p>' : ''}
          ${user.verified ? '<span class="verified-badge">✔ Verified</span>' : ''}
          <p><strong>Name:</strong> ${user.name}</p>
          <p><strong>Age:</strong> ${user.age} | <strong>Height:</strong> ${user.height} cm</p>
          <p><strong>Category:</strong> ${user.category}</p>
          <p><strong>Sub-Category:</strong> ${user.subCategory}</p>
          <p><strong>Location:</strong> ${user.location}</p>
          <p><strong>Description:</strong> ${user.description}</p>
          <p><strong>Rank:</strong> ${user.rank}</p>
          <div class="card-buttons">
            <a href="tel:${user.mobileNumbers[0].number}" class="btn call-btn">📞 Call Me</a>
            <a href="https://wa.me/${user.mobileNumbers[1].number}" target="_blank" class="btn chat-btn">💬 Chat Me</a>
            <button class="btn fav-btn" data-name="${user.name}">❤️ Like</button>
          </div>
        </div>
      </div>
    `;
    card.querySelector(".fav-btn").addEventListener("click", () => showMessage(`Liked ${user.name}`));
    container.appendChild(card);
  });
}

function showMessage(text) {
  const popup = document.getElementById("messagePopup");
  document.getElementById("popupText").innerText = text;
  popup.classList.remove("hidden");
  setTimeout(() => popup.classList.add("hidden"), 2000);
}

function applyFilters() {
  const name = document.getElementById("searchInput").value.toLowerCase();
  const location = document.getElementById("filterLocation").value.toLowerCase();
  const minAge = parseInt(document.getElementById("minAge").value) || 0;
  const maxAge = parseInt(document.getElementById("maxAge").value) || 100;

  filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(name) &&
    u.location.toLowerCase().includes(location) &&
    u.age >= minAge && u.age <= maxAge
  );
  currentPage = 1;
  renderUsers();
}

function clearFilters() {
  document.getElementById("searchInput").value = "";
  document.getElementById("filterLocation").value = "";
  document.getElementById("minAge").value = "";
  document.getElementById("maxAge").value = "";
  filteredUsers = [...users];
  currentPage = 1;
  renderUsers();
}

function changePage(page) {
  const maxPage = Math.ceil(filteredUsers.length / usersPerPage);
  if (page < 1 || page > maxPage) return;
  currentPage = page;
  renderUsers();
}

function toggleTheme() {
  document.body.classList.toggle("dark-mode");
  document.body.classList.toggle("light-mode");
  const isDark = document.body.classList.contains("dark-mode");
  localStorage.setItem("theme", isDark ? "dark" : "light");
}

function setupEvents() {
  document.getElementById("filterBtn").onclick = applyFilters;
  document.getElementById("clearFilterBtn").onclick = clearFilters;
  document.getElementById("themeToggle").onclick = toggleTheme;
  document.getElementById("prevPage").onclick = () => changePage(currentPage - 1);
  document.getElementById("nextPage").onclick = () => changePage(currentPage + 1);
  document.getElementById("backToTop").onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
}
