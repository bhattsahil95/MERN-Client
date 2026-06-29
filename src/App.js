import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import routes from "./routesConfig.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Footer from "../src/components/Keeper/Footer";

function App() {
    return (
        <Router>
            <div className="app-shell">
                <ToastContainer
                    autoClose={2200}
                    newestOnTop
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
                    position="top-right"
                />
                <Navigation />
                <main className="app-main">
                    <Routes>
                        {routes.map((route) => (
                            <Route
                                key={route.path}
                                path={route.path}
                                element={<route.component />}
                            />
                        ))}
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
