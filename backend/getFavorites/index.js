const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, QueryCommand } = require("@aws-sdk/lib-dynamodb");

const db = DynamoDBDocumentClient.from(new DynamoDBClient({}));

exports.handler = async (event) => {
  try {
    const userId = event.queryStringParameters?.userId || "demo";

    const data = await db.send(new QueryCommand({
      TableName: process.env.TABLE,
      KeyConditionExpression: "userId = :u",
      ExpressionAttributeValues: {
        ":u": userId
      }
    }));

    return {
      statusCode: 200,
      headers: cors(),
      body: JSON.stringify(data.Items)
    };
  } catch (error) {
    console.error("GetFavorites error:", error);

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
    "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
  };
}