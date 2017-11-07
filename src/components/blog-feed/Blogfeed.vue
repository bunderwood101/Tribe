<!-- Blogfeed emits event to Blog which passes props to Child -->
<template>
  <el-row :gutter="30">
    <template v-if="posts.length" v-for="post in posts">
        <blog-post :post="post" :key="post._id"></blog-post>
    </template>
  </el-row>
</template>



<script>
// import Velocity from 'velocity-animate'

import BlogPost from '../blog-post/Blogpost.vue'
// import gql from 'graphql-tag'
import GETPOSTS_QUERY from '../../services/gql/posts/getposts.gql'

export default {
  name: 'BlogFeed',
  components: {
    BlogPost
  },
  data () {
    return {
      posts: [{
        // populated by this.$apollo.posts.query
      }]
    }
  },
  apollo: {
    posts: {
      query: GETPOSTS_QUERY,
      // loadingKey will be incremented when the query is loading
      // and decremented when it no longer is.
      loadingKey: 'loadingQueriesCount',
      watchLoading (isLoading, countModifier) {
      // isLoading is a boolean
      // countModifier is either 1 or -1
      },
      // Optional result hook
      result ({ data, loader, networkStatus }) {
        console.log('results loaded')
      },
      // Error handling
      error (error) {
        console.error('We\'ve got an error!', error)
      }
    }
  },
  created () {
    // do action when component is called
    // note, apollo calls on load automatically
  }
}
</script>

<style>
.post-enter-active, .post-leave-active {
  transition: all 1s;
}
.post-enter, .post-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
</style>
