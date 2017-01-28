<template>
  <div>
    <mu-sub-header style="font-size: 18px;">我的主页</mu-sub-header>
    <mu-flexbox>
      <mu-flexbox-item class="flex-demo">
        <mu-avatar :size="84" backgroundColor="white" :src="user.attributes.avatar.attributes.url"/>
      </mu-flexbox-item>
    </mu-flexbox>
    <mu-flexbox>
      <mu-flexbox-item class="flex-demo">
        <h2>{{user.attributes.nickname}}</h2>
      </mu-flexbox-item>
    </mu-flexbox>
    <mu-flexbox>
    <mu-flexbox-item class="flex-demo">
      <h4>{{user.attributes.desc}}</h4>
    </mu-flexbox-item>
  </mu-flexbox>
    <mu-flexbox style="margin-bottom: 30px;">
      <mu-flexbox-item class="flex-demo">
        <mu-raised-button label="设 置" primary @click="toSettings"/>

      </mu-flexbox-item>
    </mu-flexbox>

    <mu-divider/>
    <mu-appbar>
      <mu-dropDown-menu :value="value" @change="handleChange" underlineClass="underline" :anchorOrigin="anchorPlace" labelClass="label" slot="left">
        <mu-menu-item value="like" title="我喜欢的" @click="goLikePage"/>
        <mu-menu-item value="follow" title="关注的人" @click="goFollowPage"/>

      </mu-dropDown-menu>
    </mu-appbar>
    <router-view></router-view>

  </div>
</template>
</div>
</template>
<script>
  import {mapState} from 'vuex'
  export default {
    data () {
      return {
        anchorPlace: {vertical: 'bottom', horizontal: 'center'},
        value: 'like',
        open: false,
        trigger: null
      }
    },
    mounted () {

    },
    methods: {
      handleChange (value) {
        this.value = value

      },
      goFollowPage () {
        this.$router.push({path: '/user/'+ this.user.id+'/follow'})

      },
      goLikePage () {
        this.$router.push({path: '/user/'+ this.user.id+'/like'})
      },
      toSettings () {
        this.$router.push({name: 'settings'})
      },
      toggle () {
        this.open = !this.open
      },
      handleClose () {
        this.open = false
      }
    },
    computed: {
      ...mapState([
        'user'
      ])
    },
  }
</script>

<style>
  .label {
    color: white;
  }
  .underline {
   opacity: 0;
  }
  .flex-demo {
    text-align: center;
  }

  .mt12 {
    margin-top: 12px;
  }
</style>
