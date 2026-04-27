const AWS = require("aws-sdk");
const db = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body || "{}");

    await db.put({
      TableName: process.env.TABLE,
      Item: {
        userId: "demo",
        playerId: String(body.playerId),
        name: body.name
      }
    }).promise();

    return {
      statusCode: 200,
      headers: cors(),
      body: JSON.stringify({ success: true })
    };
  } catch (error) {
    console.error("Save favorite error:", error);

    return {
      statusCode: 500,
      headers: cors(),
      body: JSON.stringify({
        success: false,
        message: "Failed to save favorite"
      })
    };
  }
};

function cors() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
  };
}