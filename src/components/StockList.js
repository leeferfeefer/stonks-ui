import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import StockListItem from './StockListItem';
import { saveStonk, deleteStonk } from '../redux/actions/savedStonksActions';
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    }
}));

function StockList(props) {
    const classes = useStyles();
    const {stonks, saveStonk, deleteStonk} = props;

    const renderRow = () => {
        return stonks.map((stonk, index) => 
                <StockListItem 
                    key={index} 
                    stonk={stonk} 
                    saveStonk={saveStonk}
                    deleteStonk={deleteStonk}
                />);
    };
    return (
        <List
            component="ul"
            subheader={
                <ListSubheader component="div">
                    Stonk List
                </ListSubheader>
            }
            className={classes.root}
        >           
            {renderRow()}    
        </List>
    );
};

const mapDispatchToProps = dispatch => {
    return {
        saveStonk: (stonk) => {
            dispatch(saveStonk(stonk));
        },
        deleteStonk: (stonk) => {
            dispatch(deleteStonk(stonk));
        }
    }
};

export default connect(null, mapDispatchToProps)(StockList);