import Vue from 'vue'
import Router from 'vue-router'
import Articles from '@/components/List.vue'
import Article from '../components/Article.vue'
import Edit from '../components/Edit.vue'
import Register from '../components/Register.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Articles
    },
    {
      path: '/home',
      name: 'home',
      component: Articles
    },
    {
      path: '/articles',
      name: 'articles',
      component: Articles
    },
    {
      path: '/article/:id',
      name: 'article',
      component: Article
    },
    {
      path: '/edit/:id',
      name: 'edit',
      component: Edit
    },
    {
      path: '/edit',
      name: 'creatArticle',
      component: Edit
    },
    {
      path: '/login',
      name: 'login',
      component: Register
    }
  ]
})
