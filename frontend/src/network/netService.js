const request = require("./netUtils");
module.exports.login = function (username, password) {
  const config = {
    url: "/api/login",
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

module.exports.register = function (username, password) {
  const config = {
    url: "/api/signup",
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

module.exports.bookAppointment = function (formData) {
  const config = {
    url: "/api/appointments",
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

module.exports.getAppointments = function () {
  const config = {
    url: "/api/appointments",
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
