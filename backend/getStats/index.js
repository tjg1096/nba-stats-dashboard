exports.handler = async (event) => {
  try {
    const playerId = event.queryStringParameters?.playerId;

    if (!playerId) {
      return {
        statusCode: 400,
        headers: cors(),
        body: JSON.stringify({ message: "Missing playerId" })
      };
    }

    const response = await fetch(
      `https://api.balldontlie.io/v1/players/${playerId}`,
      {
        headers: {
          Authorization: process.env.API_KEY
        }
      }
    );

    const text = await response.text();

    if (!response.ok) {
      return {
        statusCode: response.status,
        headers: cors(),
        body: JSON.stringify({
          message: "balldontlie API error",
          response: text
        })
      };
    }

    const player = JSON.parse(text);

    return {
      statusCode: 200,
      headers: cors(),
      body: JSON.stringify({
        id: player.id,
        name: `${player.first_name} ${player.last_name}`,
        team: player.team?.full_name || "Unknown",
        position: player.position || "N/A",
        height: player.height || "N/A",
        weight: player.weight || "N/A"
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: cors(),
      body: JSON.stringify({
        message: "Failed to fetch player info",
        error: error.message
      })
    };
  }
};

function cors() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Methods": "GET,OPTIONS"
  };
}