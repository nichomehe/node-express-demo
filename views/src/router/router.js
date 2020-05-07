const Main = () => import(/* webpackChunkName: "main" */ '@/components/Main.vue')
const PageOne = () => import(/* webpackChunkName: "pageOne" */ '@/pages/pageOne.vue')
const PageTwo = () => import(/* webpackChunkName: "pageTwo" */ '@/pages/pageTwo.vue')
const PageThr = () => import(/* webpackChunkName: "pageThr" */ '@/pages/pageThr.vue')
const PageFour = () => import(/* webpackChunkName: "pageFour" */ '@/pages/pageFour.vue')




export default [
    {
        path: '/one',
        component: Main,
        icon:'ios-happy',
        name:'oneBase',
        meta: { title: '分类一'},
        children: [
          {
            path: 'pageone',
            name: 'pageOne',
            icon:'ios-people',
            component: PageOne,
            meta:{title: '页面一'}
          }
        ]
    },
    {
        path: '/two',
        component: Main,
        icon:'ios-outlet',
        name:'twoBase',
        meta: { title: '分类二'},
        children: [
          {
            path: 'pagetwo',
            name: 'pageTwo',
            icon:'ios-people',
            component: PageTwo,
            meta:{title: '页面二'}
          }
        ]
    },
    {
        path: '/thr',
        component: Main,
        icon:'logo-octocat',
        name:'thrBase',
        meta: { title: '分类三'},
        children: [
          {
            path: 'pagethr',
            name: 'pageThr',
            icon:'ios-people',
            component: PageThr,
            meta:{title: '页面三'}
          }
        ]
    },
    {
        path: '/four',
        component: Main,
        icon:'logo-octocat',
        name:'fourBase',
        meta: { title: '分类四'},
        children: [
          {
            path: 'pagefour',
            name: 'pageFour',
            icon:'ios-people',
            component: PageFour,
            meta:{title: '页面四'}
          }
        ]
    }
]