import {service,post,get,put,del} from '../utils/request';

/*用户登录*/
export function login(url,usernamePassword) {
    return post(url,usernamePassword)
}

/*用户注册*/
export function register(url,usernamePassword) {
    return post(url,usernamePassword)
}

/*用户登出*/
export function logout(url) {
    return get(url)
}

/*获取用户列表*/
export function getAllUsers(url) {
    return get(url)
}

/*新增注册用户*/
export function addUser(url,userInfo) {
    return post(url,userInfo)
}

/*编辑现有用户*/
export function editUser(url,userInfo) {
    return put(url,userInfo)
}

/*删除指定用户*/
export function deleteUser(url) {
    return del(url)
}

/*查询用户信息*/
export function findUser(url,userInfo) {
    return post(url,userInfo)
}

/*获取用户权限列表*/
export function getRoles(url) {
    return get(url)
}