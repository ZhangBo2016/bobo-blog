<template>
  <div class="large-header">
    <header class="top-nav-container">
      <nav class="top-nav">
        <router-link to="/" class="vertical-center nav-logo">
          <img src="../assets/logo.png">
          <span class="brand vertical-center-content">{{username || 'blog'}}</span>
        </router-link>

        <ul id="menu" class="menu">
          <li v-for="item in navItems" class="menu-item">
            <router-link :to="item.to">
              <i class="menu-item-icon " v-bind:class="[item.class]"></i>{{item.name}}
            </router-link>
          </li>
        </ul>

        <div class="login-link">
          <el-button type="primary" @click.native="createArticle">写文章</el-button>
          <router-link to="/login" v-if="username" v-on:click.native="loginout">
            <i class="fa fa-fw fa-sign-out"></i>登出
          </router-link>
        </div>

      </nav>
    </header>
  </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex'

  export default {
    data: function () {
      return {
        navItems: [{
          to: '/home',
          name: '主頁',
          class: 'fa fa-fw fa-home'
        },
        {
          to: '/about',
          name: '关于',
          class: 'fa fa-fw fa-user'
        },
        {
          to: '/categories',
          name: '分类',
          class: 'fa fa-fw fa-th'
        }],
        loginShow: false
      }
    },
    computed: {
      // 使用对象展开运算符将 getter 混入 computed 对象中
      ...mapState([
        'route',
        'username'
      ])
    },
    created () {
      this.loginShow = (this.route.path === '/login')
    },
    methods: {
      ...mapActions([
        'loginout'
      ]),
      createArticle () {
        this.$router.push('/edit')
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .login-link{
    right: 80px;
    position: absolute;
    &:hover{
        cursor:pointer;
    }
  }
</style>
