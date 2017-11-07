<template>
<el-col :xs="24" :sm="12" :md="8" :lg="6" class="blogposts">
  <el-card :body-style="{ padding: '0px'}">
    <!-- <img class="blogpost-image" src="http://greenarea.me/wp-content/uploads/2016/01/panda.jpg"> -->
    <img class="blogpost-image" v-bind:src="post.image">
    <div class="blogpost-main">
      <div class="blogpost-header">{{ post.title }}</div>
      <div class="blogpost-postdetails">{{  post._id }}</div>
      <div class="blogpost-content" v-html="post.content"></div>
    </div>
  </el-card>
</el-col>


</template>

<script>
export default {
  name: 'Blogpost',
  props: ['post'],
  data () {
    return {
    }
  },
  created () {
  }
}

</script>

<style scoped>
  .blogpost{display: inline-block; background-color: #ecf0f1; width:450px; margin: 20px; padding:20px;   text-align: left; box-shadow: 3px 3px 15px #95a5a6;}
  .blogposts{text-align:left;}
  .blogpost-image{height: 300px; background-size: cover; background-repeat: none; background-image: radial-gradient(circle 60px, white 90%, transparent 0); width:100%}
  .blogpost-main{min-height:50px; margin:40px}
  .blogpost-header{min-height:50px; font-size:1.5em; line-height: 1.5em}
  .blogpost-postdetails{min-height:20px; max-width: 75%; font-size:1.0em; line-height:0.8em;}
  .blogpost-content{min-height:50px; line-height: 26px; font-size:1.2em; line-height:1.5em;}
</style>

<docs>
</docs>
