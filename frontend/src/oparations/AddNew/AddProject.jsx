import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useContext, useEffect, useState } from "react";
import "./Stylesheets/CreateProject.css";
import { EmsContext } from "../../context/EmsContext";

const AddProject = () => {
  const { department, employees } = useContext(EmsContext);

  const { enqueueSnackbar } = useSnackbar();
  const [formData, setFormData] = useState({
    project_id: "",
    project_name: "",
    start_date: "",
    end_date: "",
    description: "",
    department_id: "",
    eid: "",
  });

  const managers = employees.filter((emp) => emp.position === "Manager");

  useEffect(() => {
    if (managers.length > 0) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        eid: managers[0].eid,
      }));
    }
  }, []);

  const changeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const addProjectBtnHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/project/createproject",
        formData
      );
      window.location.reload();
      enqueueSnackbar("New Project Created", { variant: "success" });
      console.log("New Project Created");
    } catch (error) {
      enqueueSnackbar("An Error has occurred!", { variant: "error" });
      console.log(error);
    }
  };
  return (
    <div className="AddEmployeeContainer AddProjectContainer">
      <h1>Add a new Project</h1>
      <div className="employeeInputField">
        <div className="field addProjectDiv">
          <label htmlFor="project_id">Project ID</label>
          <input
            type="text"
            onChange={changeHandler}
            value={formData.project_id}
            id="project_id"
            name="project_id"
          />
        </div>
        <div className="field addProjectDiv">
          <label htmlFor="project_name">Project Name</label>
          <input
            onChange={changeHandler}
            value={formData.project_name}
            type="text"
            id="project_name"
            name="project_name"
          />
        </div>
        <div className="field addProjectDiv">
          <label htmlFor="start_date">Start Date</label>
          <input
            value={formData.start_date}
            onChange={changeHandler}
            type="date"
            name="start_date"
            id="start_date"
          />
        </div>
        <div className="field addProjectDiv">
          <label htmlFor="end_date">End Date</label>
          <input
            value={formData.end_date}
            onChange={changeHandler}
            type="date"
            name="end_date"
            id="end_date"
          />
        </div>

        <div className="field addProjectDiv">
          <label htmlFor="description">Project Description</label>
          <textarea
            value={formData.description}
            onChange={changeHandler}
            name="description"
            id="description"
            cols="50"
            rows="2"
          />
        </div>
        <div className="field addProjectDiv">
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
                {dept.departmant_name}
              </option>
            ))}
          </select>
        </div>
        <div className="field addProjectDiv">
          <label htmlFor="assignEmployeeId">Assign a Manager</label>
          <select
            value={formData.eid}
            onChange={changeHandler}
            name="eid"
            id="assignEmployeeId"
          >
            {managers.map((manager) => (
              <option key={manager.eid} value={manager.eid}>
                {manager.eid} {manager.employee_name}
              </option>
            ))}
          </select>
        </div>
        <div className="btnField NewEmployeeBtn">
          <button onClick={addProjectBtnHandler}>Submit</button>
          <button onClick={() => window.location.replace("/project")}>
            Go back
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProject;
