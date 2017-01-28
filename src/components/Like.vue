<template>
  <div>
    <mu-list-item v-for="item in userLikeList" :title="item.attributes.title" :describeText="item.attributes.creater" @click="goPostPage(item)">
              <span slot="describe">
        <span style="color: rgba(0, 0, 0, .87)">{{item.attributes.createrName}}</span>
      </span>
    </mu-list-item>
  </div>
</template>
</div>
</template>
<script>
  import {mapState} from 'vuex'
  export default {
    data () {
      return {}
    },
    methods: {
      goPostPage(item) {
        this.$store.commit('setPostPage',item)
        this.$router.push({path: '/post/'+item.id})
      }
    },
    created: function () {
      this.$store.dispatch('fetchUserLikePost',this.user.attributes.likePost)
    },
    computed: {
      ...mapState([
          'userLikeList','user'
      ])
    }
  }
</script>

<style>

</style>
