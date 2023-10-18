import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function Register({ setAuth }) {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    name: "",
  });

  const { email, password, name } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { email, password, name };
      const response = await fetch("http://localhost:5000/auth/register", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const parseResponse = await response.json();
      if (parseResponse.accessToken) {
        localStorage.setItem("token", parseResponse.token.accessToken);
        setAuth(true);
        toast.success("Registered Successfully");
      } else {
        setAuth(false);
        toast.error(parseResponse);
      }
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <div>
      <h1 className="text-center my-5">Register</h1>
      <form className="form-group d-grid " onSubmit={onSubmitForm}>
        <input
          type="email"
          name="email"
          placeholder="email"
          className="form-control my-3 "
          value={email}
          onChange={(e) => onChange(e)}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          className="form-control my-3"
          value={password}
          onChange={(e) => onChange(e)}
        />
        <input
          type="text"
          name="name"
          placeholder="name"
          className="form-control my-3"
          value={name}
          onChange={(e) => onChange(e)}
        />
        <button className="btn btn-success  ">Submit</button>
      </form>
      <Link to="/login">login</Link>
    </div>
  );
}

export default Register;
