exports.handler = async () => {
  const response = await fetch("https://api.balldontlie.io/v1/teams", {
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