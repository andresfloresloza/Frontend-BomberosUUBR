import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../../styles/pages/home/forms/registerTypeProduct.css";
import {
  getDetailTypeProduct,
  postTypeProduct,
  putTypeProduct,
} from "../../../services/TypeProductsService";
import { toast } from "react-toastify";

const RegisterTypeProduct = ({ onClose, Token, type_product }) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("EPP Estructural");

  useEffect(() => {
    if (type_product !== null) {
      getTypeProduct(type_product.id);
    }
  }, []);

  //-------------------------OBTENER TIPO PRODUCTO---------------------------
  const getTypeProduct = (id) => {
    getDetailTypeProduct(Token.access, id).then((response) => {
      setName(response.data.type_product.name);
      setCategory(response.data.type_product.category);
    });
  };
  //-------------------------------------------------------------------------

  //----------------------REGISTRO DEL TIPO PRODUCTO-------------------------
  const create_type_product = async () => {
    postTypeProduct(Token.access, { name: name, category: category })
      .then((response) => {
        onClose();
      })
      .catch((error) => {
        toast.error("Este producto ya existe en la categoria " + category);
      });
  };
  //------------------------------------------------------------------------

  //----------------------ACTUALIZAR TIPO PRODUCTO----------------------
  const update_type_product = async (id) => {
    putTypeProduct(Token.access, id, { name: name, category: category })
      .then((response) => {
        onClose();
      })
      .catch((error) => {
        toast.error("Este producto ya existe en la categoria " + category);
      });
  };
  //------------------------------------------------------------------------

  const SubmitData = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (type_product === null) {
      create_type_product();
    } else {
      update_type_product(type_product.id);
    }
  };

  return (
    <>
      <div className="register-form-container">
        <form className="register-form">
          <div className="form-groups">
            <label htmlFor="name">Nombre:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-groups">
            <label htmlFor="category">Categoria:</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="EPP Estructural">EPP Estructural</option>
              <option value="EPP Forestal">EPP Forestal</option>
              <option value="Herramientas">Herramientas</option>
              <option value="Accesorios">Accesorios</option>
            </select>
          </div>
          <Link className="submit-form-" onClick={SubmitData}>
            GUARDAR
          </Link>
        </form>
      </div>
    </>
  );
};
export default RegisterTypeProduct;
