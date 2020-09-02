import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import StockList from "./components/StockList";
import WatchList from "./components/WatchList";
import NewsFeedList from "./components/NewsFeedList";
import Drawer from "./components/Drawer";
import { connect } from "react-redux";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxHeight: window.innerHeight
  },
  stonks: {
    position: "sticky"
  }
}));

function App(props) {
  const classes = useStyles();
  const {currentScreenIndex} = props;

  return (
    <div className={classes.root}>      
      <Drawer>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Grid container spacing={1}>
              {currentScreenIndex === 0 &&
                <>
                  <Grid item>
                    <StockList />
                  </Grid>
                  <Grid item>
                    <WatchList />
                  </Grid>
                </>
              }    
              {currentScreenIndex === 1 &&
                <Grid item>
                  <NewsFeedList />
                </Grid>
              }        
              {currentScreenIndex === 2 &&
                <Grid item>

                </Grid>
              }                
            </Grid>
          </Grid>
        </Grid>
      </Drawer>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    currentScreenIndex: state.currentScreenReducer.currentScreenIndex
  }
};

export default connect(mapStateToProps, null)(App);
