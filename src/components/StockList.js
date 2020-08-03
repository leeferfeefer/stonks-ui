import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import StockListItem from './StockListItem';
import { saveStonk } from '../redux/actions/savedStonksActions';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
}));

function StockList(props) {
    const classes = useStyles();
    const {symbols, saveStonk} = props;

    const renderRow = () => {
        return symbols ? 
            symbols.map((symbol, index) => <StockListItem key={index} symbol={symbol} saveStonk={saveStonk}/>)
            : null
    };
    return (
        <List
            component="ul"
            subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                    Stonk List
                </ListSubheader>
            }
            className={classes.root}
        >           
            {renderRow()}    
        </List>
    );
}

const mapStateToProps = state => {
    return {
        savedStonks: state.savedStonksReducer.savedStonks
    }
};

const mapDispatchToProps = dispatch => {
    return {
        saveStonk: (stonk) => {
            dispatch(saveStonk(stonk))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StockList);