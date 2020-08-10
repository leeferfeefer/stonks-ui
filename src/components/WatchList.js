import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import WatchListItem from './WatchListItem';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    }
}));

function WatchList(props) {
    const classes = useStyles();
    const {savedStonks} = props;
    
    const renderRow = () => {
        return savedStonks.map((savedStonk, index) => 
            <WatchListItem 
                key={index} 
                savedStonk={savedStonk}
            />
        );
    };
    return (
        <List
            component="ul"
            subheader={
                <ListSubheader component="div">
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