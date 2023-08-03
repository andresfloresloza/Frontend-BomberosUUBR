import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  getDetailEpp,
  postEpp,
  putEpp,
  saveImageEpp,
} from "../../../services/EppService";
import {
  getDetailOtros,
  postOtros,
  putOtros,
  saveImageOtros,
} from "../../../services/OtroService";
import { toast } from "react-toastify";
import { DOMAIN_IMAGE } from "../../../config/Constant";

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
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");

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
      location.state.category === "EPP Forestal" ||
      location.state.category === "EPP Rescate Técnico" ||
      location.state.category === "EPP Hazmat" ||
      location.state.category === "EPP Convencionales"
    ) {
      getDetailEpp(Token.access, id).then((response) => {
        setCodigo(response.data.epp.codigo);
        setEstado(response.data.epp.estado);
        setMarca(response.data.epp.marca);
        setIndustria(response.data.epp.industria);
        setTalla(response.data.epp.talla);
        setAñoFabricacion(response.data.epp.año_fabricacion);
        setColor(response.data.epp.color);
        setColorReflectivo(response.data.epp.color_reflectivo);
        setCertificacion(response.data.epp.certificacion);
        setColoresSuspensores(response.data.epp.color_suspensores);
        setMaterial(response.data.epp.material);
        setImageView(DOMAIN_IMAGE + response.data.epp.image);
      });
    } else {
      getDetailOtros(Token.access, id).then((response) => {
        setCodigo(response.data.otros.codigo);
        setEstado(response.data.otros.estado);
        setNombre(response.data.otros.nombre);
        setDescripcion(response.data.otros.descripcion);
        setImageView(DOMAIN_IMAGE + response.data.otros.image);
      });
    }
  };
  //-------------------------------------------------------------------------
  //-----------------------REGISTRAR PRODUCTO---------------------------------
  const register = () => {
    if (
      location.state.category === "EPP Estructural" ||
      location.state.category === "EPP Forestal" ||
      location.state.category === "EPP Rescate Técnico" ||
      location.state.category === "EPP Hazmat" ||
      location.state.category === "EPP Convencionales"
    ) {
      postEpp(Token.access, {
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
      postOtros(Token.access, {
        codigo: codigo,
        estado: estado,
        nombre: nombre,
        descripcion: descripcion,
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
      location.state.category === "EPP Forestal" ||
      location.state.category === "EPP Rescate Técnico" ||
      location.state.category === "EPP Hazmat" ||
      location.state.category === "EPP Convencionales"
    ) {
      putEpp(Token.access, product.id, {
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
      putOtros(Token.access, product.id, {
        codigo: codigo,
        estado: estado,
        nombre: nombre,
        descripcion: descripcion,
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
      location.state.category === "EPP Forestal" ||
      location.state.category === "EPP Rescate Técnico" ||
      location.state.category === "EPP Hazmat" ||
      location.state.category === "EPP Convencionales"
    ) {
      saveImageEpp(Token.access, id, data)
        .then((response) => {})
        .catch((error) => {});
    } else {
      saveImageOtros(Token.access, id, data)
        .then((response) => {})
        .catch((error) => {});
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
  const convertDate = (dateString) => {
    const [year, month, day] = dateString.split("-");
    return `${year}-${month}-${day}`;
  };
  return (
    <>
      <div className="register-form-container">
        <form className="register-form-user">
          {location.state.category === "EPP Estructural" ||
          location.state.category === "EPP Forestal" ||
          location.state.category === "EPP Rescate Técnico" ||
          location.state.category === "EPP Hazmat" ||
          location.state.category === "EPP Convencionales" ? (
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
                  type="date"
                  placeholder="Año de Fabricación..."
                  value={convertDate(año_fabricacion)}
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
                <label htmlFor="name">Nombre:</label>
                <input
                  className="input"
                  type="text"
                  placeholder="Nombre..."
                  value={nombre}
                  required
                  onChange={(e) => setNombre(e.target.value)}
                />
              </div>
              <div className="form-groups-user">
                <label htmlFor="name">Descipcion:</label>
                <input
                  className="input"
                  type="text"
                  placeholder="Descipcion..."
                  value={descripcion}
                  required
                  onChange={(e) => setDescripcion(e.target.value)}
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
