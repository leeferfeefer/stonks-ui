import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import StockListItem from './StockListItem';

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

export default function StockList(props) {
    const classes = useStyles();
    const {symbols} = props;

    const renderRow = () => {
        return symbols ? 
            symbols.map((symbol) => <StockListItem symbol={symbol}/>)
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