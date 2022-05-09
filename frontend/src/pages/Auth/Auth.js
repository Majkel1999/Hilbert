import { useLocation } from "react-router-dom";
import Login from "../../components/Auth/Login";
import Register from "../../components/Auth/Register";
import * as routes from "../../constants/routes";
import "./Auth.scss";
import loginImage from "../../img/login.svg";

const AuthComponents = [
  {
    component: <Login />,
    path: routes.LOGIN,
  },
  {
    component: <Register />,
    path: routes.REGISTER,
  },
];

export default function Auth() {
  const location = useLocation();

  return (
    <div className="authContainer">
      {
        AuthComponents.find(
          (authObject) => authObject.path === location.pathname
        ).component
      }
      <img src={loginImage} alt="loginImage" className="loginImage" />
    </div>
  );
}
