/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import { useEffect, useState } from "react";
import "../../../styles/pages/home/views/pageInventario.css";
import {
  ROUTER_ACCESORIOS,
  ROUTER_EPP_ESTRUCTURAL,
  ROUTER_EPP_FORESTAL,
  ROUTER_HERRAMIENTAS,
  ROUTER_LOGIN_FORM,
} from "../../../config/Constant";
import ModalForm from "../../../components/ModalForm";
import RegisterTypeProduct from "../forms/RegisterTypeProduct";
import DeleteObject from "../../../components/DeleteObject";
import {
  deleteTypeProduct,
  getListTypeProduct,
} from "../../../services/TypeProductsService";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLogout } from "../../../redux/loginSlice";

const PageInventario = ({ Token }) => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const [listProducts, setListProduct] = useState([]);
  const [modalAñadir, setModalAñadir] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [product, setProduct] = useState({});

  const EppEstructural = listProducts.filter(
    (listProducts) => listProducts.category === "EPP Estructural"
  );
  const EppForestal = listProducts.filter(
    (listProducts) => listProducts.category === "EPP Forestal"
  );
  const Herramientas = listProducts.filter(
    (listProducts) => listProducts.category === "Herramientas"
  );
  const Accesorios = listProducts.filter(
    (listProducts) => listProducts.category === "Accesorios"
  );

  useEffect(() => {
    getList();
  }, []);

  //------------------CARGAR LISTA TIPO PRODUCTO--------------------------------
  const getList = () => {
    getListTypeProduct(Token.access)
      .then((response) => {
        setListProduct(response.list_type_product);
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          dispatch(userLogout(Token));
          history(ROUTER_LOGIN_FORM);
        }
      });
  };
  //------------------------------------------------------------------------

  //------------------ELIMINAR TIPO PRODUCTO--------------------------------
  const deleteProductType = (id) => {
    deleteTypeProduct(Token.access, id).then((response) => {
      console.log(response);
      getList();
    });
  };
  //------------------------------------------------------------------------

  const handleOpenModalAñadir = () => {
    setModalAñadir(true);
  };
  const handleCloseModalAñadir = () => {
    setModalAñadir(false);
    getList();
  };
  const handleCloseModalEliminar = () => {
    setModalEliminar(false);
  };

  return (
    <>
      <div className="container_inventario">
        <DeleteObject
          object={product}
          handleDelete={deleteProductType}
          isOpen={modalEliminar}
          onClose={handleCloseModalEliminar}
        />

        <div className="titulo">
          <div className="container_button">
            <h3>EPP Estructural</h3>
            <button
              type="button"
              className="button"
              onClick={() => {
                setProduct(null);
                handleOpenModalAñadir();
              }}
            >
              <img src={require("../../../assets/añadir.png")} />
              añadir
            </button>
            <ModalForm isOpen={modalAñadir} onClose={handleCloseModalAñadir}>
              <RegisterTypeProduct
                onClose={handleCloseModalAñadir}
                Token={Token}
                type_product={product}
              />
            </ModalForm>
          </div>
          <div className="container_tabla">
            <table>
              <thead>
                <tr>
                  <th>
                    <p>Nombre</p>
                  </th>
                </tr>
              </thead>

              {EppEstructural?.map((list) => (
                <tbody key={list.id}>
                  <tr>
                    <td>
                      <p>{list.name} </p>
                      <button className="btn-ver">
                        <a
                          onClick={() => {
                            history(ROUTER_EPP_ESTRUCTURAL, {
                              state: {
                                id: list.id,
                                name: list.name,
                                category: list.category,
                              },
                            });
                          }}
                        >
                          Ver
                        </a>
                      </button>
                      <button
                        className="btn-editar"
                        onClick={() => {
                          setProduct(list);
                          handleOpenModalAñadir();
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
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
        </div>

        <div className="titulo">
          <h3>EPP Forestal</h3>
          <div className="container_tabla">
            <table>
              <thead>
                <tr>
                  <th>
                    <p>Nombre</p>
                  </th>
                </tr>
              </thead>

              {EppForestal?.map((list) => (
                <tbody key={list.id}>
                  <tr>
                    <td>
                      <p>{list.name} </p>
                      <button className="btn-ver">
                        <a
                          onClick={() => {
                            history(ROUTER_EPP_FORESTAL, {
                              state: {
                                id: list.id,
                                name: list.name,
                                category: list.category,
                              },
                            });
                          }}
                        >
                          Ver
                        </a>
                      </button>
                      <button
                        className="btn-editar"
                        onClick={() => {
                          setProduct(list);
                          handleOpenModalAñadir();
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
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
        </div>

        <div className="titulo">
          <h3>Herramientas</h3>
          <div className="container_tabla">
            <table>
              <thead>
                <tr>
                  <th>
                    <p>Nombre</p>
                  </th>
                </tr>
              </thead>

              {Herramientas?.map((list) => (
                <tbody key={list.id}>
                  <tr>
                    <td>
                      <p>{list.name} </p>
                      <button className="btn-ver">
                        <a
                          onClick={() => {
                            history(ROUTER_HERRAMIENTAS, {
                              state: {
                                id: list.id,
                                name: list.name,
                                category: list.category,
                              },
                            });
                          }}
                        >
                          Ver
                        </a>
                      </button>
                      <button
                        className="btn-editar"
                        onClick={() => {
                          setProduct(list);
                          handleOpenModalAñadir();
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
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
        </div>

        <div className="titulo">
          <h3>Accesorios</h3>
          <div className="container_tabla">
            <table>
              <thead>
                <tr>
                  <th>
                    <p>Nombre</p>
                  </th>
                </tr>
              </thead>

              {Accesorios?.map((list) => (
                <tbody key={list.id}>
                  <tr>
                    <td>
                      <p>{list.name} </p>
                      <button className="btn-ver">
                        <a
                          onClick={() => {
                            history(ROUTER_ACCESORIOS, {
                              state: {
                                id: list.id,
                                name: list.name,
                                category: list.category,
                              },
                            });
                          }}
                        >
                          Ver
                        </a>
                      </button>
                      <button
                        className="btn-editar"
                        onClick={() => {
                          setProduct(list);
                          handleOpenModalAñadir();
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
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
export default PageInventario;
