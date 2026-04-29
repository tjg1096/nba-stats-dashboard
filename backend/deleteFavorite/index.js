const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, DeleteCommand } = require("@aws-sdk/lib-dynamodb");

const db = DynamoDBDocumentClient.from(new DynamoDBClient({}));

exports.handler = async (event) => {
  try {
    const userId = event.queryStringParameters?.userId || "demo";
    const playerId = event.queryStringParameters?.playerId;

    if (!playerId) {
      return {
        statusCode: 400,
        headers: cors(),
        body: JSON.stringify({ success: false, message: "Missing playerId" })
      };
    }

    await db.send(new DeleteCommand({
      TableName: process.env.TABLE,
      Key: {
        userId: userId,
        playerId: String(playerId)
      }
    }));

    return {
      statusCode: 200,
      headers: cors(),
      body: JSON.stringify({ success: true })
    };
  } catch (error) {
    console.error("DeleteFavorite error:", error);

    return {
      statusCode: 500,
      headers: cors(),
      body: JSON.stringify({ success: false, message: error.message })
    };
  }
};

function cors() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Methods": "OPTIONS,GET,POST,DELETE"
  };
}