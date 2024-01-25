// Functions to handle login and register functionalities
import axios from "axios";

// Register a new user
export async function register(email, username, password) {
    console.log(`Registering w/ ${email}, ${username}, ${password}`)
    const data = {
        email: email,
        user: username, 
        pass: password
    }
    try {
        const response = await axios.post(
            "http://localhost:3000/api/register",
            data
        )
        localStorage.setItem('key', response.data.token)
        console.log('Response User Data:', response.data.user)
        return response.data.user
    } catch (error) {
        console.log(error)
    }
}

// Login an existing user
export async function login(username, password) {
    console.log(`Logging in user with ${username}, ${password}`)
    const data = {
        user: username,
        pass: password,
    };
    try {
        const response = await axios.post("http://localhost:3000/api/login", data);
        localStorage.setItem("key", response.data.token);
        console.log('Response userData: ', response.data.userData)
        return response.data.userData;
    } catch (error) {
        console.log(error);
    }
    }