import request from "@/api/axios";

export const login = async function (email, password) {
  const config = {
    url: "/public/auth/login",
    method: "post",
    data: { email, password },
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

export const register = async function (email, password) {
  const config = {
    url: "/public/auth/signup",
    method: "post",
    data: { email, password },
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
export const verifyEmail = async function (token) {
  const config = {
    url: "/public/auth/verify-email",
    method: "post",
    data: { token },
  };

  try {
    const res = await request(config);
    console.log("Correct Token:", res.token);
    return res.token;
  } catch (err) {
    console.error("Token verification failed:", err.response?.data || err.message);
    throw err;
  }
};