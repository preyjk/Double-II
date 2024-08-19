import DynamoTable from "./DynamoTable.js";
import FilterExpressionBuilder from "./util/FilterExpressionBuilder.js";
const TABLE_NAME = process.env.DOCTOR_TABLE_NAME || 'Doctors';

class DoctorTable extends DynamoTable {

   async query(criteria) {
    
    const exBuilder = new FilterExpressionBuilder();
    
    criteria.firstname && exBuilder.addCriteria('FirstName', '=', criteria.firstname);
    criteria.lastname && exBuilder.addCriteria('LastName', '=', criteria.lastname);
    criteria.workplace && exBuilder.addCriteria('Workplace', '=', criteria.workplace);
    
    return this.dynamo.scan({TableName: this.tableName, ...exBuilder.build()});    
  }
}

const Doctor = new DoctorTable(TABLE_NAME);

export default Doctor;
