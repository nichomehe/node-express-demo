let jsonData = (res,data) => {
    console.log("json====",JSON.stringify(data))
    let result = {
        code:0,
        msg:"",
        data:data
    }
    res.json(result)
}

module.exports = {
    jsonData
}