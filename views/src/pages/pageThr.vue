<template>
  <div class="page-thr">
    <h1>{{ msg }}</h1>
    <Button v-if="$route.meta.actions.add">Add</Button>
    <Button v-if="$route.meta.actions.delete">Delete</Button>
    <Button v-if="$route.meta.actions.modify">Modify</Button>
    <Button v-if="$route.meta.actions.upload">Upload</Button>
    <Button v-if="$route.meta.actions.download">Download</Button>
  </div>
</template>

<script>
export default {
  name: 'PageThr',
  data () {
    return {
      msg: 'pageThr',
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
