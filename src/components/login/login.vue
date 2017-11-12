<template>
  <span>
  <el-button type="text"  @click="dialogVisible = true">login</el-button>
  <el-dialog
  title='Login'
  :visible.sync="dialogVisible"
  width="30%"
  :before-close="handleClose">
  <el-form ref="form" :model="form">
    <el-form-item label="Email">
      <el-input placeholder="Email" v-model="form.email"></el-input>
    </el-form-item>
    <el-form-item label="Password">
      <el-input type="password" :rows="4" placeholder="Password" v-model="form.password"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="login">Login</el-button>
    </el-form-item>
    <span slot="footer" class="dialog-footer">
    </span>
  </el-form>
</el-dialog>
</span>
</template>

<script>
import LOGIN_MUTATION from '../../services/gql/users/login.gql'

export default {
  name: 'login',
  data () {
    return {
      dialogVisible: false,
      form: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    login () {
      const loginPayload = {
        email: this.form.email,
        password: this.form.password
      }
      this.$apollo.mutate({
        mutation: LOGIN_MUTATION,
        variables: {
          user: loginPayload
        }
      }).then((data) => {
        // Result
        this.dialogVisible = false
        this.form.username = ''
        this.form.password = ''
      }).catch((error) => {
        // Error
        console.error(error)
      })
      // send login details so tribeAPI and verify
      // return a user object if yes, else return an error
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
