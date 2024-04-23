import React, { useEffect, useState, createContext } from "react";
import axios from "axios";

export const EmsContext = createContext();

export const EmsContextProvider = (props) => {
  const [projects, setProjects] = useState([]);
  const [department, setDepartment] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState(null);

  // get current logged user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const authToken = localStorage.getItem("auth-token");
        if (authToken) {
          const decodedToken = parseJwt(authToken);
          const userId = decodedToken.user.id;

          const response = await axios.get(
            `http://localhost:8080/user/${userId}`,
            {
              headers: {
                "auth-token": authToken,
              },
            }
          );
          setUser(response.data[0]);
        }
      } catch (error) {
        console.log("Error fetching user profile:", error);
      }
    };
    fetchUser();
  }, []);
  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (error) {
      return null;
    }
  };

  // projects
  useEffect(() => {
    axios
      .get("http://localhost:8080/project")
      .then((res) => {
        setProjects(res.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  // departments
  useEffect(() => {
    axios
      .get("http://localhost:8080/department")
      .then((res) => {
        setDepartment(res.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  // employee
  useEffect(() => {
    axios
      .get("http://localhost:8080/user/")
      .then((res) => {
        setEmployees(res.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  // tasks
  useEffect(() => {
    axios
      .get("http://localhost:8080/task")
      .then((res) => {
        setTasks(res.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  });

  const contexValue = {
    projects,
    department,
    employees,
    tasks,
    user,
  };

  return (
    <EmsContext.Provider value={contexValue}>
      {props.children}
    </EmsContext.Provider>
  );
};

export default EmsContextProvider;
