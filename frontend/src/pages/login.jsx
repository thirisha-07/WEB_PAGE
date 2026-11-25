
import React, { useState } from "react";
import API from "../services/api";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await API.post("login/", {
                username,
                password,
            });

            localStorage.setItem("access", response.data.access);
            localStorage.setItem("refresh", response.data.refresh);

            alert("Login successful!");
            window.location.href = "/dashboard";

        } catch (error) {
            console.log(error.response?.data);

            const message = error.response?.data;

            alert(
                typeof message === "string"
                    ? message
                    : message?.detail || JSON.stringify(message) || "Login failed!"
            );
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />

                <br /><br />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <br /><br />

                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;
