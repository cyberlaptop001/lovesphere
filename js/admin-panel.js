let users = JSON.parse(localStorage.getItem('galleryUsers')) || [];

function logout() {
  alert("Logging out...");
  window.location.href = "admin.html";
}

function previewImage(inputId, imgId) {
  const imgUrl = document.getElementById(inputId).value;
  const imgElement = document.getElementById(imgId);
  if (imgUrl) {
    imgElement.src = imgUrl;
    imgElement.style.display = 'block';
  } else {
    imgElement.style.display = 'none';
  }
}

function findUser() {
  const searchValue = document.getElementById('findUserName').value.toLowerCase().trim();
  const user = users.find(u =>
    u.name.toLowerCase() === searchValue ||
    u.id.toString() === searchValue ||
    u.rank.toString() === searchValue
  );
  if (user) {
    showUserDetails(user);
  } else {
    alert("User not found. Check Name, ID or Rank.");
    cancelEdit();
  }
}

function showUserDetails(user) {
  document.getElementById('userDetails').style.display = 'flex';
  document.getElementById('editUserId').value = user.id;
  document.getElementById('editUserName').value = user.name;
  document.getElementById('editUserAge').value = user.age;
  document.getElementById('editUserDesc').value = user.description;
  document.getElementById('editUserRank').value = user.rank;
  document.getElementById('editUserImage').value = user.image;
  previewImage('editUserImage', 'editPreview');
  renderMobileNumbers(user);
}

function renderMobileNumbers(user) {
  const list = document.getElementById('mobileNumbersList');
  list.innerHTML = '';
  if (!user.mobileNumbers) user.mobileNumbers = [];
  user.mobileNumbers.forEach((mob, idx) => {
    const li = document.createElement('li');
    li.textContent = `${mob.number} (${mob.type})`;
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.className = 'edit-btn';
    editBtn.onclick = () => editMobileNumber(user.id, idx);
    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    delBtn.className = 'delete-btn';
    delBtn.onclick = () => deleteMobileNumber(user.id, idx);
    li.appendChild(editBtn);
    li.appendChild(delBtn);
    list.appendChild(li);
  });
}

function addMobileNumber() {
  const number = document.getElementById('newMobileNumber').value.trim();
  const type = document.getElementById('newMobileType').value;
  const userId = parseInt(document.getElementById('editUserId').value);
  if (!number) return alert("Enter mobile number");

  const user = users.find(u => u.id === userId);
  if (!user.mobileNumbers) user.mobileNumbers = [];
  user.mobileNumbers.push({ number, type });

  localStorage.setItem('galleryUsers', JSON.stringify(users));
  renderMobileNumbers(user);
  document.getElementById('newMobileNumber').value = '';
  alert("Mobile number added!");
}

function editMobileNumber(userId, index) {
  const user = users.find(u => u.id === userId);
  if (!user || !user.mobileNumbers[index]) return;
  const mob = user.mobileNumbers[index];
  const newNumber = prompt("Edit number:", mob.number);
  const newType = prompt("Edit type (call/chat/both):", mob.type);
  if (newNumber && newType) {
    user.mobileNumbers[index] = { number: newNumber.trim(), type: newType.trim() };
    localStorage.setItem('galleryUsers', JSON.stringify(users));
    renderMobileNumbers(user);
  }
}

function deleteMobileNumber(userId, index) {
  const user = users.find(u => u.id === userId);
  if (!user || !user.mobileNumbers[index]) return;
  if (!confirm("Delete this mobile number?")) return;
  user.mobileNumbers.splice(index, 1);
  localStorage.setItem('galleryUsers', JSON.stringify(users));
  renderMobileNumbers(user);
}

function updateUser() {
  const id = parseInt(document.getElementById('editUserId').value);
  const user = users.find(u => u.id === id);
  if (user) {
    user.name = document.getElementById('editUserName').value.trim();
    user.age = parseInt(document.getElementById('editUserAge').value);
    user.description = document.getElementById('editUserDesc').value.trim();
    user.rank = parseInt(document.getElementById('editUserRank').value);
    user.image = document.getElementById('editUserImage').value.trim();
    localStorage.setItem('galleryUsers', JSON.stringify(users));
    alert("User updated!");
    loadUsers();
    cancelEdit();
  }
}

function removeUser() {
  const id = parseInt(document.getElementById('editUserId').value);
  if (!confirm("Are you sure you want to remove this user?")) return;
  users = users.filter(u => u.id !== id);
  localStorage.setItem('galleryUsers', JSON.stringify(users));
  alert("User removed.");
  loadUsers();
  cancelEdit();
}

function cancelEdit() {
  document.getElementById('userDetails').style.display = 'none';
}

function addUser() {
  const name = document.getElementById('addUserName').value.trim();
  const age = parseInt(document.getElementById('addUserAge').value);
  const desc = document.getElementById('addUserDesc').value.trim();
  const rank = parseInt(document.getElementById('addUserRank').value);
  const image = document.getElementById('addUserImage').value.trim();
  if (!name || !age || !desc || !rank || !image) return alert("Fill all fields");

  const newId = users.length ? Math.max(...users.map(u => u.id)) + 1 : 1;
  users.push({ id: newId, name, age, description: desc, rank, image, mobileNumbers: [] });
  localStorage.setItem('galleryUsers', JSON.stringify(users));
  alert("User added!");
  loadUsers();

  // Reset
  document.getElementById('addUserName').value = '';
  document.getElementById('addUserAge').value = '';
  document.getElementById('addUserDesc').value = '';
  document.getElementById('addUserRank').value = '';
  document.getElementById('addUserImage').value = '';
  document.getElementById('addPreview').style.display = 'none';
}

function assignMobileToUsers() {
  const number = document.getElementById('assignMobileNumber').value.trim();
  const type = document.getElementById('assignMobileType').value;
  const target = document.getElementById('assignTarget').value;
  const input = document.getElementById('assignUserInput').value.trim();

  if (!number) return alert("Enter mobile number");

  let matched = [];

  if (target === 'all') {
    matched = users;
  } else {
    const parts = input.split(',').map(s => s.trim().toLowerCase());
    matched = users.filter(u =>
      parts.includes(u.name.toLowerCase()) ||
      parts.includes(u.id.toString()) ||
      parts.includes(u.rank.toString())
    );
    if (!matched.length) return alert("No users matched");
  }

  matched.forEach(u => {
    if (!u.mobileNumbers) u.mobileNumbers = [];
    if (!u.mobileNumbers.some(m => m.number === number && m.type === type)) {
      u.mobileNumbers.push({ number, type });
    }
  });

  localStorage.setItem('galleryUsers', JSON.stringify(users));
  alert(`Mobile number assigned to ${matched.length} user(s)`);

  const editingId = parseInt(document.getElementById('editUserId').value);
  if (editingId) {
    const current = users.find(u => u.id === editingId);
    if (current) renderMobileNumbers(current);
  }

  document.getElementById('assignMobileNumber').value = '';
  document.getElementById('assignUserInput').value = '';
}

function saveBanner() {
  const text = document.getElementById('bannerMessage').value;
  localStorage.setItem('adminBanner', text);
  alert("Banner saved");
}

function saveAdminUpdate() {
  const text = document.getElementById('adminUpdateText').value.trim();
  if (!text) return alert("Enter update");
  const updates = JSON.parse(localStorage.getItem('adminUpdates') || '[]');
  updates.unshift({ text, time: new Date().toLocaleString() });
  localStorage.setItem('adminUpdates', JSON.stringify(updates));
  document.getElementById('adminUpdateText').value = '';
  renderAdminUpdates();
}

function renderAdminUpdates() {
  const updates = JSON.parse(localStorage.getItem('adminUpdates') || '[]');
  const list = document.getElementById('adminUpdatesList');
  list.innerHTML = '';
  updates.forEach((u, i) => {
    list.innerHTML += `
      <div class="update-box">
        <strong>${u.time}</strong><br />
        <span>${u.text}</span>
        <button class="edit-btn" onclick="editAdminUpdate(${i})">Edit</button>
        <button class="delete-btn" onclick="deleteAdminUpdate(${i})">Delete</button>
      </div>`;
  });
}

function editAdminUpdate(index) {
  const updates = JSON.parse(localStorage.getItem('adminUpdates') || '[]');
  const text = prompt("Edit update:", updates[index].text);
  if (text) {
    updates[index].text = text;
    localStorage.setItem('adminUpdates', JSON.stringify(updates));
    renderAdminUpdates();
  }
}

function deleteAdminUpdate(index) {
  const updates = JSON.parse(localStorage.getItem('adminUpdates') || '[]');
  if (!confirm("Delete update?")) return;
  updates.splice(index, 1);
  localStorage.setItem('adminUpdates', JSON.stringify(updates));
  renderAdminUpdates();
}

function loadUsers() {
  const tbody = document.getElementById('userTable').querySelector('tbody');
  tbody.innerHTML = '';
  users.forEach(u => {
    tbody.innerHTML += `
      <tr>
        <td>${u.id}</td>
        <td>${u.name}</td>
        <td>${u.age}</td>
        <td>${u.description}</td>
        <td>${u.rank}</td>
        <td><img src="${u.image}" alt="${u.name}" style="width:50px;height:50px;border-radius:8px;"></td>
      </tr>`;
  });
}

document.addEventListener('DOMContentLoaded', () => {
  loadUsers();
  renderAdminUpdates();

  document.getElementById("findUserName").addEventListener("keypress", e => {
    if (e.key === "Enter") findUser();
  });

  const savedBanner = localStorage.getItem('adminBanner');
  if (savedBanner) document.getElementById("bannerMessage").value = savedBanner;
});
