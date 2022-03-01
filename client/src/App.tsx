import React, { ReactElement, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { setToken } from "./services/forms";

import LandingPage from "./pages/LandingPage";
import FormBuilder from "./pages/FormBuilder/FormBuilder";

const App = (): ReactElement => {
  const [user, setUser] = useState();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const userData = JSON.parse(loggedUserJSON);
      setUser(userData.username);
      setToken(userData.token);
    }
  }, []);

  return (
    <Routes>
      <Route
        path="*"
        element={
          !user ? (
            <LandingPage setUser={setUser} />
          ) : (
            <FormBuilder user={user} setUser={setUser} />
          )
        }
      />
    </Routes>
  );
};
export default App;
