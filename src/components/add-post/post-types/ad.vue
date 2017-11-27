<template>
  <span>
  <!-- see http://element.eleme.io/#/en-US/component/upload for details -->
  <el-upload class="upload" ref="upload" action="http://localhost:3010/upload"
    :auto-upload="true" :on-success="uploadSuccess"
    list-type="picture-card":on-preview="handlePictureCardPreview"
    :on-remove="handleRemove">
    <i class="el-icon-plus"></i>
  </el-upload>
<!-- <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">upload to server</el-button> -->
  </span>
</template>

<script>

// Implicitly call Vue.extend, then register the returned constructor.
// Use this syntax when you don't need to programatically
// instantiate your component.
// Note: this method returns Vue, not the registered constructor.

export default {
  name: 'postTypeAd',
  props: ['post'],
  data () {
    return {
      TRIBEAPI_URL: 'http://localhost:/3010/upload',
      fileList: []
    }
  },
  watch: {
    'fileList': function () {
      this.$emit('updatePostContent', this.fileList)
    }
  },
  methods: {
    submitUpload () {
      // un comment el-button and set el-upload auto-upload to false in order to use manual uploading
      console.log(this.$refs.upload)
      this.$refs.upload.submit()
      // let filetoupload = this.$refs.upload
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    uploadSuccess (res, file, fileList) {
      // push new image URL into array and emit to parent component
      this.fileList.push({contentType: 'Image', content: res})
      console.log(this.fileList)
    }
  }
}
</script>

<style scoped>

</style>

<docs>
</docs>
