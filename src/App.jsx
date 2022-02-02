import React, {useReducer, useEffect} from "react";
import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import Products from "./Products";
import { Routes, Route} from "react-router-dom";
//import Detail from "./Detail";
import Detail from "./Detail";
import Cart from "./Cart";
import Checkout from "./Checkout";
import cartReducer from "./cartReducer";

let initialCart;
try {
  initialCart = JSON.parse(localStorage.getItem("cart")) ?? []; //si es nulo devuelve array vacio 
} catch {
  console.error("The cart could not be parset into JSON.");
  initialCart = [];
}

export default function App() {
  const [cart, dispatch] = useReducer( cartReducer, initialCart);

  useEffect( () => 
      localStorage.setItem("cart", JSON.stringify(cart))
  ,[cart]);

  


  return (
    <>
      <div className="content">
        <Header />
          <main>
            <Routes>
              <Route path="/" element={<h1>Welcome to my store</h1>}></Route>
                <Route path="/:category" element={<Products />}></Route>
                <Route path="/:category/:id" element={<Detail dispatch={dispatch} />}></Route>
                <Route path="/cart" element={<Cart cart={cart} dispatch={dispatch} />}></Route>
                <Route path="/checkout" element={<Checkout cart={cart} dispatch={dispatch} />}></Route> 
            </Routes>
             
          </main>
      </div>
      <Footer />
    </>
  );
}
