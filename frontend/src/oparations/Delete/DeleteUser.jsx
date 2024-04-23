import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const DeleteUser = () => {
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();


  
  const [employee, setEmployee] = useState({
    eid: "",
    employee_name: "",
    position:""
  });

  useEffect(() => {
    axios
      .get(`http://localhost:8080/user/${id}`)
      .then((res) => {
        const userData = res.data[0];
        setEmployee(userData);
      })
      .catch((error) => {
        console.error("Error fetching employee data:", error);
      });
  }, [id]);



  const handleDelete = async () => {
    try {
      const responce = await axios
        .delete(`http://localhost:8080/user/${id}`)
        .then(() => {
          enqueueSnackbar("Employee Deleted", { variant: "success" });
          window.location.replace("/employee");
          console.log("Account deleted");
        });
    } catch (error) {
      enqueueSnackbar("An Error has occurred!", { variant: "error" });
      console.log("An error while deleting", error);
    }
  };

  return (
    <div className="AddEmployeeContainer">
      <h1>Delete {employee.eid} {employee.employee_name}</h1>
      <div className="employeeInputField">
        <div >
          <h2>Do you want to delete 
         <span>
          {employee.eid} {employee.employee_name}
            
          </span> 
          </h2>
          <h2>
           that work as a {employee.position}.
          </h2>
        </div>
      </div>
      <div className="btnField NewEmployeeBtn">
        <button onClick={()=>window.location.replace("/employee")}>Go back</button>
        <button onClick={handleDelete}>Confirm</button>
      </div>
    </div>
  );
};

export default DeleteUser;
