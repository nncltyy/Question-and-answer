/*
 * @Description: 
 * @Version: 1.0
 * @Autor: zouqiang
 * @Date: 2022-02-16 15:40:35
 * @LastEditors: zouqiang
 * @LastEditTime: 2022-02-16 15:44:05
 */
import request from './request'

const login = (name,password)=>{
    return request({
        url:'/login',
        method:'POST',
        data:{
            name,
            password
        }
    })
}

const register=(name,password)=>{
    return request({
        url:'/user',
        method:'POST',
        data:{
            name,
            password
        }
    })
}

export default {
    login,
    register
}