<template>
    <div class="commodity-flat-list">
        <div @click="getCommodityDetail(item.id)" class="commodity-flat-item" v-for="(item,index) in commodityList" :key="index">
            <img :src="item.imgUrl" alt="">
            <div class="commodity-info">
                <p class="commodity-name">{{item.name}}</p>
                <button class="commodity-postage">{{item.postage?`运费${item.postage}元`:'包邮'}}</button>
                <p class="commodity-sales">
                    <span>¥{{item.price}}</span>
                    <span>{{item.sales}}人付款</span>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'CommodityFlatList',
        props:{
            commodityList:{
                type:Array,
                default:()=>{
                    return [{name:'',imgUrl:'',price:0,postage:0,sales:0}]
                }
            }
        },
        methods:{
            getCommodityDetail(id){
                this.$router.push({name:'commodity',params:{id:id}})
            }
        }
    };
</script>

<style lang="scss" scoped>
    .commodity-flat-list{
        width: 100%;
        .commodity-flat-item{
            width: 100%;
            display: flex;
            align-items: center;
            margin-bottom: 10px;
            img{
                width: 30%;
                height: 30vw;
                object-fit: cover;
            }
            .commodity-info{
                flex: 1;
                padding: 8px 10px;
                .commodity-name{
                    font-size: 14px;
                    margin-bottom: 5px;
                    height: 40px;
                }
                .commodity-postage{
                    padding: 3px 10px;
                    margin-bottom: 10px;
                    color: #ff2150;
                    border: 1px solid #ff2150;
                    font-size: 13px;
                    background-color: #fefefe;
                }
                .commodity-sales{
                    display: flex;
                    justify-content: space-between;
                    font-size: 14px;
                    span:first-child{
                        color: #ff2150;
                        font-weight: bold;
                        font-size: 16px;
                    }
                }
            }
        }
        .commodity-flat-item:last-child{
            margin-bottom: 0px;
        }
    }
</style>