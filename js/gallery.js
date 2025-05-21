// gallery.js

const userCardsContainer = document.getElementById("userCards");
const prevBtn = document.getElementById("prevPage");
const nextBtn = document.getElementById("nextPage");
const pageNumberSpan = document.getElementById("pageNumber");
const backToTopBtn = document.getElementById("backToTop");

const locationFilter = document.getElementById("filter-location");
const ageFilter = document.getElementById("filter-age");
const categoryFilter = document.getElementById("filter-category");
const applyFilterBtn = document.getElementById("applyFilter");

let currentPage = 1;
const profilesPerPage = 20;
let allUsers = [];

const names = [
  "Ritika", "Priya", "Roma", "Sonam", "Lovy", "Anamika", "Simran", "Kajal", "Pooja", "Neha",
  "Sapna", "Komal", "Tina", "Nisha", "Divya", "Shreya", "Megha", "Nikita", "Isha", "Roshni",
  "Sneha", "Payal", "Aarti", "Sana", "Preeti", "Khushi", "Mansi", "Rekha", "Rani", "Jyoti",
  "Muskan", "Pinky", "Swati", "Rupali", "Bhavna", "Kirti", "Tanvi", "Ritu", "Alisha", "Deepika",
  "Sakshi", "Heena", "Radha", "Pallavi", "Rubi", "Rakhi", "Madhu", "Kiran", "Seema", "Chandni",
  "Ayesha", "Jaya", "Monika", "Anita", "Lata", "Reshma", "Pari", "Tanya", "Twinkle", "Jhanvi",
  "Sheetal", "Farah", "Tanu", "Zoya", "Kavita", "Namrata", "Rupal", "Reema", "Mahima", "Shruti",
  "Aastha", "Devanshi", "Vaishali", "Garima", "Ridhima", "Arohi", "Anju", "Bhumi", "Suman", "Naina",
  "Diya", "Richa", "Shalini", "Ankita", "Chhavi", "Urvashi", "Shweta", "Mithila", "Nargis", "Surbhi",
  "Kanika", "Payal", "Meera", "Nandini", "Avantika", "Archana", "Prerna", "Karishma", "Ira", "Ishita"
];

const locations = [
  "Gomti Nagar", "Ashiyana", "Telebagh", "Para", "Aliganj", "Chinhat", "Indiranagar", "Mahanagar",
  "Kapoorthala", "Nishatganj", "Charbagh", "Naka", "Chauk", "Kaisarbagh", "Aishbagh", "PGI Road",
  "Patrakarpuram", "MunsiPuliya", "ThediPuliya", "BBD University city", "Lucknow University city", "Girls college"
];

function generateProfiles() {
  const users = [];
  for (let i = 1; i <= 100; i++) {
    const age = Math.floor(Math.random() * 23) + 18;
    let category = "";
    if (age <= 19) category = "College Girl";
    else if (age >= 20 && age <= 30) category = "Bhabhi";
    else if (age >= 35) category = "Aunty";
    const name = names[i - 1] || `User${i}`;
    users.push({
      id: i,
      name,
      age,
      location: locations[Math.floor(Math.random() * locations.length)],
      category,
      image: `images/user${i}.jpg`
    });
  }
  return users;
}

function renderUsers(users) {
  userCardsContainer.innerHTML = "";
  const startIndex = (currentPage - 1) * profilesPerPage;
  const endIndex = startIndex + profilesPerPage;
  const usersToShow = users.slice(startIndex, endIndex);

  usersToShow.forEach((user) => {
    const card = document.createElement("div");
    card.className = "user-card";
    card.innerHTML = `
      <div class="user-image-container">
        <img class="user-img" src="${user.image}" alt="${user.name}" />
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
    userCardsContainer.appendChild(card);
  });

  pageNumberSpan.textContent = `Page ${currentPage}`;
}

function applyFilters() {
  let filtered = [...allUsers];
  const loc = locationFilter.value;
  const age = ageFilter.value;
  const cat = categoryFilter.value;

  if (loc) filtered = filtered.filter(u => u.location === loc);
  if (age === "18-25") filtered = filtered.filter(u => u.age >= 18 && u.age <= 25);
  if (age === "26-35") filtered = filtered.filter(u => u.age >= 26 && u.age <= 35);
  if (age === "36-40") filtered = filtered.filter(u => u.age >= 36 && u.age <= 40);
  if (cat) filtered = filtered.filter(u => u.category === cat);

  currentPage = 1;
  renderUsers(filtered);
}

function initGallery() {
  allUsers = generateProfiles();
  renderUsers(allUsers);

  applyFilterBtn.addEventListener("click", applyFilters);
  prevBtn.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      renderUsers(allUsers);
    }
  });
  nextBtn.addEventListener("click", () => {
    if ((currentPage * profilesPerPage) < allUsers.length) {
      currentPage++;
      renderUsers(allUsers);
    }
  });

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  document.getElementById("themeToggle").addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
    document.body.classList.toggle("dark-mode");
  });
}

document.addEventListener("DOMContentLoaded", initGallery);
