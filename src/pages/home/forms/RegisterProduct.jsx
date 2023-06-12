import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  getDetailEppEstructuralForestal,
  postEppEstructuralForestal,
  putEppEstructuralForestal,
  saveImageEppEstructuralForestal,
} from "../../../services/EppEstructuralForestal";
import {
  getDetailHerramientasAccesorios,
  postHerramientasAccesorios,
  putHerramientasAccesorios,
  saveImageHerramientasAccesorios,
} from "../../../services/HerramientasAccesorios";
import { toast } from "react-toastify";

const RegisterProduct = ({ onClose, Token, product }) => {
  const fileRef = useRef(null);
  const [codigo, setCodigo] = useState("");
  const [estado, setEstado] = useState(true);
  const [marca, setMarca] = useState("");
  const [industria, setIndustria] = useState("");
  const [talla, setTalla] = useState("");
  const [año_fabricacion, setAñoFabricacion] = useState("");
  const [color, setColor] = useState("");
  const [color_reflectivo, setColorReflectivo] = useState("");
  const [certificacion, setCertificacion] = useState("");
  const [color_suspensores, setColoresSuspensores] = useState("");
  const [material, setMaterial] = useState("");
  const [image, setImage] = useState("");
  const [imageView, setImageView] = useState(
    require("../../../assets/subir.png")
  );
  const location = useLocation();

  useEffect(() => {
    if (product !== null) {
      getProduct(product.id);
    }
  }, []);

  function handleOpenFilePicker() {
    if (fileRef.current) {
      fileRef.current.click();
    }
  }
  const handleChangeFile = (e) => {
    e.preventDefault();
    const files = e.target.files;
    const fileReader = new FileReader();
    if (fileReader && files && files.length > 0) {
      const reader = new FileReader();
      reader.onload = async function () {
        setImageView(reader.result);
      };
      setImage(files[0]);
      reader.readAsDataURL(files[0]);
    }
  };
  //-------------------------OBTENER TIPO PRODUCTO---------------------------
  const getProduct = (id) => {
    if (
      location.state.category === "EPP Estructural" ||
      location.state.category === "EPP Forestal"
    ) {
      getDetailEppEstructuralForestal(Token.access, id).then((response) => {
        setCodigo(response.data.epp_estructural_forestal.codigo);
        setEstado(response.data.epp_estructural_forestal.estado);
        setMarca(response.data.epp_estructural_forestal.marca);
        setIndustria(response.data.epp_estructural_forestal.industria);
        setTalla(response.data.epp_estructural_forestal.talla);
        setAñoFabricacion(
          response.data.epp_estructural_forestal.año_fabricacion
        );
        setColor(response.data.epp_estructural_forestal.color);
        setColorReflectivo(
          response.data.epp_estructural_forestal.color_reflectivo
        );
        setCertificacion(response.data.epp_estructural_forestal.certificacion);
        setColoresSuspensores(
          response.data.epp_estructural_forestal.color_suspensores
        );
        setMaterial(response.data.epp_estructural_forestal.material);
      });
    } else {
      getDetailHerramientasAccesorios(Token.access, id).then((response) => {
        setCodigo(response.data.herramienta_accesorio.codigo);
        setEstado(response.data.herramienta_accesorio.estado);
        setMarca(response.data.herramienta_accesorio.marca);
        setIndustria(response.data.herramienta_accesorio.industria);
        setTalla(response.data.herramienta_accesorio.talla);
        setAñoFabricacion(response.data.herramienta_accesorio.año_fabricacion);
        setColor(response.data.herramienta_accesorio.color);
        setColorReflectivo(
          response.data.herramienta_accesorio.color_reflectivo
        );
        setCertificacion(response.data.herramienta_accesorio.certificacion);
        setColoresSuspensores(
          response.data.herramienta_accesorio.color_suspensores
        );
        setMaterial(response.data.herramienta_accesorio.material);
      });
    }
  };
  //-------------------------------------------------------------------------
  //-----------------------REGISTRAR PRODUCTO---------------------------------
  const register = () => {
    if (
      location.state.category === "EPP Estructural" ||
      location.state.category === "EPP Forestal"
    ) {
      postEppEstructuralForestal(Token.access, {
        codigo: codigo,
        estado: estado,
        marca: marca,
        industria: industria,
        talla: talla,
        año_fabricacion: año_fabricacion,
        color: color,
        color_reflectivo: color_reflectivo,
        certificacion: certificacion,
        color_suspensores: color_suspensores,
        material: material,
        type_product: location.state.id,
      })
        .then((response) => {
          console.log(response.data);
          saveImage(response.data.id);
          onClose();
        })
        .catch((error) => {
          toast.error(
            "Error al enviar enviar datos, verifique e intente nuevamente"
          );
        });
    } else {
      postHerramientasAccesorios(Token.access, {
        codigo: codigo,
        estado: estado,
        marca: marca,
        industria: industria,
        talla: talla,
        año_fabricacion: año_fabricacion,
        color: color,
        color_reflectivo: color_reflectivo,
        certificacion: certificacion,
        color_suspensores: color_suspensores,
        material: material,
        type_product: location.state.id,
      })
        .then((response) => {
          console.log(response.data);
          saveImage(response.data.id);
          onClose();
        })
        .catch((error) => {
          toast.error(
            "Error al enviar enviar datos, verifique e intente nuevamente"
          );
        });
    }
  };
  //--------------------------------------------------------------------------

  //--------------------ACUTALIZAR PRODUCTO-----------------------------------
  const update = () => {
    if (
      location.state.category === "EPP Estructural" ||
      location.state.category === "EPP Forestal"
    ) {
      putEppEstructuralForestal(Token.access, product.id, {
        codigo: codigo,
        estado: estado,
        marca: marca,
        industria: industria,
        talla: talla,
        año_fabricacion: año_fabricacion,
        color: color,
        color_reflectivo: color_reflectivo,
        certificacion: certificacion,
        color_suspensores: color_suspensores,
        material: material,
        type_product_id: location.state.id,
      })
        .then((response) => {
          console.log(response.data);
          saveImage(product.id);
          onClose();
        })
        .catch((error) => {
          toast.error(
            "Error al enviar enviar datos, verifique e intente nuevamente"
          );
        });
    } else {
      putHerramientasAccesorios(Token.access, product.id, {
        codigo: codigo,
        estado: estado,
        marca: marca,
        industria: industria,
        talla: talla,
        año_fabricacion: año_fabricacion,
        color: color,
        color_reflectivo: color_reflectivo,
        certificacion: certificacion,
        color_suspensores: color_suspensores,
        material: material,
        type_product_id: location.state.id,
      })
        .then((response) => {
          console.log(response.data);
          saveImage(product.id);
          onClose();
        })
        .catch((error) => {
          toast.error(
            "Error al enviar enviar datos, verifique e intente nuevamente"
          );
        });
    }
  };
  //--------------------------------------------------------------------------

  //-----------------------AÑADIR IMAGEN--------------------------------------
  const saveImage = (id) => {
    if (image === "") {
      return;
    }
    const data = new FormData();
    data.append("image", image);
    if (
      location.state.category === "EPP Estructural" ||
      location.state.category === "EPP Forestal"
    ) {
      saveImageEppEstructuralForestal(Token.access, id, data)
        .then((response) => {})
        .catch((error) => {
        });
    } else {
      saveImageHerramientasAccesorios(Token.access, id, data)
        .then((response) => {})
        .catch((error) => {
        });
    }
  };

  const SubmitData = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (product === null) {
      register();
    } else {
      update(product.id);
    }
  };

  return (
    <>
      <div className="register-form-container">
        <form className="register-form-user">
          {location.state.category === "EPP Estructural" ||
          location.state.category === "EPP Forestal" ? (
            <>
              <div className="form-groups-user">
                <div className="container-image">
                  <img
                    className="imagen-perfil"
                    src={imageView}
                    alt="Imagen"
                    onClick={handleOpenFilePicker}
                  />
                  <input
                    accept="image/x-png,image/jpeg"
                    ref={fileRef}
                    type="file"
                    style={{ display: "none", cursor: "pointer" }}
                    onChange={handleChangeFile}
                  />
                </div>
              </div>
              <div className="form-groups-user">
                <label htmlFor="name">Código:</label>
                <input
                  className="input"
                  type="text"
                  placeholder="Código..."
                  value={codigo}
                  required
                  onChange={(e) => setCodigo(e.target.value)}
                />
              </div>
              <div className="form-groups-user">
                <label htmlFor="name">Estado:</label>
                <select
                  value={estado}
                  onChange={(e) => setEstado(e.target.value)}
                >
                  <option value="true">Donación</option>
                  <option value="false">Comprado</option>
                </select>
              </div>
              <div className="form-groups-user">
                <label htmlFor="name">Marca:</label>
                <input
                  className="input"
                  type="text"
                  placeholder="Marca..."
                  value={marca}
                  required
                  onChange={(e) => setMarca(e.target.value)}
                />
              </div>
              <div className="form-groups-user">
                <label htmlFor="name">Industria:</label>
                <input
                  className="input"
                  type="text"
                  placeholder="Industria..."
                  value={industria}
                  required
                  onChange={(e) => setIndustria(e.target.value)}
                />
              </div>
              <div className="form-groups-user">
                <label htmlFor="name">Talla:</label>
                <input
                  className="input"
                  type="text"
                  placeholder="Talla..."
                  value={talla}
                  required
                  onChange={(e) => setTalla(e.target.value)}
                />
              </div>
              <div className="form-groups-user">
                <label htmlFor="name">Año de Fabricación:</label>
                <input
                  className="input"
                  type="text"
                  placeholder="Año de Fabricación..."
                  value={año_fabricacion}
                  required
                  onChange={(e) => setAñoFabricacion(e.target.value)}
                />
              </div>
              <div className="form-groups-user">
                <label htmlFor="name">Color:</label>
                <input
                  className="input"
                  type="text"
                  placeholder="Color..."
                  value={color}
                  required
                  onChange={(e) => setColor(e.target.value)}
                />
              </div>
              <div className="form-groups-user">
                <label htmlFor="name">Color Reflectivo:</label>
                <input
                  className="input"
                  type="text"
                  placeholder="Color Reflectivo..."
                  value={color_reflectivo}
                  required
                  onChange={(e) => setColorReflectivo(e.target.value)}
                />
              </div>
              <div className="form-groups-user">
                <label htmlFor="name">Certificación:</label>
                <input
                  className="input"
                  type="text"
                  placeholder="Certificación..."
                  value={certificacion}
                  required
                  onChange={(e) => setCertificacion(e.target.value)}
                />
              </div>
              <div className="form-groups-user">
                <label htmlFor="name">Color Suspensores:</label>
                <input
                  className="input"
                  type="text"
                  placeholder="Color Suspensores..."
                  value={color_suspensores}
                  required
                  onChange={(e) => setColoresSuspensores(e.target.value)}
                />
              </div>
              <div className="form-groups-user">
                <label htmlFor="name">Material:</label>
                <input
                  className="input"
                  type="text"
                  placeholder="Material..."
                  value={material}
                  required
                  onChange={(e) => setMaterial(e.target.value)}
                />
              </div>
              <button className="btn_enviar" onClick={SubmitData}>
                Guardar
              </button>
            </>
          ) : (
            <>
              <div className="form-groups-user">
                <div className="container-image">
                  <img
                    className="imagen-perfil"
                    src={imageView}
                    alt="Imagen"
                    onClick={handleOpenFilePicker}
                  />
                  <input
                    accept="image/x-png,image/jpeg"
                    ref={fileRef}
                    type="file"
                    style={{ display: "none", cursor: "pointer" }}
                    onChange={handleChangeFile}
                  />
                </div>
              </div>
              <div className="form-groups-user">
                <label htmlFor="name">Código:</label>
                <input
                  className="input"
                  type="text"
                  placeholder="Código..."
                  value={codigo}
                  required
                  onChange={(e) => setCodigo(e.target.value)}
                />
              </div>
              <div className="form-groups-user">
                <label htmlFor="name">Marca:</label>
                <input
                  className="input"
                  type="text"
                  placeholder="Marca..."
                  value={marca}
                  required
                  onChange={(e) => setMarca(e.target.value)}
                />
              </div>
              <div className="form-groups-user">
                <label htmlFor="name">Industria:</label>
                <input
                  className="input"
                  type="text"
                  placeholder="Industria..."
                  value={industria}
                  required
                  onChange={(e) => setIndustria(e.target.value)}
                />
              </div>
              <div className="form-groups-user">
                <label htmlFor="name">Color:</label>
                <input
                  className="input"
                  type="text"
                  placeholder="Color..."
                  value={color}
                  required
                  onChange={(e) => setColor(e.target.value)}
                />
              </div>

              <div className="form-groups-user">
                <label htmlFor="name">Certificación:</label>
                <input
                  className="input"
                  type="text"
                  placeholder="Certificación..."
                  value={certificacion}
                  required
                  onChange={(e) => setCertificacion(e.target.value)}
                />
              </div>

              <div className="form-groups-user">
                <label htmlFor="name">Material:</label>
                <input
                  className="input"
                  type="text"
                  placeholder="Material..."
                  value={material}
                  required
                  onChange={(e) => setMaterial(e.target.value)}
                />
              </div>
              <button className="btn_enviar" onClick={SubmitData}>
                Guardar
              </button>
            </>
          )}
        </form>
      </div>
    </>
  );
};
export default RegisterProduct;
