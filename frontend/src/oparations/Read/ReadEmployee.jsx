import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import axios from "axios";

const ReadEmployee = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState({
    eid: "",
    employee_name: "",
    email: "",
    mobile: "",
    address: "",
    position: "",
    job: "",
    dob: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:8080/user/${id}`)
      .then((res) => {
        setEmployee(res.data[0]);
      })
      .catch((error) => {
        console.error("Error fetching employee data:", error);
      });
  }, [id]);

  return (
    <div className="AddEmployeeContainer">
      <h1>Employee Profile</h1>
      <div className="employeeInputField ProfileDataField">
        <div className="field ProfileField">
          <label htmlFor="eid">EID</label>
          <p>{employee.eid}</p>
        </div>

        <div className="field ProfileField">
          <label htmlFor="employee_name">Name</label>
          <p>{employee.employee_name}</p>
        </div>
        <div className="field ProfileField">
          <label htmlFor="dob">Date Of Birth</label>
          <p>{moment(employee.dob).format("DD/MM/YYYY")}</p>
        </div>
        <div className="field ProfileField">
          <label htmlFor="email">Email</label>
          <p>
            <a href={`mailto:${employee.email}`}>{employee.email}</a>
          </p>
        </div>
        <div className="field ProfileField">
          <label htmlFor="mobile">Mobile</label>
          <p>{employee.mobile}</p>
        </div>
        <div className="field ProfileField">
          <label htmlFor="address">Address</label>
          <p>{employee.address}</p>
        </div>

        <div className="field ProfileField">
          <label>Position</label>
          <p>{employee.position}</p>
        </div>
        <div className="field ProfileField">
          <label htmlFor="job">Job</label>
          <p>{employee.job}</p>
        </div>
      </div>
    </div>
  );
};

export default ReadEmployee;
