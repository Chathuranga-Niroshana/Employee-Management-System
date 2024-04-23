import React, { useEffect, useContext, useState } from "react";
import { useSnackbar } from "notistack";
import axios from "axios";
import { EmsContext } from "../../context/EmsContext";
import { useParams } from "react-router-dom";

const UpdateProfile = () => {
  const { id } = useParams();
  const { department } = useContext(EmsContext);
  const { enqueueSnackbar } = useSnackbar();

  const [employee, setEmployee] = useState({
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

  useEffect(() => {
    axios
      .get(`http://localhost:8080/user/${id}`)
      .then((res) => {
        const userData = res.data[0];
        setEmployee(userData);
      })
      .catch((error) => {
        console.error("Error fetching employee data:", error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:8080/user/${id}`, employee);
      enqueueSnackbar("Employee Updated", { variant: "success" });
      window.location.replace("/employee");
      console.log("Employee Updated");
    } catch (error) {
      enqueueSnackbar("An Error has occurred!", { variant: "error" });
      console.error("Error updating employee:", error);
    }
  };

  return (
    <div className="AddEmployeeContainer">
      <h1>
        Edit {employee.employee_name} ({employee.eid}) details
      </h1>
      <div className="employeeInputField">
        <div className="field">
          <label htmlFor="employee_name">Name:</label>
          <input
            onChange={handleChange}
            value={employee.employee_name}
            type="text"
            id="employee_name"
            name="employee_name"
          />
        </div>
        <div className="field">
          <label htmlFor="dob">DOB:</label>
          <input
            onChange={handleChange}
            value={employee.dob}
            type="date"
            id="dob"
            name="dob"
          />
        </div>
        <div className="field">
          <label htmlFor="email">Email:</label>
          <input
            onChange={handleChange}
            value={employee.email}
            type="email"
            id="email"
            name="email"
          />
        </div>
        <div className="field">
          <label htmlFor="mobile">Mobile:</label>
          <input
            onChange={handleChange}
            value={employee.mobile}
            type="number"
            id="mobile"
            name="mobile"
          />
        </div>
        <div className="field">
          <label htmlFor="address">Address:</label>
          <input
            onChange={handleChange}
            value={employee.address}
            type="text"
            id="address"
            name="address"
          />
        </div>

        <div className="field">
          <label>Position:</label>
          <select
            onChange={handleChange}
            value={employee.position}
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
            onChange={handleChange}
            value={employee.department_id}
            htmlFor="department_id"
            name="department_id"
            id="department_id"
          >
            {department.map((dept) => (
              <option key={dept.department_id} value={dept.department_id}>
                {dept.departmant_name}
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <label htmlFor="job">Job:</label>
          <input
            onChange={handleChange}
            value={employee.job}
            type="text"
            id="job"
            name="job"
          />
        </div>

        <div className="field">
          <label htmlFor="password">Password:</label>
          <input
            onChange={handleChange}
            value={employee.password}
            type="password"
            id="password"
            name="password"
          />
        </div>
      </div>
      <div className="btnField NewEmployeeBtn">
        <button onClick={()=>window.location.replace("/employee")}>Go back</button>
        <button onClick={handleUpdate}>Update</button>
      </div>
    </div>
  );
};

export default UpdateProfile;
