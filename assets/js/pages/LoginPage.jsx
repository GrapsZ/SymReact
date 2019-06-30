import React, {useContext, useState} from "react";
import AuthAPI from "../services/authAPI";
import AuthContext from "../contexts/AuthContext";

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
            <div className="form-group">
                <label htmlFor="username">
                    Adresse email
                </label>
                <input
                    value={credentials.username}
                    onChange={handleChange}
                    type="email"
                    placeholder="Adresse email de connexion"
                    name="username"
                    id="username"
                    className={"form-control w-50" + (error && " is-invalid")}
                />
                {error && <p className="invalid-feedback">
                    {error}
                </p>}
            </div>
            <div className="form-group">
                <label htmlFor="password">
                    Mot de passe
                </label>
                <input
                    value={credentials.password}
                    onChange={handleChange}
                    type="password"
                    placeholder="Mot de passe"
                    name="password"
                    id="password"
                    className="form-control w-50"
                />
            </div>
            <div className="form-group">
                <button type="submit" className="btn btn-success">Connexion</button>
            </div>
        </form>
    </>);
};

export default LoginPage;
