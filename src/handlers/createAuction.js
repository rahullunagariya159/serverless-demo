import { v4 as uuid } from "uuid";
import AWS from "aws-sdk";
import commonMiddleware from "../lib/commonMiddleware";
import createError from "http-errors";

const dynamodb = new AWS.DynamoDB.DocumentClient();

async function createAuction(event, context) {
  const { title } = event.body;
  const now = new Date();
  try {
    const auction = {
      id: uuid(),
      title,
      status: "OPEN",
      createdAt: now.toISOString(),
    };

    await dynamodb
      .put({
        TableName: "AuctionsTable",
        Item: auction,
      })
      .promise();

    return {
      statusCode: 201, //resource created status code
      body: JSON.stringify(auction),
    };
  } catch (error) {
    console.log("error --->>", error);
    throw new createError.InternalServerError(error);
  }
}

export const handler = commonMiddleware(createAuction);
