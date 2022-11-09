import AWS from "aws-sdk";
import commonMiddleware from "../lib/commonMiddleware";
import createError from "http-errors";

const dynamodb = new AWS.DynamoDB.DocumentClient();

async function getAuction(event, context) {
  try {
    let auction;
    const { id } = event.pathParameters;

    const result = await dynamodb
      .get({
        TableName: "AuctionsTable",
        Key: { id },
      })
      .promise();

    auction = result.Item;

    if (!auction) {
      throw new createError.NotFound(`Auction with ID "${id}" not found!`);
    }

    return {
      statusCode: 200, //resource created status code
      body: JSON.stringify(auction),
    };
  } catch (error) {
    console.log("error --->>", error);
    throw new createError.InternalServerError(error);
  }
}

export const handler = commonMiddleware(getAuction);
