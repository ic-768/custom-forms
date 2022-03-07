import { StrictMode } from "react";
import ReactDom from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import { store } from "./store/store";
import App from "./App";

import "./index.scss";

ReactDom.render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>,
  document.getElementById("root")
);
