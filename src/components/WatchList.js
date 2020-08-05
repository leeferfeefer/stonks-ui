import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import WatchListItem from './WatchListItem';
import { connect } from "react-redux";

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

function WatchList(props) {
    const classes = useStyles();
    const {savedStonks} = props;
    
    const renderRow = () => {
        return savedStonks ? 
            savedStonks.map((savedStonk, index) => 
                <WatchListItem 
                    key={index} 
                    savedStonk={savedStonk}
                />)
            : null
    };
    return (
        <List
            component="ul"
            subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                    Watch List
                </ListSubheader>
            }
            className={classes.root}
        >           
            {renderRow()}    
        </List>
    );
}

export default WatchList;