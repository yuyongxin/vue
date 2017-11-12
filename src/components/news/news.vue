<template>
    <div>
        <ul class="mui-table-view">
    <li class="mui-table-view-cell mui-media" v-for="(item,index) in newslist" :key="index">
        <router-link :to='"/news/newsInfo/"+item.id'>
      
            <img class="mui-media-object mui-pull-left" :src="item.img_url">
            <div class="mui-media-body">
                {{item.title}}
                <p class='mui-ellipsis'>
                    <span>{{item.add_time|dateFm}}</span>
                    <span>点击数{{item.click}}次</span>
                </p>
            </div>
        </router-link>
    </li>
</ul>
    </div>
</template>
<style scoped>
    
    .mui-pull-left{
        width: 60px;
        height:60px;
    }
    .mui-table-view .mui-media-object{
        max-width: 60px;
    }
    .mui-media-body{
        font-size: 14px;
        color: gray;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

    }
    .mui-media-body .mui-ellipsis{
        font-size: 13px;
        color: rgb(40, 40, 220);
        margin-top: 20px;
        display: flex;
        justify-content: space-between;

    }
    /* .mui-media-body .mui-ellipsis */
</style>


<script>
    import commen from '../../commen/commen.js'
    export default{
        data:function(){
            return{
                newslist:[]
            }
        },
        created(){
            this.getnewslist();
        },
        methods:{
            getnewslist:function(){
                const url=commen.apihost+"api/getnewslist";
                this.$http.get(url).then(response=>{
                    console.log(response.body.message)
                    this.newslist=response.body.message;

                },err=>{
                    console.log(err)
                })
            }
        }
    }
</script>