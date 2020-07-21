import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import List from '@material-ui/core/List';

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

export default function StockListItem(props) {
    const classes = useStyles();
    const [isSelected, setIsSelected] = useState(false);
    const {symbol} = props;

    console.log("symbol: ", symbol)
    const handleClick = () => {
        console.log("Clicked!");
        setIsSelected(!isSelected);
    };

    return (
        <>
            <ListItem button onClick={handleClick}>
                <ListItemIcon>
                    <InboxIcon />
                </ListItemIcon>
                <ListItemText primary={`${symbol.symbol} - ${symbol.description}`} />
                {isSelected ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={isSelected} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItem button className={classes.nested}>
                        <ListItemText primary="Starred" />
                        <ListItemText primary="Starred" />
                        <ListItemText primary="Starred" />
                    </ListItem>
                </List>
            </Collapse>
        </>
    );
}
