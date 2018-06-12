import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Pos  from '@/components/page/Pos.vue'
// import leftNav from '@/components/commmon/leftNav.vue'
import leftNav  from '@/components/common/leftNav.vue'


Vue.use(Router)

export default new Router({
  model:'history',
  routes: [
    {
      path: '/',
      name: 'Pos',
      component: Pos
    },
    {
      path: '/index',
      name: 'leftNav',
      component: leftNav
    }
  ]
})
