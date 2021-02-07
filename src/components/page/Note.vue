<template>
    <div class="commodity-content">
        <!--商品展示图详情-->
        <van-swipe class="commodity-swipe" @change="changeSwipeImg" :autoplay="3000">
            <van-swipe-item v-for="(item,index) in swipeImgList" :key="index">
                <img v-lazy="item">
            </van-swipe-item>
            <template #indicator>
                <div class="custom-indicator">{{ current + 1 }}/4</div>
            </template>
        </van-swipe>
        <!--商品名称-->
        <h2>{{name}}</h2>
        <!--商品具体参数-->
        <div class="commodity-parameters" @click="show=true">
            <p>发货地：{{sendAddress.address}} | 运费：{{sendAddress.fare}}</p>
            <p>服务保障：{{parameters}}</p>
        </div>
        <van-action-sheet v-model="show" title="商品信息">
            <div class="popup-content">内容</div>
        </van-action-sheet>
        <!--店铺信息-->
        <div class="commodity-shop">
            <h3>{{shop.name}}</h3>
            <button>全部宝贝</button>
            <button>进店逛逛</button>
        </div>
        <!--商品详情图-->
        <div class="commodity-detailImg">
            <img v-for="(item,index) in detailImgList" :key="index" :src="item" alt="">
        </div>
        <!--商品购买-->
        <van-goods-action>
            <van-goods-action-icon icon="chat-o" text="客服" color="#ee0a24" />
            <van-goods-action-icon icon="cart-o" text="购物车" />
            <van-goods-action-icon icon="star" text="已收藏" color="#ff5000" />
            <van-goods-action-button color="#be99ff" type="warning" text="加入购物车" />
            <van-goods-action-button @click="showBuy=true" color="#7232dd" type="danger" text="立即购买" />
        </van-goods-action>
        <van-action-sheet class="buy-choice-form" v-model="showBuy">
            <div class="buy-header">
                <img :src="swipeImgList[0]" alt="">
                <div class="buy-header-text">
                    <h3>￥79</h3>
                    <p>剩余227件</p>
                    <p>请选择 <span v-for="(item,index) in Object.keys(choices)" :key="index">{{choices[item].name}}</span></p>
                </div>
                <i role="button" @click="hiddenBuyPopup" class="van-icon van-icon-cross van-popup__close-icon"></i>
            </div>
            <div class="buy-content">
                <div class="buy-parameter" v-for="(item,index) in Object.keys(choices)" :key="index">
                    <p>{{choices[item].name}}</p>
                    <div class="parameter-list">
                        <span :class="[activatedIndex[index]==i?'activatedParam':'']" @click="activateParam(index,i)" v-for="(choice,i) in choices[item].list" :key="i">{{choice}}</span>
                    </div>
                </div>
                <div class="buy-stepper">
                    <span>商品数量：</span>
                    <van-stepper v-model="quantity" />
                </div>
                <p class="buy-message">
                    <span>留言：</span>
                    <input type="text" placeholder="请输入给商家的留言">
                </p>
                <div class="buy-submit">
                    <button>加入购物车</button>
                    <button>立即购买</button>
                </div>
            </div>
        </van-action-sheet>
    </div>
</template>

<script>
    import {getCommodity} from '@/api/commodityAndShop';

    export default {
        name: 'Note',
        data(){
            return {
                show:false,//商品参数
                showBuy:false,//商品购买参数
                current:0,//轮播图指示器
                swipeImgList:[],//轮播图图片数组
                name:'',//商品名称
                choices:[],//商品参数数组
                sendAddress:'',//商品发货地址
                shop:{},//对应店铺信息
                parameters:'',//商品服务参数
                detailImgList:[],//商品详情图数组
                chosenParameters:[],//最终提交的商品参数选择信息
                quantity:1,//购买商品数量
                activatedIndex:[]//商品提交表单当前点击参数选项
            }
        },
        methods:{
            async getCommodity(){
                try{
                    let result=await getCommodity('/queryCommodity',{id:this.$route.params.id})
                    console.log(result.data)
                    let commodity=result.data
                    this.name=commodity.name
                    this.swipeImgList=JSON.parse(commodity.showImgList)
                    this.choices=JSON.parse(commodity.choices)
                    this.sendAddress={address:commodity.sendAddress,fare:'免运费'}
                    this.shop=commodity.shop
                    this.detailImgList=JSON.parse(commodity.detailImgList)
                    this.parameters=commodity.parameters
                    for(let i=0;i<Object.keys(this.choices).length;i++){
                        this.activatedIndex[i]=0
                    }
                }catch (e) {
                    console.log(e);
                }
            },
            changeSwipeImg(index){
                this.current=index
            },
            activateParam(index,i){
                this.$set(this.activatedIndex,index,i)
            },
            hiddenBuyPopup(){
                this.showBuy=false
            }
        },
        created() {
            this.getCommodity()
        }
    };
</script>

<style lang="scss" scoped>
    $marginBottom:10px;
    $paddingBottom:10px;
    .commodity-content{
        width: 100%;
        height: 100%;
        overflow-y: auto;
        padding: 0px 10px;
        position: relative;
        .commodity-swipe{
            width: 100%;
            height: 60%;
            position: relative;
            img{
                width: 100%;
                height: 100%;
                object-fit: fill;
            }
            .custom-indicator{
                position: absolute;
                bottom: 0;
                right: 0;
                color: white;
                background: rgba(0, 0, 0, 0.1);
            }
        }

        /*商品参数信息*/
        .commodity-parameters{
            width: 100%;
            margin-bottom: $marginBottom;
        }
        .van-action-sheet{
            height: 50%;
        }

        /*店铺信息*/
        .commodity-shop{
            width: 100%;
            height: 80px;
            background-color: #4a98ba;
            padding: 8px 0px;
            text-align: center;
            margin-bottom: $marginBottom;
            h3{
                color: white;
                font-size: 22px;
                margin-bottom: 6px;
            }
            button{
                border: none;
                color: white;
                background-color: transparent;
                &:not(:last-child){
                    margin-right: 10px;
                }
            }
        }

        /*商品详情图*/
        .commodity-detailImg{
            width: 100%;
            img{
                width:100%;
                height: auto;
            }
        }

        /*商品导航栏*/
        .van-goods-action{
            position: fixed;
            bottom: 60px;
        }

        /*商品参数选择提交表单*/
        .buy-choice-form{
            height: 75%;
            .van-action-sheet__content{
                width: 100%;
                padding: 25px 10px 50px 10px;
                position: relative;

                /*滚动条样式*/
                &::-webkit-scrollbar{
                    width: 0px;
                }

                /*右上角关闭按钮图标*/
                .van-popup__close-icon{
                    position: absolute;
                    top: 0px;
                    right: 10px;
                    color: #c8c9cc;
                    font-size: 22px;
                    cursor: pointer;
                }

                .buy-header{
                    display: flex;
                    align-items: flex-end;
                    border-bottom: 1px solid #ebedf0;
                    padding-bottom: $paddingBottom;
                    position: sticky;
                    top: 0;
                    left: 0;
                    img{
                        width:25%;
                        margin-right: 15px;
                    }
                    .buy-header-text{
                        h3{
                            font-size: 26px;
                            font-weight: normal;
                            color: #ee0a24;
                        }
                        p{
                            font-size: 13px;
                            color: #969799;
                            margin-top: 8px;
                            span:not(:last-child){
                                margin-right: 6px;
                            }
                        }
                    }
                }
                .buy-content{
                    .buy-parameter{
                        padding: $paddingBottom 0px;
                        border-bottom: 1px solid #ebedf0;
                        p{
                            margin-bottom: $marginBottom;
                        }
                        .parameter-list{
                            display: flex;
                            span{
                                background-color: #f7f8fa;
                                padding: 8px;
                                display: block;
                            }
                            span:not(:last-child){
                                margin-right: 10px;
                            }
                            .activatedParam{
                                background-color: #fde7ea;
                                color: #ee0a24;
                                padding: 8px;
                                display: block;
                            }
                        }
                    }
                    .buy-stepper{
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        padding: $paddingBottom 0px;
                        border-bottom: 1px solid #ebedf0;
                    }
                    .buy-message{
                        padding: $paddingBottom 0px;
                        border-bottom: 1px solid #ebedf0;
                        input{
                            border: none;
                        }
                    }
                    .buy-submit{
                        width: 100%;
                        padding: $paddingBottom 20px;
                        background-color: #fefefe;
                        position: fixed;
                        bottom: 0;
                        left: 0;
                        button{
                            width: 50%;
                            padding: $paddingBottom 0px;
                            border: none;
                            color: #fefefe;
                        }
                        button:first-child{
                            border-top-left-radius: 20px;
                            border-bottom-left-radius: 20px;
                            background: linear-gradient(to right, #ffd01e, #ff8917);
                        }
                        button:last-child{
                            border-top-right-radius: 20px;
                            border-bottom-right-radius: 20px;
                            background: linear-gradient(to right, #ff6034, #ee0a24);
                        }
                    }
                }
            }
        }
    }
</style>