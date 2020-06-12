<template>
  <div class="login">
    <van-icon name="arrow-left" size="25" class="back" @click="$router.back()"/>
    <div class="loginMethod">
      <p @click="loginMethodFunction">{{loginMethod[1]}}</p>
      <h3>{{loginMethod[0]}}</h3>
    </div>
    <div class="textbox">
      <div class="messageLogin" v-show="messageLogin">
        <form action="#">
          <van-cell-group>
            <van-field v-model="tel" type="tel" label="手机号" maxlength="11"/>
            <van-field
              maxlength="4"
              v-model="sms"
              center
              clearable
              label="验证码"
              placeholder="请输入短信验证码">
              <template #button>
                <van-button size="small" type="primary" :disabled="tel.length!=11" color="#B55D4C">发送验证码</van-button>
              </template>
            </van-field>
          </van-cell-group>
        </form>
      </div>
      <div class="passwordLogin" v-show="!messageLogin">
        <form action="#">
          <van-cell-group>
            <van-field v-model="tel" type="tel" label="手机号" maxlength="11"/>
            <van-field v-model="password" :type="passwordopen?'text':'password'" label="密码" maxlength="16">
              <template #right-icon>
                <van-switch v-model="passwordopen" active-color="#F19483" inactive-color="gray" size="16"/>
              </template>
            </van-field>
            <van-field v-model="code" type="text" label="验证码" maxlength="4" :right-icon="require('./images/captcha.svg')"></van-field>
          </van-cell-group>
        </form>
      </div>
    </div>
    <p class="attention">*注册则代表同意<a href="javascript:;">《用户服务协议》</a>。未注册此外卖帐号的手机号，登录时将自动注册</p>
    <button class="loginIn">登陆</button>
  </div>
</template>

<script>
  export default {
    name: "Login",
    data() {
      return {
        messageLogin: true,
        loginMethod:["短信登陆","密码登陆"],
        tel:"",
        sms:"",
        password:"",
        passwordopen:false,
        code:"",
      }
    },
    methods: {
      loginMethodFunction() {
        this.messageLogin = !this.messageLogin;
        this.loginMethod.reverse();
      }
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .login
    .back
      padding 5px
      color gray
    .loginMethod
      display block
      h3
        font-size 30px
        padding 10px
        font-weight 600
        padding-top 40px
      p
        color #B55D4C
        padding 5px
        text-decoration underline
        float right
  .textbox
    position relative
    margin-top 10px
    width 90%
    left 5%
    .passwordLogin
      img
        width 150px
        height 50px
  .attention
    position relative
    font-size 12px
    box-sizing border-box
    margin-top 10px
    padding 10px
    width 90%
    left 5%
    color gray
    a
      color #F19483


  .loginIn
    position relative
    background #B55D4C
    font-size 15px
    color #fff
    border 0
    border-radius 5px
    left 50%
    top 50%
    transform translate3d(-50%,-50%,0)
    margin-top 30px
    padding 10px 20px


</style>
