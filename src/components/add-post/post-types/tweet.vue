<template>
  <span>
    <el-form-item label="Primary Hashtag">
      <el-tag
        :key="tag"
        v-for="tag in primaryHashtag"
        closable
        :disable-transitions="false"
        @close="handleCloseTag(tag)">
        {{tag}}
      </el-tag>
      <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" @blur="handleInputConfirm" @keyup.enter.native="handleInputConfirm" @keydown.space.native="handleSpaces">
    </el-input>
    <el-button v-else class="button-new-tag" size="small" @click="showInput">+ add Hasthag</el-button>
    </el-form-item>
    <el-carousel :autoplay="false" type="card" height="250px">
      <el-carousel-item v-for="tweet in tweets" :key="tweet.id" v-bind:id="tweet.divid">
        <div class="carousel-image" v-bind:style="{ backgroundImage: 'url(' + tweet.imageURL + ')' }"></div>
      </el-carousel-item>
    </el-carousel>
  </span>
</template>

<script>

// Implicitly call Vue.extend, then register the returned constructor.
// Use this syntax when you don't need to programatically
// instantiate your component.
// Note: this method returns Vue, not the registered constructor.
import GETTWEETS_QUERY from '../../../services/gql/twitter/gettweets.gql'

export default {
  name: 'postTypeTweet',
  props: ['post'],
  data () {
    return {
      primaryHashtag: [],
      inputVisible: false,
      inputValue: '#',
      tweets: [{
        id_str: '',
        hashtags: {
          text: ''
        }
      }]
    }
  },
  apollo: {
    tweets: {
      query: GETTWEETS_QUERY,
      variables () {
        return {
          searchArgs: this.primaryHashtag[0],
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
      this.primaryHashtag.splice(this.primaryHashtag.indexOf(tag), 1)
    },
    showInput () {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    handleSpaces () {
      // cancel space key press
      if (event.keyCode === 32) {
        event.preventDefault()
      }
    },
    handleInputConfirm () {
      // being called twice, should resolve this
      let inputValue = this.inputValue
      if (inputValue && inputValue !== '#') {
        this.primaryHashtag.push(inputValue)
        console.log(this.primaryHashtag)
      }
      this.inputVisible = false
      this.inputValue = '#'
    }
  }
}
</script>

<style scoped>

</style>

<docs>
</docs>
