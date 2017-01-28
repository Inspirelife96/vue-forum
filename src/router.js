import Vue from 'vue'
import VueRouter from 'vue-router'
import Post from './components/Post.vue'
import PostEdit from './components/PostEdit.vue'
import User from './components/User.vue'
import Like from './components/Like.vue'
import UserHome from './components/UserHome.vue'
import Settings from './components/Settings.vue'
import PostPage from './components/PostPage.vue'
import FollowUser from './components/FollowUser.vue'
import Follow from './components/Follow.vue'
import Message from './components/Message.vue'

Vue.use(VueRouter)

const routes = [
  {path: '/',component:Post},
  {path: '/postedit', name: 'postedit',component: PostEdit},
  {
    path: '/user/:id', component: User,
    children: [
      {
        path: '',
        component: UserHome
      },
      {
        path: 'like',
        component: Like
      },
      {
        path: 'follow',
        component: Follow
      }
    ]
  },
  { path: '/settings', component: Settings,
    name: 'settings'
  },
  { path: '/post/:id',component: PostPage},
  { path: '/follow/:id' ,component: FollowUser },
  { path: '/message',component: Message, }
]

export default new VueRouter({
  routes
})

