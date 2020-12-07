import React from "react";
import { BrowserRouter } from "react-router-dom";

import AppDrawer from "../AppDrawer/";
import { computeRoutesData } from "../AppDrawer/utils/";

function App() {
  return (
    <BrowserRouter>
      <AppDrawer routes={computeRoutesData()} />
    </BrowserRouter>
  );
}

export default App;
