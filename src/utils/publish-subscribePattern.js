
let publishObj={};//发布者
let subscriberList=[];//存放订阅者回调函数

//增加订阅者
publishObj.add=function(key,fn) {
    if(!subscriberList[key]){
        //如果还没有定义过此类消息，则给此类消息创建一个缓存列表
        subscriberList[key]=[];
    }
    subscriberList[key].push(fn);//订阅消息添加到缓存列表
}
//消息发布
publishObj.trigger=function() {
    let key=Array.prototype.shift.call(arguments);//获取消息类型名称
    let fns=subscriberList[key];//取出消息对应的回调函数集合

    //如果没有订阅过该消息，则返回
    if(!fns||fns.length===0){
        return ;
    }
    for(let i=0,fn;fn=fns[i];i++){
        fn.apply(this,arguments);
    }
}

//A订阅消息
publishObj.add('trip',function(name) {
    console.log(`${name}订阅了旅行服务`);
})
//B订阅消息
publishObj.add('promote',function(name) {
    console.log(`${name}订阅了升职服务`);
})
//使用publishObj.trigger('trip','name')触发该模式

export {publishObj};