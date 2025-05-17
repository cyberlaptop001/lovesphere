// admin.js - Handles login logic for admin.html

function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (username === "admin" && password === "Cyber@Laptop_0071709%") {
    window.location.href = "admin-panel.html";
  } else {
    alert("Invalid credentials! Please try again.");
  }
}
