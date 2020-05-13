<template>
  <div class="page-two">
    <h1>{{ msg }}</h1>
    <button v-if="$route.meta.actions.add">Add</button>
    <button v-if="$route.meta.actions.delete">Delete</button>
    <button v-if="$route.meta.actions.modify">Modify</button>
    <button v-if="$route.meta.actions.upload">Upload</button>
    <button v-if="$route.meta.actions.download">Download</button>
  </div>
</template>

<script>
export default {
  name: 'PageTwo',
  data () {
    return {
      msg: 'pageTwo',
    }
  },
  methods:{
 
  },

  mounted(){
    
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
