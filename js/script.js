console.log("✅ home.js loaded successfully");

document.addEventListener("DOMContentLoaded", () => {
  const names = [
    "Roma", "Katrina", "Priya", "Sonam", "Anamika", "Pooja", "Rani", "Sapna", "Kajal", "Neha",
    "Preeti", "Nisha", "Divya", "Komal", "Radha"
  ];

  const categories = ["College Girl", "Bhabhi", "Aunty"];
  const subCategories = ["Model", "Celebrity", "News Anchor", "Bollywood Model"];
  const descriptions = [
    "Happy endings, Role Play, Custom makeups, Hot dresses, full moanings",
    "Blowjob, Hairjob, All positions, Kamasutra Positions, Full satisfaction",
    "69 style, shower romance, tight experience, fantasy moves, kissing passion",
    "Late night passion, body worship, full girlfriend vibe, wild experiments",
    "GFE, dance shows, strip tease, foreplay master, creamy touch, full romance"
  ];
  const locations = [
    "Charbagh, Lucknow", "Aliganj, Lucknow", "Gomtinagar, Lucknow", "Chinhat, Lucknow",
    "Naka, Lucknow", "Alambagh, Lucknow", "Para, Lucknow", "Ashiyana, Lucknow",
    "Indiranagar, Lucknow", "Mahanagar, Lucknow", "Kaisharbagh, Lucknow", "BBD City, Lucknow",
    "Lucknow University City", "Matiyari, Lucknow"
  ];

  const users = [];
  for (let i = 1; i <= 15; i++) {
    const age = 18 + (i % 30);
    let category = "Other";
    if (age >= 18 && age <= 25) category = "College Girl";
    else if (age >= 26 && age <= 35) category = "Bhabhi";
    else if (age >= 36 && age <= 45) category = "Aunty";

    const subCat = subCategories.sort(() => 0.5 - Math.random()).slice(0, 2).join(", ");
    const name = names[i - 1] || `User${i}`;

    users.push({
      name,
      age,
      height: 150 + (i % 50),
      category,
      subCategory: subCat,
      location: locations[i % locations.length],
      description: descriptions[i % descriptions.length],
      rank: i,
      image: `../images/user${i}.jpg`
    });
  }

  let currentPage = 1;
  const usersPerPage = 5;

  function renderUsers(page) {
    const start = (page - 1) * usersPerPage;
    const end = start + usersPerPage;
    const pageUsers = users.slice(start, end);
    const container = document.getElementById("userContainer");
    const pageNumber = document.getElementById("pageNumber");

    container.innerHTML = '';
    pageUsers.forEach(user => {
      const card = document.createElement("div");
      card.className = "user-card";
      card.innerHTML = `
        <span class="verified-badge">✔ Verified</span>
        <div class="user-image-container">
          <img src="${user.image}" alt="${user.name}" />
        </div>
        <div class="user-info">
          <p><strong>Name:</strong> ${user.name}</p>
          <p><strong>Age:</strong> ${user.age} &nbsp;&nbsp;|&nbsp;&nbsp; <strong>Height:</strong> ${user.height} cm</p>
          <p><strong>Category:</strong> ${user.category}</p>
          <p><strong>Sub-Category:</strong> ${user.subCategory}</p>
          <p><strong>Location:</strong> ${user.location}</p>
          <p><strong>Description:</strong> ${user.description}</p>
          <p><strong>Rank:</strong> ${user.rank}</p>
        </div>
        <div class="user-actions">
          <button class="action-btn neon-button" onclick="callUser('${user.name}')">Call Me</button>
          <button class="action-btn neon-button" onclick="chatUser('${user.name}')">Chat Me</button>
          <button class="action-btn neon-button" onclick="likeUser('${user.name}')">Like Me</button>
        </div>
      `;
      container.appendChild(card);
    });

    pageNumber.textContent = `Page ${page}`;
    document.getElementById("prevPage").disabled = page === 1;
    document.getElementById("nextPage").disabled = page >= Math.ceil(users.length / usersPerPage);
  }

  document.getElementById("prevPage").addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      renderUsers(currentPage);
    }
  });

  document.getElementById("nextPage").addEventListener("click", () => {
    if (currentPage < Math.ceil(users.length / usersPerPage)) {
      currentPage++;
      renderUsers(currentPage);
    }
  });

  renderUsers(currentPage);

  // Back to top
  const backToTop = document.getElementById("backToTop");
  window.addEventListener("scroll", () => {
    backToTop.style.display = window.scrollY > 300 ? "block" : "none";
  });
  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Theme toggle
  document.getElementById("themeToggle").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    document.body.classList.toggle("light-mode");
  });
});

function showPopup(message) {
  document.getElementById("popupMessage").textContent = message;
  document.getElementById("popupBox").classList.remove("hidden");
}

function closePopup() {
  document.getElementById("popupBox").classList.add("hidden");
}

function callUser(name) {
  showPopup(`📞 Calling ${name}...`);
}

function chatUser(name) {
  showPopup(`💬 Starting chat with ${name}...`);
}

function likeUser(name) {
  showPopup(`❤️ You liked ${name}!`);
}
