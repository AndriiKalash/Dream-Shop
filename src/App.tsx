import { useState } from "react";
import Container from "@mui/material/Container";
import "./App.scss";
import { Header } from "./components/Header";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import { Route, Routes } from "react-router-dom";
import TemporaryDrawer from "./components/Drawer";

function App() {

  const [cartOpen, setCartOpen] = useState(false);

  return (
    <div className="App">
      <Container maxWidth="xl">
        <Header openCart={setCartOpen} />
        <TemporaryDrawer closeCart={setCartOpen} cartStatus={cartOpen}/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
