<template>
<div>
    <ul class="imgcategoryStyle">
        <li @click="getimglistbycategory(0)">全部</li>
        <li @click="getimglistbycategory(item.id)" v-for="item in imgCategory" :key="item.id">
            {{item.title}}
        </li>
    </ul>
    <!--图片列表-->
    <ul class="imglistStyle">
        <li v-for="item in imglistbyId" :key="item.id">
        <router-link :to='"/photo/photoinfo/"+item.id'>
            <img :src="item.img_url" alt="">
            <p>
                <span>{{item.title}}</span><br>
                {{item.zhaiyao}}
               
            </p>
            </router-link>
        </li>
    </ul>
</div>
</template>

<style scoped>
.imgcategoryStyle{
    margin:0;
    padding:0;
    white-space:nowrap;
    overflow-x:scroll;
    height:30px;
    width:100%;
    background-color:white;
}
   .imgcategoryStyle li{
        margin-left:5px;
        list-style:none;
        display:inline-block;
    }
    .imglistStyle{
        list-style:none;
        margin:0;
        padding:0;
        
    }
    .imglistStyle li{
        position:relative;
        width:100%;
        margin-top:10px;
        padding:3px;
    }
    .imglistStyle li img{
        width:100%;
        
    }
    .imglistStyle li p{
        position:absolute;
        bottom:0;
        color:#fff;
        background:rgba(0,0,0,0.4)
    }
    .imglistStyle li p span{
        font-size:18px;
        font-weight:bold;
    } 
</style>
<script>
    import commen from '../../commen/commen.js'
    import { Indicator } from 'mint-ui'
    export default{
        data(){
            return{
                imgCategory:[],
                imglistbyId:[]
            }
        },
        created(){
            this.getimgCategory();
            this.getimglistbycategory(0);
        },
        methods:{
            getimgCategory(){
                const url=commen.apihost+"api/getimgcategory";
                this.$http.get(url).then(response=>{
                    this.imgCategory=response.body.message;
                },err=>{
                    console.log(err);
                })
            },
            getimglistbycategory(categoryId){
                Indicator.open({
                    text:'拼命加载中...',
                     spinnerType: 'triple-bounce'
                })
                const url=commen.apihost+"api/getimages/"+categoryId;
                this.$http.get(url).then(response=>{
                    Indicator.close();
                    this.imglistbyId=response.body.message;
                },err=>{
                    console.log(err);
                    Indicator.close();
                })
            }
        }
    }
</script>