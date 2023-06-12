import axios from "axios"
import { DOMAIN } from "../config/Constant";
import { toast } from "react-toastify";


export const postLogin = (username, password) => {
    return new Promise((resolve, reject) => {
        axios.post(DOMAIN + "login/", {
            username,
            password,
        }).then((response) => {
            resolve(response.data);
        })
        .catch((error) => {
            if (error.response.status === 401) {
                toast.error("Usuario o Contraseña Incorrecto!");
              }
            });

    });
}