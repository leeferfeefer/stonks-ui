import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

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

export default function WatchListItem(props) {
    const classes = useStyles();

    const handleClick = async () => {
        console.log("clicked")
    };

    return (
        <>
            <ListItem button onClick={handleClick}>
                <ListItemText primary={`thingy`} />
            </ListItem>        
        </>
    );
}
