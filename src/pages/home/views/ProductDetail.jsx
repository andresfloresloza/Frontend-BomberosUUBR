import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDetalleEPP } from "../../../services/EppService";
import { getDetalleOTROS } from "../../../services/OtroService";
import { DOMAIN_IMAGE } from "../../../config/Constant";
import "../../../styles/pages/home/views/productDetail.css";
import LoadingView from "../../../components/LoadingView";
const ProductDetail = () => {
  const params = useParams();
  const productId = params.productId;
  const productType = params.type_product;
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = () => {
    if (productType === "epp") {
      getDetalleEPP(productId).then((response) => {
        setTimeout(() => {
          setProduct(response.data.epp);
          setLoading(false);
        }, 3000);
      });
    } else {
      getDetalleOTROS(productId).then((response) => {
        setTimeout(() => {
          setProduct(response.data.otros);
          setLoading(false);
        }, 3000);
      });
    }
  };

  if (loading) {
    return (
      <>
        <LoadingView />
      </>
    );
  }

  return (
    <div className="product_detail">
      {productType === "epp" ? (
        <>
          <div className="container_detail">
            <div className="containerImage">
              <h1>CATEGORIA EPP </h1>
              <img
                src={DOMAIN_IMAGE + product.image}
                alt="Imagen del producto"
              />
            </div>
            <div className="containerInfo">
              <h3>
                <span style={{ color: "red", marginRight: "20px" }}>Código:</span>{" "}
                {product.codigo}
              </h3>
              {product.estado ? (
                <h3>
                  <span style={{ color: "red", marginRight: "20px" }}>Estado:</span>{" "}
                  Donación
                </h3>
              ) : (
                <h3>
                  <span style={{ color: "red", marginRight: "20px" }}>Estado:</span>{" "}
                  Comprado
                </h3>
              )}

              <h3>
                <span style={{ color: "red", marginRight: "20px" }}>Marca: </span>
                {product.marca}
              </h3>
              <h3>
                <span style={{ color: "red", marginRight: "20px" }}>Industria: </span>
                {product.industria}
              </h3>
              <h3>
                <span style={{ color: "red", marginRight: "20px" }}>Talla: </span>
                {product.talla}
              </h3>
              <h3>
                <span style={{ color: "red", marginRight: "20px" }}>
                  Año Fabricación:{" "}
                </span>
                {product.año_fabricacion}
              </h3>
              <h3>
                <span style={{ color: "red", marginRight: "20px" }}>Color: </span>
                {product.color}
              </h3>
              <h3>
                <span style={{ color: "red", marginRight: "20px" }}>
                  Color Reflectivo:{" "}
                </span>
                {product.color_reflectivo}
              </h3>
              <h3>
                <span style={{ color: "red", marginRight: "20px" }}>
                  Certificación:{" "}
                </span>
                {product.certificacion}
              </h3>
              <h3>
                <span style={{ color: "red", marginRight: "20px" }}>
                  Color Suspensores:{" "}
                </span>
                {product.color_suspensores}
              </h3>
              <h3>
                <span style={{ color: "red", marginRight: "20px" }}>Material: </span>
                {product.material}
              </h3>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="container_detail">
            <div className="containerImage">
              <h1>CATEGORIA OTROS </h1>
              <img
                src={DOMAIN_IMAGE + product.image}
                alt="Imagen del producto"
              />
            </div>
            <div className="containerInfo">
              <h3>
                <span style={{ color: "red", marginRight: "20px" }}>Código:</span>{" "}
                {product.codigo}
              </h3>
              <h3>
                <span style={{ color: "red", marginRight: "20px" }}>Nombre: </span>
                {product.nombre}
              </h3>
              {product.estado ? (
                <h3>
                  <span style={{ color: "red", marginRight: "20px" }}>Estado:</span>{" "}
                  Donación
                </h3>
              ) : (
                <h3>
                  <span style={{ color: "red", marginRight: "20px" }}>Estado:</span>{" "}
                  Comprado
                </h3>
              )}
              <h3>
                <span style={{ color: "red", marginRight: "20px" }}>
                  Descripción:{" "}
                </span>
                {product.descripcion}
              </h3>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductDetail;
