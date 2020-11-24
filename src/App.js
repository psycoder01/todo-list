import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Login from "./pages/login";
import SignUp from "./pages/signup";
import Home from "./pages/home";

function App() {
    const user = null;
    return user ? (
        <Home />
    ) : (
        <Router>
            <Route path="/" exact component={Login} />
            <Route path="/signup" component={SignUp} />
        </Router>
    );
}

export default App;
