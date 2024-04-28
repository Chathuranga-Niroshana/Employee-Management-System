import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { EmsContext } from "../context/EmsContext";
import moment from "moment";
import { FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faEdit, faTimesCircle } from "@fortawesome/free-solid-svg-icons";


const Project = () => {
  const { projects, user } = useContext(EmsContext);

  return (
    <div className="employeeContainer">
      <div>
        <h1 className="text-blue-900 text-3xl">Project List</h1>
        {user.position === "Admin" ? (
          <Link to="/addproject">
            <h1>Add Project</h1>
          </Link>
        ) : (
          <></>
        )}
      </div>
      <table>
        <thead>
          <tr>
            <th>Project ID</th>
            <th>Name</th>
            <th>Start date</th>
            <th>End date</th>
            <th>Description</th>
            <th>Department Id</th>
            <th>Manager Id</th>
            {user.position === "Admin" ? <th>Operation</th> : <></>}
          </tr>
        </thead>
        <tbody>
          {projects.map((p) => (
            <tr key={p.project_id}>
              <Link to={`readproject/${p.project_id}`}>
              <td>{p.project_id}</td>
              </Link>
              <td>{p.project_name} </td>
              <td>{moment(p.start_date).format("DD/MM/YYYY")} </td>
              <td>{moment(p.end_date).format("DD/MM/YYYY")} </td>
              <td>{p.description} </td>
              <td>{p.department_id} </td>
              <td>{p.eid} </td>
              {user.position === "Admin" ? (
                <td>
                  <Link to={`updateproject/${p.project_id}`}>
                    <FontAwesomeIcon className = "iconClass"  icon={faEdit} />
                  </Link>
                  <Link to={`deleteproject/${p.project_id}`}>
                    <FontAwesomeIcon className = "iconClass redIcon"  icon={faTimesCircle} />
                  </Link>
                </td>
              ) : (
                <></>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Project;
