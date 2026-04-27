const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, PutCommand } = require("@aws-sdk/lib-dynamodb");

const db = DynamoDBDocumentClient.from(new DynamoDBClient({}));

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body || "{}");

    await db.send(new PutCommand({
      TableName: process.env.TABLE,
      Item: {
        userId: body.userId || "demo",
        playerId: String(body.playerId),
        name: body.name,
        team: body.team || "Unknown",
        abbreviation: body.abbreviation || "N/A",
        conference: body.conference || "N/A",
        division: body.division || "N/A",
        position: body.position || "N/A"
    }
    }));

    return {
      statusCode: 200,
      headers: cors(),
      body: JSON.stringify({ success: true })
    };
  } catch (error) {
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
    "Access-Control-Allow-Methods": "OPTIONS,POST,GET,DELETE"
  };
}