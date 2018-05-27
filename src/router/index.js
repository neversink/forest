import Vue from 'vue'
import Router from 'vue-router'
import Start from '@/pages/Start'
import Home from '@/pages/Home'
import Business from '@/pages/Business'
import Market from '@/pages/Market'
import News from '@/pages/News'
import Profile from '@/pages/Profile'
import Signin from '@/pages/Signin'
import Signup from '@/pages/Signup'
import Article from '@/pages/Article'
import Test from '@/pages/Test'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/start',
      name: 'Start',
      component: Start,
      children: [{
          path: '',
          component: Home
        }, {
          path: 'home',
          name: 'Home',
          component: Home,
          meta: { index: 10 }
        }, {
          path: 'business',
          name: 'Business',
          component: Business,
          meta: { index: 11 }
        }, {
          path: 'market',
          name: 'Market',
          component: Market,
          meta: { index: 12 }
        }, {
          path: 'news',
          name: 'News',
          component: News,
          meta: { index: 13 }
        },
        {
          path: 'profile',
          name: 'Profile',
          component: Profile,
          meta: { index: 14 }
        }
      ]
    },
    {
      path: '/article',
      name: 'Article',
      component: Article,
      meta: { index: 130 }
    },
    {
      path: '/signin',
      name: 'Signin',
      alias: '/',
      component: Signin,
      meta: { index: 2 }
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup,
      meta: { index: 1 }
    }
  ],
})
