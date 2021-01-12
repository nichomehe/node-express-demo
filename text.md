* controller层: 控制层，请求转发，接受前端请求以及带过来的参数，并调用dao层
* dao层: 处理业务逻辑，访问数据库，向数据库发送sql语句（sql语句通过调用model层获取），完成数据的增删改查任务
* model层: 数据库实体层，一张表对应一个实体类，类中暴露该表字段以及获取sql语句的func供dao层调用




### 创建页面 => 给页面添加操作权限

### 创建角色 => 给角色分配页面权限及页面操作权限  => 给用户分配角色 => 用户登陆（展示该角色的页面以及页面操作按钮）

### 创建用户 => 给用户指定角色




### router.beforeEach 全局路由导航拦截 => 如果vuex里没有menuList 则调用 getAccessInfo action去获取权限页面数组accessDate => 动态生成menuList 渲染左侧菜单栏 => 动态注册路由 router.addRoutes(menuList ) 