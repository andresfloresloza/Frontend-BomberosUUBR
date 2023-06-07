import axios from "axios"
import { DOMAIN } from "../config/Constant";


export const postLogin = (username, password) => {
    return new Promise((resolve, reject) => {
        axios.post(DOMAIN + "login/", {
            username,
            password,
        }).then((response) => {
            resolve(response.data);
            if(response.status === 400){
                alert("Contraseña demasiado corta. Minimo 8 caracteres.")
            }
        })
        .catch((error) => {
            alert("Usuario o Contraseña Incorrecto!");
        });
    });
}