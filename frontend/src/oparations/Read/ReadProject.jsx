import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import axios from "axios";

const ReadEmployee = () => {
  const { id } = useParams();
  const [project, setProject] = useState({
    project_id: "",
    project_name: "",
    start_date: "",
    end_date: "",
    description: "",
    department_id: "",
    eid: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:8080/project/${id}`)
      .then((res) => {
        setProject(res.data[0]);
      })
      .catch((error) => {
        console.error("Error fetching project data:", error);
      });
  }, [id]);

  return (
    <div className="AddEmployeeContainer">
      <h1>Project Details</h1>
      <div className="employeeInputField ProfileDataField w-full">
        <div className="field ProfileField">
          <label htmlFor="eid">Project ID</label>
          <p>{project.project_id}</p>
        </div>

        <div className="field ProfileField">
          <label htmlFor="employee_name">Name</label>
          <p>{project.project_name}</p>
        </div>
        <div className="field ProfileField">
          <label htmlFor="dob">Start Date</label>
          <p>{moment(project.start_date).format("DD/MM/YYYY")}</p>
        </div>
        <div className="field ProfileField">
          <label htmlFor="dob">End Date</label>
          <p>{moment(project.end_date).format("DD/MM/YYYY")}</p>
        </div>
        <div className="field ProfileField">
          <label htmlFor="mobile">Description</label>
          <p>{project.description}</p>
        </div>
        <div className="field ProfileField">
          <label htmlFor="address">Department ID</label>
          <p>{project.department_id}</p>
        </div>

        <div className="field ProfileField">
          <label>Manager ID</label>
          <p>{project.eid}</p>
        </div>
      </div>
    </div>
  );
};

export default ReadEmployee;
