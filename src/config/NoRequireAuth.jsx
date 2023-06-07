import { Navigate } from "react-router-dom";
import { ROUTER_INICIO, ROUTER_PERFIL } from "./Constant";

const NoRequireAuth = ({ Token, children }) => {
  if (Token) {
    if (Token.is_superuser) {
      return <Navigate to={ROUTER_INICIO} />;
    } else {
      return <Navigate to={ROUTER_PERFIL} />;
    }
  }

  return children;
};

export default NoRequireAuth;