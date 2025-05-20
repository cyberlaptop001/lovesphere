// Constants
const usersPerPage = 10;
let currentPage = 1;
let filteredUsers = [];

document.addEventListener("DOMContentLoaded", () => {
  loadFilters();
  renderUsers();
});

function loadFilters() {
  const data = getAllUsers();
  const locations = [...new Set(data.map(user => user.location))];
  const ages = [...new Set(data.map(user => user.age))];
  const categories = [...new Set(data.map(user => user.category))];

  populateSelect("locationFilter", locations);
  populateSelect("ageFilter", ages);
  populateSelect("categoryFilter", categories);
}

function populateSelect(id, values) {
  const select = document.getElementById(id);
  values.sort().forEach(val => {
    const option = document.createElement("option");
    option.value = val;
    option.textContent = val;
    select.appendChild(option);
  });
}

function getAllUsers() {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  return users;
}

function applyFilters() {
  const location = document.getElementById("locationFilter").value;
  const age = document.getElementById("ageFilter").value;
  const category = document.getElementById("categoryFilter").value;

  const allUsers = getAllUsers();
  filteredUsers = allUsers.filter(user => {
    return (!location || user.location === location) &&
           (!age || user.age === age) &&
           (!category || user.category === category);
  });

  currentPage = 1;
  renderUsers();
}

function renderUsers() {
  const allUsers = getAllUsers();
  const users = filteredUsers.length ? filteredUsers : allUsers;

  const start = (currentPage - 1) * usersPerPage;
  const end = start + usersPerPage;
  const usersToDisplay = users.slice(start, end);

  const container = document.getElementById("userCards");
  container.innerHTML = "";

  usersToDisplay.forEach(user => {
    const card = document.createElement("div");
    card.className = "user-card";
    card.innerHTML = `
      <img src="images/${user.image}" alt="${user.name}">
      <div class="user-info">
        <h3>${user.name}, ${user.age}</h3>
        <p><strong>Location:</strong> ${user.location}</p>
        <p><strong>Category:</strong> ${user.category}</p>
        <p>${user.description}</p>
        <div class="buttons">
          <a href="tel:7619937539" class="btn call-btn">Call</a>
          <a href="https://wa.me/917619937539" target="_blank" class="btn chat-btn">Chat</a>
        </div>
      </div>
    `;
    container.appendChild(card);
  });

  document.getElementById("pageNumber").textContent = `Page ${currentPage}`;
}

function nextPage() {
  const users = filteredUsers.length ? filteredUsers : getAllUsers();
  const maxPage = Math.ceil(users.length / usersPerPage);
  if (currentPage < maxPage) {
    currentPage++;
    renderUsers();
  }
}

function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    renderUsers();
  }
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
