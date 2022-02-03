import React from "react";
import ReactDom from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App";
import AddInput from "./AddInput";
import "./index.scss";

ReactDom.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="add" element={<AddInput />} />
      </Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);
