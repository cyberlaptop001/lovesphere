// 📁 File: js/gallery.js

// Fallback demo users if none in localStorage
let users = [];

try {
  const storedUsers = JSON.parse(localStorage.getItem("users"));
  if (Array.isArray(storedUsers) && storedUsers.length > 0) {
    users = storedUsers;
  } else {
    users = [
      {
        name: "Riya",
        age: 25,
        location: "Lucknow",
        services: ["Massage", "GFE"],
        image: "images/riya.jpg",
        rank: 4
      },
      {
        name: "Anjali",
        age: 23,
        location: "Gomtinagar",
        services: ["Escort", "Dinner Date"],
        image: "images/anjali.jpg",
        rank: 5
      }
    ];
  }
} catch (e) {
  console.error("Error parsing users from localStorage:", e);
}

let filteredUsers = [...users];
let currentPage = 1;
const usersPerPage = 6;

function renderUsers() {
  const userContainer = document.getElementById("userCards");
  userContainer.innerHTML = "";

  const start = (currentPage - 1) * usersPerPage;
  const end = start + usersPerPage;
  const paginatedUsers = filteredUsers.slice(start, end);

  if (paginatedUsers.length === 0) {
    userContainer.innerHTML = '<p class="no-users">No profiles found.</p>';
    return;
  }

  paginatedUsers.forEach(user => {
    const services = user.services.join(", ");
    userContainer.innerHTML += `
      <div class="user-card">
        <img src="${user.image}" alt="${user.name}" class="user-img" />
        <div class="user-info">
          <h3 class="user-name neon-text">${user.name}, ${user.age}</h3>
          <p class="user-location">📍 ${user.location}</p>
          <p class="user-services">💖 ${services}</p>
          <p class="user-rank">⭐ Rank: ${user.rank}</p>
          <div class="card-actions">
            <button class="neon-button" onclick="showPopup('Calling ${user.name}...')">📞 Call</button>
            <button class="neon-button" onclick="showPopup('Chatting with ${user.name}...')">💬 Chat</button>
            <button class="neon-button like-button">❤️ Like</button>
          </div>
        </div>
      </div>
    `;
  });

  document.querySelectorAll('.like-button').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('liked');
      btn.innerText = btn.classList.contains('liked') ? '💖 Liked' : '❤️ Like';
    });
  });

  document.getElementById("pageNumber").innerText = `Page ${currentPage}`;
  document.getElementById("resultCount").innerText = `${filteredUsers.length} result(s) found`;
}

function applyFilters() {
  const name = document.getElementById("searchInput").value.toLowerCase();
  const location = document.getElementById("locationInput").value.toLowerCase();
  const service = document.getElementById("serviceInput").value.toLowerCase();
  const minAge = parseInt(document.getElementById("minAge").value);
  const maxAge = parseInt(document.getElementById("maxAge").value);
  const sortBy = document.getElementById("sortBy").value;

  filteredUsers = users.filter(user => {
    return (
      (!name || user.name.toLowerCase().includes(name)) &&
      (!location || user.location.toLowerCase().includes(location)) &&
      (!service || user.services.join(",").toLowerCase().includes(service)) &&
      (!minAge || user.age >= minAge) &&
      (!maxAge || user.age <= maxAge)
    );
  });

  if (sortBy) {
    filteredUsers.sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "age") return a.age - b.age;
      if (sortBy === "rank") return b.rank - a.rank;
      if (sortBy === "location") return a.location.localeCompare(b.location);
    });
  }

  currentPage = 1;
  renderUsers();
}

document.getElementById("filterBtn").addEventListener("click", applyFilters);
document.getElementById("clearFilterBtn").addEventListener("click", () => {
  document.getElementById("searchInput").value = "";
  document.getElementById("locationInput").value = "";
  document.getElementById("serviceInput").value = "";
  document.getElementById("minAge").value = "";
  document.getElementById("maxAge").value = "";
  document.getElementById("sortBy").value = "";
  filteredUsers = [...users];
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
  const maxPage = Math.ceil(filteredUsers.length / usersPerPage);
  if (currentPage < maxPage) {
    currentPage++;
    renderUsers();
  }
});

function showPopup(message) {
  const popup = document.getElementById("messagePopup");
  const text = document.getElementById("popupText");
  text.innerText = message;
  popup.classList.remove("hidden");
  setTimeout(() => popup.classList.add("hidden"), 2000);
}

// Back to Top button
const backToTop = document.getElementById("backToTop");
window.addEventListener("scroll", () => {
  backToTop.style.display = window.scrollY > 200 ? "block" : "none";
});
backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Theme toggle
const themeToggle = document.getElementById("themeToggle");
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

// Initial render
renderUsers();
