'use strict';
const CodeHttp = require('../helpers/statusCodeHttp');

module.exports = class CommonService {
    constructor() {
        this._codeHttp = CodeHttp;    
    }

    successResponse(res, data, codeHttp, sendDataHeader = true) {
        if(sendDataHeader) res.setHeader('data', data || '');
        res.status(codeHttp).send({ data: data });
    }
    
    errorResponse(res, message, codeHttp, value = true) {
       if(value) res.setHeader('data', '');
        res.status(codeHttp).send({ data: message });
    }
}