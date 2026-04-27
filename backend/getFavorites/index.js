const AWS = require("aws-sdk");
const db = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  const userId = event.queryStringParameters?.userId || "demo";

  const data = await db.query({
    TableName: process.env.TABLE,
    KeyConditionExpression: "userId = :u",
    ExpressionAttributeValues: {
      ":u": userId
    }
  }).promise();

  return {
    statusCode: 200,
    headers: cors(),
    body: JSON.stringify(data.Items)
  };
};

function cors() {
  return {
    "Access-Control-Allow-Origin": "*"
  };
}