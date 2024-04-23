import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useContext, useEffect, useState } from "react";
import { EmsContext } from "../../context/EmsContext";
import { useParams } from "react-router-dom";

const UpdateTask = () => {
  const { projects, employees } = useContext(EmsContext);
  const { id } = useParams();

  const { enqueueSnackbar } = useSnackbar();
  const [formData, setFormData] = useState({
    task_name: "",
    task_id: "",
    task_description: "",
    date: "",
    start_time: "",
    end_time: "",
    review: "",
    progress: "",
    eid: "",
    project_id: "",
  });

  const projectChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "project_id") {
      const selectedProject = projects.find(
        (project) => project.project_id === value
      );
      if (selectedProject) {
        const department_id = selectedProject.department_id;

        const employeesInDepartment = employees.filter(
          (employee) => employee.department_id === department_id
        );

        setFormData((prevFormData) => ({
          ...prevFormData,
          eid:
            employeesInDepartment.length > 0
              ? employeesInDepartment[0].eid
              : "",
        }));
      }
    }
  };
  const employeeChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  useEffect(async () => {
    await axios
      .get(`http://localhost:8080/task/${id}`)
      .then((res) => {
        const taskData = res.data[0];
        setFormData(taskData);
      })
      .catch((error) => {
        console.error("Error fetching task data:", error);
      });
  }, [id]);

  const btnHandle = async () => {
    try {
      await axios.put(`http://localhost:8080/task/${id}`, formData);
      enqueueSnackbar("Task Updated", { variant: "success" });
      window.location.replace("/task");
      console.log("Task Updated");
    } catch (error) {
      enqueueSnackbar("An Error has occurred!", { variant: "error" });
      console.error("Error updating Task:", error);
    }
  };

  return (
    <div className="createTask">
      <h1>Edit {formData.task_id} task</h1>
      <div className="firstCreateTaskContainer">
        <div className="taskDateTimeContainer">
          <div>
            <label htmlFor="taskDate">Choose Date</label>
            <input
              value={formData.date}
              onChange={projectChangeHandler}
              type="date"
              name="date"
              id="taskDate"
            />
          </div>
          <div className="taskNameContainer">
            <label htmlFor="taskStartTime">Start Time</label>
            <input
              value={formData.start_time}
              onChange={projectChangeHandler}
              type="time"
              name="start_time"
              id="taskStartTime"
            />
          </div>
          <div>
            <label htmlFor="taskEndTime">End Time</label>
            <input
              value={formData.end_time}
              onChange={projectChangeHandler}
              type="time"
              name="end_time"
              id="taskEndTime"
            />
          </div>
        </div>
        <div>
          <label htmlFor="taskName">Enter Task Name</label>
          <input
            value={formData.task_name}
            onChange={projectChangeHandler}
            type="text"
            name="task_name"
            id="taskName"
          />
          <label htmlFor="taskDescription">Task Description</label>
          <textarea
            value={formData.task_description}
            onChange={projectChangeHandler}
            name="task_description"
            id="taskDescription"
            cols="30"
            rows="2"
          />
          <label htmlFor="review">Task Review</label>
          <textarea
            value={formData.review}
            onChange={projectChangeHandler}
            name="review"
            id="review"
            cols="30"
            rows="2"
          />
          <label htmlFor="progress">Progress</label>
          <input
            value={formData.progress}
            onChange={projectChangeHandler}
            type="text"
            name="progress"
            id="progress"
          />
          <label className="hidden" htmlFor="assignProjectId">
            Project
          </label>
          <select
            className="hidden"
            value={formData.project_id}
            onChange={projectChangeHandler}
            name="project_id"
            id="assignProjectId"
          >
            {projects.map((p) => (
              <option key={p.project_id} value={p.project_id}>
                {p.project_name}
              </option>
            ))}
          </select>

          <label htmlFor="assignEmployeeId">Assigning Employee</label>
          <select
            value={formData.eid}
            onChange={employeeChangeHandler}
            name="eid"
            id="assignEmployeeId"
          >
            {employees.map((emp) => (
              <option key={emp.eid} value={emp.eid}>
                {emp.eid} <span>{emp.employee_name}</span>
              </option>
            ))}
          </select>
        </div>
        <div className="btnField NewEmployeeBtn">
          <button onClick={btnHandle}>Update</button>
          <button onClick={() => window.location.replace("/task")}>
            Go back
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateTask;
