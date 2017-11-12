<template>
  <div>
      <ul>
          <li v-for="item in goodlist" :key="item.id">
              <router-link :to='"/goods/goodInfo/"+item.id'>
              <img :src="item.img_url" alt="">
              <p>{{item.title}}</p>
              <div class="content">
                  <div class="price">
                  <span>{{item.sell_price}}</span>
                  <span>{{item.market_price}}</span>
                  </div>
                  
                  <div class="shuliang">
                      <span>热卖中</span>
                      <span>剩余{{item.stock_quantity}}件</span>
                  </div>
              </div>
              </router-link>
          </li>
      </ul>
  </div>
</template>

<style scoped>
ul{
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    margin:0;
    padding: 0;
    padding: 5px;
    background-color: #fff;
    
}
    ul li{
        width: 48%;
        margin: 1%;
        box-sizing: border-box;
        border:1px solid #ccc;
        border-radius: 5px;

    }
    ul li img{
        width: 100%;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
    }
    ul li p{
        color: #000;
        font-size: 12px;
    }
    .content{
        background-color: #eee
    }
    .content .price{
        padding-top: 12px;
        font-size: 14px;
        padding-bottom: 10px;
    }
    .content .price span:nth-of-type(1){
        color: red;
    }
     .content .price span:nth-of-type(2){
        text-decoration: line-through;
        color:#666;
        margin-left: 10px;
    }
    .content .shuliang{
        font-size: 12px;
        display: flex;
        justify-content: space-between;
        padding-bottom: 5px;
        color: #000;
    }
</style>

<script>
import commen from "../../commen/commen.js"
    export default{
        data(){
            return{
                goodlist:[]
            }
        },
        created(){
            this.getgoodlist();
        },
        methods:{
            // getgoodlist:function(){

            // }
            getgoodlist(){
                const url=`${commen.apihost}api/getgoods`
                this.$http.get(url).then(response=>{
                    this.goodlist=response.body.message;
                    // console.log(this.goodlist)
                })
            }
        },
    }
</script>
