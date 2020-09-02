import React, { useState, useEffect, useRef } from 'react';
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
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    listLabel: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        height: window.innerHeight - 110
    },
    paper: {
        display: 'flex',
        justifyContent: 'center',
        height: window.innerHeight - 100,
        width: 360
    },
    list: {
        maxHeight: window.innerHeight - 195,
        overflow: 'scroll',
    },
    spinner: {
        position: 'absolute'
    },
    searchBar: {
        width: '100%'
    },
    noSearchResults: {
        color: 'red'
    },
    buttonGroup: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
}));


function StockList(props) {
    const classes = useStyles();
    const {savedStonks, saveStonk, deleteStonk} = props;
    const [stockSymbols, setStockSymbols] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [isNoResults, setIsNoResults] = useState(false);


    const getStockSymbols = async () => {
        setLoading(true);
        const stockSymbols = await StockSymbolsService.getStockSymbols(page, searchQuery);
        setLoading(false);
        if (stockSymbols.length > 0) {
            // setStockSymbols([]);
            setStockSymbols(stockSymbols);   
            setIsNoResults(false);            
        } else {
            setIsNoResults(true);
        }    
    }

    // runs both after the first render and after every update.
    useEffect(() => {
        getStockSymbols();
    }, [page]);

    const onSearchBarTextChange = (event) => {
        setSearchQuery(event.target.value);
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
                <Divider />
            </React.Fragment>
        );
    };

    const keyPress = (e) => {
        if (e.keyCode === 13) { // enter
            getStockSymbols();
        }
    }

    return (
        <Paper className={classes.paper}>
            {loading && <CircularProgress className={classes.spinner} />}
            {stockSymbols.length === 0 ?
                <div className={classes.listLabel}>
                    Stonk List
                </div>
                :
                <div>
                    <TextField className={classes.searchBar} 
                        label="Stonk Search" 
                        variant="outlined" 
                        onChange={onSearchBarTextChange}
                        value={searchQuery}
                        onKeyDown={keyPress}
                    />
                    {isNoResults && <div className={classes.noSearchResults}>No Results!</div>}
                    <div className={classes.buttonGroup}>                        
                        <Button 
                            variant="contained"
                            disabled={page === 0}
                            onClick={() => setPage(page-1)}
                        >Prev</Button>
                        <Button 
                            variant="contained"
                            disabled={stockSymbols.length < 50}
                            onClick={() => setPage(page+1)}
                        >Next</Button>
                    </div>
                    <div>
                        <List
                            className={classes.list}
                            component="ul"
                        >
                            {renderRow()}
                        </List>
                    </div>
                </div>
            }
        </Paper>
    );
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

export default connect(null, mapDispatchToProps)(StockList);