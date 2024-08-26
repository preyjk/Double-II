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

}

export default WorkingScheduleService;
