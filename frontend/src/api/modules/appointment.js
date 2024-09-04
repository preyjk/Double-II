import request from "@/api/axios";

export const makeAppointment = async function (formData, token) {
  const config = {
    url: "/user/appointments",
    method: "post",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      Id: formData.Id,
      FirstName: formData.FirstName,
      LastName: formData.LastName,
      DateOfBirth: formData.DateOfBirth,
      BookingReference: formData.BookingReference,
      ScheduleId: formData.ScheduleId,
      DoctorId: formData.DoctorId,
      DoctorName: formData.DoctorName,
      Date: formData.Date,
      StartTime: formData.StartTime,
      EndTime: formData.EndTime,
      Reason: formData.Reason,
      Status: formData.Status,
    },
  };

  try {
    const res = await request(config);
    console.log("Appointment booked successfully:", res.data);
    return res.data;
  } catch (err) {
    console.error("Error booking appointment:", err);
    throw err;
  }
};

export const getAppointments = async function () {
  const token = localStorage.getItem("authToken");

  if (!token) {
    throw new Error("Token not found. Please log in again.");
  }

  const config = {
    url: "/user/appointments",
    method: "get",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const res = await request(config);
    console.log("Appointments fetched successfully:", res.data);
    return res.data;
  } catch (err) {
    console.error("Error fetching appointments:", err);
    throw err;
  }
};

export const deleteAppointment = async function (appointmentId) {
  const token = localStorage.getItem("authToken");

  if (!token) {
    throw new Error("Token not found. Please log in again.");
  }

  const config = {
    url: `/user/appointments/${appointmentId}`,
    method: "delete",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const res = await request(config);
    console.log("Appointment deleted successfully:", res.data);
    return res.data;
  } catch (err) {
    console.error("Error deleting appointment:", err);
    throw err;
  }
};

export const cancelAppointment = async function (appointmentId) {
  const token = localStorage.getItem("authToken");

  if (!token) {
    throw new Error("Token not found. Please log in again.");
  }

  const config = {
    url: `/appointments/${appointmentId}/cancel`,
    method: "post",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const res = await request(config);
    console.log("Appointment canceled successfully:", res.data);
    return res.data;
  } catch (err) {
    console.error("Error canceling appointment:", err);
    throw err;
  }
};

export const getSchedules = async function (doctorId, startDate, endDate) {
  const config = {
    url: "/schedules",
    method: "get",
    params: {
      doctorId,
      startDate,
      endDate,
    },
  };

  try {
    const res = await request(config);
    return res.data;
  } catch (err) {
    console.error("Error fetching schedules:", err);
    throw err;
  }
};
