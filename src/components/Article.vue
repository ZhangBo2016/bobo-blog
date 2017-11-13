<template>
  <div class="hello">
    <h1>{{article.title}}</h1>
    <p>{{article.content}}</p>
  </div>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    data () {
      return {
        article: {}
      }
    },
    computed: {
      // 使用对象展开运算符将 getter 混入 computed 对象中
      ...mapState([
        'route'
      ])
    },
    mounted () {
      this.$store.dispatch('getArticle', this.route.params.id)
        .then((res) => {
          this.article = res
        })
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
