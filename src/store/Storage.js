import AV from 'leancloud-storage'

const APP_ID = 'x9WYLHLwqT3rVo0ks6SjVHbN-gzGzoHsz';
const APP_KEY = 'AKEeGQbcPyqUMoGm1pSWpygr';
AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});
export default {
  state: {
    loginError: null,
    signupError: null,
    logTag: false,
    user: {},
    topedList: null,
    latestList: null,
    essencedList: null,
    qaList: null,
    post: null,
    anotherUser: null,
    userLikeList: null,
    userFollowList: null,
    isFollowed: false,
    unRead: '0',
    mailBox: null,
  },
  mutations: {
    checkLocalUser (state) {
     // console.log(AV.User.current())
      if(AV.User.current()){
        state.user = AV.User.current()
        state.logTag = true
      }
    },
    setLoginError (state,error) {
      if(error.message == 'The username and password mismatch.')
        state.loginError = '用户名和秘密不匹配'
     else if(error.message = 'Could not find user')
       state.loginError = '用户不存在'
    },
    setSignupError (state,error) {
      state.signupError = error
    },
    setUserInfo (state, user) {
      console.log('logined')
      state.logTag = true;
      state.user = user
    },
    clearCurrentUser(state){
      AV.User.logOut();
      state.user = {};
      state.logTag = false
      console.log('signout')
    },
    setTopList (state,list){
      state.topedList = list
    },
    setLatestList(state,list) {
      state.latestList = list
    },
    setEssencedList(state,list) {
      state.essencedList = list
    },
    setQaList(state,list) {
      state.qaList = list
    },
    setPostPage (state, post){
      state.post = post
    },
    setAnotherUser (state, user) {
      state.anotherUser = user
    },
    setUserLikeList ( state, list){
      state.userLikeList = list
    },
    setUserFollowList (state ,userList) {
      state.userFollowList = userList
    },
    setFollowTag (state, tag){
      state.isFollowed = tag
    },
    setUnread( state,count){
      state.unRead = count.toString()
    },
    setMailBox ( state,messageList) {
      state.mailBox = messageList
    },
  },
  getters: {

  }
}
