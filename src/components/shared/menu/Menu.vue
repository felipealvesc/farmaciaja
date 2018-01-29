<template>
    <nav>
      <ul>       
          <li v-for="rota in rotas">
            <router-link :to="rota.path ? rota.path : '/'">{{rota.titulo}}</router-link>
          </li>
      </ul>
    </nav>

</template>
<script>
export default {

    props: {
        rotas: {
            type: Array, 
            required: true
        }
    }
}
</script>    

<style lang="scss" scoped>
.corpo{
    ul{
        list-style: none;
        li{
            display: inline-block;
            font-weight: bold;
            a{
                padding: 10px;
                text-decoration: none;
                font-size: 16px;
                font-weight: bold;
            }
        }    
    }
}

</style>