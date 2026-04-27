exports.handler = async (event) => {
  try {
    const season = event.queryStringParameters?.season || "2024";
    const perPage = event.queryStringParameters?.per_page || "5";

    const response = await fetch(
      `https://api.balldontlie.io/v1/games?seasons[]=${season}&per_page=${perPage}`,
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
        message: "Failed to fetch game stats",
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