import { Navigate } from "react-router-dom";
import { ROUTER_LOGIN_FORM } from "./Constant";

const RequireAuth = ({ Token, children }) => {
  if (!Token) {
    return <Navigate to={ROUTER_LOGIN_FORM} />;
  }

  return children;
};
export default RequireAuth;