<template>
    <div>
        <!--{{commentId}}-->
         <!-- 1.0 提交评论区域 -->
       <div class="submitCommentStyle">
        <h4>提交评论</h4>
        <textarea name="" id="" ref="textAreaRef" cols="30" rows="5" placeholder="请输入评论内容"></textarea>
        <mt-button type="primary" size="large" @click="submitCommet">提交评论</mt-button>
      </div>
     <!-- 2.0 评论列表区域 -->
      <div class="commentListStyle">
        <h4>评论列表</h4>
        <div class="commentItemStyle" v-for="(item,index) in commenlist" :key="index">
            <p class="commentConentStyle">{{item.content}}</p>
            <p class="commentUserAndTimeStyle">
              <span>{{item.user_name}}</span>
              <span>{{item.add_time|dateFm}}</span>
            </p>
        </div>
        <mt-button @click="loadMore" type="danger" class="loadMoreStyle" size="large" plain>加载更多</mt-button>
      </div>
    </div>
</template>
<style>
    .submitCommentStyle,.commentListStyle{
    padding: 8px;
  }

  h4{
    padding-bottom: 10px;
    border-bottom: 1px solid rgba(92,92,92,0.3);
  }

  .commentItemStyle{
    height: 100px;
    overflow-y: auto;
    border-bottom: 1px solid rgba(92,92,92,0.3);
  }

  .commentConentStyle{
    margin-top: 10px;
    color: black;
    font-size: 14px;
  }

  .commentUserAndTimeStyle{
    margin-top: 30px;
    color: #0094ff;
    display: flex;
    justify-content: space-between;
  }

  .loadMoreStyle{
    margin-top: 10px;
  }
</style>
<script>
import commen from '../../commen/commen.js'
import { Toast } from 'mint-ui';
    export default{
        data(){
            return{
                commenlist:[],
                 pageIndex:1
            }
            
        },
        created(){
            console.log(this.commentId);
            this.getcommenlist();
        },
        methods:{
            getcommenlist(){
                const url=commen.apihost+"api/getcomments/"+this.commentId+"?pageindex="+this.pageIndex;
                this.$http.get(url).then(response=>{
                    if(this.pageIndex==1){
                    if(response.body.message.length==0){
                                Toast({
                                message: '还没有评论，快来抢沙发！',
                                position: 'middle',
                                duration: 3000
                                });
                    }else{
                         this.commenlist=response.body.message;
                    }
                    }else{ //如果不是第一页
                        if(response.body.message.length==0){
                             Toast({
                                message: '别点了，我是有底线的！',
                                position: 'middle',
                                duration: 3000
                                });
                        }else{
                            this.commenlist=this.commenlist.concat(response.body.message)
                        }
                    }
                },err=>{
                    console.log(err);
                })
            },
            loadMore(){
                this.pageIndex++;
                this.getcommenlist();
            },
            submitCommet(){
                var content=this.$refs.textAreaRef.value
                // console.log(content)
                if(content.length===0){
                    Toast({
                        message: '没得内容想空手套白狼？我佛',
                        position: 'middle',
                        duration: 3000
                     });
                     return;
                }
                //发送网络请求
                const url=commen.apihost+"api/postcomment/"+this.commentId;
                this.$http.post(url,{content:content},{emulateJSON:true}).then(response=>{
                    Toast({
                        message: response.body.message,
                        position: 'middle',
                        duration: 3000
                     });
                     //内容清空
                     this.$refs.textAreaRef.value='';
                     //重新请求第一页
                     this.pageindex=1;
                     this.getcommenlist()
                })
            }

        },
        props:['commentId'] //父组件传值依靠
    }
</script>