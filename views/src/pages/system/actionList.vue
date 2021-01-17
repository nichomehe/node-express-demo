<template>
  <div class="system-config">
    <div class="text-left margin-bottom-40">
        <Breadcrumb>
            <BreadcrumbItem>系统设置</BreadcrumbItem>
            <BreadcrumbItem>操作列表</BreadcrumbItem>
        </Breadcrumb>
    </div>
    <div class="margin-bottom-30 text-left">
        <Button type="primary" @click="add">添加操作</Button>
    </div>
    <Table ref="table" width="550" border :columns="columns" :data="userList">
        <template slot-scope="props" slot="action">
            <Button @click.native="modify(props.rowInfo)" type="text" class="fix-table-btn pointer" target="_blank" icon="ios-create-outline" size="small">修改</Button>
        </template>
    </Table>
    <Modal
        v-model="showModal"
        :title="actionId?'修改操作':'添加操作'"
        @on-ok="confirm"
        @on-visible-change="modalStatusChange">
        <Form :model="formData" label-position="left" :label-width="60">
            <FormItem label="操作名：" required>
                <Input v-model="formData.title"></Input>
            </FormItem>
            <FormItem label="操作code" required>
                <Input v-model="formData.info" type="password"></Input>
            </FormItem>
        </Form>

    </Modal>

  </div>
</template>

<script>
export default {
  name: 'actionList',
    data () {
        return {
            showModal:false,
            actionId: "",
            formData:{
                id:"",
                title:"",
                info:""
            },
            actionList:[],
            columns:[
                { title: 'id', align: 'center', key: 'id',  minWidth: 110 },
                { title: '姓名', align: 'center', key: 'name',  minWidth: 110 },
                { title: '角色', align: 'center', key: 'role',  minWidth: 110 },
                { title: '操作', align: 'center', key: 'action',  minWidth: 110 ,
                    render: (h, params) => {
                        return h('div', this.$refs.table['$scopedSlots'].action({ rowInfo: params.row}))
                    }
                }
            ]
        }
    },
    methods:{
        getActionList(){
            this.$fetch({
                url:'/api/system/getActionList',
                method:'post'
            }).then((res=>{
                this.actionList = res.data
            }))
        },
        add(){
            this.showModal = true
        },
        modify(row){
            let self = this
            this.actionId = row.id
            Object.keys(this.formData).forEach(key=>{
                row[key] && (self.formData[key] = row[key])
            })
            this.formData.role = row.role.split("#")
            this.showModal = true
        },
        confirm(){
            let params = {}
            if(this.actionId){
                params.id = this.actionId
            }
            Object.assign(params,this.formData)
            params.role = this.formData.role.join("#")
            this.actionId?this.modifyConfirm(params):this.addConfirm(params)
        },
        modifyConfirm(data){
            this.$fetch({
                url:'/api/user/setUser',
                method:'post',
                data: data
            }).then(res=>{
                this.$Message.success( res.data.msg || '修改成功!')
                window.location.reload()
            })
        },
        addConfirm(data){
            this.$fetch({
                url:'/api/user/addUser',
                method:'post',
                data: data
            }).then(res=>{
                this.$Message.success( res.data.msg || '添加成功!')
                window.location.reload()
            })
        }

    },
    mounted(){
        this.getUserList()
        //
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.system-config{
    padding: 50px;
}
</style>
