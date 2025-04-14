import axios from 'axios'
import { baseURL } from '../common/SummaryApi'

 const Axios = axios.create({
    baseURL : baseURL,
    withCredentials : true 
})

Axios.interceptors.request.use( async(config)=>{
    const accessToken = localStorage.getItem('accessToken')
    console.log("accessToken",accessToken)

    if(accessToken){
        config.headers.Authorization = `Bear ${accessToken}`
    }

    return config
},
(error)=>{
    return Promise.reject(error)
})
export default Axios