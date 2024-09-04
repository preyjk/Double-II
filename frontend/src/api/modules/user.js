import request from "@/api/axios";

export const login = async function (username, password) {
  const config = {
    url: "/login",
    method: "post",
    data: { username, password },
  };
  try {
    const res = await request(config);
    const token = res.data.token;
    console.log("Token received:", token);
    return token;
  } catch (err) {
    console.error("Error during login:", err);
    throw err;
  }
};

export const register = async function (username, password) {
  const config = {
    url: "/signup",
    method: "post",
    data: { username, password },
  };

  try {
    const res = await request(config);
    console.log("Registration successful:", res.data);
    return res.data;
  } catch (err) {
    console.error("Error during registration:", err);
    throw err;
  }
};