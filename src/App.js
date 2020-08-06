import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import StockList from "./components/StockList";
import StockSymbolsService from "./service/StockSymbols.service";
import WatchList from "./components/WatchList";
import NewsFeedList from "./components/NewsFeedList";
import { connect } from "react-redux";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  }
}));

function App(props) {
  const classes = useStyles();
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
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid container item xs={12} spacing={3}>
          <Grid item xs={4}>
            <StockList stonks={stockSymbols}/>
            <WatchList savedStonks={savedStonks}/>
          </Grid>      
          <Grid item xs={4}>
            <NewsFeedList savedStonks={savedStonks}/>        
          </Grid>        
        </Grid>
        {/* <Grid container item direction='column'>
        </Grid>
        <Grid container direction='column'>
          {/* TODO: Graph view here */}
        {/* </Grid> */}
      </Grid>
    </div>    
  );
}

const mapStateToProps = state => {
  return {
      savedStonks: state.savedStonksReducer.savedStonks
  }
};

export default connect(mapStateToProps, null)(App);
