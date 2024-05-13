import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { GlobalStyle } from "./styles/GlobalStyle.jsx";
import { GlobalProvider } from "./contex/GlobalContex.jsx";
import { TripsProvider } from "./contex/TripsContext.jsx"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GlobalProvider>
      <TripsProvider>
        <GlobalStyle />
        <App />
      </TripsProvider>
    </GlobalProvider>
  </React.StrictMode>
);
