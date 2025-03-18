import { useReducer } from "react";

// CREAZIONE REDUCER
/*
Creo il mio reducer, che contiene i vari TYPE (tipi) di azioni centralizzate.
Gli arguments che deve avere sono il vecchio useState iniziale (chiamato STATE ma qui lo vediamo come "addedProducts"), e una ACTION,
tramite cui viene modificato lo STATE.
*/
function cartReducer(addedProducts, action) {

  // Lo SWITCH definisce i casi e i tipi di azione da effettuare.
  switch (action.type) {
    // Ciascun CASE ha un "nome" dell'azione, che sarà utilizzato per indicare quale azione compiere ad esempio nell' ON-CLICK di un bottone.
    case 'ADD_ITEM':
      // La logica dell'operazione da svolgere viene definita sotto il nome dell'ACTION.
      const addedProduct = addedProducts.find(p => p.name === action.payload.name);
      if (addedProduct) {
        action.payload.quantity = addedProduct.quantity + 1;
      } else {
        // Questo RETURN funge da BREAK e interrompe l'esecuzione della logica.
        return [...addedProducts, {
          ...action.payload,
          quantity: 1,
        }];
      };
    // In questo caso non c'è alcun BREAK, perchè se esiste già il prodotto che voglio aggiungere, procedo con l'UPDATE della sua quantità, a catena.
    case 'UPDATE_QUANTITY':
      if (action.payload.quantity < 1 || isNaN(action.payload.quantity)) {
        return addedProducts;
      };
      return addedProducts.map(p => p.name === action.payload.name ?
        { ...p, quantity: action.payload.quantity } : p)
    case 'REMOVE_ITEM':
      return addedProducts.filter(p => p.name !== action.payload)
      // Il BREAK interrompe la logica da eseguire. Se non lo si specifica, verrà eseguita anche l'operazione che segue a catena.
      // In questo caso la logica è già interrotta perchè c'è un RETURN, ma se non ci fosse, potrei o meno mettere il BREAK se mi servisse ad esempio continuare con altra logica.
      break;

    // Il DEFAULT specifica cosa ritornare nel qual caso non venga applicata alcuna logica.
    default:
      return state;
  }
};

function App() {

  const products = [
    { name: 'Mela', price: 0.5 },
    { name: 'Pane', price: 1.2 },
    { name: 'Latte', price: 1.0 },
    { name: 'Pasta', price: 0.7 },
  ];

  const [addedProducts, dispatchCart] = useReducer(cartReducer, []);

  const totalToPay = addedProducts.reduce((acc, p) => acc + (p.price * p.quantity), 0);

  return (
    <>
      {/* PRODOTTI DISPONIBILI */}

      <h1 className="debug">Prodotti tra cui scegliere</h1>
      <ul>
        {products.map((p, i) => (
          <li key={i} className="debug">
            <div>
              {p.name} - {p.price} €
            </div>
            <button onClick={() => dispatchCart({ type: 'ADD_ITEM', payload: p })}>Aggiungi al carrello</button>
          </li>
        ))}
      </ul>


      {/* LISTA DELLA SPESA */}

      {addedProducts.length > 0 && (<>
        <h2 className="debug">Carrello</h2>
        <ul>
          {addedProducts.map((p, i) => (
            <li key={i} className="debug">
              <p>
                <input type="number" value={p.quantity} onChange={
                  e => dispatchCart({
                    type: 'UPDATE_QUANTITY',
                    payload: { name: p.name, quantity: parseInt(e.target.value) }
                  })
                } />
                <span> x {p.name} - {p.price} €</span>{p.quantity}
              </p>

              {/*
              In questi bottoni uso il REDUCER, e infatti specifico che al click deve essere eseguita un'operazione di uno specifico DISPATCHER.
              Bisogna specificare quale delle azioni create dev'essere eseguita, e il PAYLOAD, cioè l'elemento che viene utilizzato nella logica che abbiamo definito.
              La funzione va riportata come segue, definendo tutti i parametri con la seguente sintassi.
              */}
              <button onClick={() => dispatchCart({ type: 'REMOVE_ITEM', payload: p.name })}>Rimuovi dal carrello</button>
            </li>
          )

          )}
        </ul>


        {/* TOTALE € */}

        <h3>Totale da pagare: {totalToPay} €</h3>
      </>)}
    </>
  )
};

export default App
