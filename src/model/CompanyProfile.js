

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
        this.share_outstanding = share_outstanding;
        this.ticker = ticker;
        this.weburl = weburl;
    }

    static fromJSON = (json) => {
        return new CompanyProfile(json.country, json.currency, json.exchange, json.finnhub_industry, 
            json.ipo, json.logo, json.market_capitalization, json.name, json.phone, 
            json.share_outstanding, json.ticker, json.weburl);
    };
}