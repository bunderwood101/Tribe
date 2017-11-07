<template>
  <header>
    <nav>
    <add-post></add-post>
    </nav>
  </header>
</template>

<script>
import addPost from '../add-post/Addpost.vue'

export default {
  name: 'PageHeader',
  components: {
    addPost
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
