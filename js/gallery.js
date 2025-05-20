// Load users from localStorage (assumes JSON array format)
const users = JSON.parse(localStorage.getItem("users")) || [];

// Pagination
let currentPage = 1;
const usersPerPage = 10;
let filteredUsers = [...users];

const userCardsContainer = document.getElementById("userCards");
const pageNumber = document.getElementById("pageNumber");

// Render user cards
function renderCards(usersToRender) {
  userCardsContainer.innerHTML = "";

  const start = (currentPage - 1) * usersPerPage;
  const end = start + usersPerPage;
  const pageUsers = usersToRender.slice(start, end);

  pageUsers.forEach(user => {
    const card = document.createElement("div");
    card.className = "user-card";

    card.innerHTML = `
      <img src="${user.image || 'images/default.jpg'}" alt="${user.name}" style="width:100%; border-radius:10px;">
      <h3>${user.name}</h3>
      <p>Age: ${user.age}</p>
      <p>Location: ${user.location}</p>
      <p>Category: ${user.category}</p>
      <div style="margin-top:10px; display:flex; gap:10px;">
        <button onclick="alert('Calling ${user.name}...')">📞 Call</button>
        <button onclick="alert('Chatting with ${user.name}...')">💬 Chat</button>
        <button onclick="alert('You liked ${user.name}!')">❤️ Like</button>
      </div>
    `;
    userCardsContainer.appendChild(card);
  });

  pageNumber.textContent = `Page ${currentPage}`;
}

// Filter function
function applyFilters() {
  const location = document.getElementById("filter-location").value;
  const age = document.getElementById("filter-age").value;
  const category = document.getElementById("filter-category").value;

  filteredUsers = users.filter(user => {
    const matchLocation = location === "" || user.location === location;
    const matchCategory = category === "" || user.category === category;
    const matchAge =
      age === "" ||
      (age === "18-25" && user.age >= 18 && user.age <= 25) ||
      (age === "26-35" && user.age >= 26 && user.age <= 35);

    return matchLocation && matchCategory && matchAge;
  });

  currentPage = 1;
  renderCards(filteredUsers);
}

// Event listeners
document.getElementById("applyFilter").addEventListener("click", applyFilters);
document.getElementById("prevPage").addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    renderCards(filteredUsers);
  }
});
document.getElementById("nextPage").addEventListener("click", () => {
  const maxPage = Math.ceil(filteredUsers.length / usersPerPage);
  if (currentPage < maxPage) {
    currentPage++;
    renderCards(filteredUsers);
  }
});

// Dark mode toggle
document.getElementById("themeToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

// Back to top
const backToTop = document.getElementById("backToTop");
window.addEventListener("scroll", () => {
  backToTop.style.display = window.scrollY > 100 ? "block" : "none";
});
backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Initial render
renderCards(filteredUsers);
