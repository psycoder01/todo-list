import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { auth } from "./config/firebase";

import Login from "./pages/login";
import SignUp from "./pages/signup";
import Home from "./pages/home";

function App() {
    const [loggedIn, setLoggedIn] = useState(false);

    const stateChange = () =>
        auth.onAuthStateChanged((user) => {
            if (user) {
                setLoggedIn(true);
            } else {
                setLoggedIn(false);
            }
        });

    useEffect(() => {
        stateChange();
    }, []);

    return loggedIn ? (
        <Home />
    ) : (
        <Router>
            <Route path="/" exact component={Login} />
            <Route path="/signup" component={SignUp} />
        </Router>
    );
}

export default App;
