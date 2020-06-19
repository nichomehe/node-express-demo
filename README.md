node-express-demo
├─ .DS_Store
├─ README.md
├─ app.js
├─ bin                          //node入口文件
│  └─ www
├─ controller                   //接口路由
│  ├─ system.js
│  ├─ user.js
│  └─ utils.js
├─ dao                          //连接数据库，操作数据库，处理业务逻辑
│  ├─ actionDao.js
│  ├─ base.js
│  ├─ pageDao.js
│  ├─ roleDao.js
│  ├─ userDao.js
│  └─ utils.js
├─ db.js                        //连接数据库配置
├─ mockdata
│  ├─ system
│  │  └─ getActionList.json
│  └─ user
│     ├─ getMenuList.json
│     ├─ getUserList.json
│     └─ login.json
├─ model                        //数据库实体模型 生成sql语句
│  ├─ actionModel.js
│  ├─ baseModel.js
│  ├─ pageModel.js
│  ├─ roleModel.js
│  └─ userModel.js
├─ package-lock.json
├─ package.json
└─ views                        //前端页面
   ├─ .DS_Store
   ├─ .babelrc
   ├─ .editorconfig
   ├─ .postcssrc.js
   ├─ README.md
   ├─ build
   │  ├─ build.js
   │  ├─ check-versions.js
   │  ├─ logo.png
   │  ├─ utils.js
   │  ├─ vue-loader.conf.js
   │  ├─ webpack.base.conf.js
   │  ├─ webpack.dev.conf.js
   │  └─ webpack.prod.conf.js
   ├─ config
   │  ├─ dev.env.js
   │  ├─ index.js
   │  └─ prod.env.js
   ├─ dist
   │  ├─ index.html
   │  └─ static
   │     ├─ css
   │     │  ├─ app.f84bf8bbae03ff28a4b09b26a0ef779e.css
   │     │  └─ app.f84bf8bbae03ff28a4b09b26a0ef779e.css.map
   │     └─ js
   │        ├─ app.91fe577df6ed0201eca1.js
   │        ├─ app.91fe577df6ed0201eca1.js.map
   │        ├─ manifest.2ae2e69a05c33dfc65f8.js
   │        ├─ manifest.2ae2e69a05c33dfc65f8.js.map
   │        ├─ vendor.2ef63a37211b72c34e1b.js
   │        └─ vendor.2ef63a37211b72c34e1b.js.map
   ├─ index.html
   ├─ package-lock.json
   ├─ package.json
   ├─ src
   │  ├─ .DS_Store
   │  ├─ App.vue
   │  ├─ assets
   │  │  ├─ css
   │  │  │  ├─ common.less
   │  │  │  ├─ less
   │  │  │  │  ├─ _color.less
   │  │  │  │  ├─ _font.less
   │  │  │  │  ├─ _icon.less
   │  │  │  │  ├─ _iview.less
   │  │  │  │  ├─ _reset.less
   │  │  │  │  └─ _text.less
   │  │  │  └─ theme.less
   │  │  └─ logo.png
   │  ├─ components
   │  │  ├─ HelloWorld.vue
   │  │  └─ Main.vue
   │  ├─ main.js
   │  ├─ pages
   │  │  ├─ login.vue
   │  │  ├─ pageFour.vue
   │  │  ├─ pageOne.vue
   │  │  ├─ pageThr.vue
   │  │  ├─ pageTwo.vue
   │  │  └─ system
   │  │     ├─ pageList.vue
   │  │     ├─ roleList.vue
   │  │     └─ userList.vue
   │  ├─ router
   │  │  ├─ index.js
   │  │  └─ router.js
   │  ├─ service
   │  │  ├─ fetch.js
   │  │  └─ utils.js
   │  └─ store
   │     ├─ index.js
   │     ├─ module
   │     │  └─ user.js
   │     └─ utils.js
   └─ static

```