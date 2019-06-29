import React from "react";
import ReactDom from "react-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import { HashRouter, Switch, Route } from "react-router-dom";
import CustomersPage from "./pages/CustomersPage";
import InvoicesPage from "./pages/InvoicesPage";
import CustomersPageWithPagination from "./pages/CustomersPageWithPagination";

// any CSS you require will output into a single css file (app.css in this case)
require('../css/app.css');

console.log('Bonjour Webpack Encore! Edit me in assets/js/app.js');

// localhost:8000/#/clients
// localhost:8000/#/factures

const App = () => {
    return (
    <HashRouter>
        <Navbar />
        <main className="container pt-5">
            <Switch>
                <Route path="/invoices" component={InvoicesPage} />
                <Route path="/customers" component={CustomersPage} />
                <Route path="/" component={HomePage} />
            </Switch>
        </main>
    </HashRouter>)
};

// On sélectionne la div qui affichera le rendu
const rootElement = document.querySelector("#app");
// on demande au dom react d'envoyer le rendu dans la div app
ReactDom.render(<App/>, rootElement);
