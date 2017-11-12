<template>
    <div>
        <!-- 顶部 -->
       <mt-header title="买买买" fixed>
            <mt-button icon="back" slot="left" v-show="isShowBack"  @click="goBack">返回</mt-button>
            <mt-button icon="more" slot="right"></mt-button>
        </mt-header>

        <!-- 中间内容 路由 -->
        <router-view class="content"></router-view>
        <!-- 底部 -->
        <mt-tabbar fixed :class="isHidetabbar?'hidetabstyle':''">
            <mt-tab-item id="">
                <router-link to="/home">
                <img slot="" src="http://img08.jiuxian.com/bill/2016/0224/cccd8df26a754c139de800406af82178.png">
                
                </router-link>
            </mt-tab-item>
            <mt-tab-item id="">
                 <router-link to="/category">
                <img slot="" src="http://img07.jiuxian.com/bill/2016/0224/36a49b28ec5e4cdf9dbe37988199487d.png">
            
                 </router-link>
            </mt-tab-item>
            <mt-tab-item id="">
                 <router-link to="/shopcart">
                <img slot="" src="http://img08.jiuxian.com/bill/2016/0224/42baf46987b6460bb43b3396e9941653.png">
                
                 </router-link>
                 <span class="badgestyle" v-show="count!=0">{{count}}</span>
            </mt-tab-item>
            <mt-tab-item id="">
                 <router-link to="/mine">
                <img id=lastimg slot="" src="http://st.360buyimg.com/m/images/index/n-me.png">
                
                 </router-link>
            </mt-tab-item>
        </mt-tabbar>
    </div>
</template>

<!-- scoped 代表样式私有，只能在当前组件中使用-->
<style scoped>
    img{
        width: 60px;
        height: 48px;
    }
    #lastimg{
        width: 70px;
        height: 58px;
    }
    .mint-tab-item-label{
        height: 48px;
    }
    .mint-tabbar{
        background-color:#eee;
    }
    .content{
        margin-top: 40px;
    }
    .hidetabstyle{
        display:none;
    }
    /* 购物车徽标 */
    .badgestyle{
    font-size: 11px;
    line-height: 1.3;  
    position: absolute;
    top: 7px;
    left: 63%;
    text-align: center;
    padding: 1px 5px; 
    color: #fff;
    border-radius: 11px; 
    background: red;
  }
</style>
<script>
import bus from "./commen/bus.js"
    export default{
        data(){
            return{
                isShowBack:false,
                isHidetabbar:false,
                count:0
            }
        },
        created(){
            this.isShowOrHide(this.$route.path);  //一刷新页面就会执行
            console.log('------')
            const _this=this
            bus.$on("changebundle",function(goodCount){
                _this.count+=goodCount
            })
        },
        updated(){
            this.count=this.$store.getters.getGoodstoTotalCount
        },
        methods:{
            goBack(){
                this.$router.go(-1);
            },
            isShowOrHide(path){
                // console.log(this.$route.path);
                 if(path!="/home"){
                    this.isShowBack=true;
                    this.isHidetabbar=true;
                }else{
                    this.isShowBack=false;
                    this.isHidetabbar=false;
                }
            }
        },
        watch:{
            $route:function(newvlue,oldvlue){
                // console.log(newvlue)
                // if(newvlue.path!="/home"){
                //     this.isShowBack=true;
                //     this.isHidetabbar=true;
                // }else{
                //     this.isShowBack=false;
                //     this.isHidetabbar=false;
                // }
                this.isShowOrHide(newvlue.path)
            }
        }
    }
</script>

