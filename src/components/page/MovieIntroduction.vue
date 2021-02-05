<template>
    <div class="movie-information">
        <!--电影标题-->
        <div class="movie-title">
            <h1>{{title}}</h1>
        </div>
        <!--电影制作信息-->
        <div class="movie-production">
            <div class="poster">
                <img :src="production.imgUrl" alt="电影海报">
            </div>
            <div class="production-list">
                <p>导演：{{production.director}}</p>
                <p>编剧：{{production.scriptWriter}}</p>
                <p>主演：{{production.actor}}</p>
                <p>类型：{{production.type}}</p>
                <p>制片国家/地区：{{production.origin}}</p>
                <p>语言：{{production.language}}</p>
                <p>时长：{{production.duration}}</p>
            </div>
        </div>
        <!--电影打分信息-->
        <div class="movie-rate">
            <h3>豆瓣评分</h3>
            <div class="whole-rate">
                <p>{{rate}}</p>
                <div class="rate-wrap">
                    <van-rate v-model="rate" gutter="1" size="14" color="#fec151" readonly />
                    <p>492842人评价</p>
                </div>
            </div>
            <div class="rate-distribution" ref="rateDistribution"></div>
        </div>
        <!--电影剧情简介-->
        <div class="movie-abstraction">
            <h3>{{name}}的剧情简介 · · · · · ·</h3>
            <p>{{abstraction.fold?abstraction.briefContent:abstraction.content}}<span v-if="abstraction.enoughLength">(<a @click="toggleFold('abstraction')" href="javascript:void(0)">{{abstraction.fold?'展开':'收起'}}</a>)</span></p>
        </div>
        <!--电影人员-->
        <div class="movie-crew">
            <h3>{{name}}的演职人员 · · · · · ·</h3>
            <div class="crew-list">
                <div class="crew-info" v-for="(item,index) in crew" :key="index">
                    <img :src="item.img" alt="">
                    <p>{{cutWords(item.name,7).briefContent}}</p>
                    <p>{{cutWords(item.vocation,7).briefContent}}</p>
                </div>
            </div>
        </div>
        <!--视频和图片-->
        <div class="movie-picture">
            <h3>{{name}}的视频和图片 · · · · · ·</h3>
            <div class="picture-list">
                <video v-for="(item,index) in video" :key="index" :src="item"></video>
                <img v-for="(item,index) in pictures" :key="index" :src="item" alt="电影截图">
            </div>
        </div>
        <!--获奖情况-->
        <div class="movie-prize">
            <h3>{{name}}的获奖情况 · · · · · ·</h3>
            <ul>
                <li v-for="(item,index) in prizes" :key="index">
                    <span class="prize-festival">{{item.name}}</span>
                    <span class="prize-name">{{item.prize}}</span>
                    <span class="prize-owner">{{item.owner}}</span>
                </li>
            </ul>
        </div>
        <!--网友打分-->
        <div class="movie-comments">
            <h3>{{name}}的短评 · · · · · ·</h3>
            <div class="comments-wrap">
                <div class="comments-content" v-for="(item,index) in comments" :key="index">
                    <div class="comments-header">
                        <span>{{item.name}} 看过</span>
                        <van-rate v-model="item.rate" size="14" gutter="2" color="#fec151"></van-rate>
                        <span>{{item.time}}</span>
                    </div>
                    <p>{{item.content.fold?item.content.briefContent:item.content.content}}<span v-if="item.content.enoughLength">(<a @click="toggleFold('comments',index)" href="javascript:void(0)">{{item.content.fold?'展开':'收起'}}</a>)</span></p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import * as echarts from 'echarts'
    import {getMovieIntroduction} from '@/api/movieIntroduction.js';

    export default {
        name: 'MovieIntroduction',
        props:{
            title:{
                type:String
            }
        },
        data(){
            return {
                name:'',
                production:{
                    imgUrl:'',
                    director:'',
                    scriptWriter:'',
                    actor:'',
                    type:'',
                    origin:'',
                    language:'',
                    duration:''
                },
                rate:0,
                stars:[],
                abstraction:'',
                crew:[{img:'',vocation:'',name:''}],
                video:[],
                pictures:[],
                prizes:[{name:'',prize:'',owner:''}],
                comments:[{name:'',rate:0,time:'',content:''}]
            }
        },
        methods:{
            async getMovie() {
                try {
                    const result=await getMovieIntroduction('/queryMovie',{id:this.$route.params.id})
                    const movie=result.data
                    this.title=movie.name
                    this.name=movie.name.split(' ')[0]
                    this.stars=JSON.parse(movie.stars)
                    this.crew=JSON.parse(movie.crew)
                    this.video=JSON.parse(movie.video)
                    this.pictures=JSON.parse(movie.pictures)
                    this.prizes=JSON.parse(movie.prizes)
                    this.comments=JSON.parse(movie.comments)
                    this.rate=movie.rate
                    this.abstraction=movie.abstraction
                    //production
                    this.production={
                        imgUrl:movie.imgUrl,
                        director:movie.director,
                        scriptWriter:movie.scriptWriter,
                        actor:movie.actor,
                        type:movie.type,
                        origin:movie.origin,
                        language:movie.language,
                        duration:movie.duration
                    }

                    //comments、abstraction字符串信息处理
                    this.comments.forEach((value, index) => value.content=this.cutWords(value.content,100))
                    this.abstraction=this.cutWords(this.abstraction,100)
                }catch (e) {
                    console.error(e);
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
            },
            async initChart(){
                await this.getMovie()
                const starArr=this.stars.map(value => Object.keys(value)[0])
                let rateArr=this.stars.map(value => value[Object.keys(value)[0]])
                rateArr=rateArr.map(value => parseFloat(value.replace('%','')))
                console.log(rateArr)
                const myCharts=echarts.init(this.$refs.rateDistribution)
                const option = {
                    xAxis: {
                        type:'value',
                        show:false
                    },
                    yAxis: {
                        type: 'category',
                        data: starArr,
                        show:true,
                        axisLine:{
                            show:false,
                        },
                        axisTick:{
                            show:false
                        },
                        axisLabel:{
                            color:'#9b9b9b',
                            margin:5,
                            padding:[3,0,0,0],
                            lineHeight:10
                        }
                    },
                    grid:{
                        width:'78%',
                        height:'100%',
                        top:'0px',
                        left:'25px'
                    },
                    series: [
                        {
                            type: 'bar',
                            barWidth:10,
                            barCategoryGap: '5%',  // 柱形的间距
                            label: {
                                show: true,
                                position: 'right',
                                color:'#9b9b9b',
                                offset:[0,2],
                                formatter:'{c}%'
                            },
                            itemStyle:{
                                color: '#ffd596'
                            },
                            data: rateArr
                        }
                    ]
                };
                myCharts.setOption(option)
                window.onresize=myCharts.resize()
            }
        },
        mounted() {
            this.initChart()
        }
    };
</script>

<style lang="scss" scoped>
    .movie-information {
        width: 100%;
        height: 100%;
        overflow-y: auto;
        padding: 0 5px;
        h3{
            margin-bottom: 8px;
            color: #007722;
            font-size: 16px;
            font-weight: normal;
        }
        a{
            color: #37a;
        }
        a:visited{
            color: #669;
        }

        /*电影标题*/
        .movie-title{
            width: 100%;
            h1{
                font-size: 24px;
                color: #494949;
            }
        }

        /*电影制作信息*/
        .movie-production{
            width: 100%;
            display: flex;
            font-size: 14px;
            .poster{
                flex: 1;
                img{
                    width: 100%;
                    object-fit: contain;
                    position: relative;
                    top:50%;
                    transform: translateY(-50%);
                }
            }
            .production-list{
                width: 65%;
                display: flex;
                flex-direction: column;
                justify-content: center;
            }
        }

        /*电影评分*/
        .movie-rate{
            width:100%;
            margin-bottom: 8px;
            .whole-rate{
                display: flex;
                p{
                    font-weight: bolder;
                    font-size: 26px;
                    margin-right: 10px;
                    margin-top: 3px;
                }
                .rate-wrap{
                    text-align: center;
                    p{
                        font-size: 12px;
                        font-weight: normal;
                        margin-top: 0px;
                        margin-right: 0px;
                        color: #37a;
                    }
                }
            }
            .rate-distribution{
                width:60%;
                height:80px;
            }
        }

        /*电影简介*/
        .movie-abstraction{
            margin-bottom: 8px;
            p{
                font-size: 12px;
                text-indent: 24px;
            }
        }

        /*制作人员*/
        .movie-crew{
            width: 100%;
            margin-bottom: 8px;
            .crew-list{
                width:100%;
                display: flex;
                overflow-x: auto;

                .crew-info{
                    font-size: 12px;
                    margin-right: 8px;
                    text-align: center;
                    img{
                        height: 30vw;
                    }
                    p:last-child{
                        color: #9b9b9b;
                    }
                }
                .crew-info:last-child{
                    margin-right: 0;
                }
            }
        }

        /*视频和图片*/
        .movie-picture{
            width: 100%;
            margin-bottom: 8px;
            .picture-list{
                width: 100%;
                display: flex;
                overflow-x: auto;
                img{
                    height: 25vw;
                    object-fit: contain;
                    margin-right: 6px;
                }
            }
        }

        /*获奖信息*/
        .movie-prize{
            margin-bottom: 8px;
            font-size: 12px;
            .prize-festival,.prize-name{
                margin-right: 8px;
            }
        }

        /*网友打分*/
        .movie-comments{
            width: 100%;
            font-size: 12px;
            .comments-wrap{
                width: 100%;
                .comments-content{
                    width:100%;
                    border-top: 1px solid #9b9b9b;
                    padding: 8px 0;
                    .comments-header{
                        display: flex;
                        align-items: center;
                        span:first-child,.van-rate{
                            margin-right: 8px;
                        }
                        span:last-child{
                            color: #9b9b9b;
                        }
                    }
                }
            }
        }
    }
</style>