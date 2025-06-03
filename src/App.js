import React from "react";
import OnBoarding from "./pages/OnBoarding";
import { Route, Routes } from "react-router";
import Welcome from "./pages/Welcome";
import Blessing from "./pages/Blessing";
import Torah from "./pages/Torah";



function App() {
    return (
        <Routes>
            <Route path="/" element={<OnBoarding />} />
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/blessig" element={<Blessing />} />
            <Route path="/torah" element={<Torah />} />
        </Routes>
    );
}

export default App;
