<template>
  <div id="app">
    <PageHeader></PageHeader>

    <div id="large-header" class="large-header">
      <canvas id="demo-canvas"></canvas>
    </div>

    <div id="mainPage" ref="main">
      <router-view></router-view>
    </div>

  </div>
</template>

<script>
  import PageHeader from './components/PageHeader.vue'

  export default {
    name: 'app',
    components: {
      PageHeader
    },
    mounted: function () {
      const item = JSON.parse(localStorage.getItem('jwtToken'))

      !!item && this.$store.dispatch('updateUser', item.username)
    }
  }
</script>

<style lang="scss">
  html {
    height: 100%;
    overflow: hidden;
    background: linear-gradient(200deg, #a0cfe4, #e8c37e);
  }

  body{
    margin:0;
    height: 100%;
    overflow: auto;
    li{
      list-style: none;
    }
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    height: 100%;
  }

  a {
    color: #555;
  }

  .content{
    margin: 5px 80px;
  }

  #large-header {
    position: absolute;
    z-index: -1;
  }

  .top-nav-container {
    top: 0;
    right: 0;
    left: 0;
    z-index: 100;
    box-shadow: 0px 2px 10px 0px rgba(0,0,0,0.1), 0 1px rgba(0,0,0,0.1);
    background: #fafafa;
  }

  .nav-logo {
    display: inline-block;
    img {
      width: 30px;
    }
  }

  .top-nav {
    max-width: 850px;
    margin: 0 auto;
    height: 40px;
    padding: 25px 0;
    display: flex;
    a {
      text-decoration: none;
    }
    ul{
      height:30px;
    }
  }

  .vertical-center:before {
    content: " ";
    height: 100%;
    width: 0;
  }

  .vertical-center-content, .vertical-center:before {
    display: inline-block;
    vertical-align: middle;
  }

  .brand {
    font-family: "Times New Roman", Georgia, Serif;
  }

  .menu .menu-item {
    display: inline-block;
    margin: 0 10px;
    list-style: none;
  }

  .article-category .icon, .article-tag .icon {
    color: #999;
    float: left;
    margin-right: 10px;
    margin-top: 6px;
  }

  [class*=" icon-"], [class^=icon-] {
    font-family: iconfont!important;
    speak: none;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    font-variant: normal;
    text-transform: none;
    line-height: 1;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .icon-price-tags:before {
    content: "\2708";
  }
</style>
