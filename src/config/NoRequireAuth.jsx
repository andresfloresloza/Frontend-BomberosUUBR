import { Navigate } from "react-router-dom";
import { ROUTER_INICIO, ROUTER_INVENTARIO, ROUTER_PERFIL } from "./Constant";

const NoRequireAuth = ({ Token, children }) => {
  if (Token) {
    if (Token.position === "Administrador" || Token.position === "Personal") {
      return <Navigate to={ROUTER_INICIO} />;
    }
    if (Token.position === "Inventario") {
      return <Navigate to={ROUTER_INVENTARIO} />;
    } else {
      return <Navigate to={ROUTER_PERFIL} />;
    }
  }

  return children;
};

export default NoRequireAuth;
