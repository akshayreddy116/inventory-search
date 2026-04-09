import { useState, useEffect } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import ProductRow from "./components/ProductRow";

function App() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  
  
 

  useEffect(() => {
    fetch("https://inventory-search-tn8h.onrender.com/search")
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(() => setError("Server error"));
  }, []);

  const handleSearch = async (filters) => {
    setError("");
    const params = new URLSearchParams(filters);
    try {
      const res = await fetch(`https://inventory-search-tn8h.onrender.com/search?${params}`);
      if (!res.ok) {
        const err = await res.json();
        setError(err.message);
        setProducts([]);
        return;
      }
      const data = await res.json();
      setProducts(data);
    } catch {
      setError("Server error");
    }
  };
  

  return (
    <div className="app-wrapper">
      <div className="container">

        <h1 className="logo">Zeero<span>stock</span></h1>
        <p className="subtitle">Find surplus inventory easily</p>

        <SearchBar onSearch={handleSearch} />

        

        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Category</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan="3" className="no-results">
                  No results found
                </td>
              </tr>
            ) : (
              products.map((p) => (
                <ProductRow key={p.id} product={p} />
              ))
            )}
          </tbody>
        </table>

      </div>
    </div>
  );
}

export default App;