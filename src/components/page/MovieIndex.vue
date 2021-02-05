<template>
    <div class="movie-content">
        <div class="movie-panel">
            <van-swipe :autoplay="3000">
                <van-swipe-item v-for="(item,index) in panelList" :key="index">
                    <img :src="item.url" alt="">
                </van-swipe-item>
            </van-swipe>
        </div>
        <div class="movie-grid">
            <van-grid :border="false" :column-num="3" :gutter="5">
                <van-grid-item v-for="(item,index) in gridList" :key="index">
                    <img @click="getMovieDetail(item.id)" :src="item.imgUrl" alt="">
                    <span>{{item.name}}</span>
                </van-grid-item>
            </van-grid>
        </div>
    </div>
</template>

<script>
    import {getMovieListItems} from '@/api/movieIntroduction.js';

    export default {
        name: 'MovieIndex',
        data(){
            return {
                panelList:[
                    {name:'卑鄙的我',url:require('@/assets/img/moviePanel/卑鄙的我.jpg')},
                    {name:'绿皮书',url:require('@/assets/img/moviePanel/绿皮书.jpg')},
                    {name:'让子弹飞',url:require('@/assets/img/moviePanel/让子弹飞 2.jpg')},
                    {name:'速度与激情',url:require('@/assets/img/moviePanel/速度与激情.jpg')}
                ],
                gridList:[]
            }
        },
        methods:{
            getMovieDetail(id){
                this.$router.push({name:'movie',params:{id:id}})
            }
        },
        created() {
            /*获取轮播图最新的电影列表信息*/

            /*获取网格布局中的电影列表信息*/
            getMovieListItems('/queryMovieListItems').then(result=>{
                const data=result.data
                this.gridList=data
            })
        }
    };
</script>

<style scoped>
    .movie-content{
        width: 100%;
        height: 100%;
    }
    .movie-panel{
        width: 100%;
        height: 30%;
        margin-top: 10px;
        margin-bottom: 10px;
    }
    .van-swipe{
        text-align: center;
        height: 100%;
    }
    .movie-panel img{
        height: 100%;
    }
    .movie-grid{
        width: 100%;
        height: calc(70% - 20px);
        overflow-y: auto;
    }
    .movie-grid img{
        width: 100%;
        height: 90%;
    }
</style>