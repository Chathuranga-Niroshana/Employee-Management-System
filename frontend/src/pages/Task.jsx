import React, { useContext } from "react";
import "./Stylesheets/Task.css";
import { Link } from "react-router-dom";
import { EmsContext } from "../context/EmsContext";
import moment from 'moment';

const Task = () => {
  const { tasks, employees, user } = useContext(EmsContext);

  const getEmployeeName = (eid) => {
    const employee = employees.find((emp) => emp.eid === eid);
    return employee ? employee.employee_name : "Unknown";
  };

  return (
    <div className="taskContainer employeeContainer">
      <div>
        <h1 className="text-blue-900 text-3xl">Task List</h1>
        {user.position === "Employee" ? (
          <></>
        ) : (
          <Link to="/createtask">Add New Task</Link>
        )}
      </div>
      <div className="secondTaskContainer">
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Project Id</th>
              <th>Date</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Task</th>
              <th>Description</th>
              <th>Employee</th>
              <th>Review</th>
              <th>Progress</th>
              {user.position === "Employee" ? <></> : <th>Operation</th>}
            </tr>
          </thead>
          <tbody>
            {tasks.map((t, index) => (
              <tr key={t.task_id}>
                <td>{index + 1} </td>
                <td>{t.project_id} </td>
                <td>{moment(t.date).format('DD/MM/YYYY')} </td>
                <td>{t.start_time} </td>
                <td>{t.end_time} </td>
                <td>{t.task_name} </td>
                <td>{t.task_description} </td>
                <td>
                  {t.eid} {getEmployeeName(t.eid)}
                </td>
                <td>{t.review} </td>
                <td>{t.progress} </td>
                {user.position === "Employee" ? (
                  <></>
                ) : (
                  <td>
                    <Link to={`updatetask/${t.task_id}`}>⏫</Link>
                    <Link to={`deletetask/${t.task_id}`}>❌</Link>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Task;
