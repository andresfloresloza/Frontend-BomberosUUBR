import React, { useEffect, useRef, useState } from "react";
import { getDetailUser } from "../../services/UsuariosService";
import { format } from "date-fns";
import { useLocation } from "react-router-dom";
import { getListEpp } from "../../services/EppService";
import { getListOtros } from "../../services/OtroService";
import { useReactToPrint } from "react-to-print";
import { Table } from "react-bootstrap";

const ReporteInventario = ({ Token }) => {
  const componentRef = useRef();
  const location = useLocation();
  const [listProducts, setListProduct] = useState([]);
  const [user, setUser] = useState({});
  const fechaActual = format(new Date(), "dd/MM/yyyy");
  const Epp_Otros = listProducts.filter(
    (listProducts) => listProducts.type_product === location.state.id
  );
  useEffect(() => {
    console.log(location.state);
    getList();
    getUser();
  }, []);

  //----------------CARGAR LISTA PRODUCTO POR CATEGORIA---------------------
  const getList = () => {
    if (
      location.state.category === "EPP Estructural" ||
      location.state.category === "EPP Forestal" ||
      location.state.category === "EPP Rescate Técnico" ||
      location.state.category === "EPP Hazmat" ||
      location.state.category === "EPP Convencionales"
    ) {
      console.log("Entre a: " + location.state.category);
      getListEpp(Token.access).then((response) => {
        const sortedProducts = response.list_epp.sort(
          (a, b) => a.codigo - b.codigo
        );
        setListProduct(sortedProducts);
      });
    } else {
      console.log("Entre a: " + location.state.category);
      getListOtros(Token.access).then((response) => {
        const sortedProducts = response.list_otros.sort(
          (a, b) => a.codigo - b.codigo
        );
        setListProduct(sortedProducts);
      });
    }
  };
  //---------------------CARGAR USER ENCARGADO------------------------------
  const getUser = () => {
    getDetailUser(Token.access, Token.id).then((response) => {
      setUser(response.data.user);
    });
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Lista de Bomberos",
  });
  return (
    <>
      <div className="container_reporte">
        <div style={{ width: "100%", height: window.innerHeight }}>
          <button onClick={handlePrint}>Imprimir</button>
          <div style={{ width: "100%", height: window.innerHeight }}>
            {location.state.category === "EPP Estructural" ||
            location.state.category === "EPP Forestal" ||
            location.state.category === "EPP Rescate Técnico" ||
            location.state.category === "EPP Hazmat" ||
            location.state.category === "EPP Convencionales" ? (
              <>
                <div className="info_reporte" ref={componentRef}>
                  <p>FECHA: {fechaActual}</p>
                  <h1>LISTA DE PRODUCTOS</h1>
                  <h1>
                    {location.state.category} / {location.state.name}
                  </h1>
                  <Table className="w-75 mx-auto " bordered>
                    <thead>
                      <th>N°</th>
                      <th>Código</th> 
                      <th>Estado</th>
                      <th>Marca</th>
                      <th>Año Fabricación</th>
                      <th>Industria</th>
                      <th>Talla</th>
                      <th>Color</th>
                      <th>Color Reflectivo</th>
                      <th>Certificacion</th>
                      <th>Color Suspensores</th>
                      <th>Material</th>
                    </thead>
                    <tbody>
                      {Epp_Otros.map((item, index) => {
                        return (
                          <tr key={index}>
                            <th>{index + 1}</th>
                            <th>{item.codigo}</th>
                            {item.estado ? <th>Donación</th> : <th>Comprado</th>}
                            <th>{item.marca}</th>
                            <th>{item.año_fabricacion}</th>
                            <th>{item.industria}</th>
                            <th>{item.talla}</th>
                            <th>{item.color}</th>
                            <th>{item.color_reflectivo}</th>
                            <th>{item.certificacion}</th>
                            <th>{item.color_suspensores}</th>
                            <th>{item.material}</th>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                  <br />
                  <br />
                  <br />
                  <br />
                  <p className="firma">
                    ----------------------------------------------
                  </p>
                  <p className="firma">
                    ENCARGADO: {user.first_name} {user.last_name}
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="info_reporte" ref={componentRef}>
                  <p>FECHA: {fechaActual}</p>
                  <h1>LISTA DE PRODUCTOS</h1>
                  <h1>
                    {location.state.category} / {location.state.name}
                  </h1>
                  <Table className="w-75 mx-auto " bordered>
                    <thead>
                      <th>N°</th>
                      <th>Código</th>
                      <th>Nombre</th>
                      <th>Descripción</th>
                    </thead>
                    <tbody>
                      {Epp_Otros.map((item, index) => {
                        return (
                          <tr key={index}>
                            <th>{index + 1}</th>
                            <th>{item.codigo}</th>
                            <th>{item.nombre}</th>
                            <th>{item.descripcion}</th>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                  <br />
                  <br />
                  <br />
                  <br />
                  <p className="firma">
                    ----------------------------------------------
                  </p>
                  <p className="firma">
                    ENCARGADO: {user.first_name} {user.last_name}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ReporteInventario;