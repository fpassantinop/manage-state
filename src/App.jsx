import React, {useState, useEffect} from "react";
import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import Products from "./Products";
import { Routes, Route} from "react-router-dom";
import Detail from "./Detail";
import Cart from "./Cart";


export default function App() {
  const [cart, setCart] = useState(() => { 
    try {
      return JSON.parse(localStorage.getItem("cart")) ?? []; //si es nulo devuelve array vacio 
    } catch {
      console.error("The cart could not be parset into JSON.");
      return [];
    }
  }

  );

  useEffect( () => 
      localStorage.setItem("cart", JSON.stringify(cart))
  ,[cart]);

  function addToCart(id, sku) {
    setCart((items) => {
      const itemInCart = items.find((i) => i.sku === sku);
      if (itemInCart) {
        //retorna un nuevo array con matching item replaced
        //se itera cada eleemnto del array y si se encuentra el item se retorma una copia con la cantidad +1 y sino se encuentra se deja igualß
        return items.map( (i) => 
            i.sku === sku ? {...i, quantity: i.quantity +1 } : i 
          ); 
        }else{
          //retorna un nuevo array con el new array appende
          return [...items, {id, sku, quantity : 1}];
        }
     
    })
  }

  function updateQuantity(sku, quantity){
    setCart( (items) => {
      return quantity === 0
        ? items.filter( (i) => i.sku !== sku)
        : items.map( (i) => i.sku === sku ? {...i, quantity: quantity } : i);
    })
  }

  return (
    <>
      <div className="content">
        <Header />
          <main>
            <Routes>
              <Route path="/" element={<h1>Welcome to my store</h1>}></Route>
                <Route path="/:category" element={<Products />}></Route>
                <Route path="/:category/:id" element={<Detail addToCart={addToCart} />}></Route>
                <Route path="/cart" element={<Cart cart={cart} updateQuantity={updateQuantity} />}></Route>
            </Routes>
             
          </main>
      </div>
      <Footer />
    </>
  );
}
