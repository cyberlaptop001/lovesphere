// Initialize variables
let users = [];
let filteredUsers = [];
let currentPage = 1;
const profilesPerPage = 20;

// Example realistic names
const names = [
  "Ritika", "Priya", "Roma", "Lovy", "Anamika", "Sonam", "Kajal", "Nikita", "Roshni", "Tina",
  "Simran", "Preeti", "Pooja", "Neha", "Swati", "Divya", "Rani", "Payal", "Sonia", "Anjali",
  "Rekha", "Kiran", "Mona", "Sapna", "Megha", "Shalini", "Pinky", "Naina", "Komal", "Juhi",
  "Khushboo", "Aarti", "Shraddha", "Radha", "Ishita", "Kritika", "Rashmi", "Sneha", "Twinkle", "Muskan",
  "Chandni", "Gudiya", "Ayesha", "Sana", "Ruksar", "Meher", "Jiya", "Trisha", "Ruchi", "Vidya"
];

const locations = [
  "Gomti Nagar", "Ashiyana", "Telebagh", "Para", "Aliganj", "Chinhat", "Indiranagar", "Mahanagar",
  "Kapoorthala", "Nishatganj", "Charbagh", "Naka", "Chauk", "Kaisarbagh", "Aishbagh", "PGI Road",
  "Patrakarpuram", "MunsiPuliya", "ThediPuliya", "BBD University city", "Lucknow University city", "Girls college"
];

// Generate users
function generateUsers() {
  for (let i = 1; i <= 100; i++) {
    const age = Math.floor(Math.random() * 23) + 18; // 18–40
    let category = "Bhabhi";
    if (age <= 19) category = "College Girl";
    else if (age >= 35) category = "Aunty";

    const user = {
      name: names[(i - 1) % names.length],
      age,
      location: locations[Math.floor(Math.random() * locations.length)],
      category,
      image: `images/user${i}.jpg`
    };
    users.push(user);
  }
  filteredUsers = [...users];
}
generateUsers();

// Render user cards
function renderUsers() {
  const container = document.getElementById("userCards");
  container.innerHTML = "";
  const start = (currentPage - 1) * profilesPerPage;
  const end = start + profilesPerPage;
  const pageUsers = filteredUsers.slice(start, end);

  pageUsers.forEach(user => {
    const card = document.createElement("div");
    card.className = "user-card";
    card.innerHTML = `
      <div class="user-image-container">
        <img src="${user.image}" alt="${user.name}" class="user-img" />
      </div>
      <div class="user-info">
        <p><strong>Name:</strong> ${user.name}</p>
        <p><strong>Age:</strong> ${user.age}</p>
        <p><strong>Location:</strong> ${user.location}, Lucknow</p>
        <p><strong>Category:</strong> ${user.category}</p>
        <div class="card-buttons">
          <a href="tel:7619937539">Call Me</a>
          <a href="https://wa.me/917619937539" target="_blank">Chat Me</a>
          <button class="like-button">Like Me</button>
        </div>
      </div>
    `;
    container.appendChild(card);
  });

  document.getElementById("pageNumber").textContent = `Page ${currentPage}`;
}

// Filter logic
function applyFilters() {
  const name = document.getElementById("searchInput").value.toLowerCase();
  const location = document.getElementById("locationInput").value.toLowerCase();
  const service = document.getElementById("serviceInput").value.toLowerCase();
  const minAge = parseInt(document.getElementById("minAge").value);
  const maxAge = parseInt(document.getElementById("maxAge").value);

  filteredUsers = users.filter(user => {
    return (!name || user.name.toLowerCase().includes(name)) &&
           (!location || user.location.toLowerCase().includes(location)) &&
           (!isNaN(minAge) ? user.age >= minAge : true) &&
           (!isNaN(maxAge) ? user.age <= maxAge : true);
  });

  currentPage = 1;
  renderUsers();
}

// Clear filters
function clearFilters() {
  document.getElementById("searchInput").value = "";
  document.getElementById("locationInput").value = "";
  document.getElementById("serviceInput").value = "";
  document.getElementById("minAge").value = "";
  document.getElementById("maxAge").value = "";
  filteredUsers = [...users];
  currentPage = 1;
  renderUsers();
}

// Pagination controls
document.getElementById("prevPage").addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    renderUsers();
  }
});
document.getElementById("nextPage").addEventListener("click", () => {
  const totalPages = Math.ceil(filteredUsers.length / profilesPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    renderUsers();
  }
});

// Filter buttons
document.getElementById("filterBtn").addEventListener("click", applyFilters);
document.getElementById("clearFilterBtn").addEventListener("click", clearFilters);

// Like Button Action
document.addEventListener("click", e => {
  if (e.target.classList.contains("like-button")) {
    e.target.classList.toggle("liked");
    e.target.textContent = e.target.classList.contains("liked") ? "Liked" : "Like Me";
  }
});

// Theme Toggle
document.getElementById("themeToggle").addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
  document.body.classList.toggle("dark-mode");
});

// Back to Top
document.getElementById("backToTop").addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Initial Render
renderUsers();
