import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Container from "@mui/material/Container";

import { Header } from "./components/Header";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import TemporaryDrawer from "./components/Drawer";
import LoginForm from "./pages/Login";
import "./App.scss";


function App() {

  const [cartOpen, setCartOpen] = useState(false);
  const [activeDrawer, setActiveDrawer] = useState("");

  return (
    <div className="App">
      <Container maxWidth="xl">
        <Header openCart={setCartOpen} onActiveChildren={setActiveDrawer} />
        <TemporaryDrawer
         closeCart={setCartOpen}
         cartStatus={cartOpen}
         chidren={activeDrawer}/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/login" element={<LoginForm />} />
          {/* <Route path="/register" element={<RegisterForm />} /> */}
        </Routes>
      </Container>
    </div>
  );
}

export default App;
