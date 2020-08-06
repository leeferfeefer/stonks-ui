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
    sectionHeader: {
        textAlign: 'center'
    }
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
                const companyName = stonk.description;
                const newsObject = {companyName, companyNews};
                news.push(newsObject);
            }
            setNewsStories(news);        
        };
        getCompanyNews();
    }, [savedStonks]);


    return (
        <List
            component="ul"
            subheader={
                <ListSubheader component="div">
                    News Feed
                </ListSubheader>
            }
            className={classes.root}
        >           
            {newsStories.map(newsObject => {
                const companyName = newsObject.companyName;
                const companyNews = newsObject.companyNews;
                return (
                    <li key={`section-${companyName}`}>
                        <ul>
                            <ListSubheader component="div" className={classes.sectionHeader}>
                                {`${companyName}`}
                            </ListSubheader>
                            {companyNews.map((news, index) => {
                                return (
                                    <NewsFeedItem 
                                        key={`${companyName}-${index}`} 
                                        news={news}                 
                                    />
                                );
                            })}
                        </ul>
                    </li>
                )
            })}
        </List>
    );
};


export default NewsFeedList;