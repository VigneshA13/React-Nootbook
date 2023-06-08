import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [logins, setLogins] = useState({ email: "", password: "" });

  const login = async (e) => {
    e.preventDefault();
    let url = "http://localhost:5000/api/login/signin";
    const response = await fetch(url, {
      method: "POSt",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: logins.email, password: logins.password }),
    });

    let json = await response.json();

    if (response.ok) {
      localStorage.setItem("token", json.token);
      navigate("/home");
    } else {
      alert("Invalid login");
    }
  };

  const onchange = (e) => {
    setLogins({ ...logins, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ marginLeft: "26%", width: "40%" }}>
      <h1 className="text-center my-4">Login Form</h1>
      <form className="container my-5" onSubmit={login}>
        <div className="form-group my-3">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control my-1"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            required
            onChange={onchange}
            value={logins.email}
          />
        </div>
        <div className="form-group my-3">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control my-1"
            id="password"
            name="password"
            placeholder="Password"
            required
            onChange={onchange}
            value={logins.password}
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="btn btn-primary my-3"
            style={{ width: "180px" }}>
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
