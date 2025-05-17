const usersPerPage = 15;
let currentPage = 1;
let users = [];
let filteredUsers = [];
let isDarkMode = false;

document.addEventListener("DOMContentLoaded", () => {
  users = JSON.parse(localStorage.getItem("galleryUsers")) || [];
  if (users.length === 0) {
    generateUsers(100);
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

// 🧠 Generate Dummy Users if galleryUsers is not found
function generateUsers(count) {
  const names = [/*... same as before ...*/];
  const sampleServices = ["Massage", "Dinner", "Travel", "Companionship", "Private Shows"];
  const sampleLocations = [/*... same as before ...*/];
  const sampleDescriptions = [/*... same as before ...*/];
  const subCategories = ["Model", "Celebrity", "News Anchor", "Bollywood Model"];
  const seoKeywords = `Lucknow escorts, Call girls in Lucknow, Escort services Lucknow, ...`;

  for (let i = 1; i <= count; i++) {
    const age = 18 + (i % 30);
    let category = age <= 25 ? "College Girl" : age <= 35 ? "Bhabhi" : age <= 45 ? "Aunty" : "Other";
    const subCategory = subCategories.sort(() => 0.5 - Math.random()).slice(0, 2).join(", ");
    const user = {
      id: i,
      name: names[i - 1],
      age,
      height: 150 + (i % 50),
      category,
      subCategory,
      services: [sampleServices[i % sampleServices.length]],
      location: sampleLocations[i % sampleLocations.length],
      description: sampleDescriptions[i % sampleDescriptions.length],
      rank: i,
      online: i % 2 === 0,
      image: `images/user${i}.jpg`,
      keywords: seoKeywords,
      topRated: i % 10 === 0,
      isNew: i > count - 10,
      verified: true,
      mobileNumbers: [
        { number: `82996705${String(i).padStart(2, '0')}`, type: i % 2 === 0 ? "call" : "chat" }
      ]
    };
    users.push(user);
  }
  localStorage.setItem("galleryUsers", JSON.stringify(users));
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
            <button class="btn fav-btn">Favorited ❤️</button>
          </div>
        </div>
      </div>
      <div style="display:none">${user.keywords}</div>
    `;

    card.querySelector(".fav-btn").addEventListener("click", () =>
      showMessage(`Favorited ${user.name}`)
    );

    container.appendChild(card);
  });
}

// ⬇️ Pagination + Filters + Utilities (same as before)
function applyFilters() { /* ... */ }
function clearFilters() { /* ... */ }
function sortUsers() { /* ... */ }
function changePage(page) { /* ... */ }
function setupPagination() { /* ... */ }
function toggleTheme() { /* ... */ }
function showMessage(text) { /* ... */ }

window.onload = function () {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    isDarkMode = true;
  }
};

// 🏷️ Filter chips logic (same as before)
["categorySelect", "subCategorySelect", "areaSelect", "ageSelect", "topRatedSelect"].forEach(id => {
  const el = document.getElementById(id);
  if (el) el.addEventListener("change", applyFilters);
});

const originalApplyFilters = applyFilters;
applyFilters = function () {
  originalApplyFilters();
  displayActiveTags();
};

function displayActiveTags() {
  const tagContainer = document.getElementById("activeTags");
  if (!tagContainer) return;
  tagContainer.innerHTML = "";
  const tagData = {
    categorySelect: "Category",
    subCategorySelect: "Sub-category",
    areaSelect: "Area",
    ageSelect: "Age",
    topRatedSelect: "Top Rated"
  };
  Object.keys(tagData).forEach(id => {
    const el = document.getElementById(id);
    if (el && el.value) {
      const tag = document.createElement("span");
      tag.className = "filter-chip";
      tag.innerText = `${tagData[id]}: ${el.options[el.selectedIndex].text}`;
      tagContainer.appendChild(tag);
    }
  });
}
