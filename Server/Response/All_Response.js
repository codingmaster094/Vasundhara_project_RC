const cathError = async function(massage){
    return ({Response_code : 0 , Response_massage :massage})
}

const ResponseError = async function(){
    return ({Response_code :0 , Response_massage : "Failed"})
}

const ResponseErrorMsg = async function (msg){
    return ({Response_code:0 , Response_massage : msg})
}

const ResponseErrorDataMsg = async function (msg,data){
    return ({Response_code:0 , Response_massage : msg, Data:data})
}

const ResponseSuccessMsg = async function(){
    return ({Response_code:1 , Response_massage:"Success"})
}


const ResponseSuccess = async function(data){
    return ({Response_code:1 , Response_massage : "Success" , Data : data})
}

export default {cathError,ResponseErrorDataMsg, ResponseError, ResponseErrorMsg, ResponseSuccessMsg, ResponseSuccess}

