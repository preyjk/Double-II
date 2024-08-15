import DynamoTable from './DynamoTable.js';
import FilterExpressionBuilder from './util/FilterExpressionBuilder.js';

const TABLE_NAME = process.env.APPOINTMENT_TABLE_NAME || 'Appointments';

class AppointmentTable extends DynamoTable {

   async query(criteria) {
    
    const exBuilder = new FilterExpressionBuilder();
    
    criteria.clinicName && exBuilder.addCriteria('clinicName', '=', criteria.clinicName);
    criteria.gpId && exBuilder.addCriteria('gpId', '=', criteria.gpId);
    criteria.userId && exBuilder.addCriteria('userId', '=', criteria.userId);
    criteria.appointmentStartDate && exBuilder.addCriteria('date', '>=', criteria.appointmentStartDate);
    criteria.appointmentEndDate && exBuilder.addCriteria('date', '<=', criteria.appointmentEndDate);

    return this.dynamo.scan({TableName: this.tableName, ...exBuilder.build()});    
  }
}

const Appointment = new AppointmentTable(TABLE_NAME);

export default Appointment;
