import AxiosService from './Axios.service';
import StockSymbol from '../model/StockSymbol';

export default class StockSymbolsService {

    static getStockSymbols = async (page, query) => {
        let stockSymbols = [];
        try {
            const response = await AxiosService.api.get('/stocks/symbols', {
                params: {
                    "pageNumber": page,
                    "quantity": 50,
                    "query": query
                }
            });
            stockSymbols = StockSymbolsService._convertStockSymbols(response);
        } catch (error) {
            console.log("Could not get stock symbols: ", error);
        }
        return stockSymbols;
    };

    static _convertStockSymbols = (stockSymbolsResponse) => {
        const stockSymbols = [];
        const symbols = stockSymbolsResponse.data;
        for (let symbol of symbols) {
            const stockSymbol = StockSymbol.fromJSON(symbol);
            stockSymbols.push(stockSymbol);
        }
        return stockSymbols;    
    };
}