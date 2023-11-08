import axios from "axios";
import { DOMAIN } from "../config/Constant";

export const postTypeProduct = (token, type_product) => {
  return new Promise((resolve, reject) => {
    axios
      .post(DOMAIN + "type-product/", type_product, {
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

export const getListTypeProduct = (token) => {
  return new Promise((resolve, reject) => {
    axios
      .get(DOMAIN + "type-product/", {
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

export const getDetailTypeProduct = (token, id) => {
  return new Promise((resolve, reject) => {
    axios
      .get(DOMAIN + "type-product/" + id + "/", {
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

export const getDetalleTYPE = (id) => {
    return new Promise((resolve, reject) => {
        axios.get(DOMAIN + "type-product/"+id+"/", {
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

export const putTypeProduct = (token, id, type_product) => {
  return new Promise((resolve, reject) => {
    axios
      .put(DOMAIN + "type-product/" + id + "/", type_product, {
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

export const deleteTypeProduct = (token, id) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(DOMAIN + "type-product/" + id + "/", {
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
