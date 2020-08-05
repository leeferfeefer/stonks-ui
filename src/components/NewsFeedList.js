import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import CompanyNewsService from '../service/CompanyNews.service';
import NewsFeedItem from './NewsFeedItem';

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

function NewsFeedList (props) {
    const classes = useStyles();
    const {savedStonks} = props;

    // TODO: Initialize this state as the news stories saved into redux
    // instead of empty array - then replace the difference
    const [newsStories, setNewsStories] = useState([]);

    useEffect(() => {
        const getCompanyNews = async () => {
            let news = [];
            for (let stonk of savedStonks) {
                const companyNews = await CompanyNewsService.getCompanyNews(stonk.symbol);
                news = news.concat(companyNews);
            }
            setNewsStories(news);
        };
        getCompanyNews();
    }, [savedStonks]);

    const renderRow = () => {   
        return newsStories ? 
            newsStories.map((news, index) => 
                <NewsFeedItem 
                    key={index} 
                    news={news}                 
                />)
            : null
    };
    return (
        <List
            component="ul"
            subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                    News Feed
                </ListSubheader>
            }
            className={classes.root}
        >           
            {renderRow()}    
        </List>
    );
};


export default NewsFeedList;