import API from "../api/axios";

// SIGNUP
export const signupUser = async (
  userData
) => {
  const response = await API.post(
    "/auth/signup",
    userData
  );

  return response.data;
};

// LOGIN
export const loginUser = async (
  userData
) => {
  const response = await API.post(
    "/auth/login",
    userData
  );

  return response.data;
};