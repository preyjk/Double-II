import { dynamo } from './DynamoDB.js'
import { v4 as uuidv4 } from 'uuid';
import FilterExpressionBuilder from './util/FilterExpressionBuilder.js';

const TABLE_NAME = process.env.APPOINTMENT_TABLE_NAME || 'Appointments';

class Appointment {
  static async list() {
    const params = {
      TableName: TABLE_NAME
    };
    return dynamo.scan(params);
  }

  static async create(data) {
    const item = {
      id: uuidv4(),
      ...data,
    };
    const params = {
      TableName: TABLE_NAME,
      Item: item
    };
    await dynamo.put(params);
    return item;
  }

  static async findById(appointmentId) {
    const params = {
      TableName: TABLE_NAME,
      Key: { id: appointmentId }
    };
    return dynamo.get(params);
  }

  static async findByIdAndUpdate(data) {
    const appointmentId = data.id;
    delete data.id;

    const params = {
      TableName: TABLE_NAME,
      Key: { id: appointmentId },
      UpdateExpression: '',
      ExpressionAttributeNames: {},
      ExpressionAttributeValues: {},
      ReturnValues: 'ALL_NEW'
    };

    const updateExpressions = [];
    Object.keys(data).forEach((key, index) => {
      const attributeKey = `#attr${index}`;
      const valueKey = `:val${index}`;
      updateExpressions.push(`${attributeKey} = ${valueKey}`);
      params.ExpressionAttributeNames[attributeKey] = key;
      params.ExpressionAttributeValues[valueKey] = data[key];
    });

    params.UpdateExpression = 'set ' + updateExpressions.join(', ');

    return dynamo.update(params);
  }

  static async findByIdAndDelete(appointmentId) {
    const params = {
      TableName: TABLE_NAME,
      Key: { id: appointmentId }
    };
    return dynamo.delete(params);
  }

  static async query(criteria) {
    
    const exBuilder = new FilterExpressionBuilder();
    
    criteria.clinicName && exBuilder.addCriteria('clinicName', '=', criteria.clinicName);
    criteria.gpId && exBuilder.addCriteria('gpId', '=', criteria.gpId);
    criteria.appointmentStartDate && exBuilder.addCriteria('date', '>=', criteria.appointmentStartDate);
    criteria.appointmentEndDate && exBuilder.addCriteria('date', '<=', criteria.appointmentEndDate);

    return dynamo.scan({TableName: TABLE_NAME, ...exBuilder.build()});    
  }

  static criteria(params, key, op, value) {
    const attributeKey = `#attr_${key}`;
    const valueKey = `:val_${key}`;  
    params.ExpressionAttributeNames[attributeKey] = key;
    params.ExpressionAttributeValues[valueKey] = value;
    return `${attributeKey} ${op} ${valueKey}`;
  }

}

export default Appointment;
