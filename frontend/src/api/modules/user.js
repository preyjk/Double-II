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
export const forgetPassword = async function (email) {
  try {
    const res = await request({
      url: "/public/auth/forgot-password",
      method: "post",
      data: { email },
    });
    console.log("xxxxxxxxxxxxxxxxx:",res);
    
    console.log("Password reset token sent successfully:", res.data?.token);
    return res.data?.token;
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || "Token request failed";
    console.error("Error while requesting password reset:", {
      message: errorMessage,
      error: error,  
    });
    throw new Error(errorMessage);
  }
};
export const resetPassword = async (token, newPassword) => {
  try {
    const res = await request({
      url: "/public/auth/reset-password",  
      method: "post",
      data: { token, newPassword },  
    });
    
    console.log("Password reset successfully.");
    return res.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || "Password reset failed";
    console.error("Error while resetting password:", {
      message: errorMessage,
      error: error,  
    });
    throw new Error(errorMessage);
  }
};
export const changePassword = async (email, oldPassword, newPassword) => {
  try {
    const res = await request({
      url: "/public/auth/change-password",  
      method: "post",
      data: { email, oldPassword, newPassword },  
    });
    
    console.log("Password changed successfully.");
    return res.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || "Password reset failed";
    console.error("Error while changing password:", {
      message: errorMessage,
      error: error,  
    });
    throw new Error(errorMessage);
  }
};
