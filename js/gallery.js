const usersPerPage = 15;
let currentPage = 1;
let users = [];
let filteredUsers = [];
let isDarkMode = false;

document.addEventListener("DOMContentLoaded", () => {
  if (!localStorage.getItem("galleryUsers")) {
    generateUsers(100);
  }

  users = JSON.parse(localStorage.getItem("galleryUsers")) || [];
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

function generateUsers(count) {
  const names = ["Priya", "Sonam", "Moni", "Simran", "Kavya", "Pooja", "Megha", "Isha", "Tanya", "Anjali", "Neha", "Divya", "Ayesha", "Ritika", "Kriti", "Sakshi", "Sneha", "Shivani", "Roshni", "Payal"];
  const locations = ["Charbagh, Lucknow", "Aliganj, Lucknow", "Gomtinagar, Lucknow", "Chinhat, Lucknow", "Naka, Lucknow", "Alambagh, Lucknow", "Para, Lucknow", "Ashiyana, Lucknow", "Indiranagar, Lucknow", "Mahanagar, Lucknow", "Kaisharbagh, Lucknow", "BBD City, Lucknow", "Lucknow University City", "Matiyari, Lucknow"];
  const descriptions = [
    "Happy endings, Role Play, Custom makeups, Hot dresses, full moanings",
    "Blowjob, Hairjob, All positions, Kamasutra Positions, Full satisfaction",
    "69 style, shower romance, tight experience, fantasy moves, kissing passion",
    "Late night passion, body worship, full girlfriend vibe, wild experiments",
    "GFE, dance shows, strip tease, foreplay master, creamy touch, full romance"
  ];
  const categories = ["College Girl", "Bhabhi", "Aunty"];
  const subCategories = ["Model", "Celebrity", "News Anchor", "Bollywood Model"];
  const services = ["Massage", "Dinner", "Travel", "Companionship", "Private Shows"];

  const dummyUsers = [];

  for (let i = 0; i < count; i++) {
    dummyUsers.push({
      id: i + 1,
      name: names[i % names.length],
      age: 18 + (i % 30),
      height: 150 + (i % 50),
      category: categories[i % categories.length],
      subCategory: subCategories[i % subCategories.length],
      description: descriptions[i % descriptions.length],
      location: locations[i % locations.length],
      rank: i + 1,
      online: i % 2 === 0,
      image: `images/user${(i % 10) + 1}.jpg`,
      services: [services[i % services.length]],
      topRated: i % 5 === 0,
      verified: true,
      mobileNumbers: [
        { number: `82996705${String(i + 1).padStart(2, "0")}`, type: "call" },
        { number: `82996705${String(i + 1).padStart(2, "0")}`, type: "chat" }
      ]
    });
  }

  localStorage.setItem("galleryUsers", JSON.stringify(dummyUsers));
}

function renderUsers() {
  const container = document.getElementById("userCards");
  const totalResults = document.getElementById("resultCount");
  const startIndex = (currentPage - 1) * usersPerPage;
  const usersToShow = filteredUsers.slice(startIndex, startIndex + usersPerPage);

  container.innerHTML = "";
  totalResults.innerText = `Total Results: ${filteredUsers.length}`;
  document.getElementById("pageNumber").textContent = `Page ${currentPage}`;

  usersToShow.forEach(user => {
    const callNumber = user.mobileNumbers.find(m => m.type === "call")?.number || "";
    const chatNumber = user.mobileNumbers.find(m => m.type === "chat")?.number || "";

    const card = document.createElement("div");
    card.className = "user-card";
    card.innerHTML = `
      <div class="user-card-layout">
        <div class="user-image-container">
          <img src="${user.image}" alt="${user.name}" class="user-img" />
        </div>
        <div class="user-info">
          ${user.topRated ? `<p class="top-rated">Top Rated</p>` : ""}
          ${user.verified ? `<span class="verified-badge">✔ Verified</span>` : ""}
          <p><strong>Name:</strong> <span style="color:#ff69b4">${user.name}</span></p>
          <p><strong>Age:</strong> ${user.age} | <strong>Height:</strong> ${user.height} cm</p>
          <p><strong>Category:</strong> ${user.category}</p>
          <p><strong>Sub-Category:</strong> ${user.subCategory}</p>
          <p><strong>Location:</strong> ${user.location}</p>
          <p><strong>Description:</strong> ${user.description}</p>
          <p><strong>Rank:</strong> ${user.rank}</p>
          <div class="card-buttons">
            <a href="tel:${callNumber}" class="btn call-btn">📞 Call Me</a>
            <a href="https://wa.me/91${chatNumber}" class="btn chat-btn" target="_blank">💬 Chat Me</a>
            <button class="btn fav-btn" onclick="showMessage('Liked ${user.name}')">❤️ Like</button>
          </div>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

function applyFilters() {
  const nameInput = document.getElementById("searchInput").value.toLowerCase();
  const locationInput = document.getElementById("filterLocation").value.toLowerCase();
  const serviceInput = document.getElementById("filterServices").value.toLowerCase();
  const minAge = parseInt(document.getElementById("minAge").value) || 0;
  const maxAge = parseInt(document.getElementById("maxAge").value) || 100;

  filteredUsers = users.filter(user => {
    const nameMatch = user.name.toLowerCase().includes(nameInput);
    const locationMatch = user.location.toLowerCase().includes(locationInput);
    const serviceMatch = user.services.join(",").toLowerCase().includes(serviceInput);
    const ageMatch = user.age >= minAge && user.age <= maxAge;

    return nameMatch && locationMatch && serviceMatch && ageMatch;
  });

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

function toggleTheme() {
  isDarkMode = !isDarkMode;
  document.body.classList.toggle("dark-mode", isDarkMode);
  document.body.classList.toggle("light-mode", !isDarkMode);
  localStorage.setItem("theme", isDarkMode ? "dark" : "light");
}

function changePage(page) {
  const maxPage = Math.ceil(filteredUsers.length / usersPerPage);
  if (page < 1 || page > maxPage) return;
  currentPage = page;
  renderUsers();
}

function setupPagination() {
  // Already wired above
}

function showMessage(text) {
  const popup = document.getElementById("messagePopup");
  const popupText = document.getElementById("popupText");
  popupText.innerText = text;
  popup.classList.remove("hidden");
  setTimeout(() => popup.classList.add("hidden"), 2000);
}

window.onload = function () {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.remove("light-mode");
    document.body.classList.add("dark-mode");
    isDarkMode = true;
  }
};
