import React from "react";
import OnBoarding from "./pages/OnBoarding";
import { Route, Routes } from "react-router";
import Welcome from "./pages/Welcome";
import Blessing from "./pages/Blessing";



function App() {
    return (
        <Routes>
            <Route path="/" element={<OnBoarding />} />
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/blessig" element={<Blessing />} />
        </Routes>
    );
}

export default App;
