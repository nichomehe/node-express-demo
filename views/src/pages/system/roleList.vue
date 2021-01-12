<template>
  <div class="system-config">
    <div class="text-left margin-bottom-40">
        <Breadcrumb>
            <BreadcrumbItem>系统设置</BreadcrumbItem>
            <BreadcrumbItem>角色列表</BreadcrumbItem>
        </Breadcrumb>
    </div>
    <div class="margin-bottom-30 text-left">
        <Button type="primary" @click="add">添加角色</Button>
    </div>
    <Table ref="table" width="550" border :columns="columns" :data="roleList">
        <template slot-scope="props" slot="action">
            <Button @click.native="modify(props.rowInfo)" type="text" class="fix-table-btn pointer" target="_blank" icon="ios-create-outline" size="small">修改</Button>
        </template>
    </Table>
    <Modal
        v-model="showModal"
        :title="roleId?'修改角色':'添加角色'"
        @on-ok="confirm"
        @on-visible-change="modalStatusChange">
        <Form :model="formData" label-position="left" :label-width="100">
            <FormItem label="角色名：" required>
                <Input v-model="formData.name"></Input>
            </FormItem>
            <FormItem label="页面权限：" required>
                <Tree v-if="showModal" :data="treeList" @on-check-change="treeCheckChange" show-checkbox></Tree>
            </FormItem>
        </Form>

    </Modal>

  </div>
</template>

<script>
import Router from '@/router/router'
import  { creatTreeData } from '@/store/utils'
export default {
  name: 'roleList',
    data () {
        return {
            showModal:false,
            roleId: "",
            formData:{
                name:""
            },
            roleList:[],
            treeList:[],
            columns:[
                { title: 'id', align: 'center', key: 'id',  minWidth: 110 },
                { title: '角色名称', align: 'center', key: 'name',  minWidth: 110 },
                { title: '页面权限', align: 'center', key: 'pages',  minWidth: 150 },
                { title: '操作', align: 'center', key: 'action',  minWidth: 110 ,
                    render: (h, params) => {
                        return h('div', this.$refs.table['$scopedSlots'].action({ rowInfo: params.row}))
                    }
                }
            ]
        }
    },
    methods:{
        modalStatusChange(show){
            let self = this
            if(!show){
                this.roleId = ""
                for(let key in self.formData){
                    self.formData[key] = ""
                }
            }
        },
        getRoleList(){
            this.$fetch({
                url:'/api/system/getRoleList',
                method:'post'
            }).then((res=>{
                this.roleList = res.data
            }))
        },
        add(){
            this.showModal = true
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
            this.formData.name = row.name
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
            let pagesStr = checkItems.join("#")
            let params = {
                pages:pagesStr,
            }
            if(this.roleId){
                params.id = this.roleId
            }
            Object.assign(params,this.formData)
            this.roleId?this.modifyConfirm(params):this.addConfirm(params)
        },
        modifyConfirm(data){
            debugger
            this.$fetch({
                url:'/api/system/setRole',
                method:'post',
                data: data
            }).then(res=>{
                this.$Message.success( res.data.msg || '修改成功!')
                window.location.reload()
            })
        },
        addConfirm(data){
            this.$fetch({
                url:'/api/system/addRole',
                method:'post',
                data: data
            }).then(res=>{
                this.$Message.success( res.data.msg || '添加成功!')
                window.location.reload()
            })
        },
        getAllMenuList(){
            this.$store.dispatch('getAllMenuList').then(res=>{
								let list = res.data || []
								this.treeList = creatTreeData(Router,list,this.$store.state.user.actionMap) || []
            })
        }


    },

  created(){
			this.getAllMenuList()
			this.getRoleList() //9#11#10#12#1#2#2_1#2_2#3#4#5#6#7#8  
	}

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.system-config{
    padding: 50px;
}
</style>


