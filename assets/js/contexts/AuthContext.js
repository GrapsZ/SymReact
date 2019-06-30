import React from "react";

// On donne la FORME de nos valeurs et non pas les valeurs elles mêmes.
export default React.createContext({
    isAuthenticated: false,
    setIsAuthenticated: (value) => {}
});
