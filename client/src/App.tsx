import React, { ReactElement, useEffect, useState } from "react";
import { setToken } from "./services/forms";

import LandingPage from "./pages/LandingPage";
import FormBuilder from "./pages/FormBuilder/FormBuilder";

const App = (): ReactElement => {
  const [user, setUser] = useState("");

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const userData = JSON.parse(loggedUserJSON);
      setUser(userData.username);
      setToken(userData.token);
    }
  }, []);

  return user ? (
    <FormBuilder user={user} setUser={setUser} />
  ) : (
    <LandingPage setUser={setUser} />
  );
};
export default App;
