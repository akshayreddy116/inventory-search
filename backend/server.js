const express = require("express");
const cors = require("cors");
const data = require("./data/inventory.json");

const app = express();
app.use(cors());

const PORT = process.env.PORT || 5000;
app.get("/search", (req, res) => {
  let { q, category, minPrice, maxPrice } = req.query;
  let result = [...data];
  if (minPrice && maxPrice && Number(minPrice) > Number(maxPrice)) {
    result = [];
    return res.status(400).json({
      message: "Minimum price cannot be greater than maximum price"
    });
  }
  if (q) {
    result = result.filter(item =>
      item.productName.toLowerCase().includes(q.toLowerCase())
    );
  }

  if (category) {
    result = result.filter(item =>
      item.category.toLowerCase() === category.toLowerCase()
    );
  }

  if (minPrice) {
    result = result.filter(item => item.price >= Number(minPrice));
  }

  if (maxPrice) {
    result = result.filter(item => item.price <= Number(maxPrice));
  }

  res.json(result);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});