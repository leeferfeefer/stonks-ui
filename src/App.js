import React, {useEffect, useState} from 'react';
import './App.css';
import Grid from '@material-ui/core/Grid';
import StockList from "./components/StockList";
import StockSymbolsService from "./service/StockSymbols.service";
import WatchList from "./components/WatchList";
import NewsFeedList from "./components/NewsFeedList";
import { connect } from "react-redux";

function App(props) {
  const [stockSymbols, setStockSymbols] = useState([]);
  const {savedStonks} = props;

  // runs both after the first render and after every update.
  useEffect(() => {
    const getStockSymbols = async () => {
      const stockSymbols = await StockSymbolsService.getStockSymbols();
      setStockSymbols(stockSymbols);
    }
    getStockSymbols();
  }, []); // pass [] so that it doesnt re-render after getting stock symbols and setting state

  return (
    <Grid container direction='row'>
      <Grid container direction='column'>
        <StockList stonks={stockSymbols}/>
        <WatchList savedStonks={savedStonks}/>
      </Grid>
      <Grid container direction='column'>
        <NewsFeedList savedStonks={savedStonks}/>
      </Grid>
      <Grid container direction='column'>
        {/* TODO: Graph view here */}
      </Grid>
    </Grid>
  );
}

const mapStateToProps = state => {
  return {
      savedStonks: state.savedStonksReducer.savedStonks
  }
};

export default connect(mapStateToProps, null)(App);
