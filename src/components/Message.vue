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
          <mu-menu-item title="回复" @click="openDialog(item.from.id)"/>

        </mu-icon-menu>
      </mu-list-item>
      <mu-divider inset/>
    </mu-list>
    <mu-dialog :open="dialog" title="回复">
      <mu-text-field v-model="message"></mu-text-field>
      <mu-flat-button label="取 消" slot="actions" primary @click="dialog = false"/>
      <mu-raised-button primary label="确 定" slot="actions" primary @click="sendMessageTo"/>
    </mu-dialog>
  </div>
</template>
</div>
</template>
<script>
  import {mapState} from 'vuex'
  export default {
    data () {
      return {
        dialog: false,
        message: null,
        id: null
      }
    },
    methods: {
      openDialog (userId) {
          this.dialog = true
        this.id =  userId
      },
      sendMessageTo() {
          this.dialog = false
        this.$store.dispatch('sendMessageTo', {userId: this.id, message: this.message})
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
