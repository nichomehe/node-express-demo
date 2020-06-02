<template>
  <div class="system-config">
      <div class="text-left margin-bottom-40">
        <Breadcrumb>
            <BreadcrumbItem>系统设置</BreadcrumbItem>
            <BreadcrumbItem>角色列表</BreadcrumbItem>
        </Breadcrumb>
      </div>
    <Table ref="table" width="550" border :columns="columns" :data="roleList">
        <template slot-scope="props" slot="action">
            <Button @click.native="modify(props.rowInfo)" type="text" class="fix-table-btn pointer" target="_blank" icon="ios-create-outline" size="small">修改</Button>
        </template>
    </Table>
        <Modal
        v-model="showModal"
        title="修改角色页面权限"
        on-visible-change="modalChange">
        <div>
            <Tree v-if="showModal" :data="treeList" show-checkbox></Tree>
        </div>

    </Modal>

  </div>
</template>

<script>
export default {
  name: 'systemConfig',
    data () {
        return {
            showModal:false,
            roleList:[],
            treeList:[],
            columns:[
                { title: 'id', align: 'center', key: 'id',  minWidth: 110 },
                { title: '角色名称', align: 'center', key: 'name',  minWidth: 110 },
                { title: '操作', align: 'center', key: 'action',  minWidth: 110 ,
                    render: (h, params) => {
                        return h('div', this.$refs.table['$scopedSlots'].action({ rowInfo: params.row}))
                    }
                }
            ]
        }
    },
    methods:{
        modalChange(show){
            
        },
        getRoleList(){
            this.$fetch({
                url:'http://127.0.0.1:3000/system/getRoleList',
                method:'post'
            }).then((res=>{
                this.roleList = res.data.data
            }))
        },
        modify(row){
            let checkPages =  row.pages.split('#') || []
            let list = []
            this.treeList.forEach(item => {
                if(item.children && item.children.length){
                    item.checked =false
                    item.children.forEach(cItem => {
                        if(checkPages.includes(String(cItem.id))){
                            cItem.checked = true
                        }else{
                            cItem.checked = false
                        }
                    })
                }
                list.push(item)
            })
            this.treeList = list
            this.showModal = true
        }

    },

  mounted(){
      this.treeList = this.$store.state.user.allMenuList
      this.getRoleList()
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.system-config{
    padding: 50px;
}
</style>
