import Vue from 'vue'
import Router from 'vue-router'
import BlogFeed from '@/components/blog-feed/Blogfeed'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'Template',
    //   component: Template
    // },
    {
      path: '/',
      name: 'BlogFeed',
      component: BlogFeed
    }
  ]
})
