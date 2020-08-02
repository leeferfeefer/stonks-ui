import React, {useEffect, useState} from 'react';
import './App.css';
import StockList from "./components/StockList";
import StockSymbolsService from "./service/StockSymbols.service";

function App() {
  const [stockSymbols, setStockSymbols] = useState([]);

  // runs both after the first render and after every update.
  useEffect(() => {
    const getStockSymbols = async () => {
      const stockSymbols = await StockSymbolsService.getStockSymbols();
      setStockSymbols(stockSymbols);
    }
    getStockSymbols();
  }, []); // pass [] so that it doesnt re-render after getting stock symbols and setting state

  return (
    <StockList symbols={stockSymbols}/>
  );
}

export default App;
