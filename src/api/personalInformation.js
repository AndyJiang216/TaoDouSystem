import {service,post,get,put,del} from '../utils/request';

/*提交用户信息*/
export function addUserPersonalInformation(url,personalInfo) {
    return post(url,personalInfo)
}

/*获取用户信息*/
export function getUserPersonalInformation(url,id) {
    return get(url,id)
}