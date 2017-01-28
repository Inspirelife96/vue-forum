<template>
  <div>
    <mu-sub-header style="font-size: 18px;">发表一个帖子</mu-sub-header>

    <mu-content-block>
      <mu-text-field v-model="post.title" label="标题" hintText="最多不超过10个字符" :errorText="titleErrorText"
                     @textOverflow="handleTitleOverflow" :maxLength="20" fullWidth/>
      <br/>
      <mu-text-field v-model="post.content" label="内容" multiLine :rows="5" :rowsMax="6" fullWidth/>
      <br/>

      <div class="mu-text-field-label">标签</div>
      <mu-chip class="chip" :backgroundColor="tagQA?'grey700':''" style="color: #fff;" @click="selectTagQA">
        <mu-avatar :backgroundColor="tagQA?'grey900':''" :size="32" icon="question_answer"/>
        问答
      </mu-chip>

      <mu-chip :backgroundColor="tagShare?'grey700':''" class="chip" style="color: #fff;" @click="selectTagShare">
        <mu-avatar :backgroundColor="tagShare?'grey900':''" :size="32" icon="share"/>
        分享
      </mu-chip>

      <mu-chip :backgroundColor="tagOther?'grey700':''" class="chip" style="color: #fff;" @click="selectTagOther">
        <mu-avatar :backgroundColor="tagOther?'grey900':''" :size="32" icon="more_horiz"/>
        其他
      </mu-chip>
      <mu-raised-button @click="uploadPost" style="margin-top: 60px;" label="发表" fullWidth primary
                        :disabled="buttonEnable"/>

    </mu-content-block>

  </div>
</template>

<script>
  export default {
    name: 'postedit',
    data () {
      return {
        post: {
          title: '',
          content: ''
        },
        titleErrorText: '',
        tagQA: false,
        tagShare: false,
        tagOther: true,
      }
    },
    methods: {
      selectTagQA () {
        this.tagQA = !this.tagQA
        this.tagShare = false
        this.tagOther = false

       // console.log(this.tagQA, this.tagShare, this.tagOther)
      },
      selectTagShare () {
        this.tagShare = !this.tagShare
        this.tagQA = false
        this.tagOther = false

       // console.log(this.tagQA, this.tagShare, this.tagOther)
      },
      selectTagOther () {
        this.tagOther = !this.tagOther
        this.tagQA = false
        this.tagShare = false
       // console.log(this.tagQA, this.tagShare, this.tagOther)
      },
      handleTitleOverflow (isOverflow) {
        this.titleErrorText = isOverflow ? '超过限定长度' : ''
      },
      uploadPost () {
        if (this.tagQA) {
          this.$store.dispatch('uploadPost', {...this.post, tag: '问答'})
        }
        else if (this.tagShare) {
          this.$store.dispatch('uploadPost', {...this.post, tag: '分享'})
        }
        else if (this.tagOther) {
          this.$store.dispatch('uploadPost', {...this.post, tag: '其他'})
        }
        this.$router.push('/')
      }
    },
    computed: {
      buttonEnable () {
        if (this.post.title != '' && this.post.content != '') {
          if (this.titleErrorText == '') {
            return false
          } else {
            return true
          }
        } else {
          return true
        }
      }
    },
  }
</script>

<style scoped>
  .chip {
    margin: 4px;
  }
</style>
