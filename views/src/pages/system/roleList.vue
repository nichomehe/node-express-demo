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
        @on-ok="confirm">
        <div>
            <Tree v-if="showModal" :data="treeList" @on-check-change="treeCheckChange" show-checkbox></Tree>
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
            roleId: "",
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
        getRoleList(){
            this.$fetch({
                url:'http://127.0.0.1:3000/system/getRoleList',
                method:'post'
            }).then((res=>{
                this.roleList = res.data.data
            }))
        },
        treeCheckChange(){
            this.treeList = JSON.parse(JSON.stringify(this.treeList))
        },
        modify(row){
            let checkPages =  row.pages.split('#') || []
            let list = []
            this.treeList.forEach(item => {
                if(item.children && item.children.length){
                    item.checked = false
                    item.expand = false
                    item.children.forEach(cItem => {
                        if(checkPages.includes(String(cItem.id))){
                            cItem.checked = true
                            item.expand = true
                        }else{
                            cItem.checked = false
                        }
                    })
                }
                list.push(item)
            })
            this.roleId = row.id
            this.treeList = list
            this.showModal = true
        },
        filterCheckData(data,resultArr = []){
            let self = this
            let arr = resultArr
            data.forEach(item => {
                if(item.checked){
                    arr.push(item.id)
                }
                if(item.children && item.children.length){
                    arr = self.filterCheckData(item.children,arr)
                }
            })
            return arr
        },
        confirm(){
            let checkItems = this.filterCheckData(this.treeList)
            this.$fetch({
                url:'http://127.0.0.1:3000/system/setPagesByRole',
                method:'post',
                data:{
                    pages:checkItems.join("#"),
                    id:this.roleId
                }
            }).then(res=>{
                this.$Message.success( res.data.msg || '登陆成功!')
                window.location.reload()
            })
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
