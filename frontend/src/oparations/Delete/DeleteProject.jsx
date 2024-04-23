import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const DeleteProject = () => {
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const [project, setProject] = useState({
    project_id: "",
    project_name: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:8080/project/${id}`)
      .then((res) => {
        const projectData = res.data[0];
        setProject(projectData);
      })
      .catch((error) => {
        console.error("Error fetching project data:", error);
      });
  }, [id]);

  const handleDelete = async () => {
    try {
      const responce = await axios
        .delete(`http://localhost:8080/project/${id}`)
        .then(() => {
          window.location.replace("/project");
          enqueueSnackbar("Project Deleted", { variant: "success" });
          console.log("Account deleted");
        });
    } catch (error) {
      enqueueSnackbar("An Error has occurred!", { variant: "error" });
      console.log("An error while deleting", error);
    }
  };
  return (
    <div className="AddEmployeeContainer">
      <h1>
        Delete {project.project_id} {project.project_name}
      </h1>
      <div className="employeeInputField">
        <div>
          <h2>
            Do you want to delete
            <span>
              {project.project_id} {project.project_name}
            </span>
          </h2>
        </div>
      </div>
      <div className="btnField NewEmployeeBtn">
        <button onClick={handleDelete}>Confirm</button>
        <button onClick={() => window.location.replace("/project")}>
          Go back
        </button>
      </div>
    </div>
  );
};

export default DeleteProject;
