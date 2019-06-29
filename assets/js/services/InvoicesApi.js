import axios from "axios";

function findAll() {
    return axios
        .get("http://localhost:8000/api/factures") // ?pagination=true&count=20&page=3
        .then(response => response.data['hydra:member']);
}

function deleteInvoice(id) {
    return axios.delete("http://localhost:8000/api/factures/" + id);
}

export default {
    findAll: findAll,
    delete: deleteInvoice
}
