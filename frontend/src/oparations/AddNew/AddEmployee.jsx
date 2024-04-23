import React, { useContext, useState } from "react";
import "./Stylesheets/CreateEmployee.css";
import { useSnackbar } from "notistack";
import axios from "axios";
import { EmsContext } from "../../context/EmsContext";

const AddEmployee = () => {
  const { department } = useContext(EmsContext);

  const { enqueueSnackbar } = useSnackbar();
  const [formData, setFormData] = useState({
    eid: "",
    employee_name: "",
    password: "",
    email: "",
    dob: "",
    position: "",
    mobile: "",
    address: "",
    job: "",
    department_id: "",
  });
  const changeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const registerNewEmployee = async () => {
    try {
      const responce = await axios.post(
        "http://localhost:8080/user/signup",
        formData
      );
      window.location.reload();
      enqueueSnackbar("New Employee Created", { variant: "success" });
      console.log("New Employee Created");
    } catch (error) {
      enqueueSnackbar("An Error has occurred!", { variant: "error" });
      console.log(error);
    }
  };

  return (
    <div className="AddEmployeeContainer">
      <h1>Add a new employee</h1>
      <div className="employeeInputField">
        <div className="field">
          <label htmlFor="eid">EID</label>
          <input
            type="text"
            onChange={changeHandler}
            value={formData.eid}
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
          <label>Position:</label>
          <select
            onChange={changeHandler}
            value={formData.position}
            htmlFor="position"
            name="position"
            id="position"
          >
            <option value="Manager">Manager</option>
            <option value="Employee">Employee</option>
          </select>
        </div>
        <div className="field">
          <label>Department:</label>
          <select
            onChange={changeHandler}
            value={formData.department_id}
            htmlFor="department_id"
            name="department_id"
            id="department_id"
          >
            {department.map((dept) => (
              <option key={dept.department_id} value={dept.department_id}>
                {dept.departmant_name}{" "}
              </option>
            ))}
          </select>
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
          <label htmlFor="password">Password:</label>
          <input
            onChange={changeHandler}
            value={formData.password}
            type="password"
            id="password"
            name="password"
          />
        </div>
      <div className="btnField NewEmployeeBtn">
        <button onClick={registerNewEmployee}>Submit</button>
        <button onClick={() => window.location.replace("/employee")}>
          Go back
        </button>
      </div>
      </div>
    </div>
  );
};

export default AddEmployee;
