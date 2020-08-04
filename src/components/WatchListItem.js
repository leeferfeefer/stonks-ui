import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import CompanyProfileService from '../service/CompanyProfile.service';

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
    const [isSelected, setIsSelected] = useState(false);
    const [companyProfile, setCompanyProfile] = useState({});
    const {savedStonk} = props;

    const handleClick = async () => {
        if (!isSelected) {
            const companyProfile = await CompanyProfileService.getCompanyProfile(savedStonk.symbol);
            setCompanyProfile(companyProfile);
        }
        setIsSelected(!isSelected);

        // TODO: show graph here in a graph view
        // See what can be done with company profile - other than that call company financials endpoint
    };

    return (
        <>
            <ListItem button dense onClick={handleClick}>
                <ListItemText primary={`${savedStonk.symbol} - ${savedStonk.description}`} />
            </ListItem>        
        </>
    );
}
