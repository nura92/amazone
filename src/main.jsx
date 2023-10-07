import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";


import { StateProvider } from "./components/StateProvider/StateProvider.jsx";
import reducer, { initialstate } from "./components/reducer.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  
    <StateProvider initialState={initialstate} reducer={reducer}>
      <App />
    </StateProvider>
  
);
