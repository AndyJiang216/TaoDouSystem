<template>
    <div class="header">
        <span>{{title}}</span>
        <!--<div class="upload-demo">
            <input type="file" id="fileInt"  multiple="multiple" />
            <input type="submit" id="submitBtn" value="提交" @click="changeHandle"/>
        </div>-->
    </div>
</template>

<script>
    import axios from 'axios'
    import {addMovieIntroduction} from '@/api/movieIntroduction.js'
    import {addUserPersonalInformation} from '@/api/personalInformation.js';
    import {addCommodity,addShop,addCommodityListItem} from '@/api/commodityAndShop.js';
    import {addMovieListItem} from '@/api/movieIntroduction';

    export default {
        name: 'Header',
        props:{
            title:String
        },
        data(){
            return {}
        },
        methods:{
            submitMovie(){
                const movie={
                    name:'心灵奇旅 Soul',
                    rate:8.9,
                    stars:[{'1星':'0.1%'},{'2星':'0.6%'},{'3星':'9.4%'},{'4星':'36.2%'},{'5星':'53.6%'}],
                    abstraction:'究竟是什么塑造了真正的你？电影将聚焦乔伊·高纳（杰米·福克斯配音）。这位中学音乐老师获得了梦寐以求的机会——在纽约最好的爵士俱乐部演奏。但一个小失误把他从纽约的街道带到了一个奇幻的地方“生之来处”（the Great Before）。在那里，灵魂们获得培训，在前往地球之前将获得他们的个性特点和兴趣。决心要回到地球生活的乔伊认识了一个早熟的灵魂“二十二”（蒂娜·菲 配音），二十二一直找不到自己对于人类生活的兴趣。随着乔伊不断试图向二十二展示生命的精彩之处，他也将领悟一些人生终极问题的答案。',
                    crew:[
                        {img:'http://localhost:3000/file1610955271673.jpg',vocation:'导演',name:'彼特·道格特'},
                        {img:'http://localhost:3000/file1610955180359.jpg',vocation:'联合执导',name:'凯普·鲍尔斯'},
                        {img:'http://localhost:3000/file1610955180341.jpg',vocation:'配 Joe Gardner',name:'杰米·福克斯'},
                        {img:'http://localhost:3000/file1610955180377.jpg',vocation:'配 22',name:'蒂娜·菲'},
                        {img:'http://localhost:3000/file1610955180348.jpg',vocation:'配 Libba Gardner',name:'菲利西亚·拉斯海德'}
                    ],
                    video:[],
                    pictures:['http://localhost:3000/file1610955271671.jpg','http://localhost:3000/file1610955180370.jpg','http://localhost:3000/file1610955426022.jpg'],
                    prizes: [
                        {name:'第73届戛纳电影节',prize:'动画片(提名)',owner:''},
                        {name:'第41届伦敦影评人协会奖',prize:'技术成就奖(提名)',owner:'彼特·道格特'},
                        {name:'第46届洛杉矶影评人协会奖',prize:'最佳配乐',owner:'特伦特·雷诺 / 阿提喀斯·罗斯'}
                    ],
                    comments:[
                        {name:'盲忙',rate:4,time:'2020-12-14',content:'又挤又破的地铁，黄色的出租车，雄壮的布鲁克林大桥，哈德逊河上远眺万家灯火，曼哈顿的秋色，小酒吧里的爵士乐，这就是纽约啊。理想如果都实现了，那然后呢？你会继续问自己，人活着最重要是什么？不是爱，不是恨，不是痛，也不是成功与失败，而是感知，有些人把它看作是庸俗的生活，有人却认为它是活着的全部意义。两首歌太好听了，听完瞬间觉得生活美好了起来。'},
                        {name:'Mr.Infamous',rate:4,time:'2020-12-26',content:'格外理解二十二。小时候被名人励志，长大才发现那真是一种无垠的压力，万里挑一的人以巨大的差距提醒你越来越是个失败者，你永远不够好。但观星赏月，听虫嗅花，也是人生最无用又最有用的修行，生活过得越来越糟心，不贪这星星点点的美好，撑一撑，顶一顶，我们这些庸碌之辈，早该熄灭了吧。颓败了一整年，我太感激这部温热的电影了，依然有绝佳的想象力供人移情，真想陪他们，在忘我或迷失时，哭哭啼啼一回。活着真的很不如意，但还能活着，真的很幸运。能跟所爱之人来看，也很幸运。影院这低排片真是叫人不齿。'},
                        {name:'徐若风',rate:4,time:'2020-12-25',content:'一部“圣诞（半）福音”动画，和《生活真美好》拥有同个内核，算档期应景了。当然片中的“生之来处”并非是传统意义上基督教的“天堂”，而是来自宇宙高纬度的“量子空间”，甚至只要忘我就可以投魂而入，倒是接近于“天人合一之际”的概念。千年的厌世灵魂在世间走一遭，体会到了生活的乐趣；世俗意义上过着无趣日子的“音乐打工人”也在变换人生的反观后，意识到生活的本质不是苦追目标而是“活在当下”。两个故事都挺暖心，同时也稍显保守，后半段“美式畅销生活哲学”的气息扑面。不过“在世”也确实应如此， “寄蜉蝣于天地，渺沧海之一粟。哀吾生之须臾，羡长江之无穷。挟飞仙以遨游，抱明月而长终。”一生的光阴就在每一瞬，我们与世界的关系很多时候是“时隐时现”的，隐时如风吹过，现时啃个披萨，没有目标就是目标，没有意义也是意义。'},
                        {name:'朝阳区陆依萍',rate:4,time:'2020-12-14',content:'的确在今年看，具有抚慰人心的力量，但也就抚慰了不到3分钟吧～'},
                        {name:'同志亦凡人中文站',rate:4,time:'2020-12-28',content:'反向励志的心灵鸡汤，生命不是一场竞赛，活着的意义在于活着本身。22的落点好像是印度还是中国...（地狱难度啊，提前心疼一波）'}
                    ]
                }
                movie.production={
                    imgUrl:'http://localhost:3000/file1610955271674.jpg',
                    director:'彼特·道格特 / 凯普·鲍尔斯',
                    scriptWriter:'彼特·道格特 / 麦克·琼斯 / 凯普·鲍尔斯',
                    actor:'杰米·福克斯 / 蒂娜·菲 / 菲利西亚·拉斯海德 / 阿米尔-卡利布·汤普森 / 戴维德·迪格斯',
                    type:'动画/音乐/奇幻',
                    origin:'美国',
                    language:'英语',
                    duration:'101分钟'
                }
                addMovieIntroduction('/addMovie',movie).then(res=>{
                    console.log(res)
                }).catch(err=>{
                    console.error(err)
                })
            },
            submitPersonalInformation(){
                const personalInfo={
                    id:'bd1602639472032',
                    name:'JiangLong',
                    profileUrl:'http://localhost:3000/personalInfo/file1611556817712.jpg',
                    joinTime:'2012-07-12',
                    signature:'吾心即是宇宙',
                    diaryNum:2,
                    diaryList:[
                        {title:'此心安处是吾乡',time:'2013-09-10',content:'常常羡慕这世间如玉雕琢般丰神俊朗的男子（指王定国），就连上天也怜惜他，赠予他柔美聪慧的佳人（指寓娘）与之相伴。人人称道那女子歌声轻妙，笑容柔美，风起时，那歌声如雪片飞过炎热的夏日使世界变得清凉。你（指寓娘）从遥远的地方归来却看起来更加年轻了，笑容依旧，笑颜里好像还带着岭南梅花的清香；我问你：“岭南的风土应该不是很好吧？”你却坦然答道：“心安定的地方，便是我的故乡。”'},
                        {title:'吾心即是宇宙',time:'2019-03-23',content:'陆九渊比较认同思孟一派的心性儒学，继承了孔子、曾子、子思、孟子、程颐的思想。有一天他读古书，看到“宇宙”二字，突有所悟，说到：四方上下曰宇，往古来今曰宙。提出了“宇宙内事乃己分内事，己分内事乃宇宙内事”的想法，认为心即是理，宇宙也是理，由此他说出了一句影响深远的话：吾心即宇宙，宇宙即吾心。这是心学的根本。'}
                    ],
                    albumNum:0,
                    albumList:[],
                    bookNum:{willRead: 2,haveRead: 3},
                    readBookList:[{id:'',name:'查拉图斯特拉如是说',url:'http://localhost:3000/personalInfo/file1611556817713.jpg'},{id:'',name:'经济学原理',url:'http://localhost:3000/personalInfo/file1611557005089.jpg'},{id:'',name:'人类简史',url:'http://localhost:3000/personalInfo/file1611557005090.jpg'}],
                    unreadBookList:[{id:'',name:'资本论',url:'http://localhost:3000/personalInfo/file1611557022172.jpg'},{id:'',name:'小王子',url:'http://localhost:3000/personalInfo/file1611557065552.jpg'}],
                    movieNum:{willWatch:2,haveWatch:2},
                    watchMovieList:[{id:'',name:'盗梦空间',url:'http://localhost:3000/personalInfo/file1611557005086.jpg'},{id:'',name:'摔跤吧！爸爸',url:'http://localhost:3000/personalInfo/file1611557022170.jpg'}],
                    unwatchMovieList:[{id:'',name:'复仇者联盟4：终局之战',url:'http://localhost:3000/personalInfo/file1611557065551.jpg'},{id:'',name:'肖申克的救赎',url:'http://localhost:3000/personalInfo/file1611557022171.jpg'}]
                }
                addUserPersonalInformation('/addPersonalInformation',personalInfo).then(res=>{
                    console.log(res)
                }).catch(err=>{
                    console.error(err)
                })
            },
            submitCommodity(){
                const commodity={
                    name:'飞屋环游记靠垫',
                    showImgList:['http://localhost:3000/commodity/file1611734565005.jpg','http://localhost:3000/commodity/file1611734565006.jpg','http://localhost:3000/commodity/file1611734597692.jpg','http://localhost:3000/commodity/file1611734624783.jpg'],
                    choices:{
                        size:{
                            name:'尺寸',
                            list:['40cm*40cm','60cm*60cm','80cm*80cm']
                        },
                        material:{
                            name:'材质',
                            list:['进口纯棉','进口冰丝','原装羊绒']
                        },
                        plus:{
                            name:'附加服务',
                            list:['可拆洗','加流苏']
                        }
                    },
                    sendAddress:'上海',
                    parameters:'7天无理由退货 正品保障 无忧购',
                    detailImgList:['http://localhost:3000/commodity/file1611734565007.jpg','http://localhost:3000/commodity/file1611734565008.jpg','http://localhost:3000/commodity/file1611734624784.jpg'],
                    shopID:'shop1611882114221'
                }
                const commodity2={
                    name:'巴斯光年官方授权玩具',
                    showImgList:['http://localhost:3000/commodity/file1611889109715.jpg','http://localhost:3000/commodity/file1611889109717.jpg','http://localhost:3000/commodity/file1611889109718.jpg','http://localhost:3000/commodity/file1611889167290.jpg'],
                    choices:{
                        size:{
                            name:'尺寸',
                            list:['20cm','35cm']
                        },
                        plus:{
                            name:'附加服务',
                            list:['银色圣剑','激光剑']
                        }
                    },
                    sendAddress:'杭州',
                    parameters:'7天无理由退货 正品保障 极速发货',
                    detailImgList:['http://localhost:3000/commodity/file1611889137673.jpg','http://localhost:3000/commodity/file1611889167291.jpg','http://localhost:3000/commodity/file1611889200822.jpg'],
                    shopID:'shop1611882114221'
                }
                addCommodity('/addCommodity',commodity2).then(res=>{
                    console.log(res)
                }).catch(err=>{
                    console.error(err)
                })
            },
            submitShop(){
                const shop={
                    name:'迪士尼官方旗舰店',
                    type:'百货',
                    beginTime:'2010-05-13',
                    credit:98,
                    member:1374061
                }
                const shop2={
                    name:'Nike官方旗舰店',
                    type:'鞋类',
                    beginTime:'2006-03-12',
                    credit:99,
                    member:6771579
                }
                const shop3={
                    name:'LV官方旗舰店',
                    type:'鞋类',
                    beginTime:'2009-11-08',
                    credit:98,
                    member:7871531,
                    imgUrl:'http://localhost:3000/shop/file1612660164646.jpg'
                }
                const shop4={
                    name:'ZARA中国官方旗舰店',
                    type:'鞋类',
                    beginTime:'2015-07-18',
                    credit:99,
                    member:1258901,
                    imgUrl:'http://localhost:3000/shop/file1612660164645.jpg'
                }
                const shop5={
                    name:'山本耀司官方旗舰店',
                    type:'鞋类',
                    beginTime:'2016-09-16',
                    credit:99,
                    member:174780,
                    imgUrl:'http://localhost:3000/shop/file1612660203485.jpg'
                }
                addShop('/addShop',shop5).then(res=>{
                    console.log(res)
                }).catch(err=>{
                    console.error(err)
                })
            },
            submitMovieListItem(){
                const movieItem=[{
                    name:'教父',
                    imgUrl: 'http://localhost:3000/movieGrid/file1612167179627.jpg'
                },{
                    name:'肖申克的救赎',
                    imgUrl: 'http://localhost:3000/movieGrid/file1612167155939.jpg'
                },{
                    name:'让子弹飞',
                    imgUrl: 'http://localhost:3000/movieGrid/file1612167155938.jpg'
                },{
                    name:'低俗小说',
                    imgUrl: 'http://localhost:3000/movieGrid/file1612167155937.jpg'
                },{
                    name:'盗梦空间',
                    imgUrl: 'http://localhost:3000/movieGrid/file1612167155935.jpg'
                },{
                    name:'心灵奇旅',
                    imgUrl: 'http://localhost:3000/movieGrid/file1612167053957.jpg'
                },{
                    name:'头号玩家',
                    imgUrl: 'http://localhost:3000/movieGrid/file1612167053956.jpg'
                },{
                    name:'菊次郎的夏天',
                    imgUrl: 'http://localhost:3000/movieGrid/file1612167053955.jpg'
                },{
                    name:'第六感',
                    imgUrl: 'http://localhost:3000/movieGrid/file1612167053954.jpg'
                },{
                    name:'阿甘正传',
                    imgUrl: 'http://localhost:3000/movieGrid/file1612167053953.jpg'
                }]
                addMovieListItem('/addMovieListItem',movieItem).then(res=>{
                    console.log(res);
                }).catch(err=>{
                    console.error(err)
                })
            },
            submitCommodityListItem(){
                const commodity=[{
                    name:'优衣库 男装 便携式短大衣 438264 UNIQLO',
                    price:399,
                    imgUrl:'http://localhost:3000/market/file1612424596936.jpg',
                    postage:0,
                    sales:125
                },{
                    name:'GXG男装 2020热卖韩版潮流休闲灯芯绒工装翻领夹克男士外套男',
                    price:468,
                    imgUrl:'http://localhost:3000/market/file1612424564982.jpg',
                    postage:10,
                    sales:49
                },{
                    name:'SGLL 日系牛仔夹克男',
                    price:299,
                    imgUrl:'http://localhost:3000/market/file1612424596937.jpg',
                    postage:0,
                    sales:397
                },{
                    name:'防晒衣男户外防水透气',
                    price:128,
                    imgUrl:'http://localhost:3000/market/file1612424564980.jpg',
                    postage:20,
                    sales:12
                },{
                    name:'优衣库 男士运动长裤弹性轻薄',
                    price:198,
                    imgUrl:'http://localhost:3000/market/file1612424564984.jpg',
                    postage:10,
                    sales:47
                },{
                    name:'牛仔衬衣男百搭宽松',
                    price:97,
                    imgUrl:'http://localhost:3000/market/file1612424564983.jpg',
                    postage:0,
                    sales:1277
                }]
                addCommodityListItem('/addCommodityListItem',commodity).then(res=>{
                    console.log(res);
                }).catch(err=>{
                    console.error(err)
                })
            },
            changeHandle() {
                const file = document.getElementById('fileInt');
                const data = new FormData();
                for (let i = 0; i <file.files.length ; i++) {
                    data.append('file', file.files[i]);
                }
                axios.post('http://localhost:3000/uploadFile', data, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }).then(res => {
                    console.log(res);
                }).catch(err => {
                    console.log(err);
                });
            },
        }
    };
</script>

<style scoped>
    .header{
        width: 100%;
        height:40px;
        background-color: #20a0ff;
        color: white;
        position: absolute;
        top:0;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>