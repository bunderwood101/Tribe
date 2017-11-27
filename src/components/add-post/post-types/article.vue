<template>
  <div>{{ msg }}</div>
</template>

<script>
// Implicitly call Vue.extend, then register the returned constructor.
// Use this syntax when you don't need to programatically
// instantiate your component.
// Note: this method returns Vue, not the registered constructor.
export default {
  name: 'template',
  data () {
    return {
      msg: 'template component'
    }
  }
}
</script>

<style scoped>

</style>

<docs>
</docs>
