
import React, { useState } from "react";
import API from "../services/api";

function Register() {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        try {
            const response = await API.post("register/", formData);

            setMessage("Registration successful!");
            console.log(response.data);

            setFormData({
                username: "",
                email: "",
                password: "",
            });

        } catch (error) {
            console.log("Registration error:", error.response?.data);

            const data = error.response?.data;

            if (typeof data === "string") {
                setMessage(data);
            } else if (data && typeof data === "object") {
                setMessage(
                    Object.entries(data)
                        .map(([key, value]) =>
                            `${key}: ${Array.isArray(value) ? value.join(", ") : String(value)}`
                        )
                        .join(" | ")
                );
            } else {
                setMessage("Registration failed! Please try again.");
            }
        }
    };

    return (
        <div className="register-container">
            <h2>Create Account</h2>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    placeholder="Enter Username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />

                <button type="submit">Register</button>
            </form>

            {message && <p>{message}</p>}
        </div>
    );
}

export default Register;
