<template>
    <div>
        <p>{{pictureandcontext.title}}</p>
        <div v-html="pictureandcontext.content" id="importantimg"></div>
    </div>
</template>
<style>
    #importantimg p{
        width: 100%;
    }
   #importantimg p img{
        width:100%;
    }
</style>
<script>
import  commen from '../../commen/commen.js'
    export default{
        data(){
            return{
            pictureandcontext:{}
            }
        },
        created(){
            this.getpictureandcontext()
        },
        methods:{
            getpictureandcontext(){
                const url=`${commen.apihost}api/goods/getdesc/${this.$route.params.goodId}`
                this.$http.get(url).then(response=>{
                    console.log(response.body.message[0])
                    this.pictureandcontext=response.body.message[0]
                })
            }
        }
    }
</script>