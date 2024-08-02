import crypto from 'crypto';
import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'JWT_SECRET';

const dynamodb = DynamoDBDocument.from(
  process.env.ENV == 'local' ?
    new DynamoDB({ endpoint: process.env.DYNAMODB_ENDPOINT }) :
    new DynamoDB()
);

const TABLE_NAME = 'Users';

export const signupHandler = async (event) => {
  const body = JSON.parse(event.body);
  const username = body.username;
  const password = body.password;
  
  const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
  
  const params = {
    TableName: TABLE_NAME,
    Item: {
      username: username,
      password: hashedPassword
    },
    ConditionExpression: 'attribute_not_exists(username)'
  };
  
  try {
    await dynamodb.put(params);
    return {
      statusCode: 200,
      body: JSON.stringify('Signup successful')
    };
  } catch (error) {
    console.error(error);
    if (error.name === 'ConditionalCheckFailedException') {
      return {
        statusCode: 400,
        body: JSON.stringify('User already exists')
      };
    } else {
      return {
        statusCode: 500,
        body: JSON.stringify('Internal server error')
      };
    }
  }
};

export const loginHandler = async (event) => {
  const body = JSON.parse(event.body);
  const username = body.username;
  const password = body.password;
  
  const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
  
  const params = {
    TableName: TABLE_NAME,
    Key: {
      username: username
    }
  };
  
  try {
    const result = await dynamodb.get(params);
    if (result.Item && result.Item.password === hashedPassword) {
      const token = jwt.sign({ username: username }, JWT_SECRET, { expiresIn: '1h' });
      return {
        statusCode: 200,
        body: JSON.stringify({ token: token })
      };
    } else {
      return {
        statusCode: 401,
        body: JSON.stringify('Unauthorized')
      };
    }
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify('Internal server error')
    };
  }
};
