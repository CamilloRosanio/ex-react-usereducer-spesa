import { useState } from "react";

function App() {

  const products = [
    { name: 'Mela', price: 0.5 },
    { name: 'Pane', price: 1.2 },
    { name: 'Latte', price: 1.0 },
    { name: 'Pasta', price: 0.7 },
  ];

  const [addedProducts, setAddedProducts] = useState([]);

  const updateProductQuantity = (name, quantity) => {
    setAddedProducts(curr =>
      curr.map(p => p.name === name ? { ...p, quantity } : p)
    );
  }

  const addToCart = product => {
    const alreadyAddedProduct = addedProducts.find(p => p.name === product.name);
    // Nella videolezione è chiamato "addedProduct"

    if (alreadyAddedProduct) {
      updateProductQuantity(alreadyAddedProduct.name, alreadyAddedProduct.quantity + 1)
      return;
    }
    setAddedProducts(curr => [...curr, {
      ...product,
      quantity: 1,
    }]);
  };

  const removeFromCart = product => {
    setAddedProducts(curr => curr.filter(p => p.name !== product.name));
  }

  console.log(addedProducts)

  const totalToPay = addedProducts.reduce((acc, p) => acc + (p.price * p.quantity), 0);

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
      {addedProducts.length > 0 && (<>
        <h2 className="debug">Carrello</h2>
        <ul>
          {addedProducts.map((p, i) => (
            <li key={i} className="debug">
              <p>{p.quantity} x {p.name} - {p.price} €</p>
              <button onClick={() => removeFromCart(p)}>Rimuovi dal carrello</button>
            </li>
          )

          )}
        </ul>

        <h3>Totale da pagare: {totalToPay} €</h3>
      </>)}
    </>
  )
};

export default App
