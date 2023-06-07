import axios from "axios"
import { DOMAIN } from "../config/Constant";


 export const postEppEstructuralForestal = (token, type_product) => {
     return new Promise((resolve, reject) => {
         axios.post(DOMAIN + "epp-estructural-forestal/", type_product, {
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

 export const saveImageEppEstructuralForestal = (token, id, formData) => {
    return new Promise((resolve, reject) => {
        axios.patch(DOMAIN + "epp-estructural-forestal/"+id+"/", formData,{
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

export const getListEppEstructuralForestal = (token) => {
    return new Promise((resolve, reject) => {
        axios.get(DOMAIN + "epp-estructural-forestal/", {
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

 export const getDetailEppEstructuralForestal = (token, id) => {
     return new Promise((resolve, reject) => {
         axios.get(DOMAIN + "epp-estructural-forestal/"+id+"/", {
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

 export const putEppEstructuralForestal = (token,id, type_product) => {
     return new Promise((resolve, reject) => {
         axios.put(DOMAIN + "epp-estructural-forestal/"+id+"/", type_product,{
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

export const deleteEppEstructuralForestal = (token, id) => {
    return new Promise((resolve, reject) => {
        axios.delete(DOMAIN + "epp-estructural-forestal/"+id+"/", {
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