<template>
  <span>
  <el-button type="text"  @click="dialogVisible = true">add post</el-button>
  <el-dialog title='add post component' :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
  <el-form ref="form" v-model="post">
    <el-select v-model="post.postType" placeholder="Select">
      <el-option v-for="item in postTypes" :key="item.value" :label="item.value" :value="item.component">
      </el-option>
    </el-select>
    <component v-on:updatePostContent="updatePostContent" v-bind:is="this.post.postType"></component>
    <el-form-item label="Title">
      <el-input placeholder="Title" v-model="post.title"></el-input>
    </el-form-item>
    <el-form-item label="Content">
      <!-- <el-input type="textarea" :rows="4" placeholder="Content" v-model="post.content"></el-input> -->
    </el-form-item>
    <el-form-item>
      <!-- <i class="el-icon-circle-check check"></i>
      <i class="el-icon-circle-close remove"></i> -->
    </el-form-item>
    <el-form-item>
      <el-button @click="dialogVisible = false">Cancel</el-button>
      <el-button type="primary" @click="addPost">Confirm</el-button>
    </el-form-item>
    <span slot="footer" class="dialog-footer">
    </span>
  </el-form>
</el-dialog>
</span>
</template>

<script>
import postTypeAd from './post-types/ad.vue'
import postTypeImage from './post-types/image.vue'
import postTypeTweet from './post-types/tweet.vue'

import CREATEPOST_MUTATION from '../../services/gql/posts/createpost.gql'
import GETPOSTS_QUERY from '../../services/gql/posts/getposts.gql'

export default {
  name: 'add-post',
  components: {
    postTypeAd, postTypeImage, postTypeTweet
  },
  data () {
    return {
      postTypes: [
        {value: 'Ad', component: 'postTypeAd'},
        {value: 'Article', component: 'Article'},
        {value: 'Image', component: 'postTypeImage'},
        {value: 'Tweet', component: 'postTypeTweet'},
        {value: 'Video', component: 'Video'}

      ],
      dialogVisible: false,
      post: {
        title: 'test',
        content: [{
          contentType: '',
          content: ''
        }],
        postType: ''
      }
    }
  },
  watch: {
    'post.primaryHashtag': {
      handler: function (val, oldVal) {
        console.log(this.post.primaryHashtag[0])
      }
    }
  },
  methods: {
    updatePostContent (data) {
      console.log('update post content with', data)
      this.post.content = data
    },
    addPost () {
      const newPost = {
        title: this.post.title,
        content: this.post.content
      }
      this.$apollo.mutate({
        mutation: CREATEPOST_MUTATION,
        variables: {
          post: newPost
        },
        // Update the cache with the result
        // The query will be updated with the optimistic response
        // and then with the real result of the mutation
        update: (store, { data: { createPost } }) => {
          console.log(createPost)
          // Read the data from our cache for this query.
          // TODO store these queries as .gql files so they can be easily referenced
          const data = store.readQuery({
            query: GETPOSTS_QUERY
          })
          // Add our tag from the mutation to the end
          data.posts.push(createPost)
          // Write our data back to the cache.
          store.writeQuery({ query: GETPOSTS_QUERY, data })
        }
        // Optimistic UI
        // Will be treated as a 'fake' result as soon as the request is made
        // so that the UI can react quickly
        // TODO not currently working
        // optimisticResponse: {
        //   __typename: 'Mutation',
        //   addPost: {
        //     __typename: 'Post',
        //     id: -1,
        //     title: newPost.title,
        //     content: newPost.content
        //   }
        // }
      }).then((data) => {
        // Result
        this.dialogVisible = false
        this.post.title = ''
        this.post.content = ''
      }).catch((error) => {
        // Error
        console.error(error)
      })
    },
    handleClose (done) {
      // only show dialog if text has been entered into form
      if (this.post.title || this.post.content) {
        this.$confirm('Are you sure to close this dialog?')
        .then(_ => {
          done()
        })
        .catch(_ => {})
      } else {
        done()
      }
    }
  }
}
</script>

<style scoped>
.el-tag{
  height: 32px;
  line-height: 32px;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 32px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
}

 i {
  font-size:24px;
  margin:10px;
}
i.check{color:#67C23A}
i.remove{color:#FA5555}

.carousel-image{height:300px; background-size: cover;}
</style>

<docs>
</docs>
