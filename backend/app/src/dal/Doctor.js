import DynamoTable from "./DynamoTable.js";
const TABLE_NAME = process.env.DOCTOR_TABLE_NAME || 'Doctors';

class DoctorTable extends DynamoTable {

}

const Doctor = new DoctorTable(TABLE_NAME);

export default Doctor;
