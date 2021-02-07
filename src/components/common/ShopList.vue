<template>
    <div class="shop-list">
        <div class="shop-detail" v-for="(item,index) in shopList" :key="index">
            <img :src="item.imgUrl" alt="">
            <div class="shop-info">
                <div class="shop-text">
                    <h2>{{item.name}}</h2>
                    <p>开店时间：{{item.beginTime}}</p>
                    <p>粉丝数：{{item.member}}</p>
                </div>
                <button>进店逛逛</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'ShopList',
        props:{
            shopList:{
                type:Array,
                default:()=>{
                    return [{name:'',imgUrl:'',beginTime:'',member:0,sales:0}]
                }
            }
        }
    };
</script>

<style lang="scss" scoped>
    .shop-list{
        width: 100%;
        height: 100%;
        overflow-y: auto;
        .shop-detail{
            display: flex;
            align-items: center;
            margin-bottom: 10px;
            img{
                width: 15%;
                height: 15vw;
                object-fit: contain;
            }
            .shop-info{
                display: flex;
                flex: 1;
                align-items: center;
                padding: 0px 10px;
                .shop-text{
                    width: 80%;
                    h2{
                        font-size: 14px;
                        font-weight: normal;
                    }
                    p{
                        font-size: 12px;
                    }
                }
                button{
                    flex: 1;
                    height: 8vw;
                    font-size: 12px;
                    color: #ff2150;
                    border: 1px solid #ff2150;
                    background-color: transparent;
                }
            }
        }
    }
</style>