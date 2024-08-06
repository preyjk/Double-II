import AppointmentService from '../service/AppointmentService.mjs';
import Appointment from '../dal/Appointment.mjs';

jest.mock('../dal/Appointment.mjs');

describe('AppointmentService', () => {
  const mockAppointment = {
    id: '1',
    title: 'Test Appointment',
    date: '2023-01-01',
  };

  describe('listAppointments', () => {
    it('should return a list of appointments', async () => {
      Appointment.list.mockResolvedValue({ Items: [mockAppointment] });
      const result = await AppointmentService.listAppointments();
      expect(result.success).toBe(true);
      expect(result.data).toEqual([mockAppointment]);
    });

    it('should throw an error on exceptions', async () => {
      Appointment.list.mockRejectedValue(new Error('Some error'));
      await expect(AppointmentService.listAppointments()).rejects.toThrow('Some error');
    });
  });

  describe('createAppointment', () => {
    it('should return the created appointment', async () => {
      Appointment.create.mockResolvedValue(mockAppointment);
      const result = await AppointmentService.createAppointment(mockAppointment);
      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockAppointment);
    });

    it('should throw an error on exceptions', async () => {
      Appointment.create.mockRejectedValue(new Error('Some error'));
      await expect(AppointmentService.createAppointment(mockAppointment)).rejects.toThrow('Some error');
    });
  });

  describe('getAppointmentById', () => {
    it('should return an appointment if found', async () => {
      Appointment.findById.mockResolvedValue({ Item: mockAppointment });
      const result = await AppointmentService.getAppointmentById(mockAppointment.id);
      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockAppointment);
    });

    it('should return an error message if appointment not found', async () => {
      Appointment.findById.mockResolvedValue({});
      const result = await AppointmentService.getAppointmentById(mockAppointment.id);
      expect(result.success).toBe(false);
      expect(result.message).toBe('Appointment not found');
    });

    it('should throw an error on exceptions', async () => {
      Appointment.findById.mockRejectedValue(new Error('Some error'));
      await expect(AppointmentService.getAppointmentById(mockAppointment.id)).rejects.toThrow('Some error');
    });
  });

  describe('updateAppointment', () => {
    it('should return the updated appointment', async () => {
      Appointment.findByIdAndUpdate.mockResolvedValue({ Attributes: mockAppointment });
      const result = await AppointmentService.updateAppointment(mockAppointment);
      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockAppointment);
    });

    it('should throw an error on exceptions', async () => {
      Appointment.findByIdAndUpdate.mockRejectedValue(new Error('Some error'));
      await expect(AppointmentService.updateAppointment(mockAppointment)).rejects.toThrow('Some error');
    });
  });

  describe('deleteAppointment', () => {
    it('should return success message when appointment is deleted', async () => {
      Appointment.findByIdAndDelete.mockResolvedValue();
      const result = await AppointmentService.deleteAppointment(mockAppointment.id);
      expect(result.success).toBe(true);
      expect(result.message).toBe('Appointment deleted successfully');
    });

    it('should throw an error on exceptions', async () => {
      Appointment.findByIdAndDelete.mockRejectedValue(new Error('Some error'));
      await expect(AppointmentService.deleteAppointment(mockAppointment.id)).rejects.toThrow('Some error');
    });
  });
});
