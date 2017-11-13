<template>
  <!--<div class="register">-->
    <!--<el-form label-position="right" :rules="rules2" ref="registerForm" status-icon label-width="80px"-->
             <!--class="register-form" :model="registerForm">-->
      <!--<el-form-item label="用户名">-->
        <!--<el-input v-model="registerForm.username"></el-input>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="密码" prop="pass">-->
        <!--<el-input type="password" v-model="registerForm.pass" auto-complete="off"></el-input>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="确认密码" prop="checkPass">-->
        <!--<el-input type="password" v-model="registerForm.checkPass" auto-complete="off"></el-input>-->
      <!--</el-form-item>-->

      <!--<el-form-item>-->
        <!--<el-button type="primary" @click="submitForm('registerForm')">提交</el-button>-->
      <!--</el-form-item>-->
    <!--</el-form>-->
  <!--</div>-->
  <div class="login">
    <el-form label-position="right" ref="loginForm" status-icon label-width="80px"
             class="register-form" :model="loginForm">
      <el-form-item label="用户名">
        <el-input v-model="loginForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="loginForm.password" auto-complete="off"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('registerForm')">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
    import {mapActions} from 'vuex'

    export default {
      data () {
        var validatePass = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请输入密码'))
          } else {
            if (this.registerForm.checkPass !== '') {
              this.$refs.registerForm.validateField('checkPass')
            }
            callback()
          }
        }

        var validatePass2 = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请再次输入密码'))
          } else if (value !== this.registerForm.pass) {
            callback(new Error('两次输入密码不一致!'))
          } else {
            callback()
          }
        }

        return {
          registerForm: {
            username: '',
            pass: '',
            checkPass: ''
          },
          loginForm: {
            username: '',
            password: ''
          },
          rules2: {
            pass: [
              { validator: validatePass, trigger: 'blur' }
            ],
            checkPass: [
              { validator: validatePass2, trigger: 'blur' }
            ]
          }
        }
      },
      methods: {
        ...mapActions([
          'register',
          'login'
        ]),
        submitForm (formName) {
          const _this = this

//          this.$refs[formName].validate((valid) => {
//            if (valid) {
//              const form = _this.registerForm
//              const user = {username: form.username, password: form.pass}
//
//              _this.register(user)
//            } else {
//              console.log('error submit!!')
//              return false
//            }
//          })

          this.login(this.loginForm).then(() => {
            _this.$router.push({name: 'home'})
          })
        }
      }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .register, .login{
    display: flex;
    justify-content: center;
    margin-top:20px;
    .register-form{
      width:400px
    }
  }
</style>
