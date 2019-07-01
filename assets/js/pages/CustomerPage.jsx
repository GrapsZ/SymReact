import React, {useEffect, useState} from "react";
import Field from "../components/foms/Field";
import {Link} from "react-router-dom";
import CustomersApi from "../services/CustomersApi";

const CustomerPage = ({match, history}) => {

    const { id = "new" } = match.params;

    const [customer, setCustomer] = useState({
        lastName: "",
        firstName: "",
        email: "",
        company: "",
    });

    const [errors, setErrors] = useState({
        lastName: "",
        firstName: "",
        email: "",
        company: "",
    });

    const [editing, setEditing ] = useState(false);

    // Récupération du client en fonction de son id
    const fetchCustomer = async id => {
        try {
            const data = await CustomersApi.find(id);
            const { firstName, lastName, email, company } = data;

            setCustomer({firstName, lastName, email, company})
        } catch (error) {
            console.log(error.response);
            history.replace("/clients");
        }

    };

    useEffect(() => {
        if (id !== "new" && !isNaN(parseInt(id))) {
            setEditing(true);
            fetchCustomer(id);
        }
    }, [id]);

    const handleChange = ({currentTarget}) => {
        const {value, name} = currentTarget;
        setCustomer({...customer, [name]: value})
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            if(editing) {
                await CustomersApi.edit(id, customer);

                // Todo notification de succès
            } else {
                await CustomersApi.register(customer);

                // todo notification de succès
                history.replace("/clients");
            }

            setErrors({});
        } catch ({response}) {
            const { violations } = response.data;

            if(violations) {
                const apiErrors = {};
                violations.forEach(({propertyPath, message}) => {
                    apiErrors[propertyPath] = message;
                });
                setErrors(apiErrors);

                //todo notification d'erreur
            }
        }
        
    };

    return (
        <>
            {!editing && <h1>Création d'un client</h1> || <h1>Modification du client</h1>}
            <form onSubmit={handleSubmit}>
                <Field
                    name="lastName"
                    label="Nom de famille"
                    placeholder="Nom du client"
                    value={customer.lastName}
                    onChange={handleChange}
                    error={errors.lastName}
                />
                <Field
                    name="firstName"
                    label="Prénom"
                    placeholder="Prénom du client"
                    value={customer.firstName}
                    onChange={handleChange}
                    error={errors.firstName}
                />
                <Field
                    name="email"
                    label="Email"
                    placeholder="Email du client"
                    type="email"
                    value={customer.email}
                    onChange={handleChange}
                    error={errors.email}
                />
                <Field
                    name="company"
                    label="Entreprise"
                    placeholder="Entreprise du client"
                    value={customer.company}
                    onChange={handleChange}
                    error={errors.company}
                />
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
