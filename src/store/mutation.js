export default {
  increment (state) {
    // 这里的 `state` 对象是模块的局部状态
    state.count++
  },
  ModifyUserName (state, username) {
    state.username = username
  },
  UpdateArticleList (state, articleList) {
    state.articleList = articleList
  }
}
