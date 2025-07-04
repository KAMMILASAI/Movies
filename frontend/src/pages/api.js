const API_URL = "http://localhost:8080/api/users";

export const registerUser = async (userData) => {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return response.json();
};

export const loginUser = async (email) => {
  const response = await fetch(`${API_URL}/find?email=${email}`);
  return response.json();
};
export const loginUser1 = async (email, password) => {
    const response = await fetch(`${API_URL}/login?email=${email}&password=${password}`, {
      method: "POST",
    });
    return response.json();
  };

// const API_URL = "http://localhost:8080/api/auth";

// export const registerUser = async (userData) => {
//   const response = await fetch(`${API_URL}/register`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(userData),
//   });
//   return response.json();
// };

// export const loginUser = async (email, password) => {
//   const response = await fetch(`${API_URL}/login?email=${email}&password=${password}`, {
//     method: "POST",
//   });
//   return response.json();
// };
