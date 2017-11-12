<template>
    <div>
    <!--qq{{$route.params.newsId}}dd--> 
        <div class='titleStyle'>
          <h3>{{newsInfo.title}}</h3>
          <p>
            {{newsInfo.add_time|dateFm}}&nbsp;&nbsp;{{newsInfo.click}}次浏览
          </p>
        </div>
        <div class="contentStyle">
            <p v-html="newsInfo.content"></p>
        </div>

        <subcom :commentId="this.$route.params.newsId"></subcom>
    </div>

</template>
<style scoped>
    .titleStyle,.contentStyle{
        padding:8px;
        background-color:#fff;
    }
    h3{
        font-size:16px;
        color:#0094ff;
    }
</style>
<script>
    import commen from '../../commen/commen.js'
    //导入子组件
    import comments from '../subcomponents/comment.vue'

    export default{
        data(){
            return {
                newsInfo:{}
            }
        },
        created(){
            this.getNewsInfo();
        },
        methods:{
            getNewsInfo(){
                const url=commen.apihost+"api/getnew/"+this.$route.params.newsId
                this.$http.get(url).then(resonse=>{
                    this.newsInfo=resonse.body.message[0];
                    // console.log(resonse.body)
                },err=>{
                    console.log(err)
                })
            }
        },
        //注册子组件使用
        components:{
            'subcom':comments
        },
        // components:{
        //     subcom:comments
        // },
    }
</script>