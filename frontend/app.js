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
    <p>${player.team.full_name} (${player.team.abbreviation})</p>
    <p>${player.team.conference} • ${player.team.division}</p>
    <p>Position: ${player.position || "N/A"}</p>
    <button onclick='saveFavorite(${JSON.stringify(player)})'>Save</button>
  </div>
` ;
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
      name: `${player.first_name} ${player.last_name}`,
      team: player.team?.full_name || "Unknown",
      abbreviation: player.team?.abbreviation || "N/A",
      conference: player.team?.conference || "N/A",
      division: player.team?.division || "N/A",
      position: player.position || "N/A"
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
        <p>${player.team || "Unknown"} (${player.abbreviation || "N/A"})</p>
        <p>${player.conference || "N/A"} • ${player.division || "N/A"}</p>
        <p>Position: ${player.position || "N/A"}</p>
        <button onclick="deleteFavorite('${player.playerId}')">Remove</button>
      </div>
    `;
  });
}

async function deleteFavorite(playerId) {
  const response = await fetch(`${API_BASE_URL}/favorite?playerId=${playerId}`, {
    method: "DELETE"
  });

  const result = await response.json();

  if (result.success) {
    alert("Favorite removed!");
    loadFavorites();
  } else {
    alert("Could not remove favorite.");
  }
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
    const gameTime = new Date(game.status);

    statsDiv.innerHTML += `
      <div class="card">
        <h3>${game.visitor_team.full_name} vs ${game.home_team.full_name}</h3>
        <p>Game Time: ${gameTime.toLocaleString("en-US", {
          timeZone: "America/New_York",
          weekday: "short",
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "2-digit"
        })}</p>
        <p>Status: ${game.period > 0 ? "In Progress / Final" : "Scheduled"}</p>
        <p>Score: ${game.visitor_team_score} - ${game.home_team_score}</p>
      </div>
    `;
  });
}

loadFavorites();