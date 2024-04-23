import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const DeleteTask = () => {
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const [task, setTask] = useState({
    task_name: "",
    task_id: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:8080/task/${id}`)
      .then((res) => {
        const taskData = res.data[0];
        setTask(taskData);
      })
      .catch((error) => {
        console.error("Error fetching task data:", error);
      });
  }, [id]);

  const handleDelete = async () => {
    try {
      const responce = await axios
        .delete(`http://localhost:8080/task/${id}`)
        .then(() => {
          window.location.replace("/task");
          enqueueSnackbar("Task Deleted", { variant: "success" });
          console.log("Task deleted");
        });
    } catch (error) {
      enqueueSnackbar("An Error has occurred!", { variant: "error" });
      console.log("An error while deleting", error);
    }
  };

  return (
    <div className="AddEmployeeContainer">
      <h1>
        Delete {task.task_id} {task.task_name}
      </h1>
      <div className="employeeInputField">
        <div>
          <h2>
            Do you want to delete
            <span>
              {task.task_id} {task.task_name}
            </span>
          </h2>
        </div>
      </div>
      <div className="btnField NewEmployeeBtn">
        <button onClick={handleDelete}>Confirm</button>
        <button onClick={() => window.location.replace("/employee")}>
          Go back
        </button>
      </div>
    </div>
  );
};

export default DeleteTask;
