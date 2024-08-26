import DynamoTable from './DynamoTable.js';
import { ScanCommand } from '@aws-sdk/lib-dynamodb';
import FilterExpressionBuilder from './util/FilterExpressionBuilder.js';

const TABLE_NAME = process.env.APPOINTMENT_TABLE_NAME || 'Appointments';

class AppointmentTable extends DynamoTable {

   query(criteria) {
    
    const exBuilder = new FilterExpressionBuilder();
    
    criteria.clinicName && exBuilder.addCriteria('ClinicName', '=', criteria.clinicName);
    criteria.doctorId && exBuilder.addCriteria('DoctorId', '=', criteria.doctorId);
    criteria.userId && exBuilder.addCriteria('UserId', '=', criteria.userId);
    criteria.appointmentStartDate && exBuilder.addCriteria('Date', '>=', criteria.appointmentStartDate);
    criteria.appointmentEndDate && exBuilder.addCriteria('Date', '<=', criteria.appointmentEndDate);

    return new ScanCommand({TableName: this.tableName, ...exBuilder.build()});    
  }

}

const Appointment = new AppointmentTable(TABLE_NAME);

export default Appointment;
