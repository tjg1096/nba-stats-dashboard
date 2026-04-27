exports.handler = async () => {
  try {
    const today = new Date().toISOString().split("T")[0];

    const response = await fetch(
      `https://api.balldontlie.io/v1/games?dates[]=${today}`,
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

    return {
      statusCode: 200,
      headers: cors(),
      body: text
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: cors(),
      body: JSON.stringify({
        message: "Failed to fetch today's games",
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