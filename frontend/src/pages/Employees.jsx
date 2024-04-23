import React, { useContext } from "react";
import { EmsContext } from "../context/EmsContext";
import { Link } from "react-router-dom";

const Employees = () => {
  const { employees, user } = useContext(EmsContext);

  return (
    <div className="employeeContainer">
      <div>
        <h1 className="text-blue-900 text-3xl">Employee List</h1>
        {user.position === "Employee" ? (
          <></>
        ) : (
          <Link to="/addemployee">
            <h1>Add Employee</h1>
          </Link>
        )}
      </div>
      <table>
        <thead>
          <tr>
            <th>EID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Address</th>
            <th>JOB</th>
            <th>Position</th>
            {user.position === "Employee" ? <></> : <th>Operation</th>}
          </tr>
        </thead>
        <tbody>
          {employees.map((u) => (
            <tr key={u.eid}>
              <td>{u.eid} </td>
              <td>{u.employee_name}</td>
              <td>
                <p>
                  <a href={`mailto:${u.email}`}>{u.email}</a>
                </p>
              </td>
              <td>{u.mobile} </td>
              <td>{u.address} </td>
              <td>{u.job} </td>
              <td>{u.position} </td>
              {user.position === "Employee" ? (
                <></>
              ) : (
                <td>
                  <Link to={`updateprofile/${u.eid}`}>⏫</Link>
                  <Link to={`deleteuser/${u.eid}`}>❌</Link>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Employees;
