import React from "react";

import { Navbar } from "./components";
import Routes from "./routes";

const App = () => {
  return (
    <div>
      <Navbar View={Routes} />
    </div>
  );
};

export default App;
