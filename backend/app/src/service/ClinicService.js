import Doctor from '../dal/Doctor.js';

class ClinicService {
  static async listClinics() {
    const data = await Doctor.list();
    const workplaces = new Set();
    data.Items.forEach(item => {
      if (item.WorkofPlace) {
        workplaces.add({ workplace: item.WorkofPlace, address: item.address});
      }
    });
    return { success: true, data: Array.from(workplaces) };
  }

}

export default ClinicService;
