import React, { useContext, useEffect, useState } from "react";
import { EmsContext } from "../context/EmsContext";
import moment from "moment";
import "./Stylesheets/Profile.css";

const Profile = () => {
  const { user, tasks, projects } = useContext(EmsContext);
  const [assignedTasks, setAssignedTasks] = useState([]);
  const [assignProjects, setAssignProjects] = useState([]);

  useEffect(() => {
    const userTasks = tasks.filter((task) => task.eid === user.eid);
    setAssignedTasks(userTasks);
  }, [tasks, user.eid]);

  useEffect(() => {
    const userProjects = projects.filter((project) => project.eid === user.eid);
    setAssignProjects(userProjects);
  }, [projects, user.eid]);

  return (
    <div className="AddEmployeeContainer">
      <h1>User Profile</h1>
      <div className="employeeInputField ProfileDataField">
        <div className="field ProfileField">
          <label htmlFor="eid">EID</label>
          <p>{user.eid}</p>
        </div>

        <div className="field ProfileField">
          <label htmlFor="employee_name">Name</label>
          <p>{user.employee_name}</p>
        </div>
        <div className="field ProfileField">
          <label htmlFor="dob">Date Of Birth</label>
          <p>{moment(user.dob).format("DD/MM/YYYY")}</p>
        </div>
        <div className="field ProfileField">
          <label htmlFor="email">Email</label>
          <p>
            <a href={`mailto:${user.email}`}>{user.email}</a>
          </p>
        </div>
        <div className="field ProfileField">
          <label htmlFor="mobile">Mobile</label>

          <p>{user.mobile}</p>
        </div>
        <div className="field ProfileField">
          <label htmlFor="address">Address</label>

          <p>{user.address}</p>
        </div>

        <div className="field ProfileField">
          <label>Position</label>

          <p>{user.position}</p>
        </div>
        <div className="field ProfileField">
          <label htmlFor="job">Job</label>

          <p>{user.job}</p>
        </div>
      </div>

      <div className="mt-4 task">
        <h1>Assigned Tasks</h1>
        <div className="taskContainer">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Date</th>
                <th>Start time</th>
                <th>End time</th>
                <th>Task</th>
                <th>Project ID</th>
                <th>Description</th>
                <th>Review</th>
                <th>Progress </th>
              </tr>
            </thead>
            <tbody>
              {assignedTasks.map((task, index) => (
                <tr key={task.task_id}>
                  <td>{index + 1} </td>
                  <td>{moment(task.date).format("DD/MM/YYYY")} </td>
                  <td>{task.start_time} </td>
                  <td>{task.end_time} </td>
                  <td>{task.task_name} </td>
                  <td>{task.project_id} </td>
                  <td>{task.task_description} </td>
                  <td>{task.review} </td>
                  <td>{task.progress} </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {user.position === "Employee" ? (
        <></>
      ) : (
        <div className="mt-4 task">
          <h1>Managing Projects</h1>
          <div className="taskContainer">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Project ID</th>
                  <th>Start date</th>
                  <th>End date</th>
                  <th>Project name</th>
                  <th>Project Description</th>
                </tr>
              </thead>
              <tbody>
                {assignProjects.map((project, index) => (
                  <tr key={project.project_id}>
                    <td>{index + 1} </td>
                    <td>{project.project_id} </td>
                    <td>{moment(project.start_date).format("DD/MM/YYYY")} </td>
                    <td>{moment(project.end_date).format("DD/MM/YYYY")} </td>
                    <td>{project.project_name} </td>
                    <td>{project.project_description} </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
