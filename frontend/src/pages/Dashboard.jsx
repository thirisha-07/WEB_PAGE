
import React from "react";

function Dashboard() {
    const handleLogout = () => {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        window.location.href = "/login";
    };

    return (
        <div className="dashboard-container">
            <h1>Welcome to Dashboard!</h1>
            <p>You have successfully logged in.</p>

            <button onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
}

export default Dashboard;
