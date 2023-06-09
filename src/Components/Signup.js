import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [sign, setSign] = useState({
    name: "",
    email: "",
    password: "",
    Cpassword: "",
  });

  const onchange = (e) => {
    setSign({ ...sign, [e.target.name]: e.target.value });
  };

  const signup = async (e) => {
    e.preventDefault();
    let url = "http://localhost:5000/api/login/signup";
    const response = await fetch(url, {
      method: "POSt",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: sign.name,
        email: sign.email,
        password: sign.password,
      }),
    });

    let json = await response.json();

    if (response.ok) {
      localStorage.setItem("token", json.token);
      navigate("/");
    } else {
      alert("Cannot signup");
    }
  };

  return (
    <div style={{ marginLeft: "26%", width: "40%" }}>
      <h1 className="text-center my-4">Signup Form</h1>
      <form className="container my-5" onSubmit={signup}>
        <div className="form-group my-3">
          <label htmlFor="name">User Name</label>
          <input
            type="text"
            className="form-control my-2"
            id="name"
            name="name"
            aria-describedby="emailHelp"
            placeholder="Enter Username"
            onChange={onchange}
            required
            minLength={3}
          />
        </div>
        <div className="form-group my-3">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control my-2"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            onChange={onchange}
            required
          />
        </div>
        <div className="form-group my-3">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control my-2"
            id="password"
            name="password"
            placeholder="Password"
            onChange={onchange}
            required
            minLength={5}
          />
        </div>
        <div className="form-group my-3">
          <label htmlFor="Cpassword">
            confirm Password{" "}
            <label style={{ color: "red" }}>
              {sign.password !== sign.Cpassword
                ? "(Password and confirm password does not match)"
                : ""}
            </label>
          </label>
          <input
            type="password"
            className="form-control my-2"
            id="Cpassword"
            name="Cpassword"
            placeholder=" Conform Password"
            onChange={onchange}
            required
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="btn btn-primary my-3"
            style={{ width: "180px" }}
            disabled={sign.password !== sign.Cpassword}>
            Signup
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
