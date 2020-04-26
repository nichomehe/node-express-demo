<template>
    <div class="layout width-100 height-100">
         <Layout class="main width-100 height-100">
            <Header>
                <Menu mode="horizontal" theme="dark" active-name="1">
                    <div class="layout-logo">
                        <Icon type="md-cloud-circle" />
                        <span class="f-20">Node Demo</span>
                    </div>
                </Menu>
            </Header>
            <Layout>
                <Sider ref="side" breakpoint="md" hide-trigger collapsible :collapsed-width="100" v-model="collapsed" :style="{background: '#fff'}">
                    <Menu active-name="2-1" theme="light" width="auto" accordion :open-names="['2']">
                        <Submenu name="1">
                            <template slot="title">
                                <Icon type="ios-navigate"></Icon>
                                Item 1
                            </template>
                            <Submenu name="1-1" class="margin-left-15">
                                <template slot="title">
                                    Item 1-1
                                </template>
                                <MenuItem name="1-1-1">Option 2</MenuItem>

                            </Submenu>
                            <MenuItem name="1-2">Option 2</MenuItem>
                            <MenuItem name="1-3">Option 3</MenuItem>
                        </Submenu>
                        <Submenu name="2">
                            <template slot="title">
                                <Icon type="ios-keypad"></Icon>
                                <span>Item2</span>
                            </template>
                            <MenuItem name="2-1">Option 1</MenuItem>
                            <MenuItem name="2-2">Option 2</MenuItem>
                        </Submenu>
                        <Submenu name="3">
                            <template slot="title">
                                <Icon type="ios-analytics"></Icon>
                                Item 3
                            </template>
                            <MenuItem name="3-1">Option 1</MenuItem>
                            <MenuItem name="3-2">Option 2</MenuItem>
                        </Submenu>
                    </Menu>
                </Sider>
                <Layout >
                    <Content :style="{margin:'24px',padding: '24px', minHeight: '280px', background: '#fff'}">
                        Content
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    </div>
</template>
<script>
export default {
  name: "Main",
  data() {
    return {
      collapsed: false
    };
  },
  methods: {

  },
  mounted() {
      console.log(this.$store.state.user.name)
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
        left: 20px;
        color: #fff;
        font-size: 20px;
    }
    .layout-footer-center{
        text-align: center;
    }
}

</style>
