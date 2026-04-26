export const handler = async () => {
  try {
    const response = await fetch("https://api.balldontlie.io/v1/teams", {
      headers: {
        Authorization: process.env.BALLDONTLIE_API_KEY
      }
    });

    const data = await response.json();

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*"
      },
      body: JSON.stringify(data)
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({ error: "Failed to load NBA data" })
    };
  }
};