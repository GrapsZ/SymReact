import React, { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "../components/pagination";

const CustomersPageWithPagination = props => {
    const [customers, setCustomers] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/clients?pagination=true&count=${itemsPerPage}&page=${currentPage}`) // ?pagination=true&count=20&page=3
            .then(response => {
                setCustomers(response.data['hydra:member']);
                setTotalItems(response.data['hydra:totalItems']);
            })
            .catch(error => console.log(error.response));
    }, [currentPage]);

    const handleDelete = (id) => {
        // Copie originale du tableau
        const originalCustomers = [...customers];

        // 1. Approche optimiste = on privilégie la réactivité, on efface directement de la vue.
        // On filtre le tableau et on garde tous les comptes qui ne sont pas l'id que l'on veut supprimer
        setCustomers(customers.filter(customer => customer.id !== id));

        axios
            .delete("http://localhost:8000/api/clients/" + id)
            .then(response => console.log("ok"))
            .catch(error => {
                // Si erreur, on set le tableau "copie"
                setCustomers(originalCustomers);
                console.log(error.response)
            })
    };

    const handlePageChange = (page) => {
        setCustomers([]);
        setCurrentPage(page);
    };

    return (
        <>
            <h1>Liste des clients (pagination)</h1>

            <table className="table table-hover">
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Client</th>
                    <th>Email</th>
                    <th>Entreprise</th>
                    <th className="text-center">Factures</th>
                    <th className="text-center">Montant total</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {customers.length === 0 && <tr><td>Chargement...</td></tr> }
                {customers.map(customer =>
                    <tr key={customer.id}>
                        <td>{customer.id}</td>
                        <td>
                            <a href="#">{customer.firstName} {customer.lastName}</a>
                        </td>
                        <td>{customer.email}</td>
                        <td>{customer.company}</td>
                        <td className="text-center">
                            <span className="badge badge-primary">
                                {customer.invoices.length}
                            </span>
                        </td>
                        <td className="text-center">{customer.totalAmount.toLocaleString()} €</td>
                        <td>
                            <button
                                onClick={() => handleDelete(customer.id)}
                                disabled={customer.invoices.length > 0}
                                className="btn btn-sm btn-danger">
                                Supprimer
                            </button>
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
            <Pagination
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                length={totalItems}
                onPageChanged={handlePageChange}
            />
        </>
    );
};

export default CustomersPageWithPagination;
