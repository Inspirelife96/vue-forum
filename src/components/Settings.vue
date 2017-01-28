<template>
  <div>
    <mu-sub-header style="font-size: 18px;">个人资料 用户名:{{user.attributes.username}}</yognh></yong></mu-sub-header>
    <mu-divider/>
    <mu-sub-header style="font-size: 12px;">头像</mu-sub-header>
    <mu-flexbox>
      <mu-flexbox-item class="flex-demo">
        <mu-avatar :size="60" backgroundColor="white" :src="user.attributes.avatar.attributes.url"/>
      </mu-flexbox-item>
      <mu-flexbox-item>
        <mu-raised-button label="点击上传">
          <input type="file" class="file-button" accept="image/jpeg, image/png" v-on:change="handleAvatar" id="avatar">
        </mu-raised-button>
      </mu-flexbox-item>
    </mu-flexbox>

    <mu-divider/>
    <mu-content-block>
      <div class="mu-text-field-label">性别</div>

      <mu-flexbox>
        <mu-flexbox-item>
          <mu-radio label="男" name="group" nativeValue="male" v-model="user.attributes.gender" class="radio"
                    :disabled="editEnable"/>
          <br/>

        </mu-flexbox-item>
        <mu-flexbox-item>
          <mu-radio label="女" name="group" nativeValue="female" v-model="user.attributes.gender" class="radio"
                    :disabled="editEnable"/>
          <br/>

        </mu-flexbox-item>
        <mu-flexbox-item>
          <mu-radio label="保密" name="group" nativeValue="secret" v-model="user.attributes.gender" class="radio"
                    :disabled="editEnable"/>
          <br/>

        </mu-flexbox-item>
      </mu-flexbox>


      <mu-text-field class="input" label="昵称" hintText="输入昵称" v-model="user.attributes.nickname"
                     :disabled="editEnable"/>
      <br/>
      <mu-text-field class="input" label="学校" hintText="输入学校" v-model="user.attributes.college" :disabled="editEnable"/>
      <br/>
      <mu-text-field class="input" label="简介" hintText="输入昵称" v-model="user.attributes.desc" :disabled="editEnable"/>
      <br/>


      <mu-raised-button label="修改" @click="enableEdit"></mu-raised-button>

      <mu-raised-button label="保存" primary style="margin-left: 50px;" @click="updateUser"></mu-raised-button>

    </mu-content-block>

  </div>
</template>
</div>
</template>
<script>
  import {mapState} from 'vuex'
  export default {
    data () {
      return {
        editEnable: true
      }
    },
    methods: {
      handleAvatar () {
        let reader = new FileReader();
        reader.readAsDataURL(document.querySelector("input[type=file]").files[0]);
        setTimeout( () => {
          this.$store.dispatch('uploadAvatar',reader.result)
        },2000)
      },
      enableEdit () {
        this.editEnable = false
      },
      updateUser () {
        this.editEnable = true
        this.$store.dispatch('updateUser', this.user.attributes)
      }
    },
    computed: {
      ...mapState([
        'user'
      ])
    },
    created: function () {
    }
  }
</script>

<style>
  .input {
    width: 100%;
  }

  .file-button {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    opacity: 0;
  }
</style>
