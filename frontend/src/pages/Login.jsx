import React, { useState } from "react";
import { useSnackbar } from "notistack";
import axios from "axios";
import "./Stylesheets/Login.css";

const Login = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    eid: "",
    employee_name: "",
    password: "",
    email: "",
    dob: "",
    position: "Admin",
    mobile: "",
    address: "",
    job: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");

  const changeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const confirmPasswordHandler = (e) => {
    setConfirmPassword(e.target.value);
  };

  const register = async () => {
    if (formData.password !== confirmPassword) {
      enqueueSnackbar("Passwords do not match", { variant: "error" });
      return;
    }

    try {
      await axios.post(
        "http://localhost:8080/user/signup",
        formData
      );
      enqueueSnackbar("User Registered", { variant: "success" });
      console.log("User Registered");
      window.location.replace("/");
    } catch (error) {
      enqueueSnackbar("An Error has occurred!", { variant: "error" });
      console.log(error);
    }
  };

  const login = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/user/login",
        {
          email: formData.email,
          password: formData.password,
        }
      );

      if (!response.data.success) {
        console.log("Failed to login:", response.data.error);
        return;
      }

      localStorage.setItem("auth-token", response.data.token);
      enqueueSnackbar("Logged in successfully", { variant: "success" });
      window.location.replace("/home");
      console.log("Logged in successfully");
    } catch (error) {
      enqueueSnackbar("Invalid email or password", { variant: "error" });
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="loginsignup">
      <div className="loginsignupContainer">
        <h1>{state}</h1>
        <div className="loginFields">
          {state === "Register" ? (
            <div className="registerContainer">
              <div className="inputField">
                <div className="field">
                  <label htmlFor="eid">EID:</label>
                  <input
                    onChange={changeHandler}
                    value={formData.eid}
                    type="text"
                    id="eid"
                    name="eid"
                  />
                </div>
                <div className="field">
                  <label htmlFor="employee_name">Name:</label>
                  <input
                    onChange={changeHandler}
                    value={formData.employee_name}
                    type="text"
                    id="employee_name"
                    name="employee_name"
                  />
                </div>
                <div className="field">
                  <label htmlFor="dob">DOB:</label>
                  <input
                    onChange={changeHandler}
                    value={formData.dob}
                    type="date"
                    id="dob"
                    name="dob"
                  />
                </div>
                <div className="field">
                  <label htmlFor="email">Email:</label>
                  <input
                    onChange={changeHandler}
                    value={formData.email}
                    type="email"
                    id="email"
                    name="email"
                  />
                </div>
                <div className="field">
                  <label htmlFor="mobile">Mobile:</label>
                  <input
                    onChange={changeHandler}
                    value={formData.mobile}
                    type="number"
                    id="mobile"
                    name="mobile"
                  />
                </div>
                <div className="field">
                  <label htmlFor="address">Address:</label>
                  <input
                    onChange={changeHandler}
                    value={formData.address}
                    type="text"
                    id="address"
                    name="address"
                  />
                </div>
                <div className="field">
                  <label htmlFor="job">Job:</label>
                  <input
                    onChange={changeHandler}
                    value={formData.job}
                    type="text"
                    id="job"
                    name="job"
                  />
                </div>
                <div className="field">
                  <label htmlFor="position">Position:</label>
                  <input value="Admin" id="position" name="position" />
                </div>
                <div className="field">
                  <label htmlFor="password">Password:</label>
                  <input
                    onChange={changeHandler}
                    value={formData.password}
                    type="password"
                    id="password"
                    name="password"
                  />
                </div>
                <div className="field">
                  <label htmlFor="confirmPassword">Confirm Password:</label>
                  <input
                    onChange={confirmPasswordHandler}
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                  />
                </div>
              </div>
              <div className="btnField">
                <button id="loginMainBtn" onClick={register}>
                  Register
                </button>
                <p>Already have an account?</p>
                <button onClick={() => setState("Login")}>Login here</button>
              </div>
            </div>
          ) : (
            <div className="registerContainer">
              <div className="inputField">
                <div className="field">
                  <label htmlFor="email">Email:</label>
                  <input
                    onChange={changeHandler}
                    value={formData.email}
                    type="email"
                    id="email"
                    name="email"
                  />
                </div>
                <div className="field">
                  <label htmlFor="password">Password:</label>
                  <input
                    onChange={changeHandler}
                    value={formData.password}
                    type="password"
                    id="password"
                    name="password"
                  />
                </div>
              </div>
              <div className="btnField">
                <button id="loginMainBtn" onClick={login}>
                  Login
                </button>
                <p>Create an account</p>
                <button
                  onClick={() => {
                    setState("Register");
                  }}
                >
                  Register here
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Login;
