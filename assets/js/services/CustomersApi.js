import axios from "axios";

function findAll() {
    return axios
        .get("http://localhost:8000/api/clients") // ?pagination=true&count=20&page=3
        .then(response => response.data['hydra:member']);
}

function findById(id) {
    return axios
        .get("http://localhost:8000/api/clients/" + id)
        .then(response => response.data);
}

function editById(id, customer) {
    return axios.put("http://localhost:8000/api/clients/" + id, customer)
}

function registerCustomer(customer) {
    return axios.post("http://localhost:8000/api/clients", customer);
}

function deleteCustomer(id) {
    return axios.delete("http://localhost:8000/api/clients/" + id);
}

export default {
    findAll: findAll,
    find: findById,
    edit: editById,
    register: registerCustomer,
    delete: deleteCustomer
}
