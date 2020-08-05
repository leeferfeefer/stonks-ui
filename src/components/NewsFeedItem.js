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

function NewsFeedItem (props) {
    const classes = useStyles();
    const {stonk} = props;

    return (
        <>
            <ListItem button dense>            
                <ListItemText primary={`news story here`} />
            </ListItem>        
        </>
    );
}


export default NewsFeedItem;