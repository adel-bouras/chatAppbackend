class appError extends Error {
    constructor(){
        super();
    }
    
    create(statusCode , message){
        this.statusCode = statusCode;
        this.message = message;
        return this;
    }
}

module.exports = new appError();