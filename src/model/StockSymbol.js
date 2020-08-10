
export default class StockSymbol {
    constructor(currency, description, displaySymbol, symbol, type) {
        this.currency = currency;
        this.description = description;
        this.displaySymbol = displaySymbol;
        this.symbol = symbol;
        this.type = type;
    }

    static fromJSON = (json) => {
        return new StockSymbol(json.currency, json.description, json.displaySymbol, json.symbol, json.type);
    }
}