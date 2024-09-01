import DynamoTable from './DynamoTable.js';
import { QueryCommand } from '@aws-sdk/lib-dynamodb';
import FilterExpressionBuilder from './util/FilterExpressionBuilder.js';

const TABLE_NAME = process.env.WORKING_SCHEDULE_TABLE_NAME || 'WorkingSchedule';
const DOCTORID_DATE_INDEX = 'DoctorIdAndDateIndex';

class WorkingScheduleTable extends DynamoTable {

  query(criteria) {
    const filterExpressionBuilder = new FilterExpressionBuilder();
    criteria.doctorId && filterExpressionBuilder.addCriteria('DoctorId', '=', criteria.doctorId);
    criteria.scheduleStartDate && !criteria.scheduleEndDate
      && filterExpressionBuilder.addCriteria('Date', '>=', criteria.scheduleStartDate);
    criteria.scheduleEndDate && !criteria.scheduleStartDate
      && filterExpressionBuilder.addCriteria('Date', '<=', criteria.scheduleEndDate);
    criteria.scheduleStartDate && criteria.scheduleEndDate
      && filterExpressionBuilder.addCriteria('Date', 'BETWEEN', [criteria.scheduleStartDate, criteria.scheduleEndDate]);
    const filterExpression = filterExpressionBuilder.build();
    return new QueryCommand({
      TableName: this.tableName,
      IndexName: DOCTORID_DATE_INDEX,
      KeyConditionExpression: filterExpression.FilterExpression,
      ExpressionAttributeNames: filterExpression.ExpressionAttributeNames,
      ExpressionAttributeValues: filterExpression.ExpressionAttributeValues
    });
  }

  findByDoctorIdAndDate(doctorId, date) {
    return new QueryCommand({
      TableName: this.tableName,
      IndexName: DOCTORID_DATE_INDEX,
      KeyConditionExpression: '#DoctorId = :doctorId AND #Date = :date',
      ExpressionAttributeNames: {
        '#DoctorId': 'DoctorId',
        '#Date': 'Date'
      },
      ExpressionAttributeValues: {
        ':doctorId': doctorId,
        ':date': date
      }
    });
  }

}

const WorkingSchedule = new WorkingScheduleTable(TABLE_NAME);

export default WorkingSchedule;
