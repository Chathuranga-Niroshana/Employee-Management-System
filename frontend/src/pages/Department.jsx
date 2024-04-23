import React, { useContext } from "react";
import { EmsContext } from "../context/EmsContext";
import { Link } from "react-router-dom";

const Department = () => {
  const { department, user } = useContext(EmsContext);

  return (
    <div className="employeeContainer">
      <div>
        <h1 className="text-blue-900 text-3xl">Department List</h1>

        {user.position === "Admin" ? (
          <Link to="/adddepartment">
            <h1>Add Department</h1>{" "}
          </Link>
        ) : (
          <></>
        )}
      </div>
      <table>
        <thead>
          <tr>
            <th>Department ID</th>
            <th>Name</th>
            {user.position === "Admin" ? <th>Operation</th> : <></>}
          </tr>
        </thead>
        <tbody>
          {department.map((d) => (
            <tr key={d.department_id}>
              <td>{d.department_id}</td>
              <td>{d.departmant_name} </td>
              {user.position === "Admin" ? (
                <td>
                  <Link to={`updatedepartment/${d.department_id}`}>⏫</Link>
                  <Link to={`deletedepartment/${d.department_id}`}>❌</Link>
                </td>
              ) : (
                <></>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Department;
