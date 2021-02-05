import {service,post,get,put,del} from '../utils/request';

/*获取某一部电影的相关信息*/
export function getMovieIntroduction(url,name) {
    return get(url,name)
}

/*添加某一部电影的相关信息*/
export function addMovieIntroduction(url,movie) {
    return post(url,movie)
}

/*获取电影列表项的相关信息*/
export function getMovieListItems(url,name) {
    return get(url,name)
}

/*添加电影列表项的相关信息*/
export function addMovieListItem(url,movie) {
    return post(url,movie)
}
