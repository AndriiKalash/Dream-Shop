import { Suspense, lazy, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Container from "@mui/material/Container";

import { Header } from "./components/Header";
import Home from "./pages/Home";
import TemporaryDrawer from "./components/Drawer";
import "./App.scss";
import { Spinner } from "./components/Spinner";

const Shop = lazy(() => import(/*webpackChunkName: "Shop"*/ "./pages/Shop"));
const FullCard = lazy(
  () => import(/*webpackChunkName: "FullCard"*/ "./pages/FullCard")
);
const NotFoundBlock = lazy(
  () => import(/*webpackChunkName: "NotFoundBlock"*/ "./pages/NotFoundBlock")
);
const LoginForm = lazy(
  () => import(/*webpackChunkName: "LoginForm"*/ "./pages/Login")
);

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
        <Suspense fallback={<Spinner/>}>
          <Routes>
            <Route path="*" element={<NotFoundBlock />} />
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/login" element={<LoginForm />} />
            {/* <Route path="/register" element={<RegisterForm />} /> */}
            <Route path="/shop/:id" element={<FullCard />} />
          </Routes>
        </Suspense>
      </Container>
    </div>
  );
};

export default App;
