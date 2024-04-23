import React, { useEffect, useContext, useState } from "react";
import { useSnackbar } from "notistack";
import axios from "axios";
import { EmsContext } from "../../context/EmsContext";
import { useParams } from "react-router-dom";

const UpdateDepartment = () => {
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const [formData, setFormData] = useState({
    departmant_name: "",
    department_id: "",
  });
  const changeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(async () => {
    await axios
      .get(`http://localhost:8080/department/${id}`)
      .then((res) => {
        const deptData = res.data[0];
        setFormData(deptData);
      })
      .catch((error) => {
        console.error("Error fetching department data:", error);
      });
  }, [id]);

  const btnHandle = async () => {
    try {
      await axios.put(`http://localhost:8080/department/${id}`, formData);
      enqueueSnackbar("Department Updated", { variant: "success" });
      window.location.replace("/department");
      console.log("Department Updated");
    } catch (error) {
      enqueueSnackbar("An Error has occurred!", { variant: "error" });
      console.error("Error updating department:", error);
    }
  };

  return (
    <div className="AddEmployeeContainer">
      <h1>Edit {formData.department_id} Department</h1>
      <div className="employeeInputField">
        <div className="field">
          <label htmlFor="departmant_name">Department Name</label>
          <input
            onChange={changeHandler}
            value={formData.departmant_name}
            type="text"
            id="departmant_name"
            name="departmant_name"
          />
        </div>
      </div>
      <div className="btnField NewEmployeeBtn">
        <button onClick={btnHandle}>Update</button>
        <button onClick={() => window.location.replace("/department")}>
          Go back
        </button>
      </div>
    </div>
  );
};

export default UpdateDepartment;
