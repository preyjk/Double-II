import request from "@/api/axios";

export const addPatient_user = async function (formData, token) {
    const config = {
      url: "/user/patients",
      method: "post",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        Name: formData.Name,
        Gender: formData.Gender,
        Age: formData.Age,
        Phone: formData.Phone,
        Email: formData.Email,
        Address: formData.Address,
      },
    };
  
    try {
      const res = await request(config);
      console.log("Patient added successfully:", res.data);
      return res.data;
    } catch (err) {
      console.error("Error adding patient:", err);
      throw err;
    }
  };

  export const getPatientById_user = async function (patientId) {
    const token = localStorage.getItem("authToken");
  
    if (!token) {
      throw new Error("Token not found. Please log in again.");
    }
  
    const config = {
      url: `/user/patients/${patientId}`,
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  
    try {
      const res = await request(config);
      console.log("Patient details fetched successfully:", res.data);
      return res.data;
    } catch (err) {
      console.error("Error fetching patient details:", err);
      throw err;
    }
  };

  