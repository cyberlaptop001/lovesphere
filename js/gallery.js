const usersPerPage = 15;
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
});

// ✅ Generate Dummy Users
function generateUsers(count) {
  const names = [
    "Priya", "Sonam", "Moni", "Simran", "Kavya", "Pooja", "Megha", "Isha", "Tanya", "Anjali",
    "Neha", "Divya", "Ayesha", "Ritika", "Kriti", "Sakshi", "Sneha", "Shivani", "Roshni", "Payal"
  ];
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
  const seoKeywords = `Lucknow escorts, Call girls in Lucknow, Escort services Lucknow`;

  const generated = [];

  for (let i = 0; i < count; i++) {
    const age = 18 + (i % 30);
    const category = categories[i % categories.length];
    const subCategory = subCategories[i % subCategories.length];

    const user = {
      id: i + 1,
      name: names[i % names.length],
      age,
      height: 150 + (i % 50),
      category,
      subCategory,
      services: ["Full Service", "Massage", "Dinner Date"],
      location: locations[i % locations.length],
      description: descriptions[i % descriptions.length],
      rank: i + 1,
      online: i % 2 === 0,
      image: `images/user${(i % 10) + 1}.jpg`,
      keywords: seoKeywords,
      topRated: i % 10 === 0,
      isNew: i > count - 10,
      verified: true,
      mobileNumbers: [
        { number: `82996705${String(i + 1).padStart(2, '0')}`, type: "call" },
        { number: `82996705${String(i + 1).padStart(2, '0')}`, type: "chat" }
      ]
    };

    generated.push(user);
  }

  localStorage.setItem("galleryUsers", JSON.stringify(generated));
}

function renderUsers() {
  const startIndex = (currentPage - 1) * usersPerPage;
  const usersToShow = filteredUsers.slice(startIndex, startIndex + usersPerPage);
  const container = document.getElementById("userCards");
  const totalResults = document.getElementById("resultCount");

  container.innerHTML = "";
  totalResults.innerText = `Total Results: ${filteredUsers.length}`;
  document.getElementById("pageNumber").textContent = `Page ${currentPage}`;

  usersToShow.forEach(user => {
    const card = document.createElement("div");
    card.className = "user-card";

    const callNumber = user.mobileNumbers?.find(m => m.type === "call" || m.type === "both")?.number || "";
    const chatNumber = user.mobileNumbers?.find(m => m.type === "chat" || m.type === "both")?.number || "";

    card.innerHTML = `
      <div class="status-indicator ${user.online ? 'online' : 'offline'}"></div>
      <div class="user-card-layout">
        <div class="user-image-container">
          <img src="${user.image}" alt="${user.name}" class="user-img" />
        </div>
        <div class="user-info">
          ${user.topRated ? `<span class="badge top-rated">Top Rated</span>` : ""}
          ${user.isNew ? `<span class="badge new">New</span>` : ""}
          <span class="verified-badge">✔ Verified</span>
          <p><strong>Name:</strong> ${user.name}</p>
          <p><strong>Age:</strong> ${user.age} | <strong>Height:</strong> ${user.height} cm</p>
          <p><strong>Category:</strong> ${user.category}</p>
          <p><strong>Sub-Category:</strong> ${user.subCategory}</p>
          <p><strong>Location:</strong> ${user.location}</p>
          <p><strong>Description:</strong> ${user.description}</p>
          <p><strong>Rank:</strong> ${user.rank}</p>
          <div class="card-buttons">
            <a href="tel:${callNumber}" class="btn call-btn">Call Me</a>
            <a href="https://wa.me/${chatNumber}" target="_blank" class="btn chat-btn">Chat Me</a>
            <button class="btn fav-btn">❤️ Like</button>
          </div>
        </div>
      </div>
    `;

    card.querySelector(".fav-btn").addEventListener("click", () =>
      showMessage(`Liked ${user.name}`)
    );

    container.appendChild(card);
  });
}

function toggleTheme() {
  isDarkMode = !isDarkMode;
  document.body.classList.toggle("dark-mode");
  document.body.classList.toggle("light-mode");
  localStorage.setItem("theme", isDarkMode ? "dark" : "light");
}

function showMessage(text) {
  const popup = document.getElementById("messagePopup");
  const popupText = document.getElementById("popupText");
  popupText.innerText = text;
  popup.classList.remove("hidden");
  setTimeout(() => popup.classList.add("hidden"), 2000);
}

function applyFilters() {
  const search = document.getElementById("searchInput").value.toLowerCase();
  filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(search)
  );
  currentPage = 1;
  renderUsers();
}

function clearFilters() {
  document.getElementById("searchInput").value = "";
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
  // Already handled by prev/next button events
}

window.onload = function () {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.remove("light-mode");
    document.body.classList.add("dark-mode");
    isDarkMode = true;
  }
};
