<template>
  <div>
    <mu-tabs :value="activeTab" @change="handleTabs">
      <mu-tab value="latest" title="最新"/>
      <mu-tab value="essenced" title="精华"/>
      <mu-tab value="qa" title="问答"/>
    </mu-tabs>
    <mu-refresh-control :refreshing="refreshing" :trigger="trigger" @refresh="refresh"/>

    <mu-list>
      <mu-list-item v-for="item in topedList" :title="item.attributes.title" :describeText="item.attributes.creater" @click="goPostPage(item)">
              <span slot="describe">
        <span style="color: rgba(0, 0, 0, .87)">{{item.attributes.createrName}}</span>
      </span>
        <mu-badge content="置顶"  secondary slot="right"/>
      </mu-list-item>
      <mu-divider />
      <mu-list-item v-for="item in list" :title="item.attributes.title" :describeText="item.attributes.creater" @click="goPostPage(item)">

      <span slot="describe">
        <span style="color: rgba(0, 0, 0, .87)">{{item.attributes.createrName}}</span>
      </span>
        <mu-badge :content="item.attributes.tag" slot="right"/>
      </mu-list-item>
    </mu-list>
    <mu-dialog :open="dialog" title="请先登陆查看详细内容">

      <mu-flat-button label="确定" slot="actions" primary @click="dialog = false"/>

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
        refreshing: false,
        activeTab: 'latest',
        trigger: null,
        dialog: false
      }
    },
    methods: {
      goPostPage (item) {
          if(this.logTag){
            this.$store.commit('setPostPage',item)
            this.$router.push({path: '/post/'+item.id})
          }
          else
              this.dialog = true

      },
      refresh () {
          this.refreshing = true
          setTimeout( ()=> {
              this.handleTabs(this.activeTab);
              this.refreshing = false
          },2000)
      },
      handleTabs (val) {
        this.activeTab = val
        if( val == 'latest' ){
          this.$store.dispatch('fetchLatestPost');
        }else if(val == 'essenced'){
          this.$store.dispatch('fetchEssencedPost');
        }else if(val == 'qa'){
          this.$store.dispatch('fetchQaPost');
        }
      }
    },
    mounted () {
      this.trigger = this.$el
    },
    beforeCreate: function () {
      this.$store.dispatch('fetchLatestPost');
    },
    computed: {
      ...mapState([
          'topedList','latestList','essencedList','qaList','logTag'
      ]),
      list () {
          if(this.activeTab == 'latest'){
              return this.latestList
          }else if(this.activeTab == 'essenced'){
              return this.essencedList
          }else if( this.activeTab == 'qa'){
              return this.qaList
          }
      }
    }
  }
</script>

<style>
  .demo-badge-container{
    padding-top: 24px;
  }
  .demo-icon-badge {
    padding: 12px;
    margin-right: 16px;
  }
</style>
