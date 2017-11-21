<template>
  <span>
  <el-button type="text"  @click="dialogVisible = true">add post</el-button>
  <el-dialog
  title='add post component'
  :visible.sync="dialogVisible"
  width="30%"
  :before-close="handleClose">
  <el-form ref="form" :model="form">
    <el-form-item label="Title">
      <el-input placeholder="Title" v-model="form.title"></el-input>
    </el-form-item>
    <el-form-item label="Content">
      <el-input type="textarea" :rows="4" placeholder="Content" v-model="form.content"></el-input>
    </el-form-item>
    <el-form-item label="Primary Hashtag">
      <el-tag
        :key="tag"
        v-for="tag in form.primaryHashtag"
        closable
        :disable-transitions="false"
        @close="handleCloseTag(tag)">
        {{tag}}
      </el-tag>
      <el-input class="input-new-tag" v-if="form.inputVisible" v-model="form.inputValue" ref="saveTagInput" @blur="handleInputConfirm" @keyup.enter.native="handleInputConfirm" @keydown.space.native="handleSpaces">
    </el-input>
    <el-button v-else class="button-new-tag" size="small" @click="showInput">+ add Hasthag</el-button>
    </el-form-item>
    <el-form-item>
      <i class="el-icon-circle-check check"></i>
      <i class="el-icon-circle-close remove"></i>
      <el-carousel :autoplay="false" type="card" height="450px">
        <el-carousel-item v-for="tweet in tweets" :key="tweet.id" v-bind:id="tweet.divid">
        </el-carousel-item>
      </el-carousel>
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
import CREATEPOST_MUTATION from '../../services/gql/posts/createpost.gql'
import GETPOSTS_QUERY from '../../services/gql/posts/getposts.gql'
import GETTWEETS_QUERY from '../../services/gql/twitter/gettweets.gql'

/*eslint-disable */
// async load the Twitter for Websites js
window.twttr = (function (d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0]
  var t = window.twttr || {}
  if (d.getElementById(id)) return t
  js = d.createElement(s)
  js.id = id
  js.src = 'https://platform.twitter.com/widgets.js'
  fjs.parentNode.insertBefore(js, fjs)
  t._e = []
  t.ready = function (f) {
    t._e.push(f)
  }
  return t
}(document, 'script', 'twitter-wjs'))
/*eslint-enable */

export default {
  name: 'add-post',
  data () {
    return {
      dialogVisible: false,
      form: {
        title: '',
        content: '',
        primaryHashtag: [],
        inputVisible: false,
        inputValue: '#'
      },
      tweets: [{
        id_str: '',
        hashtags: ''
      }]
    }
  },
  watch: {
    tweets: function () {
    },
    'form.primaryHashtag': {
      handler: function (val, oldVal) {
        console.log(this.form.primaryHashtag[0])
      }
    }
  },
  apollo: {
    tweets: {
      query: GETTWEETS_QUERY,
      variables () {
        return {
          searchArgs: this.form.primaryHashtag[0],
          count: 10
        }
      },
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
  methods: {
    handleCloseTag (tag) {
      this.form.primaryHashtag.splice(this.form.primaryHashtag.indexOf(tag), 1)
    },
    showInput () {
      this.form.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },

    handleSpaces () {
      window.twttr.widgets.createTweet('931933489666183168', document.getElementById('first-tweet'))
      window.twttr.widgets.createTweet('931574654988423168', document.getElementById('second-tweet'))

      // cancel space key press
      if (event.keyCode === 32) {
        event.preventDefault()
      }
    },
    handleInputConfirm () {
      // being called twice, should resolve this
      let inputValue = this.form.inputValue
      if (inputValue && inputValue !== '#') {
        this.form.primaryHashtag.push(inputValue)
      }
      this.form.inputVisible = false
      this.form.inputValue = '#'
    },
    addPost () {
      const newPost = {
        title: this.form.title,
        content: this.form.content
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
        this.form.title = ''
        this.form.content = ''
      }).catch((error) => {
        // Error
        console.error(error)
      })
    },
    handleClose (done) {
      // only show dialog if text has been entered into form
      if (this.form.title || this.form.content) {
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
</style>

<docs>
</docs>
