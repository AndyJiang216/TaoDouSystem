<template>
    <div class="movieMarket">
        <!--顶部购物节宣传图-->
        <img class="advertisePoster" :src="advertiseImg" alt="">

        <!--购物分类宫格区域-->
        <div class="navigateGrid">
            <div class="navigateGrid-row">
                <div class="row-column1">
                    <div>
                        <h2 style="color: #58b7fd">全球购</h2>
                        <p>全球好货这里都有</p>
                        <button style="color: #58b7fd;border: 2px solid #58b7fd;">享购全球</button>
                    </div>
                    <img :src="navigateImg.internationalShop" alt="">
                </div>
                <div class="row-column2">
                    <div>
                        <h2 style="color: #ff942c">积分换购</h2>
                        <p>用积分更划算</p>
                    </div>
                    <img :src="navigateImg.pointsShop" alt="">
                </div>
                <div class="row-column2">
                    <div>
                        <h2 style="color: #e24e4e">品牌节</h2>
                        <p>大牌这里都有</p>
                    </div>
                    <img :src="navigateImg.famousShop" alt="">
                </div>
            </div>
            <div class="navigateGrid-row">
                <div class="row-column1">
                    <div>
                        <h2 style="color: #ff1818">闪电购</h2>
                        <p>超值好货 一元起购</p>
                        <button style="color: #ff1818;border: 2px solid #ff1818;">手快有手慢无</button>
                    </div>
                    <img :src="navigateImg.flashShop" alt="">
                </div>
                <div class="row-column2">
                    <div>
                        <h2 style="color: #85ce61">生鲜GO</h2>
                        <p>刚刚才到站</p>
                    </div>
                    <img :src="navigateImg.freshShop" alt="">
                </div>
                <div class="row-column2">
                    <div>
                        <h2 style="color: #5ad7fd">充值购</h2>
                        <p>充值赢免单</p>
                    </div>
                    <img :src="navigateImg.rechargeShop" alt="">
                </div>
            </div>
        </div>

        <!--购物列表展示区域-->
        <div class="goodsShowTitle">
            <span>猜你喜欢</span>
        </div>
        <van-grid :border="false" :column-num="3" :gutter="5">
            <van-grid-item v-for="(item,index) in gridList" :key="index">
                <img class="goodsPicture" :src="item.url" alt="">
                <p>{{cutWords(item.name)}}</p>
                <div class="goodsPrice">
                    <span>{{addDecoration(item.price)}}</span>
                    <img :src="require('@/assets/img/shoppingCar.png')" alt="">
                </div>
            </van-grid-item>
        </van-grid>
    </div>
</template>

<script>
    export default {
        name: 'Market',
        data(){
            return {
                advertiseImg:require('@/assets/img/movieMarkets/年货节.jpg'),
                navigateImg:{
                    internationalShop:require('@/assets/img/movieMarkets/全球购.jpg'),
                    flashShop:require('@/assets/img/movieMarkets/闪电购.jpg'),
                    pointsShop:require('@/assets/img/movieMarkets/积分换购.jpg'),
                    famousShop:require('@/assets/img/movieMarkets/大牌购.jpg'),
                    freshShop:require('@/assets/img/movieMarkets/生鲜.jpg'),
                    rechargeShop:require('@/assets/img/movieMarkets/充值购.jpg')
                },
                gridList: [
                    {name:'皮卡丘水桶',url:require('@/assets/img/movieGoods/bucket.jpg'),price:23.8},
                    {name:'电影日历',url:require('@/assets/img/movieGoods/calendar.jpg'),price:32},
                    {name:'星球大战水杯',url:require('@/assets/img/movieGoods/cup.jpg'),price:18},
                    {name:'哈利波特眼镜',url:require('@/assets/img/movieGoods/glasses.jpg'),price:56.5},
                    {name:'钢铁侠帽子',url:require('@/assets/img/movieGoods/hat.jpg'),price:21.2},
                    {name:'死侍鼠标垫',url:require('@/assets/img/movieGoods/mousePanel.jpg'),price:12.8},
                    {name:'哪吒抱枕',url:require('@/assets/img/movieGoods/pillow.jpg'),price:47},
                    {name:'电影海报',url:require('@/assets/img/movieGoods/poster.jpg'),price:11.4},
                    {name:'指环王戒指',url:require('@/assets/img/movieGoods/ring.jpg'),price:65},
                    {name:'加勒比海盗长剑',url:require('@/assets/img/movieGoods/sword.jpg'),price:158},
                    {name:'星球大战公仔',url:require('@/assets/img/movieGoods/toy.jpg'),price:98.8},
                    {name:'美国队长怀表',url:require('@/assets/img/movieGoods/watch.jpg'),price:89}
                ]
            }
        },
        computed:{

        },
        methods:{
            cutWords(name){
                if((typeof name==='string')&&name.length>8){
                    return name.slice(0,7)+'...'
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

<style lang="scss">
    .movieMarket{
        width: 100%;
        overflow-y: auto;
        /*顶部宣传图*/
        .advertisePoster{
            width: 100%;
        }

        /*购物分类宫格区域*/
        .navigateGrid{
            width: 100%;
            .navigateGrid-row{
                width: 100%;
                display: flex;
                padding: 0 5px;
                h2{
                    font-weight: normal;
                    font-size: 16px;
                    margin-bottom: 5px;
                }
                p{
                    font-size: 12px;
                    margin-bottom: 5px;
                }
                button{
                    font-size: 12px;
                    border-radius: 15px;
                    padding: 3px 8px;
                    background-color: transparent;
                }
                .row-column1{
                    flex: 1;
                    display: flex;
                    align-items: center;
                    padding: 5px 0px;
                    div{
                        flex: 1;
                        p{
                            color: #8c939d;
                        }
                    }
                    img{
                        width: 40%;
                        height: 23vw;
                    }
                }
                .row-column2{
                    width: 25%;
                    text-align: center;
                    padding: 5px 0px;
                    h2,p{
                        text-align: left;
                    }
                    p{
                        color: #8c939d;
                    }
                    img{
                        width: 90%;
                        height: 18vw;
                    }
                }
            }
        }

        .goodsShowTitle{
            width: 100%;
            padding: 10px;
            border-top: 1px solid #ebeef4;
            border-bottom: 1px solid #ebeef4;
        }
        .van-grid-item__content--center{
            align-items: flex-start;
            justify-content: center;
            p{
                font-size: 14px;
                color: #8c939d;
            }
            .goodsPicture{
                width: 90%;
                height: 25vw;
                object-fit: cover;
            }
            .goodsPrice{
                display: flex;
                align-items: center;
                width:100%;
                justify-content: space-between;
                span{
                    font-weight: bolder;
                }
                img{
                    height: 16px;
                    margin-right: 20px;
                }
            }
        }
    }
</style>
<style scoped>
    .movieMarket{
        width:100%;
        height:100%;
        overflow-y: auto;
    }
    .goodsPicture{
        width: 100%;
        height: 60%;
    }
</style>