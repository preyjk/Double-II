import WorkingSchedule from '../dal/WorkingSchedule.js';

class WorkingScheduleService {
  static async listSchedules({ gpId, scheduleStartDate, scheduleEndDate }) {
    const data = await WorkingSchedule.query({ gpId, scheduleStartDate, scheduleEndDate });
    return { success: true, data: data.Items };
  }

  static async createSchedule(scheduleData) {
    const newSchedule = await WorkingSchedule.create(scheduleData);
    return { success: true, data: newSchedule };
  }

  static async getScheduleById(scheduleId) {
    const result = await WorkingSchedule.findById(scheduleId);
    if (result.Item) {
      return { success: true, data: result.Item };
    } else {
      return { success: false, message: 'Schedule not found' };
    }
  }

  static async updateSchedule(scheduleData) {
    const updatedSchedule = await WorkingSchedule.findByIdAndUpdate(scheduleData);
    return { success: true, data: updatedSchedule.Attributes };
  }

  static async deleteSchedule(scheduleId) {
    await WorkingSchedule.findByIdAndDelete(scheduleId);
    return { success: true, message: 'Schedule deleted successfully' };
  }

}

export default WorkingScheduleService;
