import React, {useState} from "react";
import Field from "../components/foms/Field";
import {Link} from "react-router-dom";

const CustomerPage = (props) => {

    const [customer, setCustomer] = useState({
        lastName: "",
        firstName: "",
        email: "",
        company: "",
    });

    const [errors, setErrors] = useState({
        lastName: "Le prénom est obligatoire",
        firstName: "",
        email: "",
        company: "",
    });

    const handleChange = ({currentTarget}) => {
        const {value, name} = currentTarget;
        setCustomer({...customer, [name]: value})
    };

    const handleSubmit = (event) => {
        event.preventDefault();

    };

    return (
        <>
            <h1>Création d'un client</h1>
            <form onSubmit={handleSubmit}>
                <Field name="lastName" label="Nom de famille" placeholder="Nom du client" value={customer.lastName} onChange={handleChange} error={errors.lastName} />
                <Field name="firstName" label="Prénom" placeholder="Prénom du client" value={customer.firstName} onChange={handleChange} />
                <Field name="email" label="Email" placeholder="Email du client" type="email" value={customer.email} onChange={handleChange} />
                <Field name="company" label="Entreprise" placeholder="Entreprise du client" value={customer.company} onChange={handleChange} />
                <div className="form-group">
                    <button type="submit" className="btn btn-success">Enregistrer</button>
                    <Link to="/clients" className="btn btn-link">
                        Retourner à la liste des clients
                    </Link>
                </div>
            </form>
        </>

    );
};

export default CustomerPage;
