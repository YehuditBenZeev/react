import Dashboard from "@material-ui/icons/Dashboard";
import Assignment from "@material-ui/icons/Assignment";
import LocalLibrary from "@material-ui/icons/LocalLibrary";
import InsertDriveFile from "@material-ui/icons/InsertDriveFile";
import Games from "@material-ui/icons/Games";
import School from "@material-ui/icons/School";
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
    icon: Assignment,
    component: Begginers,
    layout: "/admin",
    children: [
      {
        path: "/begginers/learnWords",
        name: "לימוד מילים",
        icon: LocalLibrary,
        component: Begginers,
        layout: "/admin",
      },
      {
        path: "/begginers/story",
        name: "סיפור",
        icon: InsertDriveFile,
        component: Begginers,
        layout: "/admin"
      },
      {
        path: "/begginers/game",
        name: "משחק",
        icon: Games,
        component: Begginers,
        layout: "/admin"
      },
      {
        path: "/begginers/test",
        name: "מבחן",
        icon: School,
        component: Begginers,
        layout: "/admin"
      },
    ]
  },

  {
    path: "/students",
    name: "אנגלית לתלמידים",
    icon: Assignment,
    component: Students,
    layout: "/admin",
    children: [
      {
        path: "/students/learnWords",
        name: "לימוד מילים",
        icon: LocalLibrary,
        component: Students,
        layout: "/admin",
      },
      {
        path: "/students/story",
        name: "סיפור",
        icon: InsertDriveFile,
        component: Students,
        layout: "/admin"
      },
      {
        path: "/students/game",
        name: "משחק",
        icon: Games,
        component: Students,
        layout: "/admin"
      },
      {
        path: "/students/test",
        name: "מבחן",
        icon: School,
        component: Students,
        layout: "/admin"
      },
    ]
  },
  {
    path: "/advanced",
    name: "אנגלית למתקדמים",
    icon: Assignment,
    component: Advanced,
    layout: "/admin",
    children: [
      {
        path: "/advanced/learnWords",
        name: "לימוד מילים",
        icon: LocalLibrary,
        component: Advanced,
        layout: "/admin",
      },
      {
        path: "/advanced/story",
        name: "סיפור",
        icon: InsertDriveFile,
        component: Advanced,
        layout: "/admin"
      },
      {
        path: "/advanced/game",
        name: "משחק",
        icon: Games,
        component: Advanced,
        layout: "/admin"
      },
      {
        path: "/advanced/test",
        name: "מבחן",
        icon: School,
        component: Advanced,
        layout: "/admin"
      },
    ]
  },
  {
    path: "/buisness",
    name: "אנגלית לעסקים",
    icon: Assignment,
    component: Buisness,
    layout: "/admin",
    children: [
      {
        path: "/buisness/learnWords",
        name: "לימוד מילים",
        icon: LocalLibrary,
        component: Buisness,
        layout: "/admin",
      },
      {
        path: "/buisness/story",
        name: "סיפור",
        icon: InsertDriveFile,
        component: Buisness,
        layout: "/admin"
      },
      {
        path: "/buisness/game",
        name: "משחק",
        icon: Games,
        component: Buisness,
        layout: "/admin"
      },
      {
        path: "/buisness/test",
        name: "מבחן",
        icon: School,
        component: Buisness,
        layout: "/admin"
      },
    ]
  },
];


export default dashboardRoutes;
