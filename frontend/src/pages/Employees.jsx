import React, { useContext } from "react";
import { EmsContext } from "../context/EmsContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
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
      <table className="w-full">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="px-4 py-2">EID</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Mobile</th>
            <th className="px-4 py-2">Address</th>
            <th className="px-4 py-2">Job</th>
            <th className="px-4 py-2">Position</th>
            {user.position === "Employee" ? (
              <></>
            ) : (
              <th className="px-4 py-2">Operation</th>
            )}
          </tr>
        </thead>
        <tbody>
          {employees.map((u) => (
            <tr key={u.eid} className="text-center">
              <td className="border px-4 py-2">
                <Link to={`reademployee/${u.eid}`}>{u.eid}</Link>
              </td>
              <td className="border px-4 py-2">{u.employee_name}</td>
              <td className="border px-4 py-2">
                <p>
                  <a href={`mailto:${u.email}`}>{u.email}</a>
                </p>
              </td>
              <td className="border px-4 py-2">{u.mobile}</td>
              <td className="border px-4 py-2">{u.address}</td>
              <td className="border px-4 py-2">{u.job}</td>
              <td className="border px-4 py-2">{u.position}</td>
              {user.position === "Employee" ? (
                <></>
              ) : (
                <td className="border px-4 py-2">
                  <Link to={`updateprofile/${u.eid}`}>
                    <FontAwesomeIcon className="iconClass" icon={faEdit} />
                  </Link>
                  <Link to={`deleteuser/${u.eid}`}>
                    <FontAwesomeIcon
                      className="iconClass redIcon"
                      icon={faTimesCircle}
                    />
                  </Link>
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
