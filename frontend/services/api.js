const API_URL = "http://localhost:5000"; // Backend API URL

// Register User
export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error("Failed to register user");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

// Login User
export const loginUser = async (credentials) => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error("Failed to login user");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
};
