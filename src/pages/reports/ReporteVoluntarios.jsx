import React, { useEffect, useRef, useState } from "react";
import { getDetailUser, getListUsers } from "../../services/UsuariosService";
import { format } from "date-fns";
import { Table } from "react-bootstrap";
import { useReactToPrint } from "react-to-print";
import "../../styles/pages/reports/reportes.css";

const ReporteVoluntarios = ({ Token }) => {
  const [listaUsers, setListaUsers] = useState([]);
  const [user, setUser] = useState({});
  const fechaActual = format(new Date(), "dd/MM/yyyy");
  const componentRef = useRef();

  useEffect(() => {
    getUsers();
    getUser();
  }, []);

  //---------------------CARGAR LISTA USUARIOS------------------------------
  const getUsers = () => {
    getListUsers(Token.access).then((response) => {
      const sortedUsers = response.list_users.sort(
        (a, b) => a.legajo - b.legajo
      );
      setListaUsers(sortedUsers);
    });
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
            <div className="info_reporte" ref={componentRef}>
              <p>FECHA: {fechaActual}</p>
              <h1>LISTA DE BOMBEROS</h1>
              <Table className="w-75 mx-auto " bordered>
                <thead>
                  <th>N°</th>
                  <th>Legajo</th>
                  <th>Grado</th>
                  <th>Nombre Completo</th>
                  <th>Cargo</th>
                  <th>Direccion</th>
                  <th>Telefono</th>
                  <th>Tipo Sangre</th>
                  <th>Estado</th>
                </thead>
                <tbody>
                  {listaUsers.map((item, index) => {
                    return (
                      <tr key={index}>
                        <th>{index + 1}</th>
                        <th>{item.legajo}</th>
                        <th>{item.grade}</th>
                        <th>
                          {item.first_name} {item.last_name}
                        </th>
                        <th>{item.cargo}</th>
                        <th>{item.address}</th>
                        <th>{item.phone_number}</th>
                        <th>{item.blood_type}</th>
                        {item.state ==="Servicio Activo" ? (
                          
                          <th>{item.state}</th>
                        ) : item.state === "Servicio Pasivo" ? (
                          
                          <th>{item.state}</th>
                        ) : (
                          
                          <th>
                            {item.state}
                          </th>
                        )}
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
          </div>
        </div>
      </div>
    </>
  );
};

export default ReporteVoluntarios;
