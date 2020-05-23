
module.exports = class MsError extends Error {

    constructor(status, message, response) {
        super(message);
        this.status = status;
        this.response = response || message;
    }

};