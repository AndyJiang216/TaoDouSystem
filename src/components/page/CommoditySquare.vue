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
        </div>
    </div>
</template>

<script>
    import CommodityList from '../common/CommodityList';
    import CommodityFlatList from '../common/CommodityFlatList';
    import {getAllCommodityListItems} from '@/api/commodityAndShop.js';

    export default {
        name: 'CommoditySquare',
        components:{CommodityList,CommodityFlatList},
        data(){
            return {
                value:'',
                commodityListArr:[],//商品信息数组
                activeIndex:0,//导航栏当前激活的列表项序号
                navigateArr:['综合','销量','价格','店铺','筛选'],//导航栏列表项内容
                flatStyle:true,//商品栏商品信息展示方式，flat表示平铺式一行展示一个商品
            }
        },
        methods:{
            onSearch(){

            },
            onCancel(){

            },
            /*激活导航栏标签项*/
            activeNavigateItem(index){
                if(index>=0&&index<4){
                    this.activeIndex=index
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
        }
    };
</script>

<style lang="scss" scoped>
    .commodity-square{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
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
    }
</style>