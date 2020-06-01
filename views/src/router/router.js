const RoleList = () => import(/* webpackChunkName: "roleList" */ '@/pages/system/roleList.vue')
const UserList = () => import(/* webpackChunkName: "userList" */ '@/pages/system/userList.vue')
const PageList = () => import(/* webpackChunkName: "pageList" */ '@/pages/system/pageList.vue')
const Main = () => import(/* webpackChunkName: "main" */ '@/components/Main.vue')
const PageOne = () => import(/* webpackChunkName: "pageOne" */ '@/pages/pageOne.vue')
const PageTwo = () => import(/* webpackChunkName: "pageTwo" */ '@/pages/pageTwo.vue')
const PageThr = () => import(/* webpackChunkName: "pageThr" */ '@/pages/pageThr.vue')
const PageFour = () => import(/* webpackChunkName: "pageFour" */ '@/pages/pageFour.vue')




export default [
    {
        path: '/system',
        component: Main,
        icon:'ios-build',
        name:'systemBase',
        meta: { title: '系统设置'},
        children: [
          {
            path: 'userList',
            name: 'userList',
            icon:'ios-people',
            component: UserList,
            meta:{title: '用户列表'}
          },
          {
            path: 'roleList',
            name: 'roleList',
            icon:'ios-people',
            component: RoleList,
            meta:{title: '角色列表'}
          },
          {
            path: 'pageList',
            name: 'pageList',
            icon:'ios-book',
            component: PageList,
            meta:{title: '页面列表'}
          }
        ]
    },
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