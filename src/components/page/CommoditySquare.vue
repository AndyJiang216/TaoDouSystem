<template>
    <div class="commodity-square">
        <!--商品广场顶部-->
        <form action="/">
            <van-search
                    v-model="value"
                    show-action
                    placeholder="请输入搜索关键词"
                    @search="onSearch"
                    @cancel="onCancel"
            />
        </form>
        <!--顶部分类导航栏-->
        <div class="square-navigate">
            <span v-for="(item,index) in navigateArr" :class="[activeIndex===index?'activatedNav':'']" :key="index" @click="activeNavigateItem(index)">{{item}}</span>
        </div>
        <!--商品广场展示栏-->
        <div class="square-cards">
            <CommodityList v-show="activeIndex<3&&(!flatStyle)" :commodityList="commodityListArr" />
            <CommodityFlatList v-show="activeIndex<3&&flatStyle" :commodityList="commodityListArr" />
            <div v-show="activeIndex>=0&&activeIndex<3" class="tool-btns">
                <img @click="toggleCommodityListShow" src="@/assets/img/changeShow.png" alt="">
                <img @click="backToTop" :src="require('@/assets/img/toTop.png')" alt="">
            </div>
            <ShopList v-show="activeIndex===3" :shopList="shopListArr" />
            <van-popup class="filter-popup" v-model="popupShow" position="right" :style="{width:'80%',height:'100%'}">
                <h2>筛选</h2>
                <div class="filter-choices">
                    <div class="filter-choice">
                        <h3>品牌</h3>
                        <div class="filter-btns">
                            <span>伯爵卓尔</span>
                            <span>Hansca</span>
                            <span>PULL&BEAR</span>
                            <span>Trendiano</span>
                            <span>GXG</span>
                            <span>WOOG2005</span>
                        </div>
                    </div>
                    <div class="filter-choice">
                        <h3>类别</h3>
                        <div class="filter-btns">
                            <span>英伦</span>
                            <span>日系</span>
                            <span>韩系</span>
                            <span>美式工装</span>
                            <span>港风</span>
                            <span>国潮</span>
                        </div>
                    </div>
                    <div class="filter-choice">
                        <h3>折扣与服务</h3>
                        <div class="filter-btns">
                            <span>包邮</span>
                            <span>赠运费险</span>
                            <span>消费者保障</span>
                            <span>七天无理由</span>
                            <span>金币抵扣</span>
                        </div>
                    </div>
                    <div class="filter-choice">
                        <h3>价格区间</h3>
                        <div class="filter-btns">
                            <input type="text"><span style="color: #999;background-color: transparent;margin: 0">—</span><input type="text">
                        </div>
                    </div>
                </div>
                <button>确定</button>
            </van-popup>
        </div>
    </div>
</template>

<script>
    import CommodityList from '../common/CommodityList';
    import CommodityFlatList from '../common/CommodityFlatList';
    import ShopList from '../common/ShopList';
    import {getAllCommodityListItems,getShop} from '@/api/commodityAndShop.js';

    export default {
        name: 'CommoditySquare',
        components:{CommodityList,CommodityFlatList,ShopList},
        data(){
            return {
                value:'',
                commodityListArr:[],//商品信息数组
                shopListArr:[],//店铺信息数组
                popupShow:false,//筛选弹出层是否显示
                activeIndex:0,//导航栏当前激活的列表项序号
                navigateArr:['综合','销量','价格','店铺','筛选'],//导航栏列表项内容
                flatStyle:true,//商品栏商品信息展示方式，flat表示平铺式一行展示一个商品
            }
        },
        computed:{},
        methods:{
            onSearch(){

            },
            onCancel(){

            },
            /*激活导航栏标签项*/
            activeNavigateItem(index){
                if(index>=0&&index<4){
                    this.activeIndex=index
                    this.popupShow=false
                }else if(index===4&&this.activeIndex<3){
                    this.popupShow=true
                }
            },
            /*回滚到商品展示栏顶部*/
            backToTop(){
                document.getElementsByClassName('square-cards')[0].scrollTop=0
            },
            /*切换商品展示栏展示方式*/
            toggleCommodityListShow(){
                this.flatStyle=!this.flatStyle
            }
        },
        created() {
            /*获取默认商品列表项数据*/
            getAllCommodityListItems('/queryAllCommodityListItems').then(res=>{
                const result=res.data
                this.commodityListArr=result
            }).catch(err=>{
                console.error(err)
            })
            /*获取店铺信息数据*/
            getShop('/queryShops').then(res=>{
                this.shopListArr=res.data
            }).catch(err=>{
                console.error(err)
            })
        }
    };
</script>

<style lang="scss" scoped>
    .commodity-square{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        /*顶部导航栏*/
        .square-navigate{
            display: flex;
            width: 100%;
            span{
                display: block;
                width: 20%;
                text-align: center;
                padding: 10px 0px;
                border-top: 1px solid #ebeef4;
                border-bottom: 1px solid #ebeef4;
            }
        }
        .square-cards{
            flex: 1;
            width: 100%;
            padding: 10px 10px;
            overflow-y: auto;
        }
        .activatedNav{
            color: #ff2150;
            border-bottom: 1px solid #ff2150 !important;
        }
        /*功能按钮*/
        .tool-btns{
            position: fixed;
            right: 5px;
            bottom: 70px;
            display: flex;
            flex-direction: column;
            img{
                width: 50px;
            }
        }

        /*筛选弹出框*/
        .filter-popup{
            h2{
                position: absolute;
                top:0;
                width: 100%;
                color: #999;
                background-color: #eee;
                font-size: 16px;
                font-weight: normal;
                padding: 5px;
            }
            .filter-choices{
                position: relative;
                top: 40px;
                bottom: 25px;
                padding: 0px 10px;
                .filter-choice{
                    h3{
                        font-weight: normal;
                        font-size: 14px;
                        margin-bottom: 10px;
                    }
                    .filter-btns{
                        display: flex;
                        align-items: center;
                        flex-wrap: wrap;
                        span{
                            display: inline-block;
                            padding: 5px 10px;
                            line-height: 18px;
                            font-size: 13px;
                            color: #999;
                            background-color: #eee;
                            margin-right: 10px;
                            margin-bottom: 10px;
                            vertical-align: middle;
                        }
                        input{
                            width: 30%;
                        }
                    }
                }
            }
            button{
                position: absolute;
                bottom: 0;
                padding: 10px 0px;
                width: 100%;
                font-size: 16px;
                color: #fefefe;
                background-color: #ff2150;
                border: none;
            }
        }
    }
</style>