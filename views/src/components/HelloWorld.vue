<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div v-for="(item,index) in userList" :key="index">{{item.name}}</div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'TEST',
      userList:[]
    }
  },
  methods:{
    init() {
      this.$fetch({
        url:'http://192.168.1.39:3000/user/getUserList',
        method:'post',
        headers:{

        },
        data:{
          id:1
        }
      }).then((res=>{
        this.userList = res.data.data
      }))
    }
  },

  mounted(){
    this.init()
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
