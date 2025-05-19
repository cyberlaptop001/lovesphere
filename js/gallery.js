// Fallback users in case localStorage is empty
const fallbackUsers = [
  {
    name: "Riya",
    age: 23,
    location: "Lucknow",
    services: "Massage, Companionship",
    rank: 4.5,
    image: "images/users/riya.jpg"
  },
  {
    name: "Priya",
    age: 25,
    location: "Gomtinagar",
    services: "Dinner Date, Role-play",
    rank: 4.7,
    image: "images/users/priya.jpg"
  },
  {
    name: "Anjali",
    age: 21,
    location: "Charbagh",
    services: "Full Night, Travel",
    rank: 4.9,
    image: "images/users/anjali.jpg"
  }
];

// Inject fallback users into localStorage if empty
if (!localStorage.getItem("users") || JSON.parse(localStorage.getItem("users")).length === 0) {
  localStorage.setItem("users", JSON.stringify(fallbackUsers));
}

let users = JSON.parse(localStorage.getItem("users"));
let currentPage = 1;
const usersPerPage = 6;

// Render User Cards
function renderUsers(usersToShow) {
  const container = document.getElementById("userCards");
  container.innerHTML = "";

  if (usersToShow.length === 0) {
    container.innerHTML = "<p class='neon-text'>No profiles match your search.</p>";
    document.getElementById("resultCount").textContent = "Showing 0 of 0 profiles";
    return;
  }

  const start = (currentPage - 1) * usersPerPage;
  const end = start + usersPerPage;
  const paginatedUsers = usersToShow.slice(start, end);

  for (let user of paginatedUsers) {
    const card = document.createElement("div");
    card.className = "user-card";
    card.innerHTML = `
      <img src="${user.image}" alt="${user.name}" class="user-image">
      <div class="user-info">
        <h3>${user.name}, ${user.age}</h3>
        <p><strong>Location:</strong> ${user.location}</p>
        <p><strong>Services:</strong> ${user.services}</p>
        <p><strong>Rank:</strong> ⭐ ${user.rank}</p>
        <div class="card-buttons">
          <button class="call-btn">📞 Call</button>
          <button class="chat-btn">💬 Chat</button>
          <button class="like-btn">❤️ Like</button>
        </div>
      </div>
    `;
    container.appendChild(card);
  }

  document.getElementById("resultCount").textContent = `Showing ${usersToShow.length} profiles`;
  document.getElementById("pageNumber").textContent = `Page ${currentPage}`;
}

function applyFilters() {
  const name = document.getElementById("searchInput").value.toLowerCase();
  const location = document.getElementById("locationInput").value.toLowerCase();
  const services = document.getElementById("serviceInput").value.toLowerCase();
  const minAge = parseInt(document.getElementById("minAge").value) || 0;
  const maxAge = parseInt(document.getElementById("maxAge").value) || 100;
  const sortBy = document.getElementById("sortBy").value;

  let filtered = users.filter(user =>
    user.name.toLowerCase().includes(name) &&
    user.location.toLowerCase().includes(location) &&
    user.services.toLowerCase().includes(services) &&
    user.age >= minAge &&
    user.age <= maxAge
  );

  if (sortBy) {
    filtered.sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "age" || sortBy === "rank") return a[sortBy] - b[sortBy];
      if (sortBy === "location") return a.location.localeCompare(b.location);
      return 0;
    });
  }

  currentPage = 1;
  renderUsers(filtered);
}

function clearFilters() {
  document.getElementById("searchInput").value = "";
  document.getElementById("locationInput").value = "";
  document.getElementById("serviceInput").value = "";
  document.getElementById("minAge").value = "";
  document.getElementById("maxAge").value = "";
  document.getElementById("sortBy").value = "";
  currentPage = 1;
  renderUsers(users);
}

document.getElementById("filterBtn").addEventListener("click", applyFilters);
document.getElementById("clearFilterBtn").addEventListener("click", clearFilters);
document.getElementById("prevPage").addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    applyFilters();
  }
});
document.getElementById("nextPage").addEventListener("click", () => {
  if ((currentPage * usersPerPage) < users.length) {
    currentPage++;
    applyFilters();
  }
});

// Like Button Toggle
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("like-btn")) {
    e.target.classList.toggle("liked");
  }
});

// Back to Top
document.getElementById("backToTop").addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Theme Toggle (Optional)
document.getElementById("themeToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

// Initial Render
renderUsers(users);
