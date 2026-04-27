const API_BASE_URL = "https://vfhkxgciej.execute-api.us-east-1.amazonaws.com/Prod";

async function searchPlayer() {
  const search = document.getElementById("searchInput").value;

  const response = await fetch(`${API_BASE_URL}/players?search=${search}`);
  const data = await response.json();

  const playersDiv = document.getElementById("playersResults");
  playersDiv.innerHTML = "";

  data.data.forEach(player => {
    playersDiv.innerHTML += `
      <div class="card">
        <h3>${player.first_name} ${player.last_name}</h3>
        <p>Team: ${player.team.full_name}</p>
        <button onclick='saveFavorite(${JSON.stringify(player)})'>Save</button>
      </div>
    `;
  });
}

async function saveFavorite(player) {
  const response = await fetch(`${API_BASE_URL}/favorite`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      playerId: String(player.id),
      name: `${player.first_name} ${player.last_name}`
    })
  });

  const result = await response.json();

  if (result.success) {
    alert(`${player.first_name} ${player.last_name} saved!`);
    loadFavorites();
  } else {
    alert("Favorite did not save.");
  }
}

async function loadFavorites() {
  const response = await fetch(`${API_BASE_URL}/favorites`);
  const favorites = await response.json();

  const favoritesDiv = document.getElementById("favoritesResults");
  favoritesDiv.innerHTML = "";

  favorites.forEach(player => {
    favoritesDiv.innerHTML += `
      <div class="card">
        <h3>${player.name}</h3>
      </div>
    `;
  });
}

async function getStats() {
  const response = await fetch(`${API_BASE_URL}/stats`);
  const data = await response.json();

  const statsDiv = document.getElementById("statsResults");
  statsDiv.innerHTML = "";

  if (!data.data || data.data.length === 0) {
    statsDiv.innerHTML = `<p>No games today.</p>`;
    return;
  }

  data.data.forEach(game => {
    statsDiv.innerHTML += `
      <div class="card">
        <h3>${game.visitor_team.full_name} vs ${game.home_team.full_name}</h3>
        <p>Status: ${game.status}</p>
        <p>Date: ${new Date(game.date).toLocaleString()}</p>
        <p>Score: ${game.visitor_team_score} - ${game.home_team_score}</p>
      </div>
    `;
  });
}

loadFavorites();