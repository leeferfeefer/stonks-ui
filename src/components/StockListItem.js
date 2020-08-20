import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
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

function StockListItem(props) {
    const classes = useStyles();
    const [isSelected, setIsSelected] = useState(false);
    const [companyProfile, setCompanyProfile] = useState({});
    const {stonk, savedStonks, isChecked} = props;
    const [isCheckedState, setIsCheckedState] = useState(isChecked);

    const handleClick = async () => {
        if (!isSelected) {
            const companyProfile = await CompanyProfileService.getCompanyProfile(stonk.symbol);
            setCompanyProfile(companyProfile);
        }
        setIsSelected(!isSelected);
    };

    const handleCheckBoxChange = () => {
        const {saveStonk, deleteStonk} = props;

        if (!isCheckedState) {
            saveStonk(stonk);
        } else {
            deleteStonk(stonk);
        }
        setIsCheckedState(!isCheckedState);
    };

    return (
        <>
            <ListItem button dense onClick={handleClick}>            
                <ListItemText 
                    primary={`${stonk.description}`} 
                    secondary={`${stonk.symbol}`}
                />
                {isSelected ? <ExpandLess /> : <ExpandMore />}
                <ListItemSecondaryAction>
                    <Checkbox
                        edge="end"
                        onChange={handleCheckBoxChange}
                        checked={isCheckedState}
                    />
                </ListItemSecondaryAction>
            </ListItem>
            <Collapse in={isSelected} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItem className={classes.nested}>
                        <ListItemText 
                            primary={"Industry"}
                            secondary={`${companyProfile.industry}`}
                        />                        
                    </ListItem>
                    <ListItem className={classes.nested}>
                        <ListItemText 
                            primary={"Market Capitalization"} 
                            secondary={`${companyProfile.marketCap}`}
                        />
                    </ListItem>
                    <ListItem className={classes.nested}>
                        <ListItemText 
                            primary={"Shares Outstanding"} 
                            secondary={`${companyProfile.shareOutstanding}`}
                        />
                    </ListItem>                
                </List>
            </Collapse>
        </>
    );
}

export default StockListItem;