import React, { useEffect, useState } from "react";
import { getDetailUser, getListUsers } from "../../services/UsuariosService";
import {
  Document,
  PDFViewer,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import { format } from "date-fns";

const ReporteVoluntarios = ({ Token }) => {
  const [listaUsers, setListaUsers] = useState([]);
  const [user, setUser] = useState({});
  const fechaActual = format(new Date(), "dd/MM/yyyy");

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

  const styles = StyleSheet.create({
    page: {
      fontFamily: "Helvetica",
      fontSize: 10,
      paddingTop: 20,
      paddingLeft: 20,
      paddingRight: 30,
      paddingBottom: 0,
    },
    linea: {
      marginTop: 25,
      fontSize: 12,
      textAlign: "center",
    },
    title: {
      fontSize: 24,
      marginBottom: 15,
      textAlign: "center",
    },
    firma: {
      textAlign: "center",
      fontSize: 11,
    },
    date: {
      fontSize: 12,
      marginBottom: 5,
      textAlign: "right",
    },
    table: {
      display: "table",
      width: "100%",
      marginBottom: 30,
    },
    tableRow: {
      flexDirection: "row",
      borderBottomWidth: 0.5,
      borderTopWidth: 0.5,
      borderTopColor: "red",
      borderBottomColor: "red",
      alignItems: "center",
      height: 25,
      fontStyle: "bold",
    },
    tableHeader: {
      width: "40%",
      fontSize: 8,
      borderRightWidth: 1,
      fontStyle: "bold",
      textAlign: "center",
      borderRightColor: "red",
    },
    tableHeader1: {
      width: "5%",
      fontSize: 8,
      borderRightWidth: 1,
      fontStyle: "bold",
      textAlign: "center",
      borderRightColor: "red",
    },
    tableHeader2: {
      width: "20%",
      fontSize: 8,
      borderRightWidth: 1,
      fontStyle: "bold",
      textAlign: "center",
      borderRightColor: "red",
    },
  });

  return (
    <PDFViewer style={{ width: "100%", height: "91vh" }}>
      <Document>
        <Page size="LETTER" style={styles.page}>
          <Text style={styles.date}>FECHA: {fechaActual}</Text>
          <Text style={styles.title}>LISTA DE BOMBEROS</Text>

          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={styles.tableHeader1}>N°</Text>
              <Text style={styles.tableHeader2}>LEGAJO</Text>
              <Text style={styles.tableHeader2}>SANGRE</Text>
              <Text style={styles.tableHeader}>NOMBRE COMPLETO</Text>
              <Text style={styles.tableHeader2}>GRADO</Text>
              <Text style={styles.tableHeader}>DIRECCIÓN</Text>
              <Text style={styles.tableHeader2}>TELÉFONO</Text>
              <Text style={styles.tableHeader2}>ESTADO</Text>
            </View>
            {listaUsers.sort().map((usuario, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={styles.tableHeader1}>{index + 1}</Text>
                <Text style={styles.tableHeader2}>{usuario.legajo}</Text>
                <Text style={styles.tableHeader2}>{usuario.blood_type}</Text>
                <Text style={styles.tableHeader}>
                  {usuario.first_name} {usuario.last_name}
                </Text>
                <Text style={styles.tableHeader2}>{usuario.grade}</Text>
                <Text style={styles.tableHeader}>{usuario.address}</Text>
                <Text style={styles.tableHeader2}>{usuario.phone_number}</Text>

                {usuario.state === "Servicio Activo" ||
                usuario.state === "Servicio Pasivo" ? (
                  <Text style={styles.tableHeader2}>{usuario.state}</Text>
                ) : (
                  <Text style={styles.tableHeader2}>{usuario.state}</Text>
                )}
              </View>
            ))}
          </View>

          <Text style={styles.linea}>
            ----------------------------------------------
          </Text>
          <Text style={styles.firma}>
            ENCARGADO: {user.first_name} {user.last_name}
          </Text>
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default ReporteVoluntarios;
