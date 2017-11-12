<template>
    <div class="lunbo">
        <mt-swipe :auto="this.lunbo_speed">
        <mt-swipe-item v-for="(item,index) in lunboArray" :key='index'>
            <a :href="item.url">
                <img :src="item.src">
            </a>
        </mt-swipe-item>
        </mt-swipe>
    </div>
</template>
<style>
   .lunbo img{
        width: 100%;
        height: 250px;
    }
    .mint-swipe{
        height: 250px;
      
    }
</style>
 <script>
import commen from '../../commen/commen.js'
    export default{
        data(){
            return{
                lunboArray:[]  //数据的初始化
            }
        },
        created(){
            this.getLunboData()
        },
        props:["lunbo_url","lunbo_speed"],
        methods:{
             getLunboData:function(){
                const url=commen.apihost+this.lunbo_url;
                this.$http.get(url).then(response=>{
                        response.body.message.forEach(item=>{
                            if(item.img){
                                item.src=item.img;
                            }
                        })
                    this.lunboArray=response.body.message
                    // console.log(this.lunboArray);
                },err=>{
                    console.log(err)
                })
            }
        }
    }
</script>