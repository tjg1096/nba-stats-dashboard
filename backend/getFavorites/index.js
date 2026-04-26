const AWS = require("aws-sdk");
const db = new AWS.DynamoDB.DocumentClient();

exports.handler = async () => {
  const data = await db.scan({
    TableName: process.env.TABLE
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