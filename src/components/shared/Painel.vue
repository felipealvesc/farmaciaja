<template>

    <div class="painel">
      <slot class="painel-conteudo">
      </slot>
    </div>
</template>

<script>
export default {

    props: ['titulo']
}

</script>

<style scoped>
  .painel {
    padding: 0 auto;
    border: solid 2px grey;
    display: inline-block;
    margin: 5px;
    width: 100%;
    height: 100%;
    vertical-align: top;
    text-align: left;
  }

</style>
