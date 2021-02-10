import Login from "views/Registration/Login"
import SignUp from 'views/Registration/signUp';
import Dashboard from "@material-ui/icons/Dashboard";


const RegistrationRoutes = [
    {
      path: "/login",
      icon: Dashboard,
      component: Login,
      layout: "/registration"
    },
    {
      path: "/signUp",
      icon: Dashboard,
      component: SignUp,
      layout: "/registration"
    },
  ];
  export default RegistrationRoutes;