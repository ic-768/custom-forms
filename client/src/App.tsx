import React, { ReactElement, useState } from "react";
import { Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import FormBuilder from "./pages/FormBuilder/FormBuilder";

const App = (): ReactElement => {
  const [user, setUser] = useState(window.localStorage.getItem("loggedUser"));

  return (
    <Routes>
      <Route path="*" element={<LandingPage setUser={setUser} />} />
      {/* Route for individual form editing*/}
      {user && <Route path="form/*" element={<FormBuilder />} />}
      {/* Route for general forms overview*/}
      {user && <Route path="forms/*" element={<FormBuilder />} />}
    </Routes>
  );
};
export default App;
