import axios from "axios";
import { DOMAIN } from "../config/Constant";

export const postUser = (token, usuario) => {
    return new Promise((resolve, reject) => {
        axios.post(DOMAIN + "usuario/", usuario, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
        }).then((response) => {
            resolve(response.data);
        })
        .catch((error) => {
            reject(error);
        });
    });
};


export const saveImageUser = (token, id, formData) => {
    return new Promise((resolve, reject) => {
        axios.patch(DOMAIN + "usuario/"+id+"/", formData,{
            headers: {
                "Authorization": "Bearer " + token
            },
        }).then((response) => {
            resolve(response.data);
        })
        .catch((error) => {
            reject(error);
        });
    });
}

export const getListUsers = (token) => {
  return new Promise((resolve, reject) => {
    axios
      .get(DOMAIN + "usuario/", {
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

export const getDetailUser = (token,id) => {
  return new Promise((resolve, reject) => {
    axios
      .get(DOMAIN + "usuario/"+id, {
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

export const putUser = (token, id,usuario) => {
  return new Promise((resolve, reject) => {
    axios
      .put(DOMAIN + "usuario/"+id+"/", usuario, {
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

export const deleteUser = (token, id) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(DOMAIN + "usuario/" + id, {
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
