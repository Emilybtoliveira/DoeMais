
import React from "react";
import { BrowserRouter} from "react-router-dom";

import Routes from "./routes";

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