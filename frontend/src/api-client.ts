import { RegisterFormData } from "./pages/Register";
import { SignInFormData } from "./pages/SignIn";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

const handleResponse = async (response: Response) => {
  const textResponse = await response.text();
  if (!textResponse) {
    throw new Error("Empty response from server");
  }

  let responseBody;
  try {
    responseBody = JSON.parse(textResponse);
  } catch (error) {
    throw new Error("Response is not valid JSON");
  }

  if (!response.ok) {
    throw new Error(responseBody.message || "An error occurred");
  }

  return responseBody;
};

export const register = async (formdata: RegisterFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/users/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formdata),
  });

  return handleResponse(response);
};

export const signIn = async (formdata: SignInFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formdata),
  });

  return handleResponse(response);
};

export const validateToken = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
    credentials: "include",
  });

  return handleResponse(response);
};

export const signOut = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Error during sign out");
  }
};
