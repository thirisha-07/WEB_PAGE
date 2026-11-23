
import { useState } from "react";
import api from "../services/api";
import "./AuthPage.css";

function AuthPage() {
  const [mode, setMode] = useState("login");

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const switchMode = (newMode) => {
    setMode(newMode);
    setMessage("");
    setError("");
    setFormData({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      await api.post("register/", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      setMessage("Registration completed successfully! Please login.");
      setMode("login");

      setFormData({
        username: formData.username,
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (err) {
      const data = err.response?.data;
      const firstError = data
        ? Object.values(data).flat()[0]
        : "Registration failed. Please try again.";

      setError(String(firstError));
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    try {
      const response = await api.post("login/", {
        username: formData.username,
        password: formData.password,
      });

      localStorage.setItem("accessToken", response.data.access);
      localStorage.setItem("refreshToken", response.data.refresh);

      setMessage("Login successful! You are authenticated.");
      setLoggedIn(true);
      setFormData({
        ...formData,
        password: "",
      });
    } catch (err) {
      setError("Invalid username or password.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setLoggedIn(false);
    setMessage("You have logged out successfully.");
    setMode("login");
    setFormData({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="auth-container">
      <div className="auth-card">

        <div className="auth-left">
          <div className="brand">
            <span className="brand-icon">A</span>
            ACCOUNT PORTAL
          </div>

          <div className="welcome-content">
            <span className="welcome-label">YOUR ACCOUNT STARTS HERE</span>

            <h1>
              {mode === "login"
                ? "Welcome Back!"
                : "Join Our Community"}
            </h1>

            <p>
              {mode === "login"
                ? "Sign in securely and continue with your account."
                : "Create your account and get started in just a few steps."}
            </p>
          </div>

          <div className="left-footer">
            Secure • Simple • Reliable
          </div>
        </div>

        <div className="auth-right">

          <div className="form-heading">
            <h2>
              {loggedIn
                ? "Account Access"
                : mode === "login"
                ? "Sign In"
                : "Create Account"}
            </h2>

            <p>
              {mode === "login"
                ? "Enter your details to access your account."
                : "Enter your details to register a new account."}
            </p>
          </div>

          {!loggedIn && (
            <div className="auth-tabs">
              <button
                type="button"
                className={mode === "login" ? "active" : ""}
                onClick={() => switchMode("login")}
              >
                Login
              </button>

              <button
                type="button"
                className={mode === "register" ? "active" : ""}
                onClick={() => switchMode("register")}
              >
                Create Account
              </button>
            </div>
          )}

          {message && <div className="success-message">{message}</div>}
          {error && <div className="error-message">{error}</div>}

          {loggedIn ? (
            <div className="logged-in-box">
              <div className="success-icon">✓</div>
              <h3>Welcome, {formData.username}!</h3>
              <p>You have successfully logged in.</p>
              <button className="submit-button" onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : (
            <form onSubmit={mode === "login" ? handleLogin : handleRegister}>
              <label>Username</label>
              <input
                type="text"
                name="username"
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleChange}
                required
              />

              {mode === "register" && (
                <>
                  <label>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </>
              )}

              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />

              {mode === "register" && (
                <>
                  <label>Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </>
              )}

              <button
                className="submit-button"
                type="submit"
                disabled={loading}
              >
                {loading
                  ? "Please wait..."
                  : mode === "login"
                  ? "Login to Account"
                  : "Create My Account"}
              </button>
            </form>
          )}

          {!loggedIn && (
            <p className="switch-text">
              {mode === "login"
                ? "Don't have an account? "
                : "Already have an account? "}

              <button
                type="button"
                onClick={() =>
                  switchMode(mode === "login" ? "register" : "login")
                }
              >
                {mode === "login" ? "Create Account" : "Login"}
              </button>
            </p>
          )}

          <p className="security-note">
            Your account information is protected.
          </p>

        </div>
      </div>
    </div>
  );
}

export default AuthPage;
