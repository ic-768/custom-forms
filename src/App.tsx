import React, { ReactElement } from "react";
import { Outlet, Link } from "react-router-dom";

const App = (): ReactElement => (
  <div style={{ display: "flex", flexDirection: "column" }}>
    This is a form view!
    <Link to="/">Form view!</Link>
    <Link to="/add">Add an input!</Link>
    <Outlet />
  </div>
);
export default App;
