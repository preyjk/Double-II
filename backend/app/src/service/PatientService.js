import Patient from '../dal/Patient.js';

class PatientService {
  static async listPatients() {
    const data = await Patient.list();
    return { success: true, data: data.Items };
  }

  static async createPatient(patientData) {
    const newPatient = await Patient.create(patientData);
    return { success: true, data: newPatient };
  }

  static async getPatientById(patientId) {
    const result = await Patient.findById(patientId);
    if (result.Item) {
      return { success: true, data: result.Item };
    } else {
      return { success: false, message: 'Patient not found' };
    }
  }

  static async updatePatient(patientData) {
    const updatedPatient = await Patient.findByIdAndUpdate(patientData);
    return { success: true, data: updatedPatient.Attributes };
  }

  static async deletePatient(patientId) {
    await Patient.findByIdAndDelete(patientId);
    return { success: true, message: 'Patient deleted successfully' };
  }

  static async getPatientByUserId(userId) {
    const result = await Patient.findByUserId(userId);
    return { success: true, data: result.Items };
  }
}

export default PatientService;
