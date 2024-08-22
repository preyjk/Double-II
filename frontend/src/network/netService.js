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

export const bookAppointment = function (formData) {
  const config = {
    url: "/appointments",
    method: "post",
    data: formData,
  };

  return request(config)
    .then((res) => {
      console.log("Appointment booked successfully:", res.data);
      return res.data;
    })
    .catch((err) => {
      console.error("Error booking appointment:", err);
      throw err;
    });
};

export const getAppointments = function () {
  const config = {
    url: "/appointments",
    method: "get",
  };

  return request(config)
    .then((res) => {
      console.log("Appointments fetched successfully:", res.data);
      return res.data;
    })
    .catch((err) => {
      console.error("Error fetching appointments:", err);
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
      // console.log("Schedules fetched successfully:", res.data);
      return res.data;
    })
    .catch((err) => {
      console.error("Error fetching schedules:", err);
      throw err;
    });
};
