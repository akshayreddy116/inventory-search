
function ProductRow({ product }) {
  return (
    <tr>
      <td>{product.productName}</td>
      <td>{product.category}</td>
      <td>₹{product.price}</td>
    </tr>
  );
}

export default ProductRow;