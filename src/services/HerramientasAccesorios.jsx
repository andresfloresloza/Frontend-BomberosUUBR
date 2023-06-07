import axios from "axios";
import { DOMAIN } from "../config/Constant";

export const postHerramientasAccesorios = (token, type_product) => {
  return new Promise((resolve, reject) => {
    axios
      .post(DOMAIN + "herramientas-accesorios/", type_product, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const saveImageHerramientasAccesorios = (token, id, formData) => {
  return new Promise((resolve, reject) => {
    axios
      .patch(DOMAIN + "herramientas-accesorios/" + id + "/", formData, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getListHerramientasAccesorios = (token) => {
  return new Promise((resolve, reject) => {
    axios
      .get(DOMAIN + "herramientas-accesorios/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getDetailHerramientasAccesorios = (token, id) => {
  return new Promise((resolve, reject) => {
    axios
      .get(DOMAIN + "herramientas-accesorios/" + id + "/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const putHerramientasAccesorios = (token, id, type_product) => {
  return new Promise((resolve, reject) => {
    axios
      .put(DOMAIN + "herramientas-accesorios/" + id + "/", type_product, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const deleteHerramientasAccesorios = (token, id) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(DOMAIN + "herramientas-accesorios/" + id + "/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
