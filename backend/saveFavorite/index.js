const AWS = require("aws-sdk");
const db = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  const body = JSON.parse(event.body);

  await db.put({
    TableName: process.env.TABLE,
    Item: {
      userId: "demo",
      playerId: body.playerId,
      name: body.name
    }
  }).promise();

  return {
    statusCode: 200,
    headers: cors(),
    body: JSON.stringify({ success: true })
  };
};

function cors() {
  return {
    "Access-Control-Allow-Origin": "*"
  };
}