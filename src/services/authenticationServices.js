import axios from "axios";

// Register a new user
export async function register(username, password, auth) {
    const data = {
      user: username,
      pass: password,
      auth: auth,
    };
    console.log("Making register call with user, pass: ", username, password);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/register",
        data
      );
      console.log("Response user, ", response.data.user);
      localStorage.setItem("key", response.data.token);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

// Login an existing user
export async function login(username, password) {
    const data = {
      user: username,
      pass: password,
    };
    console.log("Making login in call with user, pass: ", username, password);
    try {
      const response = await axios.post("http://localhost:3000/api/login", data);
      console.log("Response, ", response);
      localStorage.setItem("key", response.data.token);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
