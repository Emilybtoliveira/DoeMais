
import React from "react";
import { BrowserRouter} from "react-router-dom";
import Routes from "./routes";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import GlobalStyle from "./globalStyle";
import {persistor} from "./store";
function App() {
  return (
    <PersistGate persistor={persistor}>
      <BrowserRouter>
          <Routes/>
        <GlobalStyle />
      </BrowserRouter>  
    </PersistGate>
            
  );
}

export default App;