<template>
  <div class="login">
    <van-icon name="arrow-left" size="25" class="back" @click="$router.back()"/>
    <div class="loginMethod">
      <p @click="loginMethodFunction">{{loginMethod[1]}}</p>
      <h3>{{loginMethod[0]}}</h3>
    </div>
    <div class="textbox">
      <div class="messageLogin" v-show="messageLogin">
        <form @submit.prevent="loginTip" action="#">
          <van-cell-group>
            <van-field v-model="tel" type="tel" label="手机号" maxlength="11"/>
            <van-field
              maxlength="6"
              v-model="sms"
              center
              clearable
              label="验证码"
              placeholder="请输入短信验证码">
              <template #button>
                <van-button size="small" native-type="button" block type="primary" :disabled="!((/^[1][3,4,5,7,8,9][0-9]{9}$/).test(tel) && codeSend == 0)"
                            color="#B55D4C" @click="getValidation">{{codeSend?`已发送(${codeSend}s)`:"发送验证码"}}</van-button>
              </template>
            </van-field>
          </van-cell-group>
          <div class="loginBtn">
            <p class="attention">*注册则代表同意<a href="javascript:;">《用户服务协议》</a>。未注册此外卖帐号的手机号，登录时将自动注册</p>
            <button class="loginIn" @click="">登陆</button>
          </div>
        </form>
      </div>
      <div class="passwordLogin" v-show="!messageLogin" ref="passwordLabel">
        <form @submit.prevent="loginTip" action="#">
          <van-cell-group>
            <van-field v-model="name" label="用户名"/>
            <van-field v-model="password" :type="passwordopen?'text':'password'" label="密码" maxlength="16">
              <template #right-icon>
                <van-switch v-model="passwordopen" active-color="#F19483" inactive-color="gray" size="16"/>
              </template>
            </van-field>
            <van-field v-model="code" type="text" label="验证码" maxlength="4">
              <template #right-icon>
                <van-image src="http://localhost:4000/captcha" @click="getCaptcha">发送验证码</van-image>
              </template>
            </van-field>
<!--
            <van-field v-model="code" type="text" label="验证码" maxlength="4" right-icon="http://localhost:4000/captcha"
                       @click="getCaptcha"></van-field>
-->
          </van-cell-group>
          <div class="loginBtn">
            <button class="loginIn">登陆</button>
          </div>
        </form>
      </div>
    </div>


  </div>
</template>

<script>
  import { Toast } from 'vant';
  import {reqSendCode,reqSmsLogin,reqPwdLogin} from '../../api/index';/*分别是：1.发送短信验证码2.手机号验证码登陆3.用户名密码登陆*/
  export default {
    name: "Login",
    data() {
      return {
        messageLogin: true,
        loginMethod:["短信登陆","密码登陆"],
        tel:"",
        sms:"",
        name:"",
        password:"",
        passwordopen:false,
        code:"",
        codeSend:0,
      }
    },
    methods: {
      loginMethodFunction() {
        this.messageLogin = !this.messageLogin;
        this.loginMethod.reverse();
      },
      async getValidation() {/*获取短信验证码*/
        if(!this.codeSend){
          this.codeSend = 10;
          this.timer = setInterval(() => {
            this.codeSend--;
            if(this.codeSend == 0){
              clearInterval(this.timer)
            };
          },1000);
          const smsAns = await reqSendCode(this.tel);
          if(smsAns.code == 1){
            Toast.fail(smsAns.msg);
            if(this.codeSend){
              this.codeSend=0;
              clearInterval(this.timer)
            }
          }
        }
      },
      async loginTip () {/*登陆个人界面*/
        let loginResult;
        if(this.messageLogin){/*手机号登陆*/
          let {tel,sms} = this;
          if(!tel){/*手机号没输入*/
            Toast.fail('请输入手机号');
            return
          }else if (!sms) {/*验证码没输入*/
            Toast.fail('请输入验证码');
            return
          };
          loginResult = await reqSmsLogin(tel, sms)
        } else {/*账号密码登陆*/
          let {name,password,code} = this;
          if(!name){/*手机号没输入*/
            Toast.fail('请输入用户名');
            return
          }else if (!password) {/*密码没输入*/
            Toast.fail('请输入密码');
            return
          }else if (!code) {/*验证码没输入*/
            Toast.fail('请输入验证码');
            return
          };
          loginResult = await reqPwdLogin({name:name,pwd:password,captcha:code})
        };
        if(loginResult.code==0){
          const userInfo = loginResult.data;
          this.$store.dispatch('userInfoStore',userInfo);
          this.$router.replace('/person');
        } else {
          const wrongMsg = loginResult.msg;
          Toast.fail(wrongMsg);
          this.getCaptcha();
        }
      },
      getCaptcha() {
        const imgTag = this.$refs.passwordLabel.getElementsByTagName('img')[0];
        imgTag.src = `http://localhost:4000/captcha?time=${Date.now()}`;
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
    .messageLogin
      .van-button--block
        width: 85px;
      .loginBtn
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


  .passwordLogin
    img
      width 150px
      height 50px
    .loginBtn
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
