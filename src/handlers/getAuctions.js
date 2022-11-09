import AWS from "aws-sdk";
import commonMiddleware from "../lib/commonMiddleware";
import createError from "http-errors";

const dynamodb = new AWS.DynamoDB.DocumentClient();

async function getAuctions(event, context) {
  try {
    let auctions;
    const result = await dynamodb.scan({
        TableName: 'AuctionsTable'
    }).promise();
    auctions = result.Items;
    return {
      statusCode: 200, //resource created status code
      body: JSON.stringify(auctions),
    };
  } catch (error) {
    console.log("error --->>", error);
    throw new createError.InternalServerError(error);
  }
}

export const handler = commonMiddleware(getAuctions);
