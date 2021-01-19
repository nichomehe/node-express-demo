<template>
  <div>
      <Submenu :name="cur.name" class="sub-nav">
        <template slot="title">
          {{cur.meta.title}}
        </template>
        <template v-for="(_cur, _k) in cur.children">
          <template v-if ='_cur.children && _cur.children.length'>
            <side-menu-item :cur="_cur" :key="_cur.name"  @handleSkip="handleSkip"></side-menu-item>
          </template>
          <template v-else>
            <MenuItem @click.native="handleSkip(_cur)" :name="_cur.name " :key="_k" :style="{paddingLeft:'60px'}">{{_cur.meta.title}}</MenuItem>
          </template>
        </template>
      </Submenu>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SideMenuItem',
  props:['cur'],
  methods:{
    handleSkip(_cur){
      this.$emit('handleSkip',_cur)
    }
  }
}
</script>
 
