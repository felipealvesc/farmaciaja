<template>
  <div class="corpo">

    <meu-menu :rotas="routes"/>
    
    <router-view></router-view>
  </div>
</template>

<script>
import{ routes } from './routes'
import Menu from './components/shared/menu/Menu.vue';
export default {

   components: {
    'meu-menu' : Menu
  },

  data() {
    return{
      routes : routes.filter(route => route.menu)
    }
  }
}

</script>

<style scoped>

  .corpo {
    font-family: Helvetica, sans-serif;
    margin: 0 auto;
    width: 96%;
  }



</style>
