import WorkingSchedule from '../dal/WorkingSchedule.js';
import { dynamo } from '../dal/DynamoDB.js';

class WorkingScheduleService {
  static async listSchedules({ doctorId, scheduleStartDate, scheduleEndDate }) {
    const data = await dynamo.send(WorkingSchedule.query({ doctorId, scheduleStartDate, scheduleEndDate }));
    return { success: true, data: data.Items };
  }

  static async createSchedule(scheduleData) {
    const putCommand = WorkingSchedule.create({...scheduleData, Status: 'available'});
    await dynamo.send(putCommand);
    return { success: true, data: putCommand.input.Item };
  }

  static async getScheduleById(scheduleId) {
    const result = await dynamo.send(WorkingSchedule.findById(scheduleId));
    if (result.Item) {
      return { success: true, data: result.Item };
    } else {
      return { success: false, message: 'Schedule not found' };
    }
  }

  static async updateSchedule(scheduleData) {
    const updatedSchedule = await dynamo.send(WorkingSchedule.findByIdAndUpdate(scheduleData));
    return { success: true, data: updatedSchedule.Attributes };
  }

  static async deleteSchedule(scheduleId) {
    await dynamo.send(WorkingSchedule.findByIdAndDelete(scheduleId));
    return { success: true, message: 'Schedule deleted successfully' };
  }

  static async getAvailableDates({ doctorId, startDate, endDate }) {
    const data = await dynamo.send(WorkingSchedule.query({ doctorId, scheduleStartDate: startDate, scheduleEndDate: endDate }));
    console.log(data);
    const availableDates = data.Items.reduce((acc, schedule) => {
      if (schedule.Status === 'available') {
        acc.add(schedule.Date);
      }
      return acc;
    }, new Set());
    return { success: true, data: Array.from(availableDates) };
  }

  static async getTimeSlots({ doctorId, date }) {
    const data = await dynamo.send(WorkingSchedule.findByDoctorIdAndDate(doctorId, date));
    return { success: true, data: data.Items.map(item => ({
      Id: item.Id,
      StartTime: item.StartTime,
      EndTime: item.EndTime,
      Status: item.Status
    }))};
  }

}

export default WorkingScheduleService;
