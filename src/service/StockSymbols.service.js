import AxiosService from './Axios.service';
import StockSymbol from '../model/StockSymbol';

export default class StockSymbolsService {

    static getStockSymbols = async () => {
        try {
            const response = await AxiosService.api.get('/stocks/symbols');
            const symbols = response.data;
    
            const stockSymbols = [];
            for (let symbol of symbols) {
                const stockSymbol = StockSymbol.fromJSON(symbol);
                stockSymbols.push(stockSymbol);
            }    
            return stockSymbols;
        } catch (error) {
            console.log("Could not get stock symbols: ", error);
        }
    };
}