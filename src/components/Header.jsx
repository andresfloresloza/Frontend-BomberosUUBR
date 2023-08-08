/* eslint-disable jsx-a11y/alt-text */
import { useNavigate } from "react-router-dom";
import {
  ROUTER_INICIO,
  ROUTER_INVENTARIO,
  ROUTER_LOGIN_FORM,
  ROUTER_PERFIL,
} from "../config/Constant";
import "../styles/components/header.css";
import { useDispatch } from "react-redux";
import { userLogout } from "../redux/loginSlice";

const Header = ({ Token }) => {
  const dispatch = useDispatch();
  const history = useNavigate();

  //----------------------CERRAR SESION-------------------------------------
  const cerrar_sesion = () => {
    dispatch(userLogout(Token));
    history(ROUTER_LOGIN_FORM);
  };
  //------------------------------------------------------------------------

  return (
    <>
      {Token && (
        <nav>
          <div className="logo">
            <a href="/login">
              <img src={require("../assets/LOGO1.png")} alt="Logo" />
            </a>
            <p>Bienvenido, {Token.first_name} </p>
          </div>
          <div className="container-header">
            <input type="checkbox" id="menu-toggle" />
            <label htmlFor="menu-toggle" className="menu-icon">
              &#9776;
            </label>
            {Token.is_superuser && Token.position === "Administrador" && (
              <ul className="menu">
                <li>
                  <a href={ROUTER_INICIO}>PERSONAL</a>
                </li>
                <li>
                  <a href={ROUTER_INVENTARIO}>INVENTARIO</a>
                </li>
                <li>
                  <a href={ROUTER_PERFIL}>MI PERFIL</a>
                </li>
                  <li>
                    <a href={ROUTER_LOGIN_FORM} onClick={cerrar_sesion}>
                      SALIR
                    </a>
                  </li>
              </ul>
            )}
            {Token.position === "Personal" && (
              <ul className="menu">
                <li>
                  <a href={ROUTER_INICIO}>PERSONAL</a>
                </li>
                <li>
                  <a href={ROUTER_PERFIL}>MI PERFIL</a>
                </li>
                  <li>
                    <a href={ROUTER_LOGIN_FORM} onClick={cerrar_sesion}>
                      SALIR
                    </a>
                  </li>
              </ul>
            )}
            {Token.position === "Inventario" && (
              <ul className="menu">
                <li>
                  <a href={ROUTER_INVENTARIO}>INVENTARIO</a>
                </li>
                <li>
                  <a href={ROUTER_PERFIL}>MI PERFIL</a>
                </li>
                  <li>
                    <a href={ROUTER_LOGIN_FORM} onClick={cerrar_sesion}>
                      SALIR
                    </a>
                  </li>
              </ul>
            )}
          </div>
        </nav>
      )}
    </>
  );
};

export default Header;
