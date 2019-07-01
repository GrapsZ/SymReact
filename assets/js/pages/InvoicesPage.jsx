import React, { useEffect, useState } from "react";
import Pagination from "../components/pagination";
import InvoicesApi from "../services/InvoicesApi";
import moment from "moment";
import {Link} from "react-router-dom";

const STATUS_CLASSES = {
    PAID: "success",
    SENT: "primary",
    CANCELLED: "danger",
};

const STATUS_LABELS = {
    PAID: "Payée",
    SENT: "Envoyée",
    CANCELLED: "Annulée",
};

const InvoicesPage = (props) => {
    const [invoices, setInvoices] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState('');
    const itemsPerPage = 20;

    // Permet d'aller récupérer les customers
    const fetchInvoices = async () => {
        try {
            const data = await InvoicesApi.findAll();
            setInvoices(data);
        } catch (error) {
            console.log(error.response);
        }
    };

    // Au chargement du composant, on va chercher les customers
    useEffect(() => {
        fetchInvoices()
    }, []);

    const handleDelete = (id) => {
        // Copie originale du tableau
        const originalInvoices = [...invoices];

        setInvoices(invoices.filter(invoice => invoice.id !== id));

        InvoicesApi.delete(id)
            .then(response => console.log("ok"))
            .catch(error => {
                setInvoices(originalInvoices);
                console.log(error.response)
            })
    };

    // Gestion du changement de page
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // Gestion de la recherche
    const handleSearch = ({currentTarget}) => {
        setSearch(currentTarget.value);
        setCurrentPage(1);
    };

    const formatDate = (str) => moment(str).format('DD/MM/YYYY');

    // Filtrage des customers en fonction des valeurs entrées dans la barre de recherche
    const filteredInvoices = invoices.filter(
        i =>
            i.customer.firstName.toLowerCase().includes(search.toLowerCase()) ||
            i.customer.lastName.toLowerCase().includes(search.toLowerCase()) ||
            i.amount.toString().startsWith(search.toLowerCase()) ||
            STATUS_LABELS[i.status].toLowerCase().includes(search.toLowerCase()) ||
            i.status.toLowerCase().includes(search.toLowerCase())
    );

    // Pagination des données
    const paginatedInvoices = Pagination.getData(
        filteredInvoices,
        currentPage,
        itemsPerPage
    );

    return (
        <>
            <div className="mb-3 d-flex justify-content-between align-items-center">
                <h1>Liste des factures</h1>
                <Link to="/factures/new" className="btn btn-primary">
                    Créer une facture
                </Link>
            </div>


            <div className="form-group">
                <input type="text" onChange={handleSearch} value={search} className="form-control" placeholder="Rechercher..."/>
            </div>

            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Numéro</th>
                        <th>Client</th>
                        <th className="text-center">Date</th>
                        <th className="text-center">Statut</th>
                        <th className="text-center">Montant</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                {paginatedInvoices.map(invoice =>
                    <tr key={invoice.id}>
                        <td>{invoice.chrono}</td>
                        <td>
                            <a href="#">
                                {invoice.customer.firstName} {invoice.customer.lastName}
                            </a>
                        </td>
                        <td className="text-center">{formatDate(invoice.sentAt)}</td>
                        <td className="text-center">
                        <span className={"badge badge-" + STATUS_CLASSES[invoice.status]}>
                            {STATUS_LABELS[invoice.status]}
                        </span>
                        </td>
                        <td className="text-center">{invoice.amount.toLocaleString()} €</td>
                        <td>
                            <button className="btn btn-sm btn-primary mr-1">
                                Editer
                            </button>
                            <button onClick={() => handleDelete(invoice.id)} className="btn btn-sm btn-danger">
                                Supprimer
                            </button>
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
            {itemsPerPage < filteredInvoices.length &&
            (<Pagination
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                length={filteredInvoices.length}
                onPageChanged={handlePageChange}
            />)}
        </>
    );
};

export default InvoicesPage;
