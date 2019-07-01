import axios from "axios";
import jwtDecode from "jwt-decode";

/**
 * Requête HTTP d'authentification et stockage du token dans le storage et sur Axios
 * @param credentials
 * @returns {Promise<AxiosResponse<any> | never>}
 */
function authenticate(credentials) {
    return axios
        .post("http://localhost:8000/api/login_check", credentials)
        .then(response => response.data.token)
        .then(token => {
            // Je stock le token dans le local storage
            window.localStorage.setItem("authToken", token);
            // On prévient axios qu'on a un header par défaut sur toutes les requêtes HTTP
            setAxiosToken(token);
        });
}

function logout() {
    window.localStorage.removeItem("authToken");
    delete axios.defaults.headers['Authorization'];
}

/**
 * Positionne le token JWT sur Axios
 * @param token
 */
function setAxiosToken(token) {
    axios.defaults.headers["Authorization"] = "Bearer " + token;
}

/**
 * Mise en place du token lors du chargement de l'application
 */
function setUp() {
    const token = window.localStorage.getItem("authToken");

    if (token) {
        const jwtData = jwtDecode(token);
        if (jwtData.exp * 1000 > new Date().getTime()) {
            setAxiosToken(token);
        }
    }
}

/**
 * Détecte si on est authentifié ou pas
 * @returns {boolean}
 */
function isAuthenticated() {
    const token = window.localStorage.getItem("authToken");

    if (token) {
        const jwtData = jwtDecode(token);
        if (jwtData.exp * 1000 > new Date().getTime()) {
            return true;
        }
    }

    return false;
}

export default {
    authenticate,
    logout,
    setUp,
    isAuthenticated
}
