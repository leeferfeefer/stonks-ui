

export default class JSONParseError extends Error {
    constructor(message) {
        super(message);
        this.name = "JSONParseError";
    }
}