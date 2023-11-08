/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import { useEffect, useState } from "react";
import "../../../styles/pages/home/views/pageInventario.css";
import {
  ROUTER_OTROS,
  ROUTER_EPP,
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
  const filteredProductsByCategory = {};


  const categories = [
    "EPP Estructural",
    "EPP Forestal",
    "EPP Rescate Técnico",
    "EPP Hazmat",
    "EPP Convencionales",
    "Chalecos",
    "Equipo de Rescate Técnico",
    "Herramientas de Rescate Técnico",
    "Equipo Hazmat",
    "Equipos y Materiales de APH",
    "Protección Respiratoria",
    "Herramientas Manuales",
    "Herramientas Mecánicas",
    "Herramientas Hidráulicas",
    "Herramientas Motorizadas",
    "Herramientas Neumáticas",
    "Motores",
    "Dispositivo de Señalización Vial",
    "Dispositivo de Espuma",
    "Agentes Químicos",
    "Escaleras",
    "Mochila de Bomba Manual",
    "Llaves de Acople",
    "Acoples",
    "Válvulas",
    "Pitones",
    "Mangueras",
    "Material para Campamento",
    "Otros"
  ];
  

  categories.forEach((category) => {
    filteredProductsByCategory[category] = listProducts.filter(
      (product) => product.category === category
    );
  });

  useEffect(() => {
    getList();
  }, []);

  //------------------CARGAR LISTA TIPO PRODUCTO--------------------------------
  const getList = () => {
    getListTypeProduct(Token.access)
      .then((response) => {
        if (response.status === 401) {
          dispatch(userLogout(Token));
          history(ROUTER_LOGIN_FORM);
        }
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

              {filteredProductsByCategory["EPP Estructural"]?.map((list) => (
                <tbody key={list.id}>
                  <tr>
                    <td>
                      <p>{list.name} </p>
                      <button className="btn-ver">
                        <a
                          onClick={() => {
                            history(ROUTER_EPP, {
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

              {filteredProductsByCategory["EPP Forestal"]?.map((list) => (
                <tbody key={list.id}>
                  <tr>
                    <td>
                      <p>{list.name} </p>
                      <button className="btn-ver">
                        <a
                          onClick={() => {
                            history(ROUTER_EPP, {
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
          <h3>EPP Rescate Técnico</h3>
          <div className="container_tabla">
            <table>
              <thead>
                <tr>
                  <th>
                    <p>Nombre</p>
                  </th>
                </tr>
              </thead>

              {filteredProductsByCategory["EPP Rescate Técnico"]?.map((list) => (
                <tbody key={list.id}>
                  <tr>
                    <td>
                      <p>{list.name} </p>
                      <button className="btn-ver">
                        <a
                          onClick={() => {
                            history(ROUTER_EPP, {
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
          <h3>EPP Hazmat</h3>
          <div className="container_tabla">
            <table>
              <thead>
                <tr>
                  <th>
                    <p>Nombre</p>
                  </th>
                </tr>
              </thead>

              {filteredProductsByCategory["EPP Hazmat"]?.map((list) => (
                <tbody key={list.id}>
                  <tr>
                    <td>
                      <p>{list.name} </p>
                      <button className="btn-ver">
                        <a
                          onClick={() => {
                            history(ROUTER_EPP, {
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
          <h3>EPP Convencionales</h3>
          <div className="container_tabla">
            <table>
              <thead>
                <tr>
                  <th>
                    <p>Nombre</p>
                  </th>
                </tr>
              </thead>

              {filteredProductsByCategory["EPP Convencionales"]?.map((list) => (
                <tbody key={list.id}>
                  <tr>
                    <td>
                      <p>{list.name} </p>
                      <button className="btn-ver">
                        <a
                          onClick={() => {
                            history(ROUTER_EPP, {
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
          <h3>Chalecos</h3>
          <div className="container_tabla">
            <table>
              <thead>
                <tr>
                  <th>
                    <p>Nombre</p>
                  </th>
                </tr>
              </thead>

              {filteredProductsByCategory["Chalecos"]?.map((list) => (
                <tbody key={list.id}>
                  <tr>
                    <td>
                      <p>{list.name} </p>
                      <button className="btn-ver">
                        <a
                          onClick={() => {
                            history(ROUTER_OTROS, {
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
          <h3>Equipo de Rescate Técnico</h3>
          <div className="container_tabla">
            <table>
              <thead>
                <tr>
                  <th>
                    <p>Nombre</p>
                  </th>
                </tr>
              </thead>

              {filteredProductsByCategory["Equipo de Rescate Técnico"]?.map((list) => (
                <tbody key={list.id}>
                  <tr>
                    <td>
                      <p>{list.name} </p>
                      <button className="btn-ver">
                        <a
                          onClick={() => {
                            history(ROUTER_OTROS, {
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
          <h3>Herramientas de Rescate Técnico</h3>
          <div className="container_tabla">
            <table>
              <thead>
                <tr>
                  <th>
                    <p>Nombre</p>
                  </th>
                </tr>
              </thead>

              {filteredProductsByCategory["Herramientas de Rescate Técnico"]?.map((list) => (
                <tbody key={list.id}>
                  <tr>
                    <td>
                      <p>{list.name} </p>
                      <button className="btn-ver">
                        <a
                          onClick={() => {
                            history(ROUTER_OTROS, {
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
          <h3>Equipo Hazmat</h3>
          <div className="container_tabla">
            <table>
              <thead>
                <tr>
                  <th>
                    <p>Nombre</p>
                  </th>
                </tr>
              </thead>

              {filteredProductsByCategory["Equipo Hazmat"]?.map((list) => (
                <tbody key={list.id}>
                  <tr>
                    <td>
                      <p>{list.name} </p>
                      <button className="btn-ver">
                        <a
                          onClick={() => {
                            history(ROUTER_OTROS, {
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
          <h3>Equipos y Materiales de APH</h3>
          <div className="container_tabla">
            <table>
              <thead>
                <tr>
                  <th>
                    <p>Nombre</p>
                  </th>
                </tr>
              </thead>

              {filteredProductsByCategory["Equipos y Materiales de APH"]?.map((list) => (
                <tbody key={list.id}>
                  <tr>
                    <td>
                      <p>{list.name} </p>
                      <button className="btn-ver">
                        <a
                          onClick={() => {
                            history(ROUTER_OTROS, {
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
          <h3>Protección Respiratoria</h3>
          <div className="container_tabla">
            <table>
              <thead>
                <tr>
                  <th>
                    <p>Nombre</p>
                  </th>
                </tr>
              </thead>

              {filteredProductsByCategory["Protección Respiratoria"]?.map((list) => (
                <tbody key={list.id}>
                  <tr>
                    <td>
                      <p>{list.name} </p>
                      <button className="btn-ver">
                        <a
                          onClick={() => {
                            history(ROUTER_OTROS, {
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
          <h3>Herramientas Manuales</h3>
          <div className="container_tabla">
            <table>
              <thead>
                <tr>
                  <th>
                    <p>Nombre</p>
                  </th>
                </tr>
              </thead>

              {filteredProductsByCategory["Herramientas Manuales"]?.map((list) => (
                <tbody key={list.id}>
                  <tr>
                    <td>
                      <p>{list.name} </p>
                      <button className="btn-ver">
                        <a
                          onClick={() => {
                            history(ROUTER_OTROS, {
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
          <h3>Herramientas Mecánicas</h3>
          <div className="container_tabla">
            <table>
              <thead>
                <tr>
                  <th>
                    <p>Nombre</p>
                  </th>
                </tr>
              </thead>

              {filteredProductsByCategory["Herramientas Mecánicas"]?.map((list) => (
                <tbody key={list.id}>
                  <tr>
                    <td>
                      <p>{list.name} </p>
                      <button className="btn-ver">
                        <a
                          onClick={() => {
                            history(ROUTER_OTROS, {
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
          <h3>Herramientas Hidráulicas</h3>
          <div className="container_tabla">
            <table>
              <thead>
                <tr>
                  <th>
                    <p>Nombre</p>
                  </th>
                </tr>
              </thead>

              {filteredProductsByCategory["Herramientas Hidráulicas"]?.map((list) => (
                <tbody key={list.id}>
                  <tr>
                    <td>
                      <p>{list.name} </p>
                      <button className="btn-ver">
                        <a
                          onClick={() => {
                            history(ROUTER_OTROS, {
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
          <h3>Herramientas Motorizadas</h3>
          <div className="container_tabla">
            <table>
              <thead>
                <tr>
                  <th>
                    <p>Nombre</p>
                  </th>
                </tr>
              </thead>

              {filteredProductsByCategory["Herramientas Motorizadas"]?.map((list) => (
                <tbody key={list.id}>
                  <tr>
                    <td>
                      <p>{list.name} </p>
                      <button className="btn-ver">
                        <a
                          onClick={() => {
                            history(ROUTER_OTROS, {
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
          <h3>Herramientas Neumáticas</h3>
          <div className="container_tabla">
            <table>
              <thead>
                <tr>
                  <th>
                    <p>Nombre</p>
                  </th>
                </tr>
              </thead>

              {filteredProductsByCategory["Herramientas Neumáticas"]?.map((list) => (
                <tbody key={list.id}>
                  <tr>
                    <td>
                      <p>{list.name} </p>
                      <button className="btn-ver">
                        <a
                          onClick={() => {
                            history(ROUTER_OTROS, {
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
          <h3>Motores</h3>
          <div className="container_tabla">
            <table>
              <thead>
                <tr>
                  <th>
                    <p>Nombre</p>
                  </th>
                </tr>
              </thead>

              {filteredProductsByCategory["Motores"]?.map((list) => (
                <tbody key={list.id}>
                  <tr>
                    <td>
                      <p>{list.name} </p>
                      <button className="btn-ver">
                        <a
                          onClick={() => {
                            history(ROUTER_OTROS, {
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
          <h3>Dispositivo de Señalización Vial</h3>
          <div className="container_tabla">
            <table>
              <thead>
                <tr>
                  <th>
                    <p>Nombre</p>
                  </th>
                </tr>
              </thead>

              {filteredProductsByCategory["Dispositivo de Señalización Vial"]?.map((list) => (
                <tbody key={list.id}>
                  <tr>
                    <td>
                      <p>{list.name} </p>
                      <button className="btn-ver">
                        <a
                          onClick={() => {
                            history(ROUTER_OTROS, {
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
          <h3>Dispositivo de Espuma</h3>
          <div className="container_tabla">
            <table>
              <thead>
                <tr>
                  <th>
                    <p>Nombre</p>
                  </th>
                </tr>
              </thead>

              {filteredProductsByCategory["Dispositivo de Espuma"]?.map((list) => (
                <tbody key={list.id}>
                  <tr>
                    <td>
                      <p>{list.name} </p>
                      <button className="btn-ver">
                        <a
                          onClick={() => {
                            history(ROUTER_OTROS, {
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
          <h3>Agentes Químicos</h3>
          <div className="container_tabla">
            <table>
              <thead>
                <tr>
                  <th>
                    <p>Nombre</p>
                  </th>
                </tr>
              </thead>

              {filteredProductsByCategory["Agentes Químicos"]?.map((list) => (
                <tbody key={list.id}>
                  <tr>
                    <td>
                      <p>{list.name} </p>
                      <button className="btn-ver">
                        <a
                          onClick={() => {
                            history(ROUTER_OTROS, {
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
          <h3>Escaleras</h3>
          <div className="container_tabla">
            <table>
              <thead>
                <tr>
                  <th>
                    <p>Nombre</p>
                  </th>
                </tr>
              </thead>

              {filteredProductsByCategory["Escaleras"]?.map((list) => (
                <tbody key={list.id}>
                  <tr>
                    <td>
                      <p>{list.name} </p>
                      <button className="btn-ver">
                        <a
                          onClick={() => {
                            history(ROUTER_OTROS, {
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
          <h3>Mochila de Bomba Manual</h3>
          <div className="container_tabla">
            <table>
              <thead>
                <tr>
                  <th>
                    <p>Nombre</p>
                  </th>
                </tr>
              </thead>

              {filteredProductsByCategory["Mochila de Bomba Manual"]?.map((list) => (
                <tbody key={list.id}>
                  <tr>
                    <td>
                      <p>{list.name} </p>
                      <button className="btn-ver">
                        <a
                          onClick={() => {
                            history(ROUTER_OTROS, {
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
          <h3>Llaves de Acople</h3>
          <div className="container_tabla">
            <table>
              <thead>
                <tr>
                  <th>
                    <p>Nombre</p>
                  </th>
                </tr>
              </thead>

              {filteredProductsByCategory["Llaves de Acople"]?.map((list) => (
                <tbody key={list.id}>
                  <tr>
                    <td>
                      <p>{list.name} </p>
                      <button className="btn-ver">
                        <a
                          onClick={() => {
                            history(ROUTER_OTROS, {
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
          <h3>Acoples</h3>
          <div className="container_tabla">
            <table>
              <thead>
                <tr>
                  <th>
                    <p>Nombre</p>
                  </th>
                </tr>
              </thead>

              {filteredProductsByCategory["Acoples"]?.map((list) => (
                <tbody key={list.id}>
                  <tr>
                    <td>
                      <p>{list.name} </p>
                      <button className="btn-ver">
                        <a
                          onClick={() => {
                            history(ROUTER_OTROS, {
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
          <h3>Válvulas</h3>
          <div className="container_tabla">
            <table>
              <thead>
                <tr>
                  <th>
                    <p>Nombre</p>
                  </th>
                </tr>
              </thead>

              {filteredProductsByCategory["Válvulas"]?.map((list) => (
                <tbody key={list.id}>
                  <tr>
                    <td>
                      <p>{list.name} </p>
                      <button className="btn-ver">
                        <a
                          onClick={() => {
                            history(ROUTER_OTROS, {
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
          <h3>Pitones</h3>
          <div className="container_tabla">
            <table>
              <thead>
                <tr>
                  <th>
                    <p>Nombre</p>
                  </th>
                </tr>
              </thead>

              {filteredProductsByCategory["Pitones"]?.map((list) => (
                <tbody key={list.id}>
                  <tr>
                    <td>
                      <p>{list.name} </p>
                      <button className="btn-ver">
                        <a
                          onClick={() => {
                            history(ROUTER_OTROS, {
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
          <h3>Mangueras</h3>
          <div className="container_tabla">
            <table>
              <thead>
                <tr>
                  <th>
                    <p>Nombre</p>
                  </th>
                </tr>
              </thead>

              {filteredProductsByCategory["Mangueras"]?.map((list) => (
                <tbody key={list.id}>
                  <tr>
                    <td>
                      <p>{list.name} </p>
                      <button className="btn-ver">
                        <a
                          onClick={() => {
                            history(ROUTER_OTROS, {
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
          <h3>Material para Campamento</h3>
          <div className="container_tabla">
            <table>
              <thead>
                <tr>
                  <th>
                    <p>Nombre</p>
                  </th>
                </tr>
              </thead>

              {filteredProductsByCategory["Material para Campamento"]?.map((list) => (
                <tbody key={list.id}>
                  <tr>
                    <td>
                      <p>{list.name} </p>
                      <button className="btn-ver">
                        <a
                          onClick={() => {
                            history(ROUTER_OTROS, {
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
          <h3>Otros</h3>
          <div className="container_tabla">
            <table>
              <thead>
                <tr>
                  <th>
                    <p>Nombre</p>
                  </th>
                </tr>
              </thead>

              {filteredProductsByCategory["Otros"]?.map((list) => (
                <tbody key={list.id}>
                  <tr>
                    <td>
                      <p>{list.name} </p>
                      <button className="btn-ver">
                        <a
                          onClick={() => {
                            history(ROUTER_OTROS, {
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
