import LocalLibrary from "@material-ui/icons/LocalLibrary";
import InsertDriveFile from "@material-ui/icons/InsertDriveFile";
import Games from "@material-ui/icons/Games";
import School from "@material-ui/icons/School";
import Begginers from "views/Begginers/Begginers.js";
import LearnWords from "views/LearnWords/LearnWords";



const categoryRoutes = [
    {
      path: "/learnWords",
      name: "לימוד מילים",
      icon: LocalLibrary,
      component: LearnWords,
      layout: "/admin",
    },
    {
      path: "/story",
      name: "סיפור",
      icon: InsertDriveFile,
      component: Begginers,
      layout: "/admin"
    },
    {
      path: "/game",
      name: "משחק",
      icon: Games,
      component: Begginers,
      layout: "/admin"
    },
    {
      path: "/test",
      name: "מבחן",
      icon: School,
      component: Begginers,
      layout: "/admin"
    },
  ]

export default categoryRoutes;