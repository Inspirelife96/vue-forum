<template>
  <div>
    <mu-card v-if="anotherUser">
      <mu-card-title :title="post.attributes.title" :subTitle="post.createdAt | dateFilter"/>

      <mu-card-header :title="anotherUser.attributes.username" subTitle="点击头像查看用户">
        <mu-avatar :src="anotherUser.attributes.avatar.attributes.url" slot="avatar" @click="goFollowUser"/>
      </mu-card-header>
      <mu-card-text>
        {{post.attributes.content}}
      </mu-card-text>
      <mu-divider/>
      <mu-list>
        <mu-sub-header>评论</mu-sub-header>
        <mu-list-item v-for="item in post.attributes.comment" :title="item.name" @click="atSomeone(item)">
          <span slot="describe">
      {{item.content}}
      </span>
        </mu-list-item>

      </mu-list>


      <mu-content-block>
        <mu-text-field hintText="评 论" v-model="comment" :disabled="!logTag" style="width: 60%"/>
        <mu-icon-button icon="comment" primary @click="addComment" :disabled="buttonEnable"/>
        <mu-icon-button :icon="liked?'favorite':'favorite_border'" primary @click="toggleLike" :disabled="likeEnable" :iconClass="{red: liked}"/>

      </mu-content-block>


    </mu-card>

  </div>
</template>
</div>
</template>
<script>
  import {mapState, mapActions} from 'vuex'
  export default {
    data () {
      return {
        comment: '',
        liked: false
      }
    },
    methods: {
      atSomeone (someone) {
        this.comment = '@'+someone.name
      },
      goFollowUser () {
          this.$router.push({ path: '/follow/'+this.post.attributes.createrId})
      },
      addComment () {
        this.$store.dispatch('addComment', this.comment)
        this.comment = ''
      },
      toggleLike () {
        let tag = false
        this.user.attributes.likePost.forEach( item => {
            if(item.id == this.post.id)
                  tag = true
        })
         console.log(tag)
        this.$store.dispatch('toggleLike',tag);
        this.$store.dispatch('toggleAddLikePost',tag)
        this.liked = !this.liked
      },
    },
    created: function () {
      this.user.attributes.likePost.forEach( item => {
        if(item.id == this.post.id)
          this.liked = true
      });
      // 获取当前帖子的用户信息
      this.$store.dispatch('fetchAnotherUser',this.post.attributes.createrId)

    },
    computed: {
      ...mapState([
        'post', 'logTag','user','anotherUser'
      ]),
      buttonEnable () {
        if (this.logTag == false) {
          return true
        }
        else if (this.comment != '' && this.logTag) {
          return false
        } else
          return true
      },
      likeEnable () {
        if (this.logTag == false) {
          return true
        } else {
          return false
        }
      }
    },
    filters: {
      dateFilter: (val) => {
        let year = val.getFullYear();
        let month = (val.getMonth() + 1).toString();
        let day = (val.getDate()).toString();
        if (month.length == 1) {
          month = "0" + month;
        }
        if (day.length == 1) {
          day = "0" + day;
        }
        let dateTime = '创建于' + year + '年' + month + '月' + day + '日';
        return dateTime
      }
    },
  }
</script>

<style>
  .red{
    color: #ff4081;}
</style>
