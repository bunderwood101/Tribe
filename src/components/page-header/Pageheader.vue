<template>
  <header>
    <nav>
    <login></login>
    <add-post></add-post>
    </nav>
  </header>
</template>

<script>
import addPost from '../add-post/Addpost.vue'
import login from '../login/Login.vue'

export default {
  name: 'PageHeader',
  components: {
    addPost,
    login
  },
  data () {
    return {
    }
  }
}
</script>

<style scoped>

</style>

<docs>
</docs>
