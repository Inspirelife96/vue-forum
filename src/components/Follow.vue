<template>
  <div>
    <mu-list-item v-for="item in userFollowList" :title="item.attributes.username" :describeText="item.attributes.desc" @click="">
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
        this.$router.push({})
      }
    },
    created: function () {
      this.$store.dispatch('fetchUserFollowList',this.user.id)
    },
    computed: {
      ...mapState([
         'userFollowList','user'
      ])
    }
  }
</script>

<style>

</style>
