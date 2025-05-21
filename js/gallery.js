// js/gallery.js

const users = [];
const names = [
  "Ritika", "Priya", "Roma", "Lovy", "Anamika", "Simran", "Pooja", "Kajal", "Rani", "Sonam",
  "Divya", "Neha", "Nisha", "Sapna", "Sonia", "Komal", "Meena", "Kavita", "Sneha", "Rekha",
  "Aarti", "Pinky", "Kiran", "Shilpa", "Anjali", "Radha", "Tina", "Ruchi", "Payal", "Jaya",
  "Swati", "Monika", "Bhavna", "Karishma", "Roshni", "Naina", "Juhi", "Mahi", "Preeti", "Ayesha",
  "Sana", "Tanya", "Megha", "Trisha", "Diksha", "Isha", "Garima", "Twinkle", "Ira", "Rhea",
  "Kashish", "Nupur", "Seema", "Reena", "Chandni", "Shraddha", "Aparna", "Pallavi", "Mona", "Jenny",
  "Manju", "Vidya", "Yamini", "Sheetal", "Bharti", "Shweta", "Alka", "Archana", "Ritika", "Vandana",
  "Urvashi", "Namrata", "Surbhi", "Ragini", "Farah", "Rukhsar", "Rubina", "Shanaya", "Anushka", "Deepa",
  "Lata", "Barkha", "Harshita", "Asmita", "Gauri", "Heena", "Indu", "Kanika", "Kritika", "Leena",
  "Manisha", "Nimisha", "Ojaswi", "Padmini", "Rupali", "Sangeeta", "Tanisha", "Vaishali", "Zara", "Nargis"
];

const locations = [
  "Gomti Nagar", "Ashiyana", "Telebagh", "Para", "Aliganj", "Chinhat", "Indiranagar", "Mahanagar", "Kapoorthala",
  "Nishatganj", "Charbagh", "Naka", "Chauk", "Kaisarbagh", "Aishbagh", "PGI Road", "Patrakarpuram",
  "MunsiPuliya", "ThediPuliya", "BBD University city", "Lucknow University city", "Girls college"
];

for (let i = 0; i < 100; i++) {
  const name = names[i % names.length];
  const age = Math.floor(Math.random() * 23) + 18;
  const location = locations[Math.floor(Math.random() * locations.length)];

  let category = "";
  if (age <= 19) category = "College Girl";
  else if (age <= 30) category = "Bhabhi";
  else category = "Aunty";

  users.push({
    name,
    age,
    location,
    category,
    image: `images/user${i + 1}.jpg`
  });
}

const cardsPerPage = 20;
let currentPage = 1;
const container = document.getElementById("userCards");
const prevBtn = document.getElementById("prevPage");
const nextBtn = document.getElementById("nextPage");
const pageNumber = document.getElementById("pageNumber");

function displayUsers(page = 1) {
  container.innerHTML = "";
  const start = (page - 1) * cardsPerPage;
  const end = start + cardsPerPage;

  users.slice(start, end).forEach((user) => {
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

  pageNumber.textContent = `Page ${currentPage}`;
}

function applyFilters() {
  const nameFilter = document.querySelector("input[placeholder='Search by name...']").value.toLowerCase();
  const locationFilter = document.getElementById("filter-location").value;
  const ageMin = parseInt(document.getElementById("filter-age-min").value) || 18;
  const ageMax = parseInt(document.getElementById("filter-age-max").value) || 40;
  const categoryFilter = document.getElementById("filter-category").value;

  const filtered = users.filter(user => {
    return (
      user.name.toLowerCase().includes(nameFilter) &&
      (!locationFilter || user.location === locationFilter) &&
      user.age >= ageMin &&
      user.age <= ageMax &&
      (!categoryFilter || user.category === categoryFilter)
    );
  });

  renderFiltered(filtered);
}

function renderFiltered(list) {
  container.innerHTML = "";
  list.forEach(user => {
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
  pageNumber.textContent = `Filtered Result`;
  prevBtn.style.display = "none";
  nextBtn.style.display = "none";
}

document.getElementById("applyFilter").addEventListener("click", applyFilters);

prevBtn.onclick = () => {
  if (currentPage > 1) {
    currentPage--;
    displayUsers(currentPage);
  }
};

nextBtn.onclick = () => {
  const totalPages = Math.ceil(users.length / cardsPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    displayUsers(currentPage);
  }
};

document.getElementById("backToTop").onclick = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

// Initial Load
displayUsers(currentPage);
