import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Container from "@mui/material/Container";

import { Header } from "./components/Header";
import Home from "./pages/Home";
import TemporaryDrawer from "./components/Drawer";
import Shop from "./pages/Shop";
import FullCard from "./pages/FullCard";
import LoginForm from "./pages/Login";
import NotFoundBlock from "./pages/NotFoundBlock";
import "./App.scss";

export enum renderedDrawer {
  SEARCH = "search",
  CART = "cart",
}


const App: React.FC = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [activeDrawer, setActiveDrawer] = useState<renderedDrawer>(
    renderedDrawer.CART
  );

  return (
    <div className="App">
      <Container maxWidth="xl">
        <Header openCart={setCartOpen} onActiveChildren={setActiveDrawer} />
        <TemporaryDrawer
          closeCart={setCartOpen}
          cartStatus={cartOpen}
          chidren={activeDrawer}
        />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFoundBlock />} />
            <Route path="/shop" element={<Shop />}/>
            <Route path="/login" element={<LoginForm />}/>
            <Route path="/shop/:id" element={<FullCard />}/>
          </Routes>
      </Container>
    </div>
  );
};

export default App;
