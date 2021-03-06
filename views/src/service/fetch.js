
import axios from 'axios'
import Qs from 'qs'
import { filterData , setStorage , getStorage} from './utils'

export const fetch = (params) => {
    return new Promise((resolve,reject)=>{
        filterData(params.data)   //删除空参数
        let method = params.method?params.method.toLowerCase():'get'
        let oData = {
            url:params.url,
            method:method,
            timeout:params.timeout || 200000,
            headers: params.headers || {
                'Content-Type': 'application/json',
                Accept: 'application/json, text/plain, */*'
            }
        }
        if(getStorage('token')){
            oData.headers.token = getStorage('token')
        }
        if(method === 'get'){
            oData.params = params.data
        }else{
            oData.data = Qs.stringify(params.data)
        }
        axios(oData).then( res => {
            if(res.headers && res.headers.token){
                setStorage('token',res.headers.token)
            }
            let data = res.data
            if(data.code == -1){
                window.location.hash = '#/login'
                reject(data)
            } else {
                resolve(data)
            }
        }).catch( err  =>{
            reject(err)
        })
    })
}