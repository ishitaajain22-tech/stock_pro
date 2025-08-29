import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });

  const { email, password } = inputValue;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "top-right",
    });

  const handleError = (msg) =>
    toast.error(msg, {
      position: "top-right",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:3000/login",
        inputValue,
        { withCredentials: true }
      );

      const { success, message } = data;
      if (success) {
        handleSuccess(message);
        const userString = encodeURIComponent(JSON.stringify(data.user));
        window.location.href = `http://localhost:5174?user=${userString}`;
      } else {
        handleError(message);
      }
    } catch (error) {
      console.log("Login failed:", error.response?.data || error.message);
      handleError("Login failed"); 
    }

    setInputValue({
      email: "",
      password: "",
    });
  };

  return (
    <div className="container">
      <div className="row p-5">
        <div className="col-6 p-5">
          <img src="/images/signup.png" alt="Login" className="img-fluid" />
        </div>
        <div className="col-5 p-5 d-flex flex-column align-items-center justify-content-center">
          <h1 className="mb-4">Login</h1>

          <form onSubmit={handleSubmit} style={{ width: "90%" }}>
            <div className="my-3">
              <input
                type="email"
                name="email"
                className="form-control"
                id="email"
                placeholder="Enter your email"
                autoComplete="email"
                value={email}
                onChange={handleOnChange}
                required
              />
            </div>

            <div className="my-3">
              <input
                type="password"
                name="password"
                className="form-control"
                id="password"
                placeholder="Password"
                autoComplete="current-password"
                value={password}
                onChange={handleOnChange}
                required
              />
            </div>

            <div className="mt-4">
              <p className="mb-2">
                <Link to="/signup" style={{ textDecoration: "none" }}>
                  Don't have an account? Sign up
                </Link>
              </p>
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>
          </form>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default Login;
