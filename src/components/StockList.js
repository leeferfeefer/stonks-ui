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
        height: window.innerHeight - 110,
        width: 360
    },
    list: {
        maxHeight: window.innerHeight - 110,
        overflow: 'scroll',
    },
    spinner: {
        position: 'absolute',
        marginTop: '50%'
    }
}));


function StockList(props) {
    const classes = useStyles();
    const { stonks, saveStonk, deleteStonk } = props;
    let [stockSymbols, setStockSymbols] = useState([]);
    const [loading, setLoading] = useState(true);
    let [page, setPage] = useState(0);

    // runs both after the first render and after every update.
    useEffect(() => {
        const getStockSymbols = async () => {
            const stockSymbolsResponse = await StockSymbolsService.getStockSymbols(page);
            setLoading(false);
            setStockSymbols([...stockSymbols, ...stockSymbolsResponse]);
        }
        getStockSymbols();
    }, [page]); // pass [] so that it doesnt re-render after getting stock symbols and setting state


    // INFINITE SCROLL LOGIC
    // --------------------------------------------------
    const [bottom, setBottom] = React.useState(null);
    const bottomObserver = React.useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                const entry = entries[0];
                if (entry.isIntersecting) {
                    setPage(++page);
                }
            },
            { threshold: 0.25, rootMargin: "50px" }
        );
        bottomObserver.current = observer;
    }, []);

    React.useEffect(() => {
        const observer = bottomObserver.current;
        if (bottom) {
            observer.observe(bottom);
        }
        return () => {
            if (bottom) {
                observer.unobserve(bottom);
            }
        };
    }, [bottom]);

    // --------------------------------------------------

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
    return (
        <Paper className={classes.paper}>
            {loading && <CircularProgress className={classes.spinner} />}
            {stockSymbols.length === 0 ?
                <div className={classes.listLabel}>
                    Stonk List
                </div>
                :
                <div className={classes.list}>
                    <List
                        component="ul"
                        subheader={
                            <ListSubheader component="div">
                                Stonk List
                            </ListSubheader>
                        }
                    >
                        {renderRow()}
                    </List>
                    <div ref={setBottom}>loading...</div>
                </div>
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