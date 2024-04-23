import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useState } from "react";

const AddDepartment = () => {
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

  const addDeptBtnHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/department/createdepartment",
        formData
      );
      enqueueSnackbar("New Department Created", { variant: "success" });
      console.log("New Department Created");
      window.location.reload();
    } catch (error) {
      enqueueSnackbar("An Error has occurred!", { variant: "error" });
      console.log(error);
    }
  };

  return (
    <div className="AddEmployeeContainer">
      <h1>Add a new Department</h1>
      <div className="employeeInputField">
        <div className="field">
          <label htmlFor="department_id">Department ID</label>
          <input
            type="text"
            onChange={changeHandler}
            value={formData.department_id}
            id="department_id"
            name="department_id"
          />
        </div>

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

        <div className="btnField NewEmployeeBtn">
          <button onClick={addDeptBtnHandler}>Submit</button>
          <button onClick={() => window.location.replace("/department")}>
            Go back
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddDepartment;
