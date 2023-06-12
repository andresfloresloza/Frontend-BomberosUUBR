/* eslint-disable jsx-a11y/alt-text */
import { Link } from "react-router-dom";
import "../../styles/pages/auth/login.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { userLogin } from "../../redux/loginSlice";
import { postLogin } from "../../services/AuthService";

const LoginForm = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //----------------------INICIO DE SESION----------------------
  const iniciar_sesion = () => {
    postLogin(email, password)
      .then((response) => {
        dispatch(userLogin(response));
      })
      .catch((error) => {
      });
  };
  //------------------------------------------------------------

  return (
    <>
      <div className="container_login">
        <img src={require("../../assets/LOGO1.png")} />
        <div className="container">
          <form className="login-form">
            <h1>INICIAR SESION</h1>
            <div className="form-group">
              <label htmlFor="username">Correo Electrónico:</label>
              <input
                type="text"
                id="username"
                name="username"
                value={email}
                required
                placeholder="Ingrese su Correo Electrónico..."
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Contraseña:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                required
                placeholder="Ingrese su contraseña..."
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Link className="submit" onClick={iniciar_sesion}>
              INGRESAR
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};
export default LoginForm;
