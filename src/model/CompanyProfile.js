

export default class CompanyProfile {
    constructor(country, currency, exchange, finnhubIndustry, ipo, logo, 
        marketCapitalization, name, phone, shareOutstanding, ticker, weburl) {
        this.country = country;
        this.currency = currency;    
        this.exchange = exchange;
        this.industry = finnhubIndustry;
        this.ipo = ipo;
        this.logo = logo;
        this.marketCap = marketCapitalization;
        this.name = name;
        this.phone = phone;
        this.shareOutstanding = shareOutstanding;
        this.ticker = ticker;
        this.weburl = weburl;
    }

    static _convertMarketCap = (marketCap) => {
        if (!!!marketCap || marketCap === 0) {
            return undefined;
        }
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
        if (!!!shareOutstanding || shareOutstanding === 0) {
            return undefined;
        }
        return shareOutstanding.toFixed(2);
    };

    static fromJSON = (json) => {
        return new CompanyProfile(json.country, json.currency, json.exchange, json.finnhubIndustry, 
            json.ipo, json.logo, CompanyProfile._convertMarketCap(json.marketCapitalization), json.name, json.phone, 
            CompanyProfile._convertShareOutstanding(json.shareOutstanding), json.ticker, json.weburl);
    };
}