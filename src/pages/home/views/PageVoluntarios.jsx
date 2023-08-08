/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
import { useEffect, useState } from "react";
import "../../../styles/pages/home/views/pageVoluntarios.css";
import {
  DOMAIN_IMAGE,
  ROUTER_LOGIN_FORM,
  ROUTER_REPORTE_VOLUNTARIOS,
} from "../../../config/Constant";
import ModalForm from "../../../components/ModalForm";
import RegisterForm from "../../auth/RegisterForm";
import DeleteObject from "../../../components/DeleteObject";
import { deleteUser, getListUsers } from "../../../services/UsuariosService";
import * as XLSX from "xlsx";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userLogout } from "../../../redux/loginSlice";

const PageVoluntarios = ({ Token }) => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const [buscador, setBuscador] = useState("");
  const [listaUsers, setListaUsers] = useState([]);
  const [listaFilter, setListaFilter] = useState([]);
  const [modalAñadir, setModalAñadir] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [user, setUser] = useState({});
  const [amplifiedImage, setAmplifiedImage] = useState(null);

  useEffect(() => {
    getUsers();
  }, []);
  //----------------------FILTRAR LOS USUARIOS-------------------------------
  const handleSearch = (e) => {
    setBuscador(e.target.value);
    console.log(buscador);
    filterData(e.target.value);
  };

  const filterData = (searchTerm) => {
    const resultadosBusqueda = listaFilter.filter((elemento) => {
      if (
        elemento.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        elemento.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        elemento.grade.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return elemento;
      }
    });
    setListaUsers(resultadosBusqueda);
  };
  //-------------------------------------------------------------------------

  //---------------------CARGAR LISTA USUARIOS------------------------------
  const getUsers = () => {
    getListUsers(Token.access)
      .then((response) => {
        if(response.status === 401){
          dispatch(userLogout(Token));
          history(ROUTER_LOGIN_FORM);
        }
        const sortedUsers = response.list_users.sort(
          (a, b) => a.legajo - b.legajo
        );
        setListaUsers(sortedUsers);
        setListaFilter(sortedUsers);
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          dispatch(userLogout(Token));
          history(ROUTER_LOGIN_FORM);
        }
      });
  };
  //-------------------------------------------------------------------------

  //---------------------ELIMINAR USUARIO------------------------------------
  const deleteUsers = (id) => {
    deleteUser(Token.access, id).then((response) => {
      console.log(response);
      getUsers();
    });
  };
  //-------------------------------------------------------------------------

  //---------------------EXPORTAR A EXCEL------------------------------------
  const handleExportExcel = () => {
    const filteredData = listaUsers.map((user, index) => ({
      "N°": index + 1,
      LEGAJO: user.legajo,
      "TIPO DE SANGRE": user.blood_type,
      "NOMBRE COMPLETO": `${user.first_name} ${user.last_name}`,
      "CORREO ELECTRÓNICO": user.username,
      GRADO: user.grade,
      DIRECCIÓN: user.address,
      TELÉFONO: user.phone_number,
      ESTADO: user.state ? "Disponible" : "Licencia",
    }));
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Lista_Bomberos");
    XLSX.writeFile(workbook, "Bomberos.xlsx");
  };
  //-------------------------------------------------------------------------

  //-----------------------AMPLIAR IMAGEN------------------------------------
  const handleImageClick = (imageSrc) => {
    setAmplifiedImage(imageSrc);
  };
  const handleCloseAmplifiedImage = () => {
    setAmplifiedImage(null);
  };
  //------------------------------------------------------------------------

  const handleOpenModalAñadir = () => {
    setModalAñadir(true);
  };
  const handleCloseModalAñadir = () => {
    setModalAñadir(false);
    setTimeout(function () {
      getUsers();
    }, 1000);
  };
  const handleCloseModalEliminar = () => {
    setModalEliminar(false);
  };

  return (
    <>
      <DeleteObject
        object={user}
        handleDelete={deleteUsers}
        isOpen={modalEliminar}
        onClose={handleCloseModalEliminar}
      />
      <ModalForm isOpen={modalAñadir} onClose={handleCloseModalAñadir}>
        <RegisterForm
          onClose={handleCloseModalAñadir}
          object={user}
          Token={Token}
        />
      </ModalForm>
      <div className="container_voluntarios">
        {amplifiedImage && (
          <div
            className="amplified-image-overlay"
            onClick={handleCloseAmplifiedImage}
          >
            <div className="amplified-image-container">
              <img
                src={amplifiedImage}
                alt="Amplified Image"
                className="amplified-image"
              />
            </div>
          </div>
        )}
        <div className="contenedor-btn-buscador">
          <div className="container-btns">
            <button className="btn-reporte">
              <a href={ROUTER_REPORTE_VOLUNTARIOS}>Ver Reporte</a>
            </button>
            <button className="btn-excel" onClick={handleExportExcel}>
              <a>Descargar Excel</a>
            </button>
          </div>
          <div className="container-buscador">
            <input
              type="search"
              placeholder="Buscar..."
              value={buscador}
              onChange={handleSearch}
            />
          </div>
        </div>
        <div className="users">
          {listaUsers?.map((user) => (
            <div key={user.id} className="user">
              <div className="user-info">
                {user.state === "Servicio Activo" || user.state === "Servicio Pasivo" ? (
                      <p >{user.state}</p>
                    ) : (
                      <p style={{ color: "#ff0000ba" }}>{user.state}</p>
                    )}
                  </div>

              <div className="user-image">
                <img
                  src={DOMAIN_IMAGE + user.image}
                  alt="Imagen del usuario"
                  onClick={() => handleImageClick(DOMAIN_IMAGE + user.image)}
                />
              </div>
              <div className="user-info">
                <h2>
                  {user.first_name} {user.last_name}
                </h2>
                <p>{user.grade} </p>
                <p>{user.cargo} </p>

              </div>
              <div className="user-actions">
                <button
                  className="btn-editar"
                  onClick={() => {
                    setUser(user);
                    handleOpenModalAñadir();
                  }}
                >
                  Editar
                </button>

                <button
                  className="btn-eliminar"
                  onClick={() => {
                    setUser(user);
                    setModalEliminar(true);
                  }}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
          <div className="user">
            <div className="user-image">
              <img
                src={require("../../../assets/perfil.png")}
                alt="Imagen del usuario"
              />
            </div>
            <div className="user-info">
              <h2>REGISTRO DE VOLUNTARIOS</h2>
            </div>
            <div className="user-agregate">
              <button
                className="btn-agregar"
                onClick={() => {
                  setUser(null);
                  handleOpenModalAñadir();
                }}
              >
                Añadir
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageVoluntarios;
