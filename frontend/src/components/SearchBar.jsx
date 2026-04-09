import { useState } from "react";
import "./SearchBar.css";

function SearchBar({ onSearch }) {
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ q, category, minPrice, maxPrice });
  };

  const handleClear = () => {
    setQ("");
    setCategory("");
    setMinPrice("");
    setMaxPrice("");
    onSearch({});
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      
      <div className="field">
        <label>Product Name</label>
        <input
          type="text"
          placeholder="e.g. chair, laptop..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </div>

      <div className="field">
        <label>Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All categories</option>
          <option value="Furniture">Furniture</option>
          <option value="Electronics">Electronics</option>
          <option value="Stationery">Stationery</option>
          <option value="Clothing">Clothing</option>
          <option value="Appliances">Appliances</option>
          <option value="Tools">Tools</option>
        </select>
      </div>

      <div className="field">
        <label>Price Range</label>

        <div className="price-row">
          <input type="number" placeholder="Min" value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          />

          <input type="number" placeholder="Max" value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>
      </div>
      <button type="submit" className="search-btn">
        Search
      </button>

      <button
        type="button"
        className="clear-btn"
        onClick={handleClear}
      >
        Clear
      </button>

    </form>
  );
}

export default SearchBar;