// gallery.js

// Sample locations and categories (adjust as needed)
const LOCATIONS = [
  "Gomti nagar", "Ashiyana", "Telebagh", "Para", "Aligaj", "Chinhat", "Indiranagar",
  "Mahanagar", "Kapoorthala", "Nishatganj", "Charbagh", "Naka", "Chauk", "Kaisarbagh",
  "Aishbagh", "PGI Road", "Patrakarpuram", "MunsiPuliya", "ThediPuliya",
  "BBD University city", "Lucknow University city", "Girls college"
];

const CATEGORIES = ["College Girl", "Bhabhi", "Aunty"];
const USERS_PER_PAGE = 10;
let currentPage = 1;

function loadUsersFromStorage() {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  return users;
}

function getFilteredUsers(users) {
  const location = document.getElementById("locationFilter").value;
  const age = document.getElementById("ageFilter").value;
  const category = document.getElementById("categoryFilter").value;

  return users.filter(user => {
    const ageNum = parseInt(user.age, 10);
    const matchLocation = !location || user.location === location;
    const matchAge = !age || parseInt(age) === ageNum;
    const matchCategory = !category || user.category === category;
    return matchLocation && matchAge && matchCategory;
  });
}

function renderUsers(users) {
  const container = document.getElementById("userCards");
  container.innerHTML = "";

  const start = (currentPage - 1) * USERS_PER_PAGE;
  const pageUsers = users.slice(start, start + USERS_PER_PAGE);

  pageUsers.forEach(user => {
    const card = document.createElement("div");
    card.className = "user-card";

    card.innerHTML = `
      <div class="card-img">
        <img src="images/${user.image}" alt="${user.name}">
      </div>
      <div class="card-info">
        <h3>${user.name}</h3>
        <p>Age: ${user.age}</p>
        <p>Location: ${user.location}</p>
        <p>Category: ${user.category}</p>
        <div class="card-actions">
          <a href="tel:7619937539" class="btn call-btn">Call</a>
          <a href="https://wa.me/917619937539" class="btn chat-btn" target="_blank">Chat</a>
          <button class="btn like-btn">❤</button>
        </div>
      </div>
    `;
    container.appendChild(card);
  });

  document.getElementById("pageIndicator").textContent = `Page ${currentPage}`;
}

function applyFilters() {
  const allUsers = loadUsersFromStorage();
  const filtered = getFilteredUsers(allUsers);
  currentPage = 1;
  renderUsers(filtered);
}

function nextPage() {
  const allUsers = getFilteredUsers(loadUsersFromStorage());
  if ((currentPage * USERS_PER_PAGE) < allUsers.length) {
    currentPage++;
    renderUsers(allUsers);
  }
}

function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    renderUsers(getFilteredUsers(loadUsersFromStorage()));
  }
}

// Event bindings
document.getElementById("applyFilters").addEventListener("click", applyFilters);
document.getElementById("nextBtn").addEventListener("click", nextPage);
document.getElementById("prevBtn").addEventListener("click", prevPage);

// Initial load
document.addEventListener("DOMContentLoaded", () => {
  applyFilters();
});
