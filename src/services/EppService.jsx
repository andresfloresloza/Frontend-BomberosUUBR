import axios from "axios"
import { DOMAIN } from "../config/Constant";


 export const postEpp = (token, type_product) => {
     return new Promise((resolve, reject) => {
         axios.post(DOMAIN + "epp/", type_product, {
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
 }

 export const saveImageEpp = (token, id, formData) => {
    return new Promise((resolve, reject) => {
        axios.patch(DOMAIN + "epp/"+id+"/", formData,{
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

export const getListEpp = (token) => {
    return new Promise((resolve, reject) => {
        axios.get(DOMAIN + "epp/", {
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
}

 export const getDetailEpp = (token, id) => {
     return new Promise((resolve, reject) => {
         axios.get(DOMAIN + "epp/"+id+"/", {
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
 }

 export const putEpp = (token,id, type_product) => {
     return new Promise((resolve, reject) => {
         axios.put(DOMAIN + "epp/"+id+"/", type_product,{
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
 }

export const deleteEpp = (token, id) => {
    return new Promise((resolve, reject) => {
        axios.delete(DOMAIN + "epp/"+id+"/", {
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
}