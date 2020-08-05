

export default class CompanyNews {
    constructor(datetime, headline, id, image, related, source, summary, url) {
        this.datetime = datetime;
        this.headline = headline;
        this.id = id;
        this.image = image;
        this.related = related;
        this.source = source;
        this.summary = summary;
        this.url = url;
    }

    static fromJSON = (json) => {
        return new CompanyNews(json.datetime, json.headline, json.id, json.image, json.related, 
            json.source, json.summary, json.url);
    };
};