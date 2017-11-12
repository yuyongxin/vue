<template>
    <div>
        <!--{{$route.params.goodId}}-->
        <div class="lunbo">
            <lunbotu :lunbo_url='"api/getthumimages/"+$route.params.goodId' :lunbo_speed="lunbo_speed"></lunbotu>
        </div>
        <div class="goumai">
            <h5>{{goodInfo.title}}</h5>
            <p>
                <span>市场价{{goodInfo.market_price}}</span>
                <span>销售价{{goodInfo.sell_price}}</span>
            </p>
                <subnumber @changenumber="getchangenumber"></subnumber>
                <mt-button type="primary">立即购买</mt-button>
                 <mt-button type="danger" @click="addtoshopcart">加入购物车</mt-button>
        </div>
        <!-- 商品参数 -->
         <div class="goodsParamsStyle">
           <h6>商品参数</h6>
           <ul>
               <li>商品货号:{{goodInfo.goods_no}}</li>
               <li>库存情况:剩余{{goodInfo.stock_quantity}}件</li>
               <li>上架时间:{{goodInfo.add_time | dateFm}}</li>
           </ul>
       </div>
       <!-- 图文介绍和商品评论 -->
       <div class="tuAndcom">
           <mt-button @click="gotopictureandtext" type="primary" size="large" plain>图文介绍</mt-button>
           <mt-button @click="gotocomments" type="danger" size="large" plain>商品评论</mt-button>
       </div>
    </div>
</template>
<style>
    .lunbo{
        margin-left: 5px;
        margin-right: 5px;
        border:1px solid #ccc;
        border-radius: 15px;
    }
</style>
         
<script>
    import commen from '../../commen/commen.js'
    import lunbotu from '../subcomponents/lunbotu.vue'
    import subnumber from '../subcomponents/subnumber.vue'
    import bus from '../../commen/bus.js'
    export default{
        data(){
            return{
                goodInfo:{},
                lunbo_speed:1000,
                goodCount:1
            }
        },
        created(){
            this.getgoodInfo()
        },
        methods:{
            getgoodInfo(){
                const url=`${commen.apihost}api/goods/getinfo/${this.$route.params.goodId}`
                this.$http.get(url).then(response=>{
                    console.log(response.body.message[0])
                    this.goodInfo=response.body.message[0];
                })
            },
            gotopictureandtext(){
                this.$router.push({name:'pictureandcontext',params:{goodId:this.$route.params.goodId}})
            },
            gotocomments(){
                this.$router.push({path:'/goods/productcomments',query:{goodId:this.$route.params.goodId}})
            },
            getchangenumber(count){
                console.log("----"+count)
                this.goodCount=count;
            },
            addtoshopcart(){
                //非父子之间的通信
                // bus.$emit('changebundle',this.goodCount)

                //使用vuex同步保存
                const goodslist1={goodId:this.$route.params.goodId,count:this.goodCount} //传入的参数是一个对象
                this.$store.commit('savegoods',goodslist1)

            }
        },
        components:{
            lunbotu,
            subnumber
        }
    }
</script>
