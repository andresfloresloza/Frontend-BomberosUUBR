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
import { useLocation } from "react-router-dom";
import { getListEppEstructuralForestal } from "../../services/EppEstructuralForestal";
import { getListHerramientasAccesorios } from "../../services/HerramientasAccesorios";

const ReporteInventario = ({ Token }) => {
  const location = useLocation();
  const [listProducts, setListProduct] = useState([]);
  const [user, setUser] = useState({});
  const fechaActual = format(new Date(), "dd/MM/yyyy");
  const EppEstructural_Forestal = listProducts.filter(
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
      location.state.category === "EPP Forestal"
    ) {
      console.log("Entre a: " + location.state.category);
      getListEppEstructuralForestal(Token.access).then((response) => {
        setListProduct(response.list_epp_estructural_forestal);
      });
    } else {
      console.log("Entre a: " + location.state.category);
      getListHerramientasAccesorios(Token.access).then((response) => {
        setListProduct(response.list_herramienta_accesorio);
      });
    }
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
      paddingRight: 20,
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
      textTransform: "uppercase",
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
      width: "100%",
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
      fontSize: 8.5,
      borderRightWidth: 1,
      fontStyle: "bold",
      textAlign: "center",
      borderRightColor: "red",
    },
    tableHeader1: {
      width: "15%",
      fontSize: 8.5,
      borderRightWidth: 1,
      fontStyle: "bold",
      textAlign: "center",
      borderRightColor: "red",
    },
    tableHeader2: {
      width: "35%",
      fontSize: 8.5,
      borderRightWidth: 1,
      fontStyle: "bold",
      textAlign: "center",
      borderRightColor: "red",
    },
  });

  return (
    <PDFViewer style={{ width: "100%", height: "91vh" }}>
      <Document>
        {location.state.category === "EPP Estructural" ||
        location.state.category === "EPP Forestal" ? (
          <>
            <Page size="LETTER" style={styles.page}>
              <Text style={styles.date}>FECHA: {fechaActual}</Text>
              <Text style={styles.title}>LISTA DE PRODUCTOS </Text>
              <Text style={styles.title}>
                {location.state.category} / {location.state.name}{" "}
              </Text>

              <View style={styles.table}>
                <View style={styles.tableRow}>
                  <Text style={styles.tableHeader1}>-</Text>
                  <Text style={styles.tableHeader2}>CÓDIGO</Text>
                  <Text style={styles.tableHeader2}>ESTADO</Text>
                  <Text style={styles.tableHeader2}>MARCA</Text>
                  <Text style={styles.tableHeader2}>MATERIAL</Text>
                  <Text style={styles.tableHeader}>INDUSTRIA</Text>
                  <Text style={styles.tableHeader2}>TALLA</Text>
                  <Text style={styles.tableHeader2}>COLOR</Text>
                  <Text style={styles.tableHeader2}>AÑO FABRICACIÓN</Text>
                  <Text style={styles.tableHeader}>CERTIFICACIÓN</Text>
                </View>
                {EppEstructural_Forestal.map((producto, index) => (
                  <View key={index} style={styles.tableRow}>
                    <Text style={styles.tableHeader1}>{index + 1}</Text>
                    <Text style={styles.tableHeader2}>{producto.codigo}</Text>
                    {producto.estado ? (
                  <Text style={styles.tableHeader2}>Donación</Text>
                ) : (
                  <Text style={styles.tableHeader2}>Comprado</Text>
                )}
                    <Text style={styles.tableHeader2}>{producto.marca}</Text>
                    <Text style={styles.tableHeader2}>{producto.material}</Text>
                    <Text style={styles.tableHeader}>{producto.industria}</Text>
                    <Text style={styles.tableHeader2}>{producto.talla}</Text>
                    <Text style={styles.tableHeader2}>{producto.color}</Text>
                    <Text style={styles.tableHeader2}>
                      {producto.año_fabricacion}
                    </Text>
                    <Text style={styles.tableHeader}>
                      {producto.certificacion}
                    </Text>
                  </View>
                ))}
              </View>

              <Text style={styles.linea}>
                ----------------------------------------------
              </Text>
              <Text style={styles.firma}>
                ENCARGADO: {user.first_name} {user.last_name}{" "}
              </Text>
            </Page>
          </>
        ) : (
          <>
            <Page size="LETTER" style={styles.page}>
              <Text style={styles.date}>FECHA: {fechaActual}</Text>
              <Text style={styles.title}>LISTA DE PRODUCTOS </Text>
              <Text style={styles.title}>
                {location.state.category} / {location.state.name}{" "}
              </Text>

              <View style={styles.table}>
                <View style={styles.tableRow}>
                  <Text style={styles.tableHeader1}>-</Text>
                  <Text style={styles.tableHeader2}>CÓDIGO</Text>
                  <Text style={styles.tableHeader2}>MARCA</Text>
                  <Text style={styles.tableHeader}>INDUSTRIA</Text>
                  <Text style={styles.tableHeader2}>COLOR</Text>
                  <Text style={styles.tableHeader}>CERTIFICACIÓN</Text>
                  <Text style={styles.tableHeader2}>MATERIAL</Text>
                </View>
                {EppEstructural_Forestal.map((producto, index) => (
                  <View key={index} style={styles.tableRow}>
                    <Text style={styles.tableHeader1}>{index + 1}</Text>
                    <Text style={styles.tableHeader2}>{producto.codigo}</Text>
                    <Text style={styles.tableHeader2}>{producto.marca}</Text>
                    <Text style={styles.tableHeader}>{producto.industria}</Text>
                    <Text style={styles.tableHeader2}>{producto.color}</Text>
                    <Text style={styles.tableHeader}>
                      {producto.certificacion}
                    </Text>
                    <Text style={styles.tableHeader2}>{producto.material}</Text>
                  </View>
                ))}
              </View>

              <Text style={styles.linea}>
                ----------------------------------------------
              </Text>
              <Text style={styles.firma}>
                ENCARGADO: {user.first_name} {user.last_name}{" "}
              </Text>
            </Page>
          </>
        )}
      </Document>
    </PDFViewer>
  );
};

export default ReporteInventario;
