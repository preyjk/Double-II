import Doctor from '../dal/Doctor.js';

class ClinicService {
  static async listClinics() {
    const data = await Doctor.list();
    const workplaces = new Set();
    const clinics = [];
    data.Items.forEach(item => {
      if (item.WorkofPlace && !workplaces.has(item.WorkofPlace)) {
        workplaces.add(item.WorkofPlace);
        clinics.push({ workplace: item.WorkofPlace, address: item.address});
      }
    });
    return { success: true, data: clinics };
  }

}

export default ClinicService;
