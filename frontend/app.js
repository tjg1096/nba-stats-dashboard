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
        <button onclick="getStats('${player.id}')">View Stats</button>
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

async function getStats(playerId) {
  const response = await fetch(`${API_BASE_URL}/stats?playerId=${playerId}`);
  const data = await response.json();

  const statsDiv = document.getElementById("statsResults");
  statsDiv.innerHTML = "";

  data.data.forEach(stat => {
    statsDiv.innerHTML += `
      <div class="card">
        <h3>${stat.player.first_name} ${stat.player.last_name}</h3>
        <p>Points: ${stat.pts}</p>
        <p>Rebounds: ${stat.reb}</p>
        <p>Assists: ${stat.ast}</p>
        <p>Steals: ${stat.stl}</p>
        <p>Blocks: ${stat.blk}</p>
      </div>
    `;
  });
}

loadFavorites();