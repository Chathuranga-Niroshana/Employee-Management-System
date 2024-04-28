import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const ReadTask = () => {
  const { id } = useParams();
  const [task, setTask] = useState({
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

  useEffect(() => {
    axios
      .get(`http://localhost:8080/task/${id}`)
      .then((res) => {
        setTask(res.data[0]);
      })
      .catch((error) => {
        console.error("Error fetching task data:", error);
      });
  }, [id]);

  return (
    <div className="AddEmployeeContainer">
      <h1>Task Details</h1>
      <div className="employeeInputField ProfileDataField w-full">
        <div className="field ProfileField">
          <label htmlFor="employee_name">Task Name</label>
          <p>{task.task_name}</p>
        </div>

        <div className="field ProfileField">
          <label htmlFor="dob">Date</label>
          <p>{moment(task.date).format("DD/MM/YYYY")}</p>
        </div>

        <div className="field ProfileField">
          <label htmlFor="eid">Task ID</label>
          <p>{task.project_id}</p>
        </div>
        <div className="field ProfileField">
          <label htmlFor="dob">Start Time</label>
          <p>{task.start_time}</p>
        </div>
        <div className="field ProfileField">
          <label htmlFor="dob">End Time</label>
          <p>{task.end_time}</p>
        </div>
        <div className="field ProfileField">
          <label htmlFor="mobile">Description</label>
          <p>{task.task_description}</p>
        </div>
        <div className="field ProfileField">
          <label>Assign Employee ID</label>
          <Link to={`reademployee/${task.eid}`}>
            <p>{task.eid}</p>
          </Link>
        </div>
        <div className="field ProfileField">
          <label>Project ID</label>
          <p>{task.project_id}</p>
        </div>
        <div className="field ProfileField">
          <label>Review</label>
          <p>{task.review}</p>
        </div>
        <div className="field ProfileField">
          <label>Progress</label>
          <p>{task.progress}</p>
        </div>
      </div>
    </div>
  );
};

export default ReadTask;
