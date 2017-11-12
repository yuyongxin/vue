<template>
  <div>
      <comment :commentId="this.$route.query.goodId"></comment>
  </div>
</template>

<script>
    import comment from '../subcomponents/comment.vue'
    export default{
      components:{
        comment
      }
    }
</script>
