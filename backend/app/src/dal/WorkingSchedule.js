import DynamoTable from './DynamoTable.js';
import FilterExpressionBuilder from './util/FilterExpressionBuilder.js';

const TABLE_NAME = process.env.WORKING_SCHEDULE_TABLE_NAME || 'WorkingSchedule';

class WorkingScheduleTable extends DynamoTable {
  
  async query(criteria) {
    const exBuilder = new FilterExpressionBuilder();

    criteria.doctorId && exBuilder.addCriteria('DoctorId', '=', criteria.doctorId);
    criteria.scheduleStartDate && exBuilder.addCriteria('Date', '>=', criteria.scheduleStartDate);
    criteria.scheduleEndDate && exBuilder.addCriteria('Date', '<=', criteria.scheduleEndDate);

    return this.dynamo.scan({TableName: TABLE_NAME, ...exBuilder.build()});
  }

}

const WorkingSchedule = new WorkingScheduleTable(TABLE_NAME);

export default WorkingSchedule;
