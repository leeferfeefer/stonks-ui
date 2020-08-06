import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

const useStyles = makeStyles((theme) => ({
    listText: {
        marginRight: theme.spacing(4),
    },
    largeAvatar: {
        width: theme.spacing(7),
        height: theme.spacing(7),
      },
}));

function NewsFeedItem (props) {
    const classes = useStyles();
    const {news} = props;

    const handleClick = () => {
        var win = window.open(news.url, '_blank');
        win.focus();
    };

    return (
        <>
            <ListItem button dense onClick={handleClick}>            
                <ListItemText primary={news.headline} className={classes.listText}/>
                <ListItemSecondaryAction>
                    <Avatar src={`${news.image}`} className={classes.largeAvatar} />
                </ListItemSecondaryAction>
            </ListItem>        
        </>
    );
}


export default NewsFeedItem;