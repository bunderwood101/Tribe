// redundant

import axios from 'axios'

var root = 'https://jsonplaceholder.typicode.com'

export default {
  data: () => ({
    posts: [],
    errors: []
  }),

  // Fetches posts when ?
  created () {
    axios.get(root + '/posts')
    .then(response => {
      // JSON responses are automatically parsed
      this.posts = response.data
    })
    .catch(e => {
      this.errors.push(e)
    })
  }
}
