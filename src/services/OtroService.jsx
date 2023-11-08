import axios from "axios";
import { DOMAIN } from "../config/Constant";

export const postOtros = (token, type_product) => {
  return new Promise((resolve, reject) => {
    axios
      .post(DOMAIN + "otros/", type_product, {
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

export const saveImageOtros = (token, id, formData) => {
  return new Promise((resolve, reject) => {
    axios
      .patch(DOMAIN + "otros/" + id + "/", formData, {
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

export const getListOtros = (token) => {
  return new Promise((resolve, reject) => {
    axios
      .get(DOMAIN + "otros/", {
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

export const getDetailOtros = (token,id) => {
  return new Promise((resolve, reject) => {
    axios
      .get(DOMAIN + "otros/" + id + "/", {
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token

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

export const getDetalleOTROS = (id) => {
  return new Promise((resolve, reject) => {
      axios.get(DOMAIN + "otros/"+id+"/", {
          headers: {
              "Content-Type": "application/json",
          },
      }).then((response) => {
          resolve(response.data);
      })
      .catch((error) => {
          reject(error);
      });
  });
}

export const putOtros = (token, id, type_product) => {
  return new Promise((resolve, reject) => {
    axios
      .put(DOMAIN + "otros/" + id + "/", type_product, {
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

export const deleteOtros = (token, id) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(DOMAIN + "otros/" + id + "/", {
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
