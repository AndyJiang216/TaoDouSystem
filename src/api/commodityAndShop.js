import {service,post,get,put,del} from '../utils/request';

/*添加商品信息*/
export function addCommodity(url,commodity) {
    return post(url,commodity)
}

/*添加商品列表项信息*/
export function addCommodityListItem(url,commodity) {
    return post(url,commodity)
}

/*添加店铺信息*/
export function addShop(url,shop) {
    return post(url,shop)
}

/*查询商品信息*/
export function getCommodity(url,id) {
    return get(url,id)
}

/*查询商品列表项信息*/
export function getAllCommodityListItems(url) {
    return get(url)
}

/*查询店铺信息*/
export function getShop(url,id) {
    return get(url,id)
}