<template>
    <div class="sidebar">
        <div class="function-box" @click="changeRoute(index)" v-for="(item,index) in functionList" :key="index">
            <img :src="item.icon" alt="">
            <p>{{item.name}}</p>
        </div>
    </div>
</template>

<script>
import bus from '../common/bus';
export default {
    data() {
        return {
            functionList:[
                {name:'影单',icon:require('@/assets/img/movie.png')},
                {name:'周边',icon:require('@/assets/img/around.png')},
                {name:'商城',icon:require('@/assets/img/market.png')},
                {name:'我的',icon:require('@/assets/img/personal.png')}
            ]
        };
    },
    created() {

    },
    methods:{
        changeRoute(index){
            console.log(index)
            switch (index) {
                case 0:
                    this.$router.push('/home');
                    break;
                case 1:
                    this.$router.push('/market');
                    break;
                case 2:
                    this.$router.push('/commoditySquare');
                    break;
                case 3:
                    this.$router.push('/person');
                    break;
            }
        }
    }
};
</script>

<style scoped>
    .sidebar {
        display: flex;
        position: absolute;
        width:100%;
        height:60px;
        bottom: 0;
    }
    .function-box{
        width: 25%;
        height:100%;
        text-align: center;
        border-right: 1px solid #000000;
        border-top: 1px solid #000000;
    }
    .function-box:last-child{
        border-right: none;
    }
</style>
