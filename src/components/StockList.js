import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import StockListItem from './StockListItem';
import { saveStonk, deleteStonk } from '../redux/actions/savedStonksActions';
import { connect } from "react-redux";
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import StockSymbolsService from "../service/StockSymbols.service";
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
    listLabel: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        height: window.innerHeight,
    },
    paper: {
        display: 'flex',
        justifyContent: 'center',
        height: window.innerHeight,
        width: 360
    },
    list: {    
        maxHeight: window.innerHeight,
        overflow: 'scroll',
    },
    spinner: {
        position: 'absolute',
        marginTop: '50%'
    }
}));
  

function StockList(props) {
    const classes = useStyles();
    const {stonks, saveStonk, deleteStonk} = props;
    const [stockSymbols, setStockSymbols] = useState([]);
    const [loading, setLoading] = useState(true);

    // runs both after the first render and after every update.
    useEffect(() => {
        const getStockSymbols = async () => {            
            const stockSymbols = await StockSymbolsService.getStockSymbols(0);
            setLoading(false);
            setStockSymbols(stockSymbols);
        }
        getStockSymbols();
    }, []); // pass [] so that it doesnt re-render after getting stock symbols and setting state


    const reconcileReduxStonks = (retrievedStonks) => {
        if (!!retrievedStonks && retrievedStonks.length > 0) {

            
            // save to redux here
        };
    };

    const renderRow = () => {
        return stockSymbols.map((stonk, index) => 
            <React.Fragment key={`${index}-divider`}>
                <StockListItem 
                    key={index} 
                    stonk={stonk} 
                    saveStonk={saveStonk}
                    deleteStonk={deleteStonk}
                />
                <Divider/>
            </React.Fragment>
        );
    };
    return (
        <Paper className={classes.paper}>
            {loading && <CircularProgress className={classes.spinner}/>}
            {stockSymbols.length === 0 ?            
                <div className={classes.listLabel}>
                    Stonk List
                </div>                 
            :
                <List
                    className={classes.list}
                    component="ul"
                    subheader={
                        <ListSubheader component="div">
                            Stonk List
                        </ListSubheader>
                    }
                >           
                    {renderRow()}    
                </List> 
            }
        </Paper>
    );
};

const mapStateToProps = state => {
    return {
        savedStonks: state.savedStonksReducer.savedStonks
    }
};

const mapDispatchToProps = dispatch => {
    return {
        saveStonk: (stonk) => {
            dispatch(saveStonk(stonk));
        },
        deleteStonk: (stonk) => {
            dispatch(deleteStonk(stonk));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(StockList);