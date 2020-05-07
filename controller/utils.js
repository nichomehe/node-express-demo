let jsonData = (res,data) => {
    let result = {
        code:0,
        msg:typeof data == 'string'? data:'',
        data:typeof data == 'string'?{}:data
    }
    res.json(result)
}

let errorData = (res,msg) => {
    let result = {
        code:1,
        msg:msg,
        data:{}
    }
    res.json(result)
} 
module.exports = {
    jsonData,
    errorData
}