import { EError } from "../enums/EError.js";

export const errorHandler = (error, req, res, next) => {
    console.log(error.code);
    switch (error.code){
        case EError.INVALID_BODY_JSON:
            res.json({status:"Error Invalid Body Json", error: error.cause});
            break;

        case EError.INVALID_PARAM:
            res.json({status:"Error Invalid Param", error: error.cause});
            break;

        default:
            break;
    };
};