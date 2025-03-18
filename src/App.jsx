import { useState } from "react";

function App() {

  const products = [
    { name: 'Mela', price: 0.5 },
    { name: 'Pane', price: 1.2 },
    { name: 'Latte', price: 1.0 },
    { name: 'Pasta', price: 0.7 },
  ];

  const [addedProducts, setAddedProducts] = useState([]);
  console.log(addedProducts);

  const addToCart = product => {
    const isProductAlreadyAdded = addedProducts.some(p => p.name === product.name);

    if (isProductAlreadyAdded) {
      return;
    }
    setAddedProducts(curr => [...curr, {
      ...product,
      quantity: 1,
    }]);
  }



  console.log(addedProducts)

  return (
    <>
      <h1 className="debug">Prodotti tra cui scegliere</h1>
      <ul>
        {products.map((p, i) => (
          <li key={i} className="debug">
            <div>
              {p.name} - {p.price} €
            </div>
            <button onClick={() => addToCart(p)}>Aggiungi al carrello</button>
          </li>
        ))}
      </ul>
    </>
  )
};

export default App
