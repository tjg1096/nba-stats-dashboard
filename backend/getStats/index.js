exports.handler = async (event) => {
  const playerId = event.queryStringParameters?.playerId;

  const url = playerId
    ? `https://api.balldontlie.io/v1/stats?player_ids[]=${playerId}&per_page=5`
    : `https://api.balldontlie.io/v1/stats?per_page=5`;

  const response = await fetch(url, {
    headers: {
      Authorization: process.env.API_KEY
    }
  });

  const data = await response.json();

  return {
    statusCode: 200,
    headers: cors(),
    body: JSON.stringify(data)
  };
};

function cors() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*"
  };
}