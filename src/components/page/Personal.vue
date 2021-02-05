<template>
    <div class="personal-content">
        <!--用户基本信息-->
        <div class="basic-information">
            <img :src="profileUrl" alt="">
            <div class="information-list">
                <p>{{username}}</p>
                <p>加入时间：{{joinTime}}</p>
                <p>个性签名：{{signature}}</p>
            </div>
            <span class="personal-setting">设置</span>
        </div>
        <!--用户日记-->
        <div class="personal-diary">
            <div class="diary-header">
                <h3>我的日记 · · · · · ·(<span>全部</span>)</h3>
                <button>+写日记</button>
            </div>
            <div class="diary-list">
                <span class="spare-text" v-if="!diaryNum||diaryNum<1">在豆瓣上写日记，记录自己的生活、想法。</span>
                <div class="diary-wrap" v-if="diaryNum>0" v-for="(item,index) in diaryList" :key="index">
                    <p class="diary-title">{{item.title}}<span>{{item.time}}</span></p>
                    <p class="diary-content">{{item.content.fold?item.content.briefContent:item.content.content}}<span v-if="item.content.enoughLength">(<a @click="toggleFold('diaryList',index)" href="javascript:void(0)">{{item.content.fold?'展开':'收起'}}</a>)</span></p>
                </div>
            </div>
        </div>
        <!--用户相册-->
        <div class="personal-album">
            <div class="album-header">
                <h3>我的相册 · · · · · ·(<span>创建</span>)</h3>
                <button>+发照片</button>
            </div>
            <div class="album-list">
                <span class="spare-text" v-if="!albumNum||albumNum<1">可以有自己的相册存放照片了。</span>
                <img v-if="albumNum>0" v-for="(item,index) in albumList" :src="item" alt="" :key="index">
            </div>
        </div>
        <!--我读过的书-->
        <div class="personal-book">
            <h3>我读 · · · · · ·(<span>{{bookNum.willRead}}本想读</span>·<span>{{bookNum.haveRead}}本读过</span>)</h3>
            <span class="spare-text" v-if="!bookNum.willRead&&!bookNum.haveRead">在这里存放你心水的书。</span>
            <div v-if="bookNum.willRead" class="book-willRead">
                <span>想读</span>
                <img v-for="(item,index) in unreadBookList" :key="index" :src="item.url" :alt="item.name">
            </div>
            <div v-if="bookNum.haveRead" class="book-haveRead">
                <span>已读</span>
                <img v-for="(item,index) in readBookList" :key="index" :src="item.url" :alt="item.name">
            </div>
        </div>
        <!--我看过的电影-->
        <div class="personal-movie">
            <h3>我看 · · · · · ·(<span>{{movieNum.willWatch}}部想看</span>·<span>{{movieNum.haveWatch}}部看过</span>)</h3>
            <div class="movie-list">
                <span class="spare-text" v-if="!movieNum.willWatch&&!movieNum.haveWatch">在这里展列与你有关的电影。</span>
                <div v-if="movieNum.willWatch" class="movie-willWatch">
                    <span>想看</span>
                    <img v-for="(item,index) in watchMovieList" :key="index" :src="item.url" :alt="item.name">
                </div>
                <div v-if="movieNum.haveWatch" class="movie-haveWatch">
                    <span>已看</span>
                    <img v-for="(item,index) in unwatchMovieList" :key="index" :src="item.url" :alt="item.name">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {getUserPersonalInformation} from '@/api/personalInformation.js';

    export default {
        name: 'Personal',
        data(){
            return {
                profileUrl:'',
                username:'',
                joinTime:'',//加入时间
                signature:'',//个性签名
                diaryNum:0,//日记篇数
                diaryList:[],//历史日记
                albumNum:0,//相册篇数
                albumList:[],//相册列表
                bookNum:{willRead:0,haveRead:0},//历史图书
                readBookList:[],//已读图书列表
                unreadBookList:[],//未读图书列表
                movieNum:{willWatch:0,haveWatch:0},//历史电影
                watchMovieList:[],//已看电影列表
                unwatchMovieList:[]//未看电影列表
            }
        },
        methods:{
            async getPersonalInformation(){
                try{
                    const result=await getUserPersonalInformation('/queryPersonalInformation',{id:'bd1602639472032'})
                    const personalInfo=result.data
                    this.profileUrl=personalInfo.profileUrl
                    this.username=personalInfo.name
                    this.joinTime=personalInfo.joinTime
                    this.signature=personalInfo.signature
                    this.diaryNum=parseInt(personalInfo.diaryNum)
                    this.diaryList=JSON.parse(personalInfo.diaryList)
                    this.bookNum=JSON.parse(personalInfo.bookNum)
                    this.readBookList=JSON.parse(personalInfo.readBookList)
                    this.unreadBookList=JSON.parse(personalInfo.unreadBookList)
                    this.movieNum=JSON.parse(personalInfo.movieNum)
                    this.watchMovieList=JSON.parse(personalInfo.watchMovieList)
                    this.unwatchMovieList=JSON.parse(personalInfo.unwatchMovieList)

                    //对日记篇幅进行裁剪
                    this.diaryList.forEach((value, index) => value.content=this.cutWords(value.content,100))
                }catch (e) {
                    console.error(e)
                }
            },
            cutWords(name,length){
                if((typeof name==='string')&&(typeof length==='number')&&name.length>length){
                    return {
                        content:name,
                        briefContent:name.slice(0,length-1)+'...',
                        fold:true,
                        enoughLength:true
                    }
                }else{
                    return {
                        content:name,
                        briefContent:name,
                        fold:false,
                        enoughLength:false
                    }
                }
            },
            toggleFold(name,index){
                if(index>-1){
                    this[name][index].content.fold=!this[name][index].content.fold
                }else if(index<0||!index){
                    this[name].fold=!this[name].fold
                }
            }
        },
        created() {
            this.getPersonalInformation()
        }
    };
</script>

<style lang="scss" scoped>
    .personal-content{
        width:100%;
        height:100%;
        overflow-y: auto;
        padding: 5px 10px;
        h3{
            font-weight: normal;
            font-size: 16px;
            color: #072;
            vertical-align: middle;
            span{
                color: #37a;
                font-size: 14px;
            }
        }

        /*变量定义*/
        $moduleBottom:10px;
        $headerBottom:3px;
        @mixin header{
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: $headerBottom;
            button{
                color: #777;
                font-size: 14px;
                background-color: #fcf7f3;
                border: 1px solid #edded4;
                padding: 2px 4px;
            }
        }
        .spare-text{
            font-size: 12px;
        }

        /*用户基本信息*/
        .basic-information{
            width: 100%;
            display: flex;
            align-items: center;
            background-color: #fff6ed;
            margin-bottom: $moduleBottom;
            position: relative;
            img{
                width: 25%;
            }
            .information-list{
                flex: 1;
                margin-left: 10px;
                p:first-child{
                    font-weight: bolder;
                    font-size: 20px;
                }
                p:not(:first-child){
                    font-size: 14px;
                    color: #666666;
                }
            }
            .personal-setting{
                position: absolute;
                font-size: 14px;
                top:10px;
                right: 10px;
            }
        }

        /*用户日记*/
        .personal-diary{
            width:100%;
            margin-bottom: $moduleBottom;
            .diary-header{
                @include header
            }
            .diary-list{
                width:100%;
                .diary-wrap{
                    width:100%;
                    margin-bottom: 3px;
                    .diary-title{
                        font-size: 14px;
                        font-weight: bold;
                        span{
                            margin-left: 20px;
                            font-size: 12px;
                            font-weight: normal;
                        }
                    }
                    .diary-content{
                        font-size: 12px;
                    }
                }
                .diary-wrap:not(:last-child){
                    margin-bottom: 0px;
                }
            }
        }

        /*用户相册*/
        .personal-album{
            width:100%;
            margin-bottom: $moduleBottom;
            .album-header{
                @include header
            }
            .album-list{}
        }

        /*我读过的书*/
        @mixin movieAndBook{
            width: 100%;
            overflow-x: auto;
            display: flex;
            align-items: center;
            color: #acacac;
            font-size: 12px;
            img{
                height: 30vw;
                margin-left: 8px;
            }
        }
        .personal-book{
            width: 100%;
            h3{
                margin-bottom: $headerBottom;
            }
            margin-bottom: $moduleBottom;
            .book-willRead,.book-haveRead{
                @include movieAndBook;
            }
            .book-willRead{
                margin-bottom: 10px;
            }
        }
        /*我看过的电影*/
        .personal-movie{
            width:100%;
            h3{
                margin-bottom: $headerBottom;
            }
            margin-bottom: $moduleBottom;
            .movie-willWatch,.movie-haveWatch{
                @include movieAndBook;
            }
            .movie-willWatch{
                margin-bottom: 10px;
            }
        }
    }
</style>