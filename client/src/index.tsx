import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import { store } from "./store/store";
import App from "./App";

import "./index.scss";

const el = document.getElementById("root");

if (el) {
  const root = createRoot(el);
  root.render(
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  );
}
