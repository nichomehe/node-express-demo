<template>
    <div class="layout width-100 height-100">
         <Layout class="main width-100 height-100">
            <Header>
                <div class="layout-logo">
                    <Icon type="md-planet" />
                    <span class="f-20">Node Demo</span>
                </div>
                <span class="f-12 color-f">{{$t('search')}}</span>
                <Select transfer v-model="lang" style="width:100px" @on-change="changeLang">                    
                    <Option value="zh-cn">中文</Option>
                    <Option value="en">英文</Option>
                    <Option value="id-ID">印尼</Option>
                </Select>
                <div class="header-user">
                    <span>Welcome {{userName}}~</span>
                    <span class="color-theme f-12" @click="logout">退出登录</span>
                </div>
            </Header>
            <Layout>
                <Sider ref="side" breakpoint="md" hide-trigger collapsible :collapsed-width="100"  :style="{background: '#fff'}">
                    <Menu :active-name="activeMenuName" :open-names="openNames" theme="light" width="auto" accordion>
                        <Submenu :name="item.name" v-for="(item,index) in menuList" :key="index">
                            <template slot="title">
                                <Icon :type="item.icon || 'ios-navigate'"></Icon>
                                {{item.title || item.meta.title}}
                            </template>
                            <template v-if="item.children && item.children.length">
                                <template v-for="(cItem,cIndex) in item.children">
                                    <Submenu v-if="cItem.children && cItem.children.length" :name="cItem.name" class="margin-left-15" :key="'c'+cIndex">
                                        <template slot="title">
                                            {{cItem.title || cItem.meta.title}}
                                        </template>
                                        <template v-if="cItem.children && cItem.children.length">
                                            <MenuItem :name="ccItem.name" v-for="(ccItem,ccIndex) in cItem.children" :key="'cc'+ccIndex"  @click.native="sideMenuClick(ccItem)">{{ccItem.title ||  ccItem.meta.title}}</MenuItem>
                                        </template>
                                    </Submenu>
                                    <MenuItem v-else :name="cItem.name"  :key="'c'+cIndex" @click.native="sideMenuClick(cItem)">{{cItem.title || cItem.meta.title}}</MenuItem>
                                </template>
                            </template>
                        </Submenu>
                    </Menu>
                </Sider>
                <Layout >
                    <Content :style="{margin:'24px', minHeight: '280px', background: '#fff'}" class="flex-column">
                        <div class="flex-1 width-100">
                             <router-view class=" width-100 height-100 router-main"  id="viewBox"/>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    </div>
</template>
<script >
export default {
  name: "Main",
  data() {
    return {
      activeMenuName:'pageOne',
      openNames:[],
      lang:''
    };
  },
  methods: {
    sideMenuClick(routerItem){
        this.activeMenuName = routerItem.name
        this.$router.push({name:routerItem.name})
    },
    logout(){
        localStorage.removeItem('name')
        window.location.hash = '#/login'
        window.reload()
    },
    changeLang(val){
        localStorage.setItem('lang',val)
        window.location.reload()
    }
  },
  computed:{
    menuList(){
        return this.$store.state.routerList
    },
    userName(){
        return localStorage.getItem('name') || ''
    }
  },
  created() {
    let self = this
    this.activeMenuName = this.$route.name
    this.$route.matched.forEach(item => {
      self.openNames.push(item.name)
    })
    this.lang = localStorage.getItem('lang') || 'zh-cn'
  }
};
</script>

<style lang='less' scoped>
.layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
    .layout-header-bar{
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
        text-align: left;
    }
    .layout-logo{
        width: 400px;
        height: 30px;
        line-height: 30px;
        text-align: left;
        float: left;
        position: relative;
        top: 15px;
        left: 0px;
        color: #fff;
        font-size: 20px;
    }
    .header-user{
        height: 30px;
        line-height: 30px;
        float: right;
        position: relative;
        top: 15px;
        right: 10px;
        color: #fff;
        font-size: 15px;
    }
    .layout-footer-center{
        text-align: center;
    }
    .router-main{
        overflow: auto;
    }
}

</style>
