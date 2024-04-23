import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const DeleteDepartment = () => {
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const [dept, setDept] = useState({
    departmant_name: "",
    department_id: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:8080/department/${id}`)
      .then((res) => {
        const userData = res.data[0];
        setDept(userData);
      })
      .catch((error) => {
        console.error("Error fetching department data:", error);
      });
  }, [id]);

  const handleDelete = async () => {
    try {
      const responce = await axios
        .delete(`http://localhost:8080/department/${id}`)
        .then(() => {
          enqueueSnackbar("Department Deleted", { variant: "success" });
          window.location.replace("/department");
          console.log("Department deleted");
        });
    } catch (error) {
      enqueueSnackbar("An Error has occurred!", { variant: "error" });
      console.log("An error while deleting", error);
    }
  };
  return (
    <div className="AddEmployeeContainer">
      <h1>
        Delete {dept.department_id} {dept.departmant_name}
      </h1>
      <div className="employeeInputField">
        <div>
          <h2>
            Do you want to delete
            <span>
              {dept.department_id} {dept.departmant_name}
            </span>
          </h2>
        </div>
      </div>
      <div className="btnField NewEmployeeBtn">
        <button onClick={handleDelete}>Confirm</button>
        <button onClick={() => window.location.replace("/department")}>
          Go back
        </button>
      </div>
    </div>
  );
};

export default DeleteDepartment;
