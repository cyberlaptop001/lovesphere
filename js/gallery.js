// gallery.js - Fully Updated with User Rendering, Filters, Theme, and Pagination

const usersPerPage = 12;
let currentPage = 1;
let users = [];
let filteredUsers = [];
let isDarkMode = false;

document.addEventListener("DOMContentLoaded", () => {
  users = JSON.parse(localStorage.getItem("galleryUsers")) || [];
  if (users.length === 0) {
    generateUsers(100);
    users = JSON.parse(localStorage.getItem("galleryUsers"));
  }

  filteredUsers = [...users];
  renderUsers();
  setupPagination();

  document.getElementById("filterBtn").addEventListener("click", applyFilters);
  document.getElementById("clearFilterBtn").addEventListener("click", clearFilters);
  document.getElementById("sortBy").addEventListener("change", sortUsers);
  document.getElementById("themeToggle").addEventListener("click", toggleTheme);
  document.getElementById("prevPage").addEventListener("click", () => changePage(currentPage - 1));
  document.getElementById("nextPage").addEventListener("click", () => changePage(currentPage + 1));

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.remove("light-mode");
    document.body.classList.add("dark-mode");
    isDarkMode = true;
  }
});

function generateUsers(count) {
  const names = ["Priya", "Sonam", "Moni", "Simran", "Kavya", "Pooja", "Megha", "Isha", "Tanya", "Anjali", "Neha", "Divya", "Ayesha", "Ritika", "Kriti", "Sakshi", "Sneha", "Shivani", "Roshni", "Payal"];
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
    "Charbagh, Lucknow", "Aliganj, Lucknow", "Gomtinagar, Lucknow", "Chinhat, Lucknow",
    "Naka, Lucknow", "Alambagh, Lucknow", "Para, Lucknow", "Ashiyana, Lucknow",
    "Indiranagar, Lucknow", "Mahanagar, Lucknow", "Kaisharbagh, Lucknow", "BBD City, Lucknow",
    "Lucknow University City", "Matiyari, Lucknow"
  ];
  const services = ["Massage", "Dinner", "Travel", "Companionship", "Private Shows"];

  const data = [];
  for (let i = 0; i < count; i++) {
    const user = {
      id: i + 1,
      name: names[i % names.length],
      age: 18 + (i % 15),
      height: 150 + (i % 20),
      category: categories[i % categories.length],
      subCategory: subCategories[i % subCategories.length],
      location: locations[i % locations.length],
      description: descriptions[i % descriptions.length],
      services: [services[i % services.length]],
      image: `images/user${(i % 10) + 1}.jpg`,
      topRated: i % 5 === 0,
      verified: true,
      online: i % 2 === 0,
      rank: i + 1,
      mobileNumbers: [
        { number: `82996705${String(i + 1).padStart(2, '0')}`, type: "call" },
        { number: `82996705${String(i + 1).padStart(2, '0')}`, type: "chat" }
      ]
    };
    data.push(user);
  }
  localStorage.setItem("galleryUsers", JSON.stringify(data));
}

function renderUsers() {
  const container = document.getElementById("userCards");
  const resultCount = document.getElementById("resultCount");
  const startIndex = (currentPage - 1) * usersPerPage;
  const pagedUsers = filteredUsers.slice(startIndex, startIndex + usersPerPage);

  container.innerHTML = "";
  resultCount.textContent = `Total Results: ${filteredUsers.length}`;
  document.getElementById("pageNumber").textContent = `Page ${currentPage}`;

  pagedUsers.forEach(user => {
    const callNum = user.mobileNumbers?.find(m => m.type === "call")?.number || "";
    const chatNum = user.mobileNumbers?.find(m => m.type === "chat")?.number || "";
    const card = document.createElement("div");
    card.className = "user-card";

    card.innerHTML = `
      <div class="status-indicator ${user.online ? 'online' : 'offline'}"></div>
      <div class="user-card-layout">
        <div class="user-image-container">
          <img src="${user.image}" alt="${user.name}" class="user-img">
        </div>
        <div class="user-info">
          ${user.topRated ? '<div class="badge top-rated">Top Rated</div>' : ''}
          ${user.verified ? '<div class="verified-badge">✔ Verified</div>' : ''}
          <p><strong>Name:</strong> ${user.name}</p>
          <p><strong>Age:</strong> ${user.age} | <strong>Height:</strong> ${user.height} cm</p>
          <p><strong>Category:</strong> ${user.category}</p>
          <p><strong>Sub-Category:</strong> ${user.subCategory}</p>
          <p><strong>Location:</strong> ${user.location}</p>
          <p><strong>Description:</strong> ${user.description}</p>
          <p><strong>Rank:</strong> ${user.rank}</p>
          <div class="card-buttons">
            <a href="tel:${callNum}" class="btn call-btn">📞 Call Me</a>
            <a href="https://wa.me/${chatNum}" target="_blank" class="btn chat-btn">💬 Chat Me</a>
            <button class="btn fav-btn" onclick="showMessage('Favorited ${user.name}')">❤️ Like</button>
          </div>
        </div>
      </div>
    `;

    container.appendChild(card);
  });
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
  document.getElementById("filterServices").value = "";
  document.getElementById("minAge").value = "";
  document.getElementById("maxAge").value = "";
  filteredUsers = [...users];
  currentPage = 1;
  renderUsers();
}

function sortUsers() {
  const sortValue = document.getElementById("sortBy").value;
  filteredUsers.sort((a, b) => {
    if (sortValue === "name") return a.name.localeCompare(b.name);
    if (sortValue === "age") return a.age - b.age;
    if (sortValue === "rank") return a.rank - b.rank;
    if (sortValue === "location") return a.location.localeCompare(b.location);
    return 0;
  });
  renderUsers();
}

function changePage(page) {
  const maxPage = Math.ceil(filteredUsers.length / usersPerPage);
  if (page < 1 || page > maxPage) return;
  currentPage = page;
  renderUsers();
}

function setupPagination() {
  // Handled by prev/next buttons
}

function toggleTheme() {
  isDarkMode = !isDarkMode;
  document.body.classList.toggle("dark-mode");
  document.body.classList.toggle("light-mode");
  localStorage.setItem("theme", isDarkMode ? "dark" : "light");
}

function showMessage(msg) {
  const popup = document.getElementById("messagePopup");
  const popupText = document.getElementById("popupText");
  popupText.innerText = msg;
  popup.classList.remove("hidden");
  setTimeout(() => popup.classList.add("hidden"), 2000);
}
