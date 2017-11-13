<template>
  <div class="hello" ref="edit">
    <div class="title">
      <el-input placeholder="请输入内容" v-model="title" class="input-with-select">
        <el-select v-model="select" slot="prepend" placeholder="请选择">
          <el-option label="原创" value="1"></el-option>
          <el-option label="转载" value="2"></el-option>
          <el-option label="翻译" value="3"></el-option>
        </el-select>
      </el-input>

      <template>
        <el-select v-model="tagVal" multiple placeholder="请选择标签">
          <el-option
            v-for="item in tagOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>

        <el-button type="primary" @click="dialogVisible = true">添加标签</el-button>
      </template>

    </div>

    <div class="mavon-edit">
      <mavon-editor :ishljs = "true" v-model="value" ></mavon-editor>
    </div>

    <footer>
        <el-button type="success" v-on:click.native="update">{{updateState ? '更新' : '保存'}}</el-button>
    </footer>

    <el-dialog
      title="添加标签"
      :visible.sync="dialogVisible"
      width="40%"
      :before-close="handleClose">
      <el-form ref="form" label-width="80px">
        <el-form-item label="标签名">
          <el-input v-model="tagInfo.name" placeholder="请输入内容"></el-input>
        </el-form-item>

        <el-form-item label="描述">
          <el-input type="textarea" v-model="tagInfo.description"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="createTag">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  import {mapGetters, mapActions, mapState} from 'vuex'

  export default {
    name: 'edit',
    data () {
      return {
        value: '',
        title: '',
        select: '1',
        id: '',
        tagOptions: [],
        tagVal: [],
        loading: false,
        dialogVisible: false,
        tagInfo: {
          name: '',
          description: ''
        }
      }
    },
    computed: {
      // 使用对象展开运算符将 getter 混入 computed 对象中
      ...mapGetters([
        'test'
      ]),
      ...mapState([
        'route'
      ]),
      updateState () {
        return !!this.$store.state.route.params.id
      }
    },
    mounted: function () {
      this.$refs.edit.style.height = (document.body.offsetHeight - 90) + 'px'

      if (!this.updateState) return

      this.id = this.route.params.id

      this.$store.dispatch('getArticle', this.id)
        .then((res) => {
          this.value = res.content
          this.title = res.title
        })

      this.$store.dispatch('getTagOptions')
        .then((res) => {
          this.tagOptions = res.tags
        })
    },
    methods: {
      ...mapActions([
        'eidtArticle'
      ]),
      update () {
        const article = {title: this.title, content: this.value}

        this.eidtArticle({updateState: this.updateState, article, id: this.id}).then((mes) => {
          this.$root.pageNotify(mes.message)

          if (mes.success) {
            this.timeOutFun(() => {
              this.$router.push({name: 'articles'})
            })
          }
        })
      },
      handleClose (done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done()
          })
          .catch(_ => {})
      },
      createTag () {
        this.$store.dispatch('createTag', {tag: this.tagInfo})
          .then((res) => {
            this.dialogVisible = false
          })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .hello{
    background: #f3f3f3;
    &>div:nth-child(-n+3){
      margin-left: 5%;
      margin-right: 5%;
    }
  }

  div.title{
    margin-bottom:20px;
    &>.el-select{
      margin-top: 20px;
      width: 450px;
    }
  }

  .el-select>.el-input, .el-input-group__prepend .el-select {
    width:100px;
  }

  .el-input-group{
    width:100% !important;
  }

  .mavon-edit > div {
    min-height:580px;
    height:auto;
  }

  footer {
    height:60px;
    background: #f3f3f3;
    box-shadow: 0px -1px 2px 0px rgba(0,0,0,0.24);
    position: absolute;
    width: 100%;
    bottom: 0;
    button{
      float:right;
      margin:10px 5% 0 0;
    }
  }

  .el-input{
    width:150px;
  }

  input.el-input__inner{
    width:300px;
  }
</style>
