import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import CompanyNewsService from '../service/CompanyNews.service';
import NewsFeedListItem from './NewsFeedListItem';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import { connect } from "react-redux";
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
    listLabel: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        height: window.innerHeight-110,
    },
    paper: {
        display: 'flex',
        justifyContent: 'center',
        height: window.innerHeight-110,
        width: 360
    },
    sectionHeader: {
        textAlign: 'center'
    },
    list: {    
        maxHeight: window.innerHeight-110,
        overflow: 'scroll',
    },
    spinner: {
        position: 'absolute',
        marginTop: '50%'
    }
}));

function NewsFeedList (props) {
    const classes = useStyles();
    const {savedStonks} = props;

    // TODO: Initialize this state as the news stories saved into redux
    // instead of empty array - then replace the difference
    const [newsStories, setNewsStories] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getCompanyNews = async () => {
            let news = [];
            for (let stonk of savedStonks) {
                setLoading(true);
                const companyNews = await CompanyNewsService.getCompanyNews(stonk.symbol);
                setLoading(false);
                const companyName = stonk.description;
                const newsObject = {companyName, companyNews};
                news.push(newsObject);
            }
            setNewsStories(news);        
        };
        getCompanyNews();
    }, [savedStonks]);


    const renderRow = () => {
        return newsStories.map(newsObject => {
            const companyName = newsObject.companyName;
            const companyNews = newsObject.companyNews;
            return (
                <React.Fragment key={`${companyName}Fragment`}>
                    <ListSubheader key={`${companyName}`} component="div" className={classes.sectionHeader}>
                        {`${companyName}`}
                    </ListSubheader>
                    {companyNews.map((news, index) => {
                        return (
                            <React.Fragment key={`${index}Fragment`}>
                                <NewsFeedListItem 
                                    key={`${companyName}-${index}`} 
                                    news={news}                 
                                />
                                <Divider/>
                            </React.Fragment>
                        );
                    })}
                </React.Fragment>            
            )
        });
    };

    return (
        <Paper className={classes.paper}>    
            {loading && <CircularProgress className={classes.spinner}/>}        
            {savedStonks.length === 0 ? 
                <div className={classes.listLabel}>
                    News Feed
                </div> 
            :
                <List
                    className={classes.list}
                    component="ul"
                    subheader={
                        <ListSubheader component="div">
                            News Feed
                        </ListSubheader>
                    }
                >           
                    {renderRow()}
                </List>
            }
        </Paper>
    );
};

const mapStateToProps = state => {
    return {
        savedStonks: state.savedStonksReducer.savedStonks
    }
};

export default connect(mapStateToProps, null)(NewsFeedList);
