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

export default {
  name: 'add-post',
  data () {
    return {
      dialogVisible: false,
      form: {
        title: '',
        content: ''
      }
    }
  },
  methods: {
    addPost () {
      const newPost = {
        title: this.form.title,
        content: this.form.content
      }
      // clear the form early to make it fee more responsive?
      // this.form.title = ''
      // this.form.content = ''
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
          store.writeQuery({ query: GETPOSTS_QUERY,
            data
          })
        },
        // Optimistic UI
        // Will be treated as a 'fake' result as soon as the request is made
        // so that the UI can react quickly
        // TODO not currently working
        optimisticResponse: {
          __typename: 'Mutation',
          addPost: {
            __typename: 'Post',
            id: -1,
            title: newPost.title,
            content: newPost.content
          }
        }
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

</style>

<docs>
</docs>
