import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { getListEpp } from "../../services/EppService";
import { getListOtros } from "../../services/OtroService";
import "../../styles/pages/reports/reporteQrProducts.css";
import { useReactToPrint } from "react-to-print";
import QRCode from "qrcode.react";

const QrProducts = ({ Token }) => {
  const componentRef = useRef();
  const location = useLocation();
  const [listProducts, setListProduct] = useState([]);
  const EppEstructural_Forestal = listProducts.filter(
    (listProducts) => listProducts.type_product === location.state.id
  );
  useEffect(() => {
    getList();
  }, []);


  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "QR - Productos",
  });

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

  return (
    <>
      <div className="container_qr">
        <button onClick={handlePrint}>Imprimir</button>
        <div className="cuadrante_qr" ref={componentRef}>
          {EppEstructural_Forestal.map((item) => (
            <div className="info_qr">
              <h1>{location.state.category} </h1>

              <QRCode className="" value={item.url} />
              <h1>Codigo: {item.codigo} </h1>
              <p>{location.state.name} </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default QrProducts;