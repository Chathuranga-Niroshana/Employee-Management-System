import Home from "../pages/Home";
import Task from "../pages/Task";
import Project from "../pages/Project";
import Profile from "../pages/Profile";
import Notification from "../pages/Notification";
import Manage from "../pages/Manage";
import Employees from "../pages/Employees";
import Department from "../pages/Department";
import UpdateTask from "../oparations/Update/UpdateTask";
import UpdateProfile from "../oparations/Update/UpdateProfile";
import UpdateProject from "../oparations/Update/UpdateProject";
import UpdateDepartment from "../oparations/Update/UpdateDepartment";
import RequestAdvancedPayment from "../oparations/Manage/RequestAdvancedPayment";
import RequestVacation from "../oparations/Manage/RequestVacation";
import CreateTask from "../oparations/AddNew/CreateTask";
import AddProject from "../oparations/AddNew/AddProject";
import AddEmployee from "../oparations/AddNew/AddEmployee";
import AddDepartment from "../oparations/AddNew/AddDepartment";
import DeleteUser from "../oparations/Delete/DeleteUser";
import DeleteProject from "../oparations/Delete/DeleteProject";
import DeleteDepartment from "../oparations/Delete/DeleteDepartment";
import DeleteTask from "../oparations/Delete/DeleteTask";
import Login from "../pages/Login";
import Messages from "../pages/Messages";

const routes = [
  { path: "/", component: Login, requiresAuth: false },
  { path: "/home", component: Home, requiresAuth: true },
  { path: "/task", component: Task, requiresAuth: true },
  { path: "/project", component: Project, requiresAuth: true },
  { path: "/profile", component: Profile, requiresAuth: true },
  { path: "/notification", component: Notification, requiresAuth: true },
  { path: "/manage", component: Manage, requiresAuth: true },
  { path: "/employee", component: Employees, requiresAuth: true },
  { path: "/department", component: Department, requiresAuth: true },
  {
    path: "/employee/updateprofile/:id",
    component: UpdateProfile,
    requiresAuth: true,
  },
  { path: "/task/updatetask/:id", component: UpdateTask, requiresAuth: true },
  {
    path: "/project/updateproject/:id",
    component: UpdateProject,
    requiresAuth: true,
  },
  {
    path: "/department/updatedepartment/:id",
    component: UpdateDepartment,
    requiresAuth: true,
  },
  {
    path: "/requestadvanced",
    component: RequestAdvancedPayment,
    requiresAuth: true,
  },
  { path: "/requestvacation", component: RequestVacation, requiresAuth: true },
  { path: "/createtask", component: CreateTask, requiresAuth: true },
  { path: "/addproject", component: AddProject, requiresAuth: true },
  { path: "/addemployee", component: AddEmployee, requiresAuth: true },
  { path: "/adddepartment", component: AddDepartment, requiresAuth: true },
  {
    path: "/employee/deleteuser/:id",
    component: DeleteUser,
    requiresAuth: true,
  },
  {
    path: "/project/deleteproject/:id",
    component: DeleteProject,
    requiresAuth: true,
  },
  {
    path: "/department/deletedepartment/:id",
    component: DeleteDepartment,
    requiresAuth: true,
  },
  { path: "/task/deletetask/:id", component: DeleteTask, requiresAuth: true },
  { path: "/message", component: Messages, requiresAuth: true },
];

export default routes;
