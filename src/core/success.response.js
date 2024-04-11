
const StatusCode = {
    OK: 200,
    CREATE: 201
};

const ReasonStatusCode = {
    CREATE: 'Creatd successfuly!',
    OK:'success'
};

class SuccessResponse{
    constructor({message,statusCode = StatusCode.OK,reasonStatusCode = ReasonStatusCode.OK,metaData={}}){
        this.message = !message ? reasonStatusCode:message;
        this.status = statusCode;
        this.metaData = metaData 
    }
    send (res,headers = {}){
        return res.status(this.status).json(this)
    }
}

class OK extends SuccessResponse {
    constructor ({message,metaData}){
        super({message,metaData})
    }
}

class CREATED extends SuccessResponse{
    constructor ({message,metaData,options = {}}){
        super({message,statusCode : StatusCode.CREATE,reasonStatusCode: ReasonStatusCode.CREATE,metaData})
        this.options = options
    }
}
module.exports = {
    OK,CREATED,
    SuccessResponse
}