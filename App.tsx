import React from "react";
import { MainScreen } from "./src/screen/MainScreen";
import { rootStore, StoreProvider } from "./src/store";

const App = () => {
  
  return (
    <StoreProvider value={rootStore}>
      <MainScreen />
    </StoreProvider>
  );
};


export default App;
