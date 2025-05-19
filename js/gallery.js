const usersPerPage = 15;
let currentPage = 1;
let users = [];
let filteredUsers = [];
let isDarkMode = false;

document.addEventListener("DOMContentLoaded", () => {
  const savedUsers = JSON.parse(localStorage.getItem("galleryUsers")) || [];
  if (savedUsers.length === 0) {
    generateUsers(100);
  } else {
    users = savedUsers;
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
  document.getElementById("backToTop").addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
});

// 🌟 Generate Users
function generateUsers(count) {
  const names = ["Priya", "Sonam", "Moni", "Simran", "Kavya", "Pooja", "Megha", "Isha", "Tanya", "Anjali"];
  const descriptions = [
    "Happy endings, Role Play, Custom makeups, Hot dresses, full moanings",
    "Blowjob, Hairjob, All positions, Kamasutra Positions, Full satisfaction",
    "69 style, shower romance, tight experience, fantasy moves, kissing passion",
    "Late night passion, body worship, full girlfriend vibe, wild experiments",
    "GFE, dance shows, strip tease, foreplay master, creamy touch, full romance"
  ];
  const categories = ["College Girl", "Bhabhi", "Aunty"];
  const subCategories = ["Model", "Celebrity", "News Anchor", "Bollywood Model"];
  const locations = [
    "Charbagh, Lucknow", "Aliganj, Lucknow", "Gomtinagar, Lucknow", "Chinhat, Lucknow",
    "Naka, Lucknow", "Alambagh, Lucknow", "Para, Lucknow", "Ashiyana, Lucknow",
    "Indiranagar, Lucknow", "Mahanagar, Lucknow", "Kaisharbagh, Lucknow", "BBD City, Lucknow"
  ];
  const services = ["Massage", "Dinner", "Travel", "Companionship", "Private Shows"];
  const keywords = "Lucknow escorts, Call girls in Lucknow, Escort services Lucknow";

  for (let i = 0; i < count; i++) {
    const age = 18 + (i % 30);
    const category = age <= 25 ? "College Girl" : age <= 35 ? "Bhabhi" : "Aunty";
    const name = names[i % names.length];
    const description = descriptions[i % descriptions.length];
    const subCategory = subCategories[i % subCategories.length];
    const location = locations[i % locations.length];
    const imgIndex = (i % 10) + 1;

    users.push({
      id: i + 1,
      name,
      age,
      height: 150 + (i % 50),
      category,
      subCategory,
      services: [services[i % services.length]],
      location,
      description,
      rank: i + 1,
      online: i % 2 === 0,
      image: `images/user${imgIndex}.jpg`,
      keywords,
      topRated: i % 10 === 0,
      isNew: i > count - 10,
      verified: true,
      mobileNumbers: [
        {
          number: `82996705${String(i + 1).padStart(2, '0')}`,
          type: i % 2 === 0 ? "call" : "chat"
        }
      ]
    });
  }

  localStorage.setItem("galleryUsers", JSON.stringify(users));
}

// 🌟 Render User Cards
function renderUsers() {
  const container = document.getElementById("userCards");
  const resultCount = document.getElementById("resultCount");
  container.innerHTML = "";

  const start = (currentPage - 1) * usersPerPage;
  const usersToShow = filteredUsers.slice(start, start + usersPerPage);

  resultCount.innerText = `Total Results: ${filteredUsers.length}`;
  document.getElementById("pageNumber").textContent =
    `Page ${currentPage} of ${Math.ceil(filteredUsers.length / usersPerPage)}`;

  if (usersToShow.length === 0) {
    container.innerHTML = "<p class='no-results'>No users match your filters.</p>";
    return;
  }

  usersToShow.forEach(user => {
    const callNum = user.mobileNumbers.find(n => n.type === "call" || n.type === "both")?.number || "0000000000";
    const chatNum = user.mobileNumbers.find(n => n.type === "chat" || n.type === "both")?.number || "0000000000";

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
        <p><strong>Age:</strong> ${user.age} | <strong>Height:</strong> ${user.height} cm</p>
        <p><strong>Category:</strong> ${user.category}</p>
        <p><strong>Sub-Category:</strong> ${user.subCategory}</p>
        <p><strong>Location:</strong> ${user.location}</p>
        <p><strong>Description:</strong> ${user.description}</p>
        <p><strong>Rank:</strong> ${user.rank}</p>
        <div class="card-buttons">
          <a href="tel:${callNum}" class="call-btn">📞 Call Me</a>
          <a href="https://wa.me/${chatNum}" class="chat-btn" target="_blank">💬 Chat Me</a>
          <button class="fav-btn">❤️ Like</button>
        </div>
      </div>
    `;

    card.querySelector(".fav-btn").addEventListener("click", () =>
      showMessage(`You liked ${user.name}!`)
    );

    container.appendChild(card);
  });
}

// 🌗 Theme Toggle
function toggleTheme() {
  isDarkMode = !isDarkMode;
  document.body.classList.toggle("dark-mode", isDarkMode);
  document.body.classList.toggle("light-mode", !isDarkMode);
  localStorage.setItem("theme", isDarkMode ? "dark" : "light");
}

// 🔍 Apply Filters
function applyFilters() {
  const search = document.getElementById("searchInput").value.toLowerCase();
  filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(search) ||
    user.location.toLowerCase().includes(search) ||
    user.category.toLowerCase().includes(search) ||
    user.subCategory.toLowerCase().includes(search)
  );
  currentPage = 1;
  renderUsers();
}

// 🧹 Clear Filters
function clearFilters() {
  document.getElementById("searchInput").value = "";
  filteredUsers = [...users];
  currentPage = 1;
  renderUsers();
}

// ↕ Sort Users
function sortUsers() {
  const sortValue = document.getElementById("sortBy").value;
  const sortFunctions = {
    name: (a, b) => a.name.localeCompare(b.name),
    age: (a, b) => a.age - b.age,
    rank: (a, b) => a.rank - b.rank,
    location: (a, b) => a.location.localeCompare(b.location)
  };

  filteredUsers.sort(sortFunctions[sortValue] || (() => 0));
  renderUsers();
}

// ⏪ Pagination
function changePage(page) {
  const maxPage = Math.ceil(filteredUsers.length / usersPerPage);
  if (page >= 1 && page <= maxPage) {
    currentPage = page;
    renderUsers();
  }
}

function setupPagination() {
  // Already handled via button clicks
}

// 💬 Message Popup
function showMessage(msg) {
  const popup = document.getElementById("messagePopup");
  const popupText = document.getElementById("popupText");
  popupText.innerText = msg;
  popup.classList.remove("hidden");
  setTimeout(() => popup.classList.add("hidden"), 2000);
}

// 🌙 Load saved theme
window.onload = function () {
  const theme = localStorage.getItem("theme");
  if (theme === "dark") {
    document.body.classList.add("dark-mode");
    isDarkMode = true;
  }
};
