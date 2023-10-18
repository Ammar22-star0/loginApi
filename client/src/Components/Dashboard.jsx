import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

function Dashboard({ setAuth }) {
  const [name, setName] = useState("");
  async function getName() {
    try {
      const response = await fetch("http://localhost:5000/dashboard/", {
        method: "GET",
        headers: { token: localStorage.token },
      });
      const parsRes = await response.json();
      console.log(parsRes);
      setName(parsRes.user.user_name);
    } catch (err) {
      console.error(err.message);
    }
  }

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setAuth(false);
    toast.success("Logged out successfully")
  };
  useEffect(() => {
    getName();
  }, []);

  return (
    <div>
      <h1>Dashboard {name}</h1>
      <button className="btn btn-primary" onClick={(e) => logout(e)}>
        Logout
      </button>
    </div>
  );
}

export default Dashboard;
