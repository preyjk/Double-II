import Doctor from '../dal/Doctor.mjs';
import ClinicService from '../service/ClinicService.mjs';

jest.mock('../dal/Doctor.mjs');

describe('ClinicService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should list all clinics', async () => {
    const mockData = { Items: [
      { id: '1', name: 'Dr. Smith', WorkofPlace: "wp1" }, 
      { id: '2', name: 'Dr. Zhang', WorkofPlace: "wp2" }] };
    Doctor.list.mockResolvedValue(mockData);

    const result = await ClinicService.listClinics();
    expect(result.success).toBe(true);
    expect(result.data).toEqual([{workplace: 'wp1'}, {workplace: 'wp2'}]);
  });
});