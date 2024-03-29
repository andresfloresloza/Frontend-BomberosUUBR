/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/alt-text */
import { useLocation, useNavigate } from "react-router-dom";
import "../../../styles/pages/home/views/pageVoluntarios.css";
import { useEffect, useState } from "react";
import ModalForm from "../../../components/ModalForm";
import RegisterProduct from "../forms/RegisterProduct";
import { deleteEpp, getListEpp } from "../../../services/EppService";
import {
  DOMAIN_IMAGE,
  ROUTER_LOGIN_FORM,
  ROUTER_REPORTE_INVENTARIO,
  ROUTER_REPORTE_QR,
} from "../../../config/Constant";
import { deleteOtros, getListOtros } from "../../../services/OtroService";
import DeleteObject from "../../../components/DeleteObject";
import * as XLSX from "xlsx";
import { useDispatch } from "react-redux";
import { userLogout } from "../../../redux/loginSlice";
import QRCode from "qrcode.react";

const PageProduct = ({ Token }) => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const location = useLocation();
  const [modal, setModal] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [amplifiedImage, setAmplifiedImage] = useState(null);
  const [product, setProduct] = useState({});
  const [listProducts, setListProduct] = useState([]);
  const EppEstructural_Forestal = listProducts.filter(
    (listProducts) => listProducts.type_product === location.state.id
  );

  useEffect(() => {
    getList();
  }, []);

  //------------------CARGAR LISTA PRODUCTO--------------------------------------
  const getList = () => {
    if (
      location.state.category === "EPP Estructural" ||
      location.state.category === "EPP Forestal" ||
      location.state.category === "EPP Rescate Técnico" ||
      location.state.category === "EPP Hazmat" ||
      location.state.category === "EPP Convencionales"
    ) {
      console.log("Entre a: " + location.state.category);
      getListEpp(Token.access)
        .then((response) => {
          if (response.status === 401) {
            dispatch(userLogout(Token));
            history(ROUTER_LOGIN_FORM);
          }
          const sortedProducts = response.list_epp.sort(
            (a, b) => a.codigo - b.codigo
          );
          setListProduct(sortedProducts);
        })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            dispatch(userLogout(Token));
            history(ROUTER_LOGIN_FORM);
          }
        });
    } else {
      console.log("Entre a: " + location.state.category);
      getListOtros(Token.access)
        .then((response) => {
          if (response.status === 401) {
            dispatch(userLogout(Token));
            history(ROUTER_LOGIN_FORM);
          }
          const sortedProducts = response.list_otros.sort(
            (a, b) => a.codigo - b.codigo
          );
          setListProduct(sortedProducts);
        })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            dispatch(userLogout(Token));
            history(ROUTER_LOGIN_FORM);
          }
        });
    }
  };
  //----------------------------------------------------------------------------

  //---------------------ELIMINAR PRODUCTO--------------------------------------
  const deleteProductType = (id) => {
    if (
      location.state.category === "EPP Estructural" ||
      location.state.category === "EPP Forestal" ||
      location.state.category === "EPP Rescate Técnico" ||
      location.state.category === "EPP Hazmat" ||
      location.state.category === "EPP Convencionales"
    ) {
      deleteEpp(Token.access, id).then((response) => {
        console.log(response);
        getList();
      });
    } else {
      deleteOtros(Token.access, id).then((response) => {
        console.log(response);
        getList();
      });
    }
  };
  //----------------------------------------------------------------------------

  //---------------------EXPORTAR A EXCEL------------------------------------
  const handleExportExcel = () => {
    if (
      location.state.category === "EPP Estructural" ||
      location.state.category === "EPP Forestal" ||
      location.state.category === "EPP Rescate Técnico" ||
      location.state.category === "EPP Hazmat" ||
      location.state.category === "EPP Convencionales"
    ) {
      const filteredData = EppEstructural_Forestal.map((product, index) => ({
        "N°": index + 1,
        CÓDIGO: product.codigo,
        ESTADO: product.estado ? "Donación" : "Comprado",
        MARCA: product.marca,
        INDUSTRIA: product.industria,
        TALLA: product.talla,
        "AÑO FABRICACION": product.año_fabricacion,
        COLOR: product.color,
        "COLOR REFLECTIVO": product.color_reflectivo,
        CERTIFICACIÓN: product.certificacion,
        "COLOR SUSPENSORES": product.color_suspensores,
        MATERIAL: product.material,
      }));
      const worksheet = XLSX.utils.json_to_sheet(filteredData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(
        workbook,
        worksheet,
        "Lista_" + location.state.name + "_" + location.state.category
      );
      XLSX.writeFile(
        workbook,
        location.state.name + "_" + location.state.category + ".xlsx"
      );
    } else {
      const filteredData = EppEstructural_Forestal.map((product, index) => ({
        "N°": index + 1,
        CÓDIGO: product.codigo,
        ESTADO: product.estado ? "Donación" : "Comprado",
        NOMBRE: product.nombre,
        DESCRIPCION: product.descripcion,
      }));
      const worksheet = XLSX.utils.json_to_sheet(filteredData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(
        workbook,
        worksheet,
        "Lista_" + location.state.name + "_" + location.state.category
      );
      XLSX.writeFile(
        workbook,
        location.state.name + "_" + location.state.category + ".xlsx"
      );
    }
  };
  //-------------------------------------------------------------------------
  const handleOpenModal = () => {
    setModal(true);
  };
  const handleCloseModal = () => {
    setModal(false);
    setTimeout(function () {
      getList();
    }, 1000);
  };

  const handleCloseModalEliminar = () => {
    setModalEliminar(false);
  };
  const handleImageClick = (imageSrc) => {
    setAmplifiedImage(imageSrc);
  };
  const handleCloseAmplifiedImage = () => {
    setAmplifiedImage(null);
  };
  return (
    <>
      <DeleteObject
        object={product}
        handleDelete={deleteProductType}
        isOpen={modalEliminar}
        onClose={handleCloseModalEliminar}
      />
      <ModalForm isOpen={modal} onClose={handleCloseModal}>
        <RegisterProduct
          onClose={handleCloseModal}
          Token={Token}
          product={product}
        />
      </ModalForm>
      <div className="container_voluntarios">
        <div className="container-btns">
          <button className="btn-reporte">
            <a
              onClick={() => {
                history(ROUTER_REPORTE_INVENTARIO, {
                  state: {
                    id: location.state.id,
                    name: location.state.name,
                    category: location.state.category,
                  },
                });
              }}
            >
              Ver Reporte
            </a>
          </button>
          <button className="btn-reporte">
            <a
              onClick={() => {
                history(ROUTER_REPORTE_QR, {
                  state: {
                    id: location.state.id,
                    name: location.state.name,
                    category: location.state.category,
                  },
                });
              }}
            >
              Ver Reporte Qr
            </a>
          </button>
          <button className="btn-excel" onClick={handleExportExcel}>
            <a>Descargar Excel</a>
          </button>
        </div>
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
        <div className="container-button">
          <button
            type="button"
            className="button"
            onClick={() => {
              setProduct(null);
              handleOpenModal();
            }}
          >
            <img src={require("../../../assets/añadir.png")} />
            añadir
          </button>
        </div>
        <div className="users">
          {location.state.category === "EPP Estructural" ||
          location.state.category === "EPP Forestal" ||
          location.state.category === "EPP Rescate Técnico" ||
          location.state.category === "EPP Hazmat" ||
          location.state.category === "EPP Convencionales" ? (
            <>
              {EppEstructural_Forestal?.map((list) => (
                <div className="user" key={list.id}>
                  <div className="user-info">
                    <p>{list.codigo} </p>
                    {list.estado ? (
                      <p style={{ color: "#fb5858" }}>Donación</p>
                    ) : (
                      <p >Comprado</p>
                    )}
                  </div>
                  <div className="user-image">
                    <img
                      src={DOMAIN_IMAGE + list.image}
                      alt="Imagen del producto"
                      onClick={() =>
                        handleImageClick(DOMAIN_IMAGE + list.image)
                      }
                    />
                  </div>
                  <div className="user-info">
                    <h2>Talla: {list.talla}</h2>
                    <p>Marca: {list.marca}</p>
                    <p>Material: {list.material}</p>
                    <p>Industria: {list.industria}</p>
                  </div>
                  <div className="containerQR">
                    <QRCode className="QR" value={list.url} />
                  </div>
                  <div className="user-actions-product">
                    <button
                      className="btn-editar"
                      onClick={() => {
                        setProduct(list);
                        handleOpenModal();
                      }}
                    >
                      Editar
                    </button>
                    <button
                      className="btn-eliminar"
                      onClick={() => {
                        setProduct(list);
                        setModalEliminar(true);
                      }}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <>
              {EppEstructural_Forestal?.map((list) => (
                <div className="user" key={list.id}>
                  <div className="user-info">
                    <p>{list.codigo}</p>
                    {list.estado ? (
                      <p style={{ color: "#fb5858" }}>Donación</p>
                    ) : (
                      <p style={{ color: "#fb5858" }}>Comprado</p>
                    )}
                  </div>
                  <div className="user-image">
                    <img
                      src={DOMAIN_IMAGE + list.image}
                      alt="Imagen del producto"
                      onClick={() =>
                        handleImageClick(DOMAIN_IMAGE + list.image)
                      }
                    />
                  </div>
                  <div className="user-info">
                    <h2>Nombre: {list.nombre}</h2>
                    <p>Descripción: {list.descripcion}</p>
                  </div>
                  <div style={{ background: "white", padding: "16px" }}>
                    <QRCode value={list.url} />
                  </div>
                  <div className="user-actions-product">
                    <button
                      className="btn-editar"
                      onClick={() => {
                        setProduct(list);
                        handleOpenModal();
                      }}
                    >
                      Editar
                    </button>
                    <button
                      className="btn-eliminar"
                      onClick={() => {
                        setProduct(list);
                        setModalEliminar(true);
                      }}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
        {/* <div className="container-dotados">
          <h1>DOTADOS</h1>
          <div className="container-productos"></div>
        </div> */}
      </div>
    </>
  );
};
export default PageProduct;
