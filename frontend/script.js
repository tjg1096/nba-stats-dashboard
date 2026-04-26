const API_URL = "YOUR_API_GATEWAY_URL_HERE";

async function loadTeams() {
  const status = document.getElementById("status");
  const teamsDiv = document.getElementById("teams");

  status.textContent = "Loading teams...";
  teamsDiv.innerHTML = "";

  try {
    const response = await fetch(`${API_URL}/stats`);
    const data = await response.json();

    data.data.forEach(team => {
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <h2>${team.full_name}</h2>
        <p><strong>City:</strong> ${team.city}</p>
        <p><strong>Conference:</strong> ${team.conference}</p>
        <p><strong>Division:</strong> ${team.division}</p>
      `;

      teamsDiv.appendChild(card);
    });

    status.textContent = "Teams loaded successfully.";
  } catch (error) {
    console.error(error);
    status.textContent = "Error loading teams.";
  }
}