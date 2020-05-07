<template>
  <div class="login flex-row height-100">
    <Form  ref="userInfo" :model="userInfo" :rules="ruleInline">
        <FormItem prop="name">
            <Input type="text" v-model="userInfo.name" placeholder="姓名">
                <Icon type="ios-person-outline" slot="prepend"></Icon>
            </Input>
        </FormItem>
        <FormItem prop="password">
            <Input type="password" v-model="userInfo.password" placeholder="密码">
                <Icon type="ios-lock-outline" slot="prepend"></Icon>
            </Input>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="handleSubmit">登陆</Button>
        </FormItem>
    </Form>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
        userInfo: {
            name: '',
            password: ''
        },
        ruleInline: {
            name: [
                { required: true, message: 'Please fill in the user name', trigger: 'blur' }
            ],
            password: [
                { required: true, message: 'Please fill in the password.', trigger: 'blur' },
                { type: 'string', min: 5, message: 'The password length cannot be less than 6 bits', trigger: 'blur' }
            ]
        }
    }
  },
  methods:{
    handleSubmit() {
        this.$refs.userInfo.validate((valid) => {
            if (valid) {
                this.loginAction()
            } else {
                this.$Message.error('Fail!');
            }
        })
    },
    loginAction(){
        this.$fetch({
            url:'http://127.0.0.1:3000/user/login',
            method:'post',
            data:this.userInfo
        }).then((res=>{
            if(!res.data.code){
                this.$Message.success('登陆成功!');
                let timer = setTimeout(()=>{
                    this.$router.push({name:"index"})
                    timer = null
                },1500)
            }else{
                this.$Message.error(res.data.msg || '用户名或密码错误');
            }
        }))
    }
  },

  mounted(){
    
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
