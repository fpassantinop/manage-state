import React, {useState, useEffect} from "react";
import useFetch from "./services/useFetch";
import Spinner from './Spinner';
import { useParams } from 'react-router-dom';



export default function Products() {
  const [size, setSize] = useState("");
  const { category } = useParams();

  const {data: products, loading, error} = useFetch("products?category=" + category);

  function renderProduct(p) {
    return (
      <div key={p.id} className="product">
        <a href="/">
          <img src={`/images/${p.image}`} alt={p.name} />
          <h3>{p.name}</h3>
          <p>${p.price}</p>
        </a>
      </div>
    );
  }

  const filteredProducts = size 
    ? products.filter((p) => p.skus.find((s) => s.size === parseInt(size))) 
    : products; 

    if (error) throw error;
    if (loading) return <Spinner/>
    

  return (
    <>
  
          <section id="filters">
            <label htmlFor="size">Filter by Size:</label>{" "}
            <select 
              id="size"
              value={size}
              onChange={(e) => {
                setSize(e.target.value)
              }} >
              <option value="">All sizes</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
            </select>
          </section>
          { size && <h2> found {filteredProducts.length} items </h2>}
          <section id="products"> {filteredProducts?.map(renderProduct)}
          </section>

    </>
  );
}