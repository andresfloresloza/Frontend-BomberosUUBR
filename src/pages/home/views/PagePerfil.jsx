/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/alt-text */
import { useEffect, useState } from "react";
import { DOMAIN, DOMAIN_IMAGE } from "../../../config/Constant";
import axios from "axios";
import "../../../styles/pages/home/views/pagePerfil.css";
import ModalForm from "../../../components/ModalForm";
import RegisterForm from "../../auth/RegisterForm";
const PagePerfil = ({ Token }) => {
  const [user, setUser] = useState({});
  const [modalEditar, setModalEditar] = useState(false);
  const [amplifiedImage, setAmplifiedImage] = useState(null);

  useEffect(() => {
    getUser();
  }, []);

  //---------------------CARGAR PERFIL USUARIO------------------------------
  const getUser = async () => {
    try {
      const response = await axios.get(DOMAIN + "usuario/" + Token.id);
      setUser(response.data.data.user);
    } catch (error) {
      console.error(error);
    }
  };
  //------------------------------------------------------------------------

  const handleOpenModalEditar = () => {
    setModalEditar(true);
  };
  const handleCloseModalEditar = () => {
    setModalEditar(false);
    getUser();
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
            <p className="direccion">{user.address}</p>
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
            {user.state ? (
              <p className="estado">Disponible</p>
            ) : (
              <p className="estado">Licencia</p>
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
