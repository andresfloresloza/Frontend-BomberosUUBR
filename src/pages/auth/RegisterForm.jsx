import { useEffect, useRef, useState } from "react";
import {
  getDetailUser,
  postUser,
  putUser,
  saveImageUser,
} from "../../services/UsuariosService";
import "../../styles/pages/auth/registerForm.css";
import { toast } from "react-toastify";
import { DOMAIN_IMAGE } from "../../config/Constant";
const RegisterForm = ({ onClose, Token, object }) => {
  const [user, setUser] = useState({});
  const [image, setImage] = useState("");
  const [legajo, setLegajo] = useState("");
  const [state, setState] = useState("Servicio Activo");
  const [position, setPosition] = useState("Usuario");
  const [grade, setGrade] = useState("Postulante");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [blood_type, setBloodType] = useState("(A+)");
  const [email, setEmail] = useState("@gmail.com");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const fileRef = useRef(null);
  const [imageView, setImageView] = useState(
    require("../../assets/perfil.png")
  );

  useEffect(() => {
    if (Token.position === "Administrador") {
      if (object !== null) {
        getUser(object.id);
      }
    } else {
      getUser(Token.id);
    }
  }, []);

  //---------------------VALIDACION DE CONTRASEÑA---------------------------
  const validatePassword = () => {
    let isValid = true;

    if (password !== "" && confirmPassword !== "") {
      if (password !== confirmPassword) {
        isValid = false;
        toast.error("Las contraseñas no coinciden");
      }
    }

    return isValid;
  };

  //------------------------------------------------------------------------

  //---------------------CARGAR PERFIL USUARIO------------------------------
  const getUser = (id) => {
    getDetailUser(Token.access, id).then((response) => {
      setImage(response.data.user.image);
      setFirstName(response.data.user.first_name);
      setLastName(response.data.user.last_name);
      setAddress(response.data.user.address);
      setPhoneNumber(response.data.user.phone_number);
      setBloodType(response.data.user.blood_type);
      setPosition(response.data.user.position);
      setLegajo(response.data.user.legajo);
      setState(response.data.user.state);
      setGrade(response.data.user.grade);
      setEmail(response.data.user.username);
      setPassword(response.data.user.password);
      setConfirmPassword(response.data.user.password2);
      setImageView(DOMAIN_IMAGE + response.data.user.image);
      setUser(response.data.user);
    });
  };
  //------------------------------------------------------------------------

  //------------------REGISTRAR NUEVO USUARIO------------------------------
  const registerNewUser = () => {
    if (validatePassword()) {
      postUser(Token.access, {
        username: email,
        password: "bomberosuubr0",
        password2: "bomberosuubr0",
        legajo: legajo,
        position: position,
        state: state,
        grade: grade,
        first_name: first_name,
        last_name: last_name,
        address: address,
        phone_number: phone_number,
        blood_type: blood_type,
      })
        .then((response) => {
          console.log(response.data);
          saveImage(response.data.id);
          onClose();
        })
        .catch((error) => {
          if (error.response.status === 400) {
            toast.error(
              "Error al enviar enviar datos, verifique e intente nuevamente"
            );
          }
        });
    }
  };
  //-------------------------------------------------------------------------

  //--------------------ACUTALIZAR USUARIO-----------------------------------
  const updateUser = () => {
    if (validatePassword()) {
      putUser(Token.access, user.id, {
        username: email,
        password: password,
        password2: confirmPassword,
        legajo: legajo,
        position: position,
        state: state,
        grade: grade,
        first_name: first_name,
        last_name: last_name,
        address: address,
        phone_number: phone_number,
        blood_type: blood_type,
      })
        .then((response) => {
          console.log(response.data);
          saveImage(user.id);
          onClose();
        })
        .catch((error) => {
          if (error.response.status === 400) {
            toast.error(
              "Error al enviar enviar datos, verifique e intente nuevamente"
            );
          }
        });
    }
  };
  //-------------------------------------------------------------------------

  //-----------------------AÑADIR IMAGEN-------------------------------------
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
  const saveImage = (id) => {
    if (image === "") {
      return;
    }
    const data = new FormData();
    data.append("image", image);

    saveImageUser(Token.access, id, data)
      .then((response) => {})
      .catch((error) => {});
  };
  //------------------------------------------------------------------------

  const SubmitData = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (object === null) {
      registerNewUser();
    } else {
      updateUser(object.id);
    }
  };

  return (
    <>
      <div className="register-form-container">
        <form className="register-form-user">
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

            {Token.position === "Administrador" ||Token.position === "Personal"||
            Token.is_superuser ||
            Token.position === "" ? (
              <div className="form-groups-user">
                <label htmlFor="name">Legajo:</label>
                <input
                  className="input"
                  type="text"
                  placeholder="Legajo..."
                  value={legajo}
                  required
                  onChange={(e) => setLegajo(e.target.value)}
                />
              </div>
            ) : (
              <></>
            )}
            {Token.position === "Administrador" || Token.position === "Personal"||
            Token.is_superuser ||
            Token.position === "" ? (
              <div className="form-groups-user">
                <label htmlFor="name">Rol:</label>
                <select
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                >
                  <option value="Administrador">Administrador</option>
                  <option value="Personal">Personal</option>
                  <option value="Inventario">Inventario</option>
                  <option value="Usuario">Usuario</option>
                </select>
              </div>
            ) : (
              <></>
            )}
            {Token.position === "Administrador" ||Token.position === "Personal"||
            Token.is_superuser ||
            Token.position === "" ? (
              <div className="form-groups-user">
                <label htmlFor="name">Estado:</label>
                <select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                >
                  <option value="Servicio Activo">Servicio Activo</option>
                  <option value="Servicio Pasivo">Servicio Pasivo</option>
                  <option value="Baja">Baja</option>
                </select>
              </div>
            ) : (
              <></>
            )}
            {Token.position === "Administrador" ||Token.position === "Personal"||
            Token.is_superuser ||
            Token.position === "" ? (
              <div className="form-groups-user">
                <label htmlFor="name">Grado:</label>
                <select
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                >
                  <option value="Postulante">Postulante</option>
                  <option value="Alumno">Alumno</option>
                  <option value="Bombero I">Bombero I</option>
                  <option value="Bombero II">Bombero II</option>
                  <option value="Subteniente">Subteniente</option>
                  <option value="Teniente">Teniente</option>
                  <option value="Capitán">Capitán</option>
                  <option value="Comandante">Comandante</option>
                </select>
              </div>
            ) : (
              <></>
            )}

            <div className="form-groups-user">
              <label htmlFor="name">Nombre:</label>
              <input
                className="input"
                type="text"
                placeholder="Nombre..."
                value={first_name}
                required
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="form-groups-user">
              <label htmlFor="name">Apellido:</label>
              <input
                className="input"
                type="text"
                placeholder="Apellido..."
                value={last_name}
                required
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="form-groups-user">
              <label htmlFor="name">Dirección:</label>
              <input
                className="input"
                type="text"
                placeholder="Direccion..."
                value={address}
                required
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="form-groups-user">
              <label htmlFor="name">Teléfono:</label>
              <input
                className="input"
                type="text"
                placeholder="Teléfono..."
                value={phone_number}
                required
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            {Token.position === "Administrador" ||Token.position === "Personal"||
            Token.is_superuser ||
            Token.position === "" ? (
              <div className="form-groups-user">
                <label htmlFor="name">Tipo Sangre:</label>
                <select
                  value={blood_type}
                  onChange={(e) => setBloodType(e.target.value)}
                >
                  <option value="(A+)">(A+)</option>
                  <option value="(A-)">(A-)</option>
                  <option value="(B+)">(B+)</option>
                  <option value="(B-)">(B-)</option>
                  <option value="(AB+)">(AB+)</option>
                  <option value="(AB-)">(AB-)</option>
                  <option value="(O+)">(O+)</option>
                  <option value="(O-)">(O-)</option>
                </select>
              </div>
            ) : (
              <></>
            )}

            <div className="form-groups-user">
              <label htmlFor="name">Correo Electrónico:</label>
              <input
                className="input"
                type="text"
                placeholder="Correo Electrónico..."
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-groups-user">
              <label htmlFor="name">Contraseña:</label>
              <input
                className="input"
                type="password"
                placeholder="Contraseña..."
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-groups-user">
              <label htmlFor="name">Confirmar Contraseña:</label>
              <input
                className="input"
                type="password"
                placeholder="Confirmar Contraseña..."
                value={confirmPassword}
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button className="btn_enviar" onClick={SubmitData}>
              Guardar
            </button>
          </>
        </form>
      </div>
    </>
  );
};
export default RegisterForm;
