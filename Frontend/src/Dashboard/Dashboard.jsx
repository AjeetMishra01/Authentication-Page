import "./Dashboard.css"
import React from "react";
import { useLocation } from "react-router-dom";

const Dashboard = () => {
  const location = useLocation();
  const user = location.state?.user;

  return (
    <div>
      <h1>Successfully LOGGED IN !!</h1>
      {user ? (
        <h2>Welcome, {user.name} 👋</h2>
      ) : (
        <h2>No user data found. Please log in.</h2>
      )}
    </div>
  );
};

export default Dashboard;
