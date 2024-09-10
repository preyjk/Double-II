import request from "@/api/axios";

/*
  public
*/
export const filterDoctors_public = async function (filters = {}) {
  const { firstname, lastname, workplace } = filters;

  const config = {
    url: "/public/doctors",
    method: "get",
    params: {
      firstname: firstname || undefined,
      lastname: lastname || undefined,
      workplace: workplace || undefined,
    },
  };

  try {
    const res = await request(config);
    console.log("Filtered doctors fetched successfully:", res.data);
    return res.data;
  } catch (err) {
    console.error("Error fetching filtered doctors:", err);
    throw err;
  }
};

/*
  admin
*/
export const filterDoctors_admin = async function (filters, token) {
  const { firstname, lastname, workplace } = filters;

  const config = {
    url: "/admin/doctors",
    method: "get",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      firstname: firstname || undefined,
      lastname: lastname || undefined,
      workplace: workplace || undefined,
    },
  };

  try {
    const res = await request(config);
    console.log("Filtered doctors fetched successfully:", res.data);
    return res.data;
  } catch (err) {
    console.error("Error fetching filtered doctors:", err);
    throw err;
  }
};

export const addDoctor_admin = async function (formData, token) {
  const config = {
    url: "/admin/doctors",
    method: "post",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      FirstName: formData.FirstName,
      LastName: formData.LastName,
      Workplace: formData.Workplace,
      Specialty: formData.Specialty,
      Phone: formData.Phone,
      Email: formData.Email,
      Address: formData.Address,
    },
  };

  try {
    const res = await request(config);
    console.log("Doctor added successfully:", res.data);
    return res.data;
  } catch (err) {
    console.error("Error adding doctor:", err);
    throw err;
  }
};

export const getDoctorById_admin = async function (doctorId, token) {
  const config = {
    url: `/admin/doctors/${doctorId}`,
    method: "get",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const res = await request(config);
    console.log("Doctor details fetched successfully:", res.data);
    return res.data;
  } catch (err) {
    console.error("Error fetching doctor details:", err);
    throw err;
  }
};

export const assignDoctorToUser_admin = async function (doctorId, token) {
  const config = {
    url: "/admin/users/doctor",
    method: "post",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      doctorId: doctorId,
    },
  };

  try {
    const res = await request(config);
    console.log("Doctor assigned to user successfully:", res.data);
    return res.data;
  } catch (err) {
    console.error("Error assigning doctor to user:", err);
    throw err;
  }
};
