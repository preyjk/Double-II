import Doctor from '../dal/Doctor.js';

class ClinicService {
  static async listClinics() {
    const data = await Doctor.list();
    const workplaces = new Set();
    const clinics = [];
    data.Items.forEach(item => {
      if (item.Workplace && !workplaces.has(item.Workplace)) {
        workplaces.add(item.Workplace);
        clinics.push({ workplace: item.Workplace, address: item.Address});
      }
    });
    return { success: true, data: clinics };
  }

}

export default ClinicService;
