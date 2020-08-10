import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import StockList from "./components/StockList";
import WatchList from "./components/WatchList";
import NewsFeedList from "./components/NewsFeedList";
import { connect } from "react-redux";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxHeight: window.innerHeight
  }
}));

function App(props) {
  const classes = useStyles();
  const {savedStonks} = props;

  return (    
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Grid container spacing={1}>
            <Grid item>
              <StockList/>
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
    </div>
  );
}

const mapStateToProps = state => {
  return {
      savedStonks: state.savedStonksReducer.savedStonks
  }
};

export default connect(mapStateToProps, null)(App);
