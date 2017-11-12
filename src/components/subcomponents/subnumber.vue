<template>
  <div class="changenumber">
      <div class="substruct" @click="substruct">-</div>
      <div>{{count}}</div>
      <div clss="add" @click="add">+</div>
  </div>
</template>
<style>
    .changenumber div{
        display: inline-block;
        border:1px solid #000;
        width: 35px;
        height:30px;
        text-align: center;
        height:20px;
    }
</style>

<script>
    export default{
        data(){
            return{
                count:1
            }
        },
        created(){
            // this.getcount()
        },
        methods:{
            add(){
                this.count++;
                this.chufa();

            },
            substruct(){
                if(this.count<=1){
                    return
                }
                this.count--;
                this.chufa()
            },
            chufa(){
                //发送方，触发事件传值
                this.$emit("changenumber",this.count)
            }
        }
    }
</script>