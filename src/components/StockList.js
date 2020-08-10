import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import StockListItem from './StockListItem';
import { saveStonk, deleteStonk } from '../redux/actions/savedStonksActions';
import { connect } from "react-redux";


const useStyles = makeStyles((theme) => ({
    list: {
      maxHeight: '100%'
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
            />
        );
    };
    return (
        <List
            className={classes.list}
            component="ul"
            subheader={
                <ListSubheader component="div">
                    Stonk List
                </ListSubheader>
            }
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