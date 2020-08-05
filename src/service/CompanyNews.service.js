import AxiosService from './Axios.service';
import CompanyNews from '../model/CompanyNews';


// TODO: This is highly inefficient
export default class CompanyNewsService {

    static getCompanyNews = async (stockSymbol) => {
        let companyNews = [];

        // TODO: Put date logic in API
        const date = new Date();
        const fullYear = date.getFullYear()    
        const getMonth = () => {
            let month = date.getMonth()+1;
            return Math.floor(Math.log10(month)) === 0 ? `0${month}` : month;
        };
        const getDay = () => {
            let day = date.getDate();
            return Math.floor(Math.log10(day)) === 0 ? day = `0${day}` : day;            
        };

        try {
            const response = await AxiosService.api.get('/company/news', {
                params: {
                    stockSymbol,
                    fromDate: `${fullYear}-${getMonth()}-${getDay()}`,
                    toDate : `${fullYear}-${getMonth()}-${getDay()}`
                }
            });
            for (let news of response.data) {
                companyNews.push(CompanyNews.fromJSON(news));
            }
        } catch (error) {
            console.log("Could not get company news: ", error);
        }
        return companyNews;
    };
}