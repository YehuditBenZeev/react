import Dashboard from "@material-ui/icons/Dashboard";
import Assignment from "@material-ui/icons/Assignment";
import DashboardPage from "views/Dashboard/Dashboard.js";
import Buisness from "views/Buisness/Buisness.js";
import Students from "views/Students/Students.js";
import Advanced from "views/Advanced/Advanced.js";
import Begginers from "views/Begginers/Begginers.js";


const dashboardRoutes = [
  {
    path: "/dashboard",
    // name: "מסך ראשי",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path: "/begginers",
    name: "אנגלית למתחילים",
    icon: Assignment,
    component: Begginers,
    layout: "/admin",
    children: true
  },
  {
    path: "/students",
    name: "אנגלית לתלמידים",
    icon: Assignment,
    component: Students,
    layout: "/admin",
    children: true
  },
  {
    path: "/advanced",
    name: "אנגלית למתקדמים",
    icon: Assignment,
    component: Advanced,
    layout: "/admin",
    children: true
  },
  {
    path: "/buisness",
    name: "אנגלית לעסקים",
    icon: Assignment,
    component: Buisness,
    layout: "/admin",
    children: true
  },
];




export default dashboardRoutes;
