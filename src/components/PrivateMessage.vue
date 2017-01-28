<template>
  <div>

    <mu-list>
      <mu-list-item title="Mike Li" titleClass="right">
        <mu-avatar icon="face" slot="rightAvatar"/>
      </mu-list-item>
      <mu-list-item title="Mike Li">
        <mu-avatar icon="face" slot="leftAvatar"/>
      </mu-list-item>

    </mu-list>
    <mu-divider inset/>

    <footer>
      <mu-content-block style="background-color: #d3d6db;">
        <mu-text-field hintText="说点什么..." v-model="message" :underlineShow="false" style="width: 60%"/>
        <mu-raised-button label="发送" class="demo-flat-button" primary @click="sendMessage"/>

      </mu-content-block>

    </footer>

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
      sendMessage (){
          this.$store.dispatch('sendMessageTo',{userId:this.$route.params.userId,message: this.message})
      }
    },
    created: function () {
        //this.$store.dispatch('fetchConservation')
    }
  }
</script>

<style>
  footer {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .right{
    float: right;}
</style>
