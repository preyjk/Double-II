import DoctorService from '../service/DoctorService.mjs';
import Doctor from '../dal/Doctor.mjs';

jest.mock('../dal/Doctor.mjs');

describe('DoctorService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should list all doctors', async () => {
    const mockData = { Items: [{ id: '1', name: 'Dr. Smith' }] };
    Doctor.list.mockResolvedValue(mockData);

    const result = await DoctorService.listDoctors();
    expect(result.success).toBe(true);
    expect(result.data).toEqual(mockData.Items);
  });

  test('should create a new doctor', async () => {
    const doctorData = { name: 'Dr. Smith', specialty: 'Cardiology' };
    const mockDoctor = { id: '1', ...doctorData };
    Doctor.create.mockResolvedValue(mockDoctor);

    const result = await DoctorService.createDoctor(doctorData);
    expect(result.success).toBe(true);
    expect(result.data).toEqual(mockDoctor);
  });

  test('should get a doctor by ID', async () => {
    const doctorId = '1';
    const mockDoctor = { id: doctorId, name: 'Dr. Smith' };
    Doctor.findById.mockResolvedValue({ Item: mockDoctor });

    const result = await DoctorService.getDoctorById(doctorId);
    expect(result.success).toBe(true);
    expect(result.data).toEqual(mockDoctor);
  });

  test('should return error if doctor not found by ID', async () => {
    const doctorId = '1';
    Doctor.findById.mockResolvedValue({});

    const result = await DoctorService.getDoctorById(doctorId);
    expect(result.success).toBe(false);
    expect(result.message).toBe('Doctor not found');
  });

  test('should update an existing doctor', async () => {
    const doctorId = '1';
    const updateData = { id: doctorId, name: 'Dr. John Smith' };
    const mockUpdatedDoctor = { Attributes: updateData };
    Doctor.findByIdAndUpdate.mockResolvedValue(mockUpdatedDoctor);

    const result = await DoctorService.updateDoctor(updateData);
    expect(result.success).toBe(true);
    expect(result.data).toEqual(updateData);
  });

  test('should delete a doctor', async () => {
    const doctorId = '1';
    Doctor.findByIdAndDelete.mockResolvedValue({});

    const result = await DoctorService.deleteDoctor(doctorId);
    expect(result.success).toBe(true);
    expect(result.message).toBe('Doctor deleted successfully');
  });

  test('should list doctors by workplace', async () => {
    const workplace = 'Hospital A';
    const mockData = { Items: [{ id: '1', name: 'Dr. Smith', WorkofPlace: workplace }] };
    Doctor.findByProperty.mockResolvedValue(mockData);

    const result = await DoctorService.listDoctorsByWorkplace(workplace);
    expect(result.success).toBe(true);
    expect(result.data).toEqual(mockData.Items);
  });
});
