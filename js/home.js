console.log("✅ home.js loaded successfully");

document.addEventListener("DOMContentLoaded", () => {
    const users = [];
    for (let i = 1; i <= 15; i++) {
      users.push({
        name: `User${i}`,
        age: 18 + (i % 30),
        height: 150 + (i % 50),
        services: i % 2 === 0 ? 'Modeling, Dancing' : 'Photography, Acting',
        location: i % 3 === 0 ? 'Los Angeles, USA' : i % 3 === 1 ? 'Paris, France' : 'Tokyo, Japan',
        description: `I am User ${i}, excited to connect with you! Let's explore something amazing together.`,
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
            <p><strong>Name:</strong> ${user.name} &nbsp;&nbsp; | &nbsp;&nbsp; <strong>Age:</strong> ${user.age} &nbsp;&nbsp; | &nbsp;&nbsp; <strong>Height:</strong> ${user.height} cm</p>
            <p><strong>Services:</strong> ${user.services}</p>
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
  