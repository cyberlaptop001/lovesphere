const usersPerPage = 10;
let currentPage = 1;
let users = [];
let filteredUsers = [];

document.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem("galleryUsers");
  if (!saved) {
    generateUsers(50);
  }
  users = JSON.parse(localStorage.getItem("galleryUsers"));
  filteredUsers = [...users];
  renderUsers();

  document.getElementById("filterBtn").onclick = filterUsers;
  document.getElementById("clearFilterBtn").onclick = () => {
    document.getElementById("searchInput").value = "";
    filteredUsers = [...users];
    currentPage = 1;
    renderUsers();
  };

  document.getElementById("prevPage").onclick = () => changePage(currentPage - 1);
  document.getElementById("nextPage").onclick = () => changePage(currentPage + 1);
  document.getElementById("themeToggle").onclick = toggleTheme;

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") toggleTheme();
});

function toggleTheme() {
  document.body.classList.toggle("dark-mode");
  document.body.classList.toggle("light-mode");
  const mode = document.body.classList.contains("dark-mode") ? "dark" : "light";
  localStorage.setItem("theme", mode);
}

function generateUsers(count) {
  const names = ["Priya", "Sonam", "Riya", "Moni", "Simran"];
  const locations = ["Charbagh", "Aliganj", "Chinhat", "Indira Nagar", "Ashiyana"];
  const descriptions = ["Smart and sweet", "Fun-loving", "Bold and beautiful", "Independent", "Mature and elegant"];
  const generated = [];

  for (let i = 0; i < count; i++) {
    generated.push({
      id: i + 1,
      name: names[i % names.length],
      location: locations[i % locations.length],
      age: 20 + (i % 10),
      height: 155 + (i % 30),
      description: descriptions[i % descriptions.length],
      image: `images/user${(i % 10) + 1}.jpg`
    });
  }

  localStorage.setItem("galleryUsers", JSON.stringify(generated));
}

function renderUsers() {
  const container = document.getElementById("userCards");
  const resultText = document.getElementById("resultCount");
  const start = (currentPage - 1) * usersPerPage;
  const pageUsers = filteredUsers.slice(start, start + usersPerPage);

  container.innerHTML = "";
  resultText.textContent = `Total Results: ${filteredUsers.length}`;
  document.getElementById("pageNumber").textContent = `Page ${currentPage}`;

  pageUsers.forEach(user => {
    const div = document.createElement("div");
    div.className = "user-card";
    div.innerHTML = `
      <img src="${user.image}" alt="${user.name}" />
      <h3>${user.name}</h3>
      <p>${user.description}</p>
      <p>${user.age} yrs | ${user.height} cm</p>
      <p>${user.location}</p>
    `;
    container.appendChild(div);
  });
}

function filterUsers() {
  const search = document.getElementById("searchInput").value.toLowerCase();
  filteredUsers = users.filter(u => u.name.toLowerCase().includes(search));
  currentPage = 1;
  renderUsers();
}

function changePage(page) {
  const maxPage = Math.ceil(filteredUsers.length / usersPerPage);
  if (page < 1 || page > maxPage) return;
  currentPage = page;
  renderUsers();
}
