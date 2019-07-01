import React, {useContext, useState} from "react";
import AuthAPI from "../services/authAPI";
import AuthContext from "../contexts/AuthContext";
import Field from "../components/foms/Field";

const LoginPage = ({history}) => {
    const {setIsAuthenticated} = useContext(AuthContext);

    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    });

    const [error, setError] = useState("");

    // gestion des champs avec destructuration
    const handleChange = ({currentTarget}) => {
        const {value, name} = currentTarget;
        setCredentials({...credentials, [name]: value})
    };

    // gestion de la soumission du formulaire
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await AuthAPI.authenticate(credentials);
            setError("");
            setIsAuthenticated(true);
            history.replace("/clients");
        } catch (error) {
            setError("Aucun compte trouvé ou identifiants invalides");
        }

        console.log(credentials);
    };

    return (
        <>
            <h1>Connexion à l'application</h1>
            <form onSubmit={handleSubmit}>

                <Field
                    label="Adresse email"
                    name="username"
                    value={credentials.username}
                    onChange={handleChange}
                    type="email"
                    id="username"
                    placeholder="Adresse email de connexion"
                    error={error}
                    className={"form-control w-50" + (error && " is-invalid")}
                />
                {error && <p className="invalid-feedback">
                    {error}
                </p>}

                <Field
                    label="Mot de passe"
                    name="password"
                    value={credentials.password}
                    onChange={handleChange}
                    type="password"
                    id="password"
                    placeholder="Adresse email de connexion"
                    error={error}
                    className="form-control w-50"
                />

                <div className="form-group">
                    <button type="submit" className="btn btn-success">Connexion</button>
                </div>
            </form>
        </>
    );
};

export default LoginPage;
