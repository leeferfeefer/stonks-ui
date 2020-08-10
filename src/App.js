import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import StockList from "./components/StockList";
import StockSymbolsService from "./service/StockSymbols.service";
import WatchList from "./components/WatchList";
import NewsFeedList from "./components/NewsFeedList";
import { connect } from "react-redux";
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  }, 
  paper: {
    maxHeight: window.innerHeight,
    overflow: 'auto'
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
    <Grid className={classes.root} container spacing={1}>
      <Grid item xs={12}>
        <Grid container spacing={1}>
          <Grid item>
            <Paper className={classes.paper}>
              <StockList stonks={stockSymbols}/>
            </Paper>
          </Grid>    
          {/* <Grid item>
            <Card>
              <WatchList savedStonks={savedStonks}/>                    
            </Card>
          </Grid> */}
        </Grid>      
        {/* <Grid item xs={4}> */}
          {/* <Card style={{maxHeight: '50%', overflow: 'auto'}}> */}
            {/* <NewsFeedList savedStonks={savedStonks}/>         */}
          {/* </Card> */}
        {/* </Grid>         */}
      {/* </Grid> */}
      {/* <Grid container item direction='column'>
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
