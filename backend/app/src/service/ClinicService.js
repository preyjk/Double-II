import Doctor from '../dal/Doctor.js';

class ClinicService {
  static async listClinics() {
    const data = await Doctor.list();
    const workplaces = new Set();
    data.Items.forEach(item => {
      if (item.WorkofPlace) {
        workplaces.add(item.WorkofPlace);
      }
    });
    return { success: true, data: Array.from(workplaces).map(workplace => ({ workplace })) };
  }

}

export default ClinicService;
