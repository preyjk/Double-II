import request from "./netUtils";

export const login = function (username, password) {
  const config = {
    url: "/login",
    method: "post",
    data: { username, password },
  };
  return request(config)
    .then((res) => {
      const token = res.data.token;
      console.log("Token received:", token);
      return token;
    })
    .catch((err) => {
      console.error("Error during login:", err);
      throw err;
    });
};

export const register = function (username, password) {
  const config = {
    url: "/signup",
    method: "post",
    data: { username, password },
  };

  return request(config)
    .then((res) => {
      console.log("Registration successful:", res.data);
      return res.data;
    })
    .catch((err) => {
      console.error("Error during registration:", err);
      throw err;
    });
};

export const makeAppointment = function (formData, token) {
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
      Status: "pending",
    },
  };

  return request(config)
    .then((res) => {
      // console.log("Appointment booked successfully:", res.data);
      return res.data;
    })
    .catch((err) => {
      console.error("Error booking appointment:", err);
      throw err;
    });
};

export const getAppointments = function () {
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

  return request(config)
    .then((res) => {
      // console.log("Appointments fetched successfully:", res.data);
      return res.data;
    })
    .catch((err) => {
      console.error("Error fetching appointments:", err);
      throw err;
    });
};

export const deleteAppointment = function (appointmentId) {
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

  return request(config)
    .then((res) => {
      console.log("Appointment deleted successfully:", res.data);
      return res.data;
    })
    .catch((err) => {
      console.error("Error deleting appointment:", err);
      throw err;
    });
};


export const getSchedules = function (doctorId, startDate, endDate) {
  const config = {
    url: "/schedules",
    method: "get",
    params: {
      doctorId,
      startDate,
      endDate,
    },
  };

  return request(config)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.error("Error fetching schedules:", err);
      throw err;
    });
};
