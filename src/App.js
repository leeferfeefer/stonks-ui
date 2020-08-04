import React, {useEffect, useState} from 'react';
import './App.css';
import StockList from "./components/StockList";
import StockSymbolsService from "./service/StockSymbols.service";
import WatchList from "./components/WatchList";
import Grid from '@material-ui/core/Grid';

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
    <Grid container direction={'row'}>
      <StockList stonks={stockSymbols}/>
      <WatchList/>
    </Grid>
  );
}

export default App;
