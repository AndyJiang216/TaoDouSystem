<template>
    <van-grid :border="false" :column-num="2">
        <van-grid-item v-for="(item,index) in commodityList" :key="index">
            <img class="goodsPicture" :src="item.imgUrl" alt="">
            <p>{{cutWords(item.name)}}</p>
            <div class="goodsPrice">
                <span>{{addDecoration(item.price)}}</span>
                <img :src="require('@/assets/img/shoppingCar.png')" alt="">
            </div>
        </van-grid-item>
    </van-grid>
</template>

<script>
    export default {
        name: 'CommodityList',
        props:{
            commodityList:{
                type:Array,
                default:()=>{
                    return [{name:'',imgUrl:'',price:0}]
                }
            }
        },
        data(){
            return {}
        },
        methods:{
            cutWords(name){
                if((typeof name==='string')&&name.length>17){
                    return name.slice(0,18)+'...'
                }else{
                    return name
                }
            },
            addDecoration(num){
                if(typeof num==='number'){
                    return '$'+num
                }
            }
        }
    };
</script>

<style lang="scss" scoped>
    .van-grid-item__content--center{
        align-items: flex-start;
        justify-content: center;
        p{
            width: 90%;
            height: 40px;
            font-size: 14px;
            text-align: left;
            color: #8c939d;
        }
        .goodsPicture{
            width: 90%;
            height: 40vw;
            object-fit: cover;
        }
        .goodsPrice{
            display: flex;
            align-items: center;
            width:100%;
            justify-content: space-between;
            padding: 0 10px;
            span{
                font-weight: bolder;
                color: #ff2150;
            }
            img{
                height: 16px;
            }
        }
    }
</style>