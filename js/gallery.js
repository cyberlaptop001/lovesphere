// User Data (100 static profiles)
const users = Array.from({ length: 100 }, (_, i) => {
  const names = ["Ritika", "Priya", "Roma", "Lovy", "Anamika", "Pricy", "Kajal", "Pooja", "Megha", "Simran"];
  const locations = [
    "Gomti Nagar", "Ashiyana", "Telebagh", "Para", "Aligaj", "Chinhat", "Indiranagar",
    "Mahanagar", "Kapoorthala", "Nishatganj", "Charbagh", "Naka", "Chauk", "Kaisarbagh",
    "Aishbagh", "PGI Road", "Patrakarpuram", "MunsiPuliya", "ThediPuliya",
    "BBD University city", "Lucknow University city", "Girls college"
  ];
  const age = Math.floor(Math.random() * 23) + 18;
  let category = "";
  if (age >= 18 && age <= 19) category = "College Girl";
  else if (age >= 20 && age <= 30) category = "Bhabhi";
  else if (age >= 35 && age <= 40) category = "Aunty";
  return {
    name: names[Math.floor(Math.random() * names.length)],
    age,
    location: locations[Math.floor(Math.random() * locations.length)],
    category,
    <img src="${user.image || 'images/default.jpg'}" alt="${user.name}" style="width:100%; border-radius:10px;">
  };
});

// Pagination
let currentPage = 1;
const profilesPerPage = 9;

// DOM Elements
const userCards = document.getElementById("userCards");
const pageNumber = document.getElementById("pageNumber");
const searchName = document.getElementById("searchName");
const filterLocation = document.getElementById("filter-location");
const filterAge = document.getElementById("filter-age");
const filterCategory = document.getElementById("filter-category");

function filterUsers() {
  return users.filter(u => {
    const nameMatch = !searchName.value || u.name.toLowerCase().includes(searchName.value.toLowerCase());
    const locMatch = !filterLocation.value || u.location === filterLocation.value;
    const ageMatch =
      !filterAge.value ||
      (filterAge.value === "18-25" && u.age >= 18 && u.age <= 25) ||
      (filterAge.value === "26-35" && u.age >= 26 && u.age <= 35) ||
      (filterAge.value === "36-40" && u.age >= 36 && u.age <= 40);
    const catMatch = !filterCategory.value || u.category === filterCategory.value;
    return nameMatch && locMatch && ageMatch && catMatch;
  });
}

function renderUsers() {
  const filtered = filterUsers();
  const totalPages = Math.ceil(filtered.length / profilesPerPage);
  const start = (currentPage - 1) * profilesPerPage;
  const currentUsers = filtered.slice(start, start + profilesPerPage);

  userCards.innerHTML = currentUsers.map(user => `
    <div class="user-card">
      <img src="${user.image}" alt="${user.name}" />
      <div class="user-info">
        <h3>${user.name}</h3>
        <p>Age: ${user.age}</p>
        <p>Location: ${user.location}</p>
        <p>Category: ${user.category}</p>
        <div class="user-buttons">
          <button class="neon-btn call">📞 Call</button>
          <button class="neon-btn chat">💬 Chat</button>
          <button class="neon-btn like">❤️ Like</button>
        </div>
      </div>
    </div>
  `).join("");

  pageNumber.textContent = `Page ${currentPage} of ${totalPages}`;
  document.getElementById("prevPage").disabled = currentPage === 1;
  document.getElementById("nextPage").disabled = currentPage === totalPages;
}

document.getElementById("applyFilter").addEventListener("click", () => {
  currentPage = 1;
  renderUsers();
});

document.getElementById("prevPage").addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    renderUsers();
  }
});

document.getElementById("nextPage").addEventListener("click", () => {
  currentPage++;
  renderUsers();
});

document.getElementById("backToTop").addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

document.getElementById("themeToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

renderUsers();
