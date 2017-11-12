<template>
<div>
    
    <!--{{$route.params.photoid}}-->
    <div class="title.style">
        <h4>{{photoInfo.title}}</h4>
        <p>{{photoInfo.add_time|dateFm('YYYY-MM-DD')}}&nbsp;&nbsp;{{photoInfo.click}}次浏览</p>
    </div>

     <!--缩略图-->   
    <div class="suoluetu">
        <ul>
            <li v-for="(item,index) in suolueImage" :key="index">
                <img class="preview-img" :src="item.src" height="100" alt="" @click="$preview.open(index, suolueImage)">
            </li>
        </ul>
    </div>

    

      <!--内容部分--> 
    <div class="contentStyle">
        <p v-html="photoInfo.content"></p>	
    </div>
     <!--评论区-->
    <subcomments :commentId="this.$route.params.photoid"></subcomments>
</div>
</template>
<style scoped>
.suoluetu{
    margin: 0px;
    padding: 0;
    overflow: hidden;
}
div ul{
    margin: 0px;
    padding: 0;
    overflow: hidden;
}

    div ul li{
        list-style: none;
        float: left;
        width: 33.333%;
        padding: 10px;
    }
    div ul li img{
        width: 100%;

    }
</style>

<script>
    import commen from '../../commen/commen.js'
    import comments from '../subcomponents/comment.vue'
   
    export default{
        data(){
            return {
                photoInfo:{},
                suolueImage:[]
            }
        },
        created(){
            this.getphotoInfo();
            this.getsuolueImage();
           
        },
        methods:{
            getphotoInfo(){
                const url=commen.apihost+"api/getimageInfo/"+this.$route.params.photoid;
                this.$http.get(url).then(response=>{
                    // console.log(response.body.message);
                    this.photoInfo=response.body.message[0];
                    // console.log(this.photoInfo)
                },err=>{
                    console.log(err)
                })
            },
            getsuolueImage(){
                const url=commen.apihost+'api/getthumimages/'+this.$route.params.photoid;
                this.$http.get(url).then(response=>{
                    // console.log(response.body.message);
                    response.body.message.forEach(item=>{
                        item.w=400;
                        item.h=600;
                       
                    });
                    this.suolueImage=response.body.message;
                },err=>{
                    console.log(err)
                })
            }
            
        },
        components:{
            "subcomments":comments
        }
    }
</script>