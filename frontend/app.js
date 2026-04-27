const API = "https://vfhkxgciej.execute-api.us-east-1.amazonaws.com/Prod/";

async function searchPlayer() {
  const search = document.getElementById("search").value;

  const res = await fetch(`${API}/players?search=${search}`);
  const data = await res.json();

  const container = document.getElementById("players");
  container.innerHTML = "";

  data.data.forEach(player => {
    const div = document.createElement("div");

    div.innerHTML = `
      ${player.first_name} ${player.last_name}
      <button onclick="saveFavorite(${player.id}, '${player.first_name} ${player.last_name}')">
        Save
      </button>
    `;

    container.appendChild(div);
  });
}

async function saveFavorite(player) {
  await fetch(`${API_BASE_URL}/favorite`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      playerId: String(player.id),
      name: `${player.first_name} ${player.last_name}`
    })
  });

  alert("Favorite saved!");
}

async function loadFavorites() {
  const res = await fetch(`${API}/favorites`);
  const data = await res.json();

  const container = document.getElementById("favorites");
  container.innerHTML = "";

  data.forEach(fav => {
    const div = document.createElement("div");
    div.innerText = fav.name;
    container.appendChild(div);
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