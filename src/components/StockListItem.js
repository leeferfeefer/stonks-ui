import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import List from '@material-ui/core/List';
import CompanyProfileService from '../service/CompanyProfile.service';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

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
    const [companyProfile, setCompanyProfile] = useState({});
    const {symbol} = props;

    const handleClick = async () => {
        if (!isSelected) {
            const companyProfile = await CompanyProfileService.getCompanyProfile(symbol.symbol);
            setCompanyProfile(companyProfile);
        }
        setIsSelected(!isSelected);
    };

    const handleCheckBoxChange = () => {
        // TODO: Save stonk in redux here
        const {saveStonk} = props;
        saveStonk('');
    };

    return (
        <>
            <ListItem button dense onClick={handleClick}>            
                <ListItemText primary={`${symbol.symbol} - ${symbol.description}`} />
                {isSelected ? <ExpandLess /> : <ExpandMore />}
                <ListItemSecondaryAction>
                    <Checkbox
                        edge="end"
                        onChange={handleCheckBoxChange}
                    />
                </ListItemSecondaryAction>
            </ListItem>
            <Collapse in={isSelected} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItem className={classes.nested}>
                        <ListItemText primary={`${companyProfile.industry}`}/>
                        <ListItemText primary={`${companyProfile.marketCap}`}/>
                        <ListItemText primary={`${companyProfile.shareOutstanding}`}/>
                    </ListItem>
                </List>
            </Collapse>
        </>
    );
}
