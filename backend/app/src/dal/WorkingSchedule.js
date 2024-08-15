import DynamoTable from './DynamoTable.js';
import FilterExpressionBuilder from './util/FilterExpressionBuilder.js';

const TABLE_NAME = process.env.WORKING_SCHEDULE_TABLE_NAME || 'WorkingSchedule';

class WorkingScheduleTable extends DynamoTable {
  
  async query(criteria) {
    const exBuilder = new FilterExpressionBuilder();

    criteria.gpId && exBuilder.addCriteria('gpId', '=', criteria.gpId);
    criteria.scheduleStartDate && exBuilder.addCriteria('date', '>=', criteria.scheduleStartDate);
    criteria.scheduleEndDate && exBuilder.addCriteria('date', '<=', criteria.scheduleEndDate);

    return this.dynamo.scan({TableName: TABLE_NAME, ...exBuilder.build()});
  }

}

const WorkingSchedule = new WorkingScheduleTable(TABLE_NAME);

export default WorkingSchedule;
