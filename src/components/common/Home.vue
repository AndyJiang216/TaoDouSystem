<template>
    <div class="content-box">
        <Header :title="routeName" />
        <div class="content">
            <transition name="move" mode="out-in">
                <keep-alive :include="routerList">
                    <router-view></router-view>
                </keep-alive>
            </transition>
        </div>
        <Sidebar />
    </div>
</template>

<script>
import bus from './bus';
import Sidebar from './Sidebar';
import Header from './Header';
export default {
    data() {
        return {
            routerList:[],
            routeName:''
        };
    },
    components:{
        Sidebar,
        Header
    },
    watch:{
        $route(to,from){
            this.routeName=to.meta.title
        }
    },
    mounted() {
        this.routeName=this.$route.meta.title
    }
};
</script>
<style scoped>
    .content-box{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
    }
    .content{
        width: 100%;
        height: calc(100% - 100px);
        margin-top: 40px;
    }
</style>