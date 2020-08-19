import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import WatchListItem from './WatchListItem';
import Paper from '@material-ui/core/Paper';
import { connect } from "react-redux";
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
    listLabel: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        height: window.innerHeight-110
    },
    paper: {
        height: window.innerHeight-110,
        width: 360
    },
    list: {    
        maxHeight: window.innerHeight-110,
        overflow: 'scroll',
    }
}));

function WatchList(props) {
    const classes = useStyles();
    const {savedStonks} = props;
    
    const renderRow = () => {
        return savedStonks.map((savedStonk, index) => 
            <React.Fragment key={`${index}-divider`}>
                <WatchListItem 
                    key={index} 
                    savedStonk={savedStonk}
                />
                <Divider/>
            </React.Fragment>
        );
    };
    return (
        <Paper className={classes.paper}>            
            {savedStonks.length === 0 ? 
                <div className={classes.listLabel}>
                    Watch List
                </div> 
            :
                <List
                    className={classes.list}
                    component="ul"
                    subheader={
                        <ListSubheader component="div">
                            Watch List
                        </ListSubheader>
                    }
                >           
                    {renderRow()}    
                </List>
            }
        </Paper>
    );
}

const mapStateToProps = state => {
    return {
        savedStonks: state.savedStonksReducer.savedStonks
    }
};

export default connect(mapStateToProps, null)(WatchList);