import request from "@/api/axios";

/*
  public appointments
*/
export const createAppointment_public = async function (formData) {
  const config = {
    url: "/public/appointments",
    method: "post",
    data: {
      ScheduleId: formData.ScheduleId,
      FirstName: formData.FirstName,
      LastName: formData.LastName,
      DateOfBirth: formData.DateOfBirth,
      Phone: formData.Phone,
      Email: formData.Email,
      Address: formData.Address,
    },
  };

  try {
    const res = await request(config);
    console.log("Public appointment created successfully:", res.data);
    return res.data;
  } catch (err) {
    console.error("Error creating public appointment:", err);
    throw err;
  }
};

export const rescheduleAppointment_public = async function (formData) {
  const config = {
    url: "/public/appointments/reschedule",
    method: "put",
    data: {
      BookingReference: formData.BookingReference,
      LastName: formData.LastName,
      DateOfBirth: formData.DateOfBirth,
      ScheduleId: formData.ScheduleId,
    },
  };

  try {
    const res = await request(config);
    console.log("Public appointment rescheduled successfully:", res.data);
    return res.data;
  } catch (err) {
    console.error("Error rescheduling public appointment:", err);
    throw err;
  }
};

export const cancelAppointment_public = async function (formData) {
  const config = {
    url: "/public/appointments/cancel",
    method: "put",
    data: {
      BookingReference: formData.BookingReference,
      LastName: formData.LastName,
      DateOfBirth: formData.DateOfBirth,
    },
  };

  try {
    const res = await request(config);
    console.log("Public appointment canceled successfully:", res.data);
    return res.data;
  } catch (err) {
    console.error("Error canceling public appointment:", err);
    throw err;
  }
};

export const getSchedules_public = async function (doctorId, startDate, endDate) {
  const config = {
    url: "/admin/schedules",
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

/*
  user appointments
*/
export const getAppointments_user = async function () {
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

export const createAppointment_user = async function (formData, token) {
  const config = {
    url: "/user/appointments",
    method: "post",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      ScheduleId: formData.ScheduleId,
      FirstName: formData.FirstName,
      LastName: formData.LastName,
      DateOfBirth: formData.DateOfBirth,
      Phone: "",
      Email: "",
      Reason: formData.Reason,
      // Status: formData.Status,
      // BookingReference: formData.BookingReference,
      // DoctorId: formData.DoctorId,
      // DoctorName: formData.DoctorName,
      // Date: formData.Date,
      // StartTime: formData.StartTime,
      // EndTime: formData.EndTime,
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

export const getAppointmentById_user = async function (appointmentId) {
  const token = localStorage.getItem("authToken");

  if (!token) {
    throw new Error("Token not found. Please log in again.");
  }

  const config = {
    url: `/user/appointments/${appointmentId}`,
    method: "get",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const res = await request(config);
    console.log("Appointment fetched successfully:", res.data);
    return res.data;
  } catch (err) {
    console.error("Error fetching appointment:", err);
    throw err;
  }
};

export const rescheduleAppointment_user = async function (appointmentId, scheduleId, token) {
  const config = {
    url: `/user/appointments/${appointmentId}/reschedule`,
    method: "put",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      ScheduleId: scheduleId,
    },
  };

  try {
    const res = await request(config);
    console.log("Appointment rescheduled successfully:", res.data);
    return res.data;
  } catch (err) {
    console.error("Error rescheduling appointment:", err);
    throw err;
  }
};

export const deleteAppointment_user = async function (appointmentId) {
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

export const cancelAppointment_user = async function (appointmentId) {
  const token = localStorage.getItem("authToken");

  if (!token) {
    throw new Error("Token not found. Please log in again.");
  }

  const config = {
    url: `/user/appointments/${appointmentId}/cancel`,
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


/*
  admin appointments
*/
export const getAppointments_admin = async function (token) {
  const config = {
    url: "/admin/appointments",
    method: "get",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const res = await request(config);
    console.log("Admin appointments fetched successfully:", res.data);
    return res.data;
  } catch (err) {
    console.error("Error fetching admin appointments:", err);
    throw err;
  }
};

export const getSchedules_admin = async function (doctorId, startDate, endDate) {
  const config = {
    url: "/admin/schedules",
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

export const completeAppointment_admin = async function (appointmentId, token) {
  const config = {
    url: `/admin/appointments/${appointmentId}/complete`,
    method: "put",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const res = await request(config);
    console.log("Appointment marked as complete successfully:", res.data);
    return res.data;
  } catch (err) {
    console.error("Error completing appointment:", err);
    throw err;
  }
};

export const addSchedule_admin = async function (formData, token) {
  const config = {
    url: "/admin/schedules",
    method: "post",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      DoctorId: formData.DoctorId,
      DoctorName: formData.DoctorName,
      Date: formData.Date,
      StartTime: formData.StartTime,
      EndTime: formData.EndTime,
    },
  };

  try {
    const res = await request(config);
    console.log("Schedule added successfully:", res.data);
    return res.data;
  } catch (err) {
    console.error("Error adding schedule:", err);
    throw err;
  }
};