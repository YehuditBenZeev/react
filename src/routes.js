import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import DashboardPage from "views/Dashboard/Dashboard.js";
import UserProfile from "views/UserProfile/UserProfile.js";
import Buisness from "views/Buisness/Buisness.js";
import Students from "views/Students/Students.js";
import Advanced from "views/Advanced/Advanced.js";
import Begginers from "views/Begginers/Begginers.js";


const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "מסך ראשי",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path: "/begginers",
    name: "אנגלית למתחילים",
    icon: Dashboard,
    component: Begginers,
    layout: "/admin"
  },
  {
    path: "/students",
    name: "אנגלית לתלמידים",
    icon: Dashboard,
    component: Students,
    layout: "/admin"
  },
  {
    path: "/advanced",
    name: "אנגלית למתקדמים",
    icon: Dashboard,
    component: Advanced,
    layout: "/admin"
  },
  {
    path: "/buisness",
    name: "אנגלית לעסקים",
    icon: Person,
    component: Buisness,
    layout: "/admin"
  },
  {
    path: "/user",
    name: "פרופיל משתמש",
    icon: Dashboard,
    component: UserProfile,
    layout: "/admin"
  },
];


export default dashboardRoutes;
