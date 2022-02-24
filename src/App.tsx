import React, { ReactElement } from "react";
import { Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import FormBuilder from "./pages/FormBuilder/FormBuilder";

const App = (): ReactElement => (
  <Routes>
    <Route path="/*" element={<LandingPage />} />
    <Route path="form/*" element={<FormBuilder />} />
  </Routes>
);
export default App;
