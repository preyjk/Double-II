import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb';
import { v4 as uuidv4 } from 'uuid';

const dynamo = DynamoDBDocument.from(
  process.env.ENV == 'local' ?
    new DynamoDB({ endpoint: process.env.DYNAMODB_ENDPOINT }) :
    new DynamoDB()
);

const TABLE_NAME = 'Appointments';

export const listAppointments = async (event) => {
  try {
    const params = {
      TableName: TABLE_NAME
    };
    const data = await dynamo.scan(params);
    return {
      statusCode: 200,
      body: JSON.stringify(data.Items)
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' })
    };
  }
};

export const createAppointment = async (event) => {

  try {
    const body = JSON.parse(event.body);
    const item = {
      id: uuidv4(),
      status: 'pending',
      ...body,
    };
    const params = {
      TableName: TABLE_NAME,
      Item: item
    };
    await dynamo.put(params);
    return {
      statusCode: 201,
      body: JSON.stringify(item)
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' })
    };
  }
};

export const getAppointmentById = async (event) => {
  try {
    const appointmentId = event.pathParameters.appointmentId;
    const params = {
      TableName: TABLE_NAME,
      Key: { id: appointmentId }
    };
    const data = await dynamo.get(params);
    if (data.Item) {
      return {
        statusCode: 200,
        body: JSON.stringify(data.Item)
      };
    } else {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: 'Appointment not found' })
      };
    }
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' })
    };
  }
};

export const updateAppointment = async (event) => {
  try {
    const appointmentId = event.pathParameters.appointmentId;
    const body = JSON.parse(event.body);
    const params = {
      TableName: TABLE_NAME,
      Key: { id: appointmentId },
      UpdateExpression: '',
      ExpressionAttributeNames: {},
      ExpressionAttributeValues: {},
      ReturnValues: 'ALL_NEW'
    };

    const updateExpressions = [];
    Object.keys(body).forEach((key, index) => {
      const attributeKey = `#attr${index}`;
      const valueKey = `:val${index}`;
      updateExpressions.push(`${attributeKey} = ${valueKey}`);
      params.ExpressionAttributeNames[attributeKey] = key;
      params.ExpressionAttributeValues[valueKey] = body[key];
    });

    params.UpdateExpression = 'set ' + updateExpressions.join(', ');

    const data = await dynamo.update(params);
    return {
      statusCode: 200,
      body: JSON.stringify(data.Attributes)
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' })
    };
  }
};

export const deleteAppointment = async (event) => {
  try {
    const appointmentId = event.pathParameters.appointmentId;
    const params = {
      TableName: TABLE_NAME,
      Key: { id: appointmentId }
    };
    await dynamo.delete(params);
    return {
      statusCode: 204
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' })
    };
  }
};

export const cancelAppointment = async (event) => {
  try {
    const appointmentId = event.pathParameters.appointmentId;
    const params = {
      TableName: TABLE_NAME,
      Key: { id: appointmentId },
      UpdateExpression: 'set #status = :s',
      ExpressionAttributeNames: {
        '#status': 'status'
      },
      ExpressionAttributeValues: {
        ':s': 'cancelled'
      },
      ReturnValues: 'ALL_NEW'
    };
    const data = await dynamo.update(params);
    return {
      statusCode: 200,
      body: JSON.stringify(data.Attributes)
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' })
    };
  }
};