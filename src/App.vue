<template>
  <div id="app">
    <mu-appbar>
      <mu-flat-button label="O ' MyCollege" slot="left" @click="backToHome"/>

      <mu-flat-button v-if="!logTag" @click="dialog = true"
                      label="登陆" slot="right" primary/>

      <mu-icon-button v-if="logTag" icon='add' slot="right" @click="editPost" tooltip="发帖" touch/>
      <mu-badge v-if="logTag" :content="unRead" circle secondary slot="right">
        <mu-icon-button icon="mail" @click="goMessageList"/>
      </mu-badge>
      <mu-icon-menu v-if="logTag" icon="account_circle" slot="right" :anchorOrigin="anchorOrigin"
                    :targetOrigin="targetOrigin">
        <mu-menu-item title="我的主页" leftIcon="home" @click="goUserPage"/>
        <mu-menu-item title="我喜欢的" leftIcon="favorite" @click="goLikePage"/>
        <mu-menu-item title="我关注的人" leftIcon="people" @click="goFollowPage"/>
        <mu-divider/>
        <mu-menu-item title="设置" leftIcon="settings" @click="toSettings"/>
        <mu-menu-item title="关于" leftIcon="help"/>
        <mu-divider/>
        <mu-menu-item title="登出" leftIcon="exit_to_app" @click="sighOut"/>

      </mu-icon-menu>
    </mu-appbar>

    <mu-dialog :open="dialog" title="登陆" @close="dialog = false">
      <mu-sub-header>{{loginError}}</mu-sub-header>
      <mu-text-field v-model="loginUser.username" label="邮箱" hintText="请输入邮箱作为用户名" type="email" labelFloat/>
      <br/>
      <mu-text-field v-model="loginUser.password" label="密码" hintText="请输入密码" type="password" labelFloat/>
      <br/>
      <mu-flat-button label="注册" slot="actions" @click="openSignup"/>
      <mu-flat-button label="登陆" slot="actions" primary @click="signin"/>

    </mu-dialog>
    <mu-dialog :open="signupTag" title="请先注册">
      <mu-sub-header>{{signupError}}</mu-sub-header>

      <mu-text-field v-model="signupUser.username" label="邮箱" hintText="请输入邮箱作为用户名" type="email" labelFloat/>
      <br/>
      <mu-text-field v-model="signupUser.password" label="密码" hintText="请输入密码" type="password" labelFloat/>
      <br/>
      <mu-text-field v-model="signupUser.verfiPass" label="确认密码" hintText="请再次输入密码" type="password" labelFloat/>
      <br/>
      <mu-flat-button label="取消" slot="actions" @click="signupTag = false"/>
      <mu-flat-button label="注册" slot="actions" primary @click="signup"/>

    </mu-dialog>

    <router-view></router-view>
  </div>
</template>
</div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'
  export default {
    name: 'app',
    components: {},
    data () {
      return {
        activeTab: 'latest',
        anchorOrigin: {"vertical": "bottom", "horizontal": "left"},
        targetOrigin: {"vertical": "top", "horizontal": "left"},
        dialog: false,
        loginUser: {
          username: null,
          password: null
        },
        signupUser: {
          username: null,
          password: null,
          verfiPass: null
        },
        signupTag: false
      }
    },
    methods: {
      goMessageList () {
        this.$store.dispatch('fetChUnreadMessage')
        this.$router.push({path: '/message'})
      },
      goFollowPage () {
        this.$router.push({path: '/user/' + this.user.id + '/follow'})
      },
      goLikePage () {
        this.$router.push({path: '/user/' + this.user.id + '/like'})
      },
      toSettings () {
        this.$router.push({name: 'settings'})
      },
      backToHome () {
        this.$router.replace('/')
      },
      goUserPage () {
        this.$router.push({path: '/user/' + this.user.id})
      },
      editPost () {
        this.$router.push({name: 'postedit'})
      },
      signin () {
        this.$store.dispatch('sendLoginReq', this.loginUser)
      },
      openSignup () {
        this.dialog = false;
        this.signupTag = true
      },
      signup () {
        this.$store.dispatch('sendSignupReq', this.signupUser)
      },
      sighOut () {
        this.$store.commit('clearCurrentUser');
        this.$router.replace('/')
      },
      ...mapMutations([
        'checkLocalUser',
      ])
    },
    created: function () {
      this.checkLocalUser();
    },
    computed: {
      ...mapState([
        'logTag', 'loginError', 'signupError', 'user', 'unRead'
      ])
    },
    watch: {
      logTag (val) {
        if (val == true) {
          this.dialog = false
          this.signupTag = false
        }
      }
    }
  }
</script>

<style>

</style>
