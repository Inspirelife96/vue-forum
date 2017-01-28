<template>
  <div v-if="mailBox">
    <mu-list>
      <mu-sub-header></mu-sub-header>
      <mu-list-item v-for="item in mailBox" :title="item.from.attributes.username">
        <mu-avatar :src="item.from.attributes.avatar.attributes.url" slot="leftAvatar"/>
        <span slot="describe">
        <span>-</span> {{item.data.message}}
      </span>
        <mu-icon-menu slot="right" icon="more_vert" tooltip="操作">
          <mu-menu-item title="回复" @click="sendMessageTo(item.from.id)"/>

        </mu-icon-menu>
      </mu-list-item>
      <mu-divider inset/>
    </mu-list>
  </div>
</template>
</div>
</template>
<script>
  import {mapState} from 'vuex'
  export default {
    data () {
      return {
        message: null
      }
    },
    methods: {
      sendMessageTo(id) {
        this.$store.dispatch('sendMessageTo', {userId: id, message: this.message})
        this.message = null
      }
    },
    created: function () {
      this.$store.dispatch('checkMailBox')
    },
    computed: {
      ...mapState([
        'mailBox', 'messageUsers'
      ])
    }
  }
</script>

<style>

</style>
