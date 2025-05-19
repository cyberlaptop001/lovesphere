document.addEventListener("DOMContentLoaded", () => {
  const usersPerPage = 12;
  let currentPage = 1;
  let users = JSON.parse(localStorage.getItem("users")) || [];
  let filteredUsers = [...users];

  const userCardsContainer = document.getElementById("userCards");
  const resultCount = document.getElementById("resultCount");

  const popup = document.getElementById("messagePopup");
  const popupText = document.getElementById("popupText");

  const renderUsers = () => {
    userCardsContainer.innerHTML = "";
    const start = (currentPage - 1) * usersPerPage;
    const paginatedUsers = filteredUsers.slice(start, start + usersPerPage);

    paginatedUsers.forEach((user, index) => {
      const card = document.createElement("div");
      card.classList.add("user-card");

      card.innerHTML = `
        <img src="${user.image}" alt="${user.name}" class="user-image" />
        <div class="user-info">
          <h3>${user.name}</h3>
          <p><strong>Age:</strong> ${user.age}</p>
          <p><strong>Location:</strong> ${user.location}</p>
          <p><strong>Services:</strong> ${user.services.join(", ")}</p>
          <div class="button-row">
            <button class="call-btn neon-button">📞 Call</button>
            <button class="chat-btn neon-button">💬 Chat</button>
            <button class="like-btn neon-button">❤️ Like</button>
          </div>
        </div>
      `;
      userCardsContainer.appendChild(card);
    });

    resultCount.textContent = `Showing ${paginatedUsers.length} of ${filteredUsers.length} profiles`;
    document.getElementById("pageNumber").textContent = `Page ${currentPage}`;
    addCardEventListeners();
  };

  const addCardEventListeners = () => {
    document.querySelectorAll(".like-btn").forEach(btn => {
      btn.addEventListener("click", () => showPopup("❤️ Liked!"));
    });
    document.querySelectorAll(".call-btn").forEach(btn => {
      btn.addEventListener("click", () => showPopup("📞 Calling..."));
    });
    document.querySelectorAll(".chat-btn").forEach(btn => {
      btn.addEventListener("click", () => showPopup("💬 Opening chat..."));
    });
  };

  const showPopup = (message) => {
    popupText.textContent = message;
    popup.classList.remove("hidden");
    setTimeout(() => popup.classList.add("hidden"), 2000);
  };

  const applyFilters = () => {
    const name = document.getElementById("searchInput").value.toLowerCase();
    const location = document.getElementById("locationInput").value.toLowerCase();
    const services = document.getElementById("serviceInput").value.toLowerCase();
    const minAge = parseInt(document.getElementById("minAge").value);
    const maxAge = parseInt(document.getElementById("maxAge").value);
    const sortBy = document.getElementById("sortBy").value;

    filteredUsers = users.filter(user => {
      return (
        user.name.toLowerCase().includes(name) &&
        user.location.toLowerCase().includes(location) &&
        user.services.join(", ").toLowerCase().includes(services) &&
        (!minAge || user.age >= minAge) &&
        (!maxAge || user.age <= maxAge)
      );
    });

    if (sortBy) {
      filteredUsers.sort((a, b) => {
        if (sortBy === "age" || sortBy === "rank") return a[sortBy] - b[sortBy];
        return a[sortBy].localeCompare(b[sortBy]);
      });
    }

    currentPage = 1;
    renderUsers();
  };

  document.getElementById("filterBtn").addEventListener("click", applyFilters);
  document.getElementById("clearFilterBtn").addEventListener("click", () => {
    document.querySelectorAll("#filterBar input, #filterBar select").forEach(input => input.value = "");
    filteredUsers = [...users];
    currentPage = 1;
    renderUsers();
  });

  document.getElementById("nextPage").addEventListener("click", () => {
    if ((currentPage * usersPerPage) < filteredUsers.length) {
      currentPage++;
      renderUsers();
    }
  });

  document.getElementById("prevPage").addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      renderUsers();
    }
  });

  renderUsers();
});
