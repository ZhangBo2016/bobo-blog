<template>
    <div class="article content">
        <div v-for="article in articleList" class="article-item">
          <header class="article-header">
            <h1 itemprop="name">
              <a class="article-title" href="/2017/09/12/koa-middleware/">{{article.title}}</a>
            </h1>

            <div>
              <time datetime="2017-09-12T11:00:00.000Z" itemprop="datePublished">
                <i class="icon-calendar icon"></i>{{article.date}}
              </time>
            </div>
          </header>

          <div class="article-entry" itemprop="articleBody">
            <p>
              {{article.content}}
            </p>
          </div>

          <div class="article-info article-info-index">
            <div class="article-tag tagcloud">
              <i class="fa fa-fw fa-tags"></i>
              <ul class="article-tag-list">

                <li class="article-tag-list-item">
                  <a href="javascript:void(0)" class="js-tag article-tag-list-link color4">koa</a>
                </li>

              </ul>
            </div>

            <p class="article-more-link">
              <router-link :to="'/article/' + article['_id']">
                <span class="article-more-a">阅读全文 &gt;&gt;</span>
              </router-link>

              <template v-if="$store.state.username">
                <router-link :to="'/edit/' + article['_id']">
                  <span class="article-more-a">编辑 &gt;&gt;</span>
                </router-link>
              </template>

            <div class="clearfix"></div>
          </div>
        </div>
    </div>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    name: 'list',
    data () {
      return {
      }
    },
    computed: {
      // 使用对象展开运算符将 getter 混入 computed 对象中
      ...mapState([
        'articleList'
      ])
    },
    mounted () {
      this.$store.dispatch('getArticles')
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .clearfix:after {
    clear: both;
  }

  .article-inner p {
    margin: 0 0 1.75em;
  }

  .article-more-link {
    margin-top: 0;
    text-align: left;
    float: right;
  }

  .article-info-index.article-info {
    padding-top: 20px;
    margin: 30px 7.6923% 0;
    min-height: 72px;
    border-top: 1px solid #ddd;
  }

  a {
    background: transparent;
    text-decoration: none;
    color: #08c;
  }

  .article-header {
    border-left: 5px solid #4d4d4d;
    padding: 30px 0 15px 25px;
    padding-left: 7.6923%;
  }

  .article-entry {
    line-height: 1.8em;
    padding-right: 7.6923%;
    padding-left: 7.6923%;
  }
  .article-category, .article-category .article-tag-list, .article-tag, .article-tag .article-tag-list {
    float: left;
  }

  .article-item{
    margin-bottom:10px;
    background: white;
    header{
      justify-content: space-between;
      display: flex;
      & > div{
        padding-right:10px;
        display: flex;
        align-items: center
      }
    }
  }

  .article-tag-list .article-tag-list-item {
    float: left;
  }

  .tagcloud a.color4 {
    background: #94635c;
  }

  .tagcloud a {
    display: inline-block;
    text-decoration: none;
    font-weight: 400;
    font-size: 10px;
    color: #fff;
    height: 18px;
    line-height: 18px;
    float: left;
    padding: 0 5px 0 10px;
    position: relative;
    border-radius: 0 5px 5px 0;
    margin: 5px 9px 5px 8px;
    font-family: Menlo,Monaco,Andale Mono,lucida console,Courier New,monospace;
  }

  .tagcloud a.color4:before {
    border-right-color: #94635c;
  }

  .tagcloud a:before {
    content: " ";
    width: 0;
    height: 0;
    position: absolute;
    top: 0;
    left: -18px;
    border: 9px solid transparent;
  }

  .tagcloud a:after {
    content: " ";
    width: 4px;
    height: 4px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 0 0 1px rgba(0,0,0,.3);
    position: absolute;
    top: 7px;
    left: 2px;
  }

  .fa-tags{
    margin: auto;
  }

  .tagcloud{
    display: flex;
    ul{
      padding-left: 10px;
    }
  }
  .article-more-link span {
    background: #4d4d4d;
    color: #fff;
    font-size: 12px;
    padding: 5px 8px;
    line-height: 16px;
    border-radius: 2px;
    transition: background .3s;
    cursor:pointer;
  }
  .article-more-link span:hover {
    background: #3c3c3c;
  }



</style>
