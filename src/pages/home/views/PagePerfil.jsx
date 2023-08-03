/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/alt-text */
import { useEffect, useState } from "react";
import { DOMAIN_IMAGE, ROUTER_LOGIN_FORM } from "../../../config/Constant";
import "../../../styles/pages/home/views/pagePerfil.css";
import ModalForm from "../../../components/ModalForm";
import RegisterForm from "../../auth/RegisterForm";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userLogout } from "../../../redux/loginSlice";
import { getDetailUser } from "../../../services/UsuariosService";
const PagePerfil = ({ Token }) => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const [user, setUser] = useState({});
  const [modalEditar, setModalEditar] = useState(false);
  const [amplifiedImage, setAmplifiedImage] = useState(null);

  useEffect(() => {
    getUser();
  }, []);

  //---------------------CARGAR PERFIL USUARIO------------------------------
  const getUser = () => {
    getDetailUser(Token.access, Token.id)
      .then((response) => {
        if (response.status === 401) {
          dispatch(userLogout(Token));
          history(ROUTER_LOGIN_FORM);
        }
        setUser(response.data.user);
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          dispatch(userLogout(Token));
          history(ROUTER_LOGIN_FORM);
        }
      });
  };
  //------------------------------------------------------------------------

  const handleOpenModalEditar = () => {
    setModalEditar(true);
  };
  const handleCloseModalEditar = () => {
    setModalEditar(false);
    setTimeout(function () {
      getUser();
    }, 1000);
  };
  const handleImageClick = (imageSrc) => {
    setAmplifiedImage(imageSrc);
  };
  const handleCloseAmplifiedImage = () => {
    setAmplifiedImage(null);
  };
  return (
    <>
      <ModalForm isOpen={modalEditar} onClose={handleCloseModalEditar}>
        <RegisterForm
          onClose={handleCloseModalEditar}
          Token={Token}
          object={user}
        />
      </ModalForm>
      {amplifiedImage && (
        <div
          className="amplified-image-overlay"
          onClick={handleCloseAmplifiedImage}
        >
          <div className="amplified-image-container">
            <img
              className="amplified-image"
              src={amplifiedImage}
              alt="Image Ampliada"
            />
          </div>
        </div>
      )}
      <div className="container-perfil">
        <h1 className="titulo-perfil">DATOS PERSONALES</h1>
        <div className="section-perfil">
          <section className="section1">
            <p>{user.blood_type}</p>
            <img
              src={DOMAIN_IMAGE + user.image}
              alt="Imagen del usuario"
              onClick={() => handleImageClick(DOMAIN_IMAGE + user.image)}
            />
            <p>{user.legajo}</p>
          </section>
          <section className="section2">
            <p className="grado">{user.grade}</p>
            <p className="nombre_completo">
              {user.first_name + " " + user.last_name}
            </p>
            <p className="direccion">
              {user.address} - {user.phone_number}
            </p>
          </section>
          <section className="section3">
            <div className="container-button-editar">
              <button
                className="button-editar"
                onClick={() => {
                  handleOpenModalEditar();
                }}
              >
                <img src={require("../../../assets/editar.png")} />
                Editar
              </button>
            </div>
            {user.state === "Servicio Activo" || user.state === "Servicio Pasivo" ? (
                      <p  className="estado">{user.state}</p>
                    ) : (
                      <p className="estado" style={{ color: "#ff0000ba" }}>{user.state}</p>
                    )}
          </section>
        </div>
        {/* <h1 className="titulo-perfil">ADQUISIONES</h1>
        <div className="section-perfil"></div> */}
      </div>
    </>
  );
};
export default PagePerfil;
