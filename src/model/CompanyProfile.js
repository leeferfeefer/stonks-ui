

export default class CompanyProfile {
    constructor(country, currency, exchange, finnhub_industry, ipo, logo, 
        market_capitalization, name, phone, share_outstanding, ticker, weburl) {
        this.country = country;
        this.currency = currency;    
        this.exchange = exchange;
        this.industry = finnhub_industry;
        this.ipo = ipo;
        this.logo = logo;
        this.marketCap = market_capitalization;
        this.name = name;
        this.phone = phone;
        this.shareOutstanding = share_outstanding;
        this.ticker = ticker;
        this.weburl = weburl;
    }

    static _convertMarketCap = (marketCap) => {
        const zeroes = Math.floor(Math.log10(marketCap));
        if (zeroes > 5) { // at least 1000 M
            marketCap = `${(marketCap/1000000).toFixed(2)}T`;
        } else if (zeroes > 2) {
            marketCap = `${(marketCap/1000).toFixed(2)}B`;
        } else {
            marketCap = `${(marketCap).toFixed(2)}M`
        }
        return marketCap;
    };

    static _convertShareOutstanding = (shareOutstanding) => {
        return shareOutstanding.toFixed(2);
    };

    static fromJSON = (json) => {
        return new CompanyProfile(json.country, json.currency, json.exchange, json.finnhub_industry, 
            json.ipo, json.logo, CompanyProfile._convertMarketCap(json.market_capitalization), json.name, json.phone, 
            CompanyProfile._convertShareOutstanding(json.share_outstanding), json.ticker, json.weburl);
    };
}