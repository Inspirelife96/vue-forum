<template>
  <div v-if="anotherUser">
    <mu-sub-header style="font-size: 18px;">用户主页：{{anotherUser.attributes.username}}</mu-sub-header>
    <mu-flexbox>
      <mu-flexbox-item class="flex-demo">
        <mu-avatar :size="84" backgroundColor="white" :src="anotherUser.attributes.avatar.attributes.url"/>
      </mu-flexbox-item>
    </mu-flexbox>
    <mu-flexbox class="">
      <mu-flexbox-item class="flex-demo">
        <h2>{{anotherUser.attributes.nickname}}</h2>
      </mu-flexbox-item>
    </mu-flexbox>
    <mu-flexbox class="">
      <mu-flexbox-item class="flex-demo">
        <h4>{{anotherUser.attributes.desc}}</h4>
      </mu-flexbox-item>
    </mu-flexbox>
    <mu-flexbox class="">
      <mu-flexbox-item class="flex-demo" v-if="buttonEnable">
        <mu-raised-button :label="isFollowed ? '取消关注':'关注'" primary @click="toggleFollowUser"
                          :icon=" isFollowed ? 'person':'person_add'"/>
        <mu-raised-button label="私 信" primary @click="sendMessage" icon="message" :disable="logTag"/>
      </mu-flexbox-item>
    </mu-flexbox>

    <mu-sub-header>ta的发帖</mu-sub-header>
    <mu-divider/>
  </div>
</template>
</div>
</template>
<script>
  import {mapState} from 'vuex'
  export default {
    data () {
      return {
        open: false,
      }
    },

    methods: {
      sendMessage () {
        this.$router.push({path: '/message/privatemessage/' + this.$route.params.id})
      },
      toggleFollowUser () {
        this.$store.dispatch('toggleFollowUser', this.$route.params.id)
      }
    },
    created: function () {
      // 获取用户关注的用户列表
      this.$store.dispatch('fetchAnotherUser', this.$route.params.id)
      this.$store.dispatch('checkHasFollowed', this.$route.params.id)
    },
    computed: {
      ...mapState([
        'anotherUser', 'userFollowList', 'user', 'isFollowed','logTag'
      ]),
      buttonEnable () {
        if (this.user.id == this.anotherUser.id)
          return false
        else
          return true
      }
    },
  }
</script>

<style>
  .flex-demo {
    text-align: center;
  }

  .mt12 {
    margin-top: 12px;
  }
</style>
