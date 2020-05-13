


// 过滤空参数
export const filterData = ( data ) => {
    if(!data) return
    for(key in data){
        if(data[key] === undefined || data[key] === null || data[key] === '') {
            delete data[key]
        }
    }
    return data
}


export const setStorage = (name,val) => {
    if(!name) return
    if(typeof val == 'object'){
        val = JSON.stringify(val)
    }
    localStorage.setItem(name,val)
}


export const getStorage = (name) => {
    if(!name) return
    return localStorage.getItem(name)
}

//深拷贝
export const deepClone = (data) => {
    if(!data || typeof data != 'object')return
    let deepData = data.constructor === Array?[]:{}
    for(key in data){
        if(data.hasOwnProperty(key)){ //是对象自身的属性 而非继承属性
            if(data[key] && typeof data[key] == 'object'){
                deepData[key] = data[key].constructor === Array?[]:{}
                deepData[key] = deepClone(data[key])
            } else {
                deepData[key] = data[key]
            }
        }
    }
    return deepData
}







