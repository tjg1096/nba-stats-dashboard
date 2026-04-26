const API = "YOUR_API_URL";

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

async function saveFavorite(id, name) {
  await fetch(`${API}/favorite`, {
    method: "POST",
    body: JSON.stringify({
      playerId: id,
      name: name
    })
  });

  loadFavorites();
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

loadFavorites();