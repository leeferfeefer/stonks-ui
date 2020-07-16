
export default class StockSymbol {
    constructor(description, displaySymbol, symbol) {
        this.description = description;
        this.displaySymbol = displaySymbol;
        this.symbol = symbol;
    }

    static fromJSON = (json) => {
        return new StockSymbol(json.description, json.displaySymbol, json.symbol);
    }
}