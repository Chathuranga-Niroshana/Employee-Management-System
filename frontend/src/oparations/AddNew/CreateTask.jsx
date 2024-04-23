import React, { useContext, useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import axios from "axios";
import { EmsContext } from "../../context/EmsContext";
import "./Stylesheets/CreateTask.css";

const CreateTask = () => {
  const { employees, projects } = useContext(EmsContext);
  const { enqueueSnackbar } = useSnackbar();

  const [formData, setFormData] = useState({
    task_name: "",
    task_description: "",
    date: "",
    start_time: "",
    end_time: "",
    review: "",
    progress: "",
    eid: "",
    project_id: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleProjectChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
      eid: getFirstEmployeeIdByProject(value),
    }));
  };

  const getFirstEmployeeIdByProject = (projectId) => {
    const project = projects.find((p) => p.project_id === projectId);
    const departmentId = project ? project.department_id : "";
    const employeesInDepartment = employees.filter(
      (emp) => emp.department_id === departmentId
    );
    return employeesInDepartment.length > 0 ? employeesInDepartment[0].eid : "";
  };

  const [selectedEmployee, setSelectedEmployee] = useState([]);

  useEffect(() => {
    const employeeSelected = employees.filter(
      (emp) => emp.eid === formData.eid
    );
    setSelectedEmployee(employeeSelected);
  }, [employees, formData.eid]);

  const sendEmailNotification = (task) => {
    axios
      .post("http://localhost:8080/sendemail", {
        to: selectedEmployee.email,
        subject: "Task Assigned",
        text: `You have been assigned a task: ${task.task_name}. plese refer your profile for mare details`,
      })
      .then((res) => {
        console.log("Sent Email");
        console.log(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/task/createtask",
        formData
      );
      enqueueSnackbar("New Task Created", { variant: "success" });
      console.log("New Task Created");
      sendEmailNotification(formData.eid, formData);
      window.location.reload();
    } catch (error) {
      enqueueSnackbar("An Error has occurred!", { variant: "error" });
      console.error(error);
    }
  };

  return (
    <div className="createTask">
      <h1>Create a new task</h1>
      <div className="firstCreateTaskContainer">
        <div className="taskDateTimeContainer">
          <div>
            <label htmlFor="taskDate">Choose Date</label>
            <input
              type="date"
              id="taskDate"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
            />
          </div>
          <div className="taskNameContainer">
            <label htmlFor="taskStartTime">Start Time</label>
            <input
              type="time"
              id="taskStartTime"
              name="start_time"
              value={formData.start_time}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="taskEndTime">End Time</label>
            <input
              type="time"
              id="taskEndTime"
              name="end_time"
              value={formData.end_time}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div>
          <label htmlFor="taskName">Enter Task Name</label>
          <input
            type="text"
            id="taskName"
            name="task_name"
            value={formData.task_name}
            onChange={handleInputChange}
          />
          <label htmlFor="taskDescription">Task Description</label>
          <textarea
            id="taskDescription"
            name="task_description"
            value={formData.task_description}
            onChange={handleInputChange}
            cols="30"
            rows="2"
          />
          <label htmlFor="assignProjectId">Project</label>
          <select
            id="assignProjectId"
            name="project_id"
            value={formData.project_id}
            onChange={handleProjectChange}
          >
            {projects.map((project) => (
              <option key={project.project_id} value={project.project_id}>
                {project.project_name}
              </option>
            ))}
          </select>

          <label htmlFor="assignEmployeeId">Assigning Employee</label>
          <select
            id="assignEmployeeId"
            name="eid"
            value={formData.eid}
            onChange={handleInputChange}
          >
            {employees.map((emp) => (
              <option key={emp.eid} value={emp.eid}>
                {emp.eid} - {emp.employee_name} -{emp.email}
              </option>
            ))}
          </select>
        </div>

        <div className="btnField NewEmployeeBtn">
          <button onClick={handleSubmit}>Submit</button>
          <button onClick={() => window.location.replace("/task")}>
            Go back
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTask;
