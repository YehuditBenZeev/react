import LocalLibrary from "@material-ui/icons/LocalLibrary";
import InsertDriveFile from "@material-ui/icons/InsertDriveFile";
import Games from "@material-ui/icons/Games";
import School from "@material-ui/icons/School";
import Begginers from "views/Begginers/Begginers.js";
import LearnWords from "views/LearnWords/LearnWords";
import Test from "views/Test/Test";
import StoryPage from 'views/Story/story'

import {
  Switch, Route, useRouteMatch,
  useParams
} from "react-router-dom";


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
      component: StoryPage,
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
      component: Test,
      layout: "/admin"
    },
  ]

const SwitchCategory = (category) => (
  <Switch>
      {categoryRoutes.map((prop, key) => {
          return (
              <Route
                  path={category + prop.path}
                  component={prop.component}
                  key={key}
              />
          );
      })}
  </Switch>
)

export {categoryRoutes, SwitchCategory};