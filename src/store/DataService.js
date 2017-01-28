import AV from 'leancloud-storage'
import DEFAULT_AVATAR from '../assets/default_avatar.png'
const APP_ID = 'x9WYLHLwqT3rVo0ks6SjVHbN-gzGzoHsz';
const APP_KEY = 'AKEeGQbcPyqUMoGm1pSWpygr';
AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});

export default {
  sendLoginReq ({commit}, loginInfo){
    AV.User.logIn(loginInfo.username, loginInfo.password).then((loginedUser) => {
      // console.log(loginedUser)
      commit('setUserInfo', loginedUser)
    }, (error) => {
      commit('setLoginError', error)
    })
  },
  sendSignupReq ({commit}, signupInfo){
    //    console.log(signupInfo)
    if (signupInfo.password != null && signupInfo.password == signupInfo.verfiPass) {
      let user = new AV.User();
      user.set('college', '加里敦大学');
      user.set('desc', '这家伙太懒，啥都没写');
      user.set('nickname', '这是昵称');
      user.set('gender', 'secret');
      user.set('post', []);
      let data = {base64: DEFAULT_AVATAR};
      let a = new AV.File('avatar.png', data);
      a.save();
      user.set('avatar', a);
      user.set('follows', []);
      user.set('likePost', []);
      user.setUsername(signupInfo.username);
      user.setPassword(signupInfo.password);
      user.setEmail(signupInfo.username);
      user.signUp().then(function (loginedUser) {
        // console.log(loginedUser)
        commit('setUserInfo', loginedUser)
      }, function (error) {
        console.log(error)
        if (error.message == '此电子邮箱已经被占用。') {
          commit('setSignupError', '此电子邮箱已经被占用')
        }
        else if (error.message == 'The email address was invalid.') {
          commit('setSignupError', '邮箱地址无效')
        }
      });
    }
    else {
      commit('setSignupError', '两次密码不相同')
    }
  },
  uploadPost ({commit}, newPost) {
    // console.log('post', newPost)

    let Post = AV.Object.extend('Post');
    let post = new Post();
    post.set('title', newPost.title);
    post.set('content', newPost.content);
    post.set('tag', newPost.tag);
    post.set('essenced', false);
    post.set('toped', false);
    post.set('liked', 0);
    post.set('likePeople', [])
    post.set('comment', [])
    post.set('createrName', AV.User.current().attributes.username)
    post.set('createrId', AV.User.current().id)
    post.set('createrImg', AV.User.current().attributes.avatar.attributes.url)
    // 新建 Administrator 角色并赋予当前 Post 对象
    // 新建一个 ACL 实例
    // let acl = new AV.ACL();
    // acl.setPublicReadAccess(true); //所有人可读
    // acl.setWriteAccess(AV.User.current(), true); // 当前创建用户可改
    // acl.setRoleWriteAccess('Administrator', true); //管理员可改
    // post.setACL(acl);

    post.save().then((post) => {
      let user = AV.User.current();
      user.add('post', post)
      console.log('postId is ', post);
      return user.save()

    }).then(() => {
      commit('checkLocalUser')
    }).catch(error => {
      console.error(error)
    })
  },
  updateUser ({commit}, info) {
    let user = AV.User.current();
    user.set('college', info.college);
    user.set('desc', info.desc);
    user.set('nickname', info.nickname);
    user.set('gender', info.gender)
    user.save().then(loginedUser => {
      // console.log(loginedUser)
      commit('checkLocalUser')
    }, error => {

    })
  },
  uploadAvatar ({commit}, avatar_b64) {
    let data = {base64: avatar_b64};
    let a = new AV.File('avatar.png', data);
    // a.save({
    //   onprogress: function(e) { console.log(e); }
    // }, {})

    let user = new AV.User.current();
    user.set('avatar', a);
    user.save({
      onprogress: function (e) {
        console.log(e);
      }
    }, {}).then(() => {
      commit('checkLocalUser')
      console.log('update avatar successfully ')
    });
  },
  fetchLatestPost ({commit}) {
    let tquery = new AV.Query('Post');
    tquery.equalTo('toped', true);
    tquery.limit(100);// 最多返回 10 条结果
    tquery.descending('updatedAt');
    tquery.find().then(result => {
      commit('setTopList', result)
    }, error => {

    });
    let query = new AV.Query('Post');
    let now = new Date();
    query.lessThanOrEqualTo('createdAt', now);
    query.limit(100);// 最多返回 10 条结果
    query.descending('updatedAt');
    query.find().then(result => {
      commit('setLatestList', result)
    }, error => {

    })
  },
  fetchEssencedPost ({commit}) {
    let query = new AV.Query('Post');
    query.equalTo('essenced', true);
    query.limit(100);//
    query.descending('updatedAt');
    query.find().then(result => {
      commit('setEssencedList', result)
    }, error => {

    })
  },
  fetchQaPost ({commit}) {
    let query = new AV.Query('Post');
    query.equalTo('tag', '问答');
    query.limit(100);// 最多返回 10 条结果
    query.descending('updatedAt');
    query.find().then(result => {
      commit('setQaList', result)
    }, error => {

    })
  },
  addComment (context, c){
    let comment = {creater: AV.User.current().id, name: AV.User.current().attributes.nickname, content: c}
    let post = context.state.post
    post.add('comment', comment)
    post.save().then(post => {
      // console.log(post)
    })
  },
  toggleLike (context, tag) {
    let post = context.state.post;

    if (!tag) {
      post.save().then(post => {
        post.increment('liked', 1);
        return post.save();
      }).then(() => {
        //console.log('post increment like count')
      });
    } else {
      post.save().then(post => {
        post.increment('liked', -1);
        return post.save();
      }).then(() => {
        //console.log('post decrement like count')
      })
    }

  },
  toggleAddLikePost(context, tag) {
    let post = context.state.post;
    let user = AV.User.current();
    if (!tag) {
      user.addUnique('likePost', post);
      user.save().then(() => {
        // console.log('post add to user like list')
      })
    } else {
      user.remove('likePost', post);
      user.save().then(() => {
        //console.log('remove post from user like list')
      })
    }

  },
  toggleFollowUser (context, userId) {
    let user = context.state.user
    if (context.state.isFollowed) {
      user.unfollow(userId).then(function () {
        context.commit('setFollowTag', false)
      }, function (err) {
        //取消关注失败
        console.dir(err);
      });
    } else {
      user.follow(userId).then(function () {
        //关注成功
        context.commit('setFollowTag', true)

      }, function (err) {
        //关注失败
        console.dir(err);
      });
    }
  },
  fetchAnotherUser ({commit}, userId) {
    let query = new AV.Query('_User');
    query.get(userId).then((user) => {
      // console.log(user)
      commit('setAnotherUser', user)
    }, (error) => {

    });
  },
  fetchUserLikePost ({commit}, postIdList) {
    let query = new AV.Query('Post');
    let list = [];
    postIdList.forEach(item => {
      query.get(item.id).then(post => {
        list.push(post)
      })
    })
    commit('setUserLikeList', list)
  },
  fetchUserFollowList ({commit}) {
    let query = AV.User.current().followeeQuery();
    query.include('followee');
    query.find().then(function (followees) {
      commit('setUserFollowList', followees)
    });

  },
  checkHasFollowed (context, userId) {
    let query = AV.User.current().followeeQuery();
    query.include('followee');
    query.find().then(function (followees) {
      followees.forEach(item => {
        if (item.id == userId)
          context.commit('setFollowTag', true)
      })
    });
    context.commit('setFollowTag', false)

  },
  sendMessageTo (context, message) {
    let status = new AV.Status(null, message.message);
    AV.Status.sendPrivateStatus(status, message.userId).then(function (status) {

      console.dir(status);
    }, function (err) {
      //发布失败
      console.dir(err);
    });
  },
  fetChUnreadMessage ({commit}) {
    AV.Status.countUnreadStatuses(AV.User.current(), 'private').then(function (result) {
      console.log(result)
      commit('setUnread', result.unread)
    }, function (err) {
      //查询失败
    });
  },
  checkMailBox ({commit}) {
    let query = AV.Status.inboxQuery(AV.User.current(), 'private');
    let mails = []
    query.find().then(function (messageList) {
      messageList.forEach ( item => {
        let query = new AV.Query('_User');
        query.get(item.data.source.id).then((user) => {
          mails.push({...item,from:user})
        });
      })
    })
    setTimeout( () => {
      commit('setMailBox', mails)

    },2000)
  }
}












