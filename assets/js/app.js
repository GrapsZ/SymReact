import React, {useState} from "react";
import ReactDom from "react-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import {HashRouter, Switch, Route, withRouter} from "react-router-dom";
import CustomersPage from "./pages/CustomersPage";
import InvoicesPage from "./pages/InvoicesPage";
import LoginPage from "./pages/LoginPage";
import AuthApi from "./services/authAPI";
import AuthContext from "./contexts/AuthContext";
import PrivateRoute from "./components/PrivateRoute";

// any CSS you require will output into a single css file (app.css in this case)
require('../css/app.css');

AuthApi.setUp();

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(AuthApi.isAuthenticated());

    // On passe ainsi le props avec history dedans.
    const NavBarWithRouter = withRouter(Navbar);

    return (
        <AuthContext.Provider value={{
            isAuthenticated: isAuthenticated,
            setIsAuthenticated: setIsAuthenticated
        }}>
            <HashRouter>
                <NavBarWithRouter />
                <main className="container pt-5">
                    <Switch>
                        <PrivateRoute path="/clients" component={CustomersPage} />
                        <PrivateRoute path="/factures" component={InvoicesPage} />
                        <Route path="/connexion" component={LoginPage} />
                        <Route path="/" component={HomePage} />
                    </Switch>
                </main>
            </HashRouter>
        </AuthContext.Provider>
    )
};

// On sélectionne la div qui affichera le rendu
const rootElement = document.querySelector("#app");
// on demande au dom react d'envoyer le rendu dans la div app
ReactDom.render(<App/>, rootElement);
