<template>
  <div class="system-config">
    <div class="text-left margin-bottom-40">
        <Breadcrumb>
            <BreadcrumbItem>系统设置</BreadcrumbItem>
            <BreadcrumbItem>页面列表</BreadcrumbItem>
        </Breadcrumb>
    </div>
    <!-- <div class="margin-bottom-30 text-left">
        <Button type="primary" @click="add">添加用户</Button>
    </div> -->
    <Table ref="table"  border :columns="columns" :data="pageList">
        <template slot-scope="props" slot="action">
            <div v-if="props.rowInfo.actions">
                <span v-for="(item,index) in props.rowInfo.actions" :key="index" class="margin-right-10">{{actionMap[item].title}}</span>
            </div>
        </template>
        <template slot-scope="props" slot="handle">
            <Button @click.native="modify(props.rowInfo)" type="text" class="fix-table-btn pointer" target="_blank" icon="ios-create-outline" size="small">修改</Button>
        </template>
    </Table>
    <Modal
        v-model="showModal"
        :title="pageId?'修改页面信息':'添加页面'"
        @on-ok="confirm"
        @on-visible-change="modalStatusChange">
        <Form :model="formData" label-position="right" :label-width="100">
            <FormItem label="侧栏title：" required>
                <Input v-model="formData.title"></Input>
            </FormItem>
            <FormItem label="name：" required>
                <Input v-model="formData.name"></Input>
            </FormItem>
            <FormItem label="icon：" required>
                <Input v-model="formData.icon" type="password"></Input>
            </FormItem>
            <FormItem label="操作权限：" required>
                  <Select multiple  clearable transfer v-model="formData.actions" placeholder="请选择页面操作权限">
                    <Option
                      :key="index"
                      :value="String(key)"
                      v-for="(val, key, index) in actionMap">
                      {{val.title}}
                    </Option>
                  </Select>
            </FormItem>
        </Form>

    </Modal>

  </div>
</template>

<script>
export default {
  name: 'pageList',
    data () {
        return {
            showModal:false,
            pageId: "",
            actionMap:{},
            formData:{
                title:"",
                name:"",
                icon:"",
                actions:[]
            },
            pageList:[],
            columns:[
                { title: 'id', align: 'center', key: 'id',  minWidth: 60 },
                { title: 'title', align: 'center', key: 'title',  minWidth: 110 },
                { title: 'name', align: 'center', key: 'name',  minWidth: 110 },
                { title: 'parent_id', align: 'center', key: 'parent_id',  minWidth: 110 },
                { title: 'icon', align: 'center', key: 'icon',  minWidth: 110 },
                { title: '页面操作权限', align: 'center', key: 'action',  minWidth: 140 ,
                    render: (h, params) => {
                        return h('div', this.$refs.table['$scopedSlots'].action({ rowInfo: params.row}))
                    }
                },
                { title: '操作', align: 'center', key: 'actions',  minWidth: 110 ,
                    render: (h, params) => {
                        return h('div', this.$refs.table['$scopedSlots'].handle({ rowInfo: params.row}))
                    }
                }
            ]
        }
    },
    methods:{
        modalStatusChange(show){
            let self = this
            if(!show){
                this.pageId = ""
                for(let key in self.formData){
                    self.formData[key] = ""
                }
            }else{
                
            }
        },
        getPageList(){
            this.$fetch({
                url:'http://127.0.0.1:3000/system/getPageList',
            }).then((res=>{
                this.pageList = res.data.data
            }))
        },

        add(){
            this.showModal = true
        },
        modify(row){
            let self = this
            this.pageId = row.id
            Object.keys(this.formData).forEach(key=>{
                row[key] && (self.formData[key] = row[key])
            })
            this.showModal = true
        },
        confirm(){
            let params = {}
            if(this.pageId){
                params.id = this.pageId
            }
            Object.assign(params,this.formData)
            params.actions = this.formData.actions.join("#")
            this.pageId?this.modifyConfirm(params):this.addConfirm(params)
        },
        modifyConfirm(data){
            this.$fetch({
                url:'http://127.0.0.1:3000/system/setPage',
                method:'post',
                data: data
            }).then(res=>{
                this.$Message.success( res.data.msg || '修改成功!')
                window.location.reload()
            })
        },
        addConfirm(data){
            this.$fetch({
                url:'http://127.0.0.1:3000/user/addUser',
                method:'post',
                data: data
            }).then(res=>{
                this.$Message.success( res.data.msg || '添加成功!')
                window.location.reload()
            })
        }

    },

    mounted(){
        this.actionMap = this.$store.state.user.actionMap
        this.getPageList()
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.system-config{
    padding: 50px;
}
</style>
