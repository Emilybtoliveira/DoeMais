
import React from "react";
import { BrowserRouter} from "react-router-dom";
// import { PersistGate } from "redux-persist/integration/react";
// import { Provider } from "react-redux";

import Routes from "./routes";
// import history from "./services/history";

// import { store, persistor } from "./store";

import GlobalStyle from "./globalStyle";


function App() {
  return (
      <BrowserRouter>
      <Routes/>
      <GlobalStyle />
    </BrowserRouter>  
  );
}

export default App;