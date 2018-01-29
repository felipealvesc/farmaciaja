<template>

  <div>
    <h1 class="centralizado">Cadastro</h1>
    <h2 v-if="tarefa.id" class="centralizado">Alteração</h2>
    <h2 v-else class="centralizado">Inclusão</h2>

    <form @submit.prevent="grava()">
      <div class="controle">
        <label for="descricao">Descrição</label>
        <input name="descricao" v-validate data-vv-rules="required" v-model="tarefa.descricao" id="descricao" autocomplete="off">
        <span class="erro" v-show="errors.has('descricao')">{{ errors.first('descricao') }}</span>
      </div>
      <div class="controle">
        <label for="data">Data</label>
        <input v-mask="'##/##/####'" name="data" v-validate data-vv-rules="required" v-model="tarefa.data" id="data" autocomplete="off">
        <span class="erro" v-show="errors.has('data')">{{ errors.first('data') }}</span>
      </div>
      <div class="controle">
        <label for="hora">Hora</label>
        <input v-mask="'##:##'" name="hora" v-validate data-vv-rules="required" v-model="tarefa.hora" id="hora" autocomplete="off" >
        <span class="erro" v-show="errors.has('hora')">{{ errors.first('hora') }}</span>
      </div> 
      
      <div class="controle">
        <label for="tempo">Tempo de duração</label>
        <select name="tempo" id="tempo" v-model="tarefa.tempo" v-validate data-vv-rules="required">
          <option disabled value="">Escolha um item</option>
          <option>5</option>
          <option>10</option>
          <option>15</option>
          <option>20</option>
          <option>25</option>
          <option>30</option>
          <option>35</option>
          <option>40</option>
          <option>45</option>
          <option>50</option>
          <option>55</option>
          <option>60</option>
        </select>
        <span class="erro" v-show="errors.has('tempo')">{{ errors.first('tempo') }}</span>
      </div>

      <div class="centralizado">
        <meu-botao rotulo="GRAVAR" tipo="submit"/><router-link to="/">
        <meu-botao rotulo="VOLTAR" tipo="button"/></router-link>
      </div>
        
    </form>
  </div>
</template>
<script>


import Botao from '../shared/botao/Botao.vue';
import Tarefa from '../../domain/tarefa/tarefa.js';
import TarefaService from '../../domain/tarefa/TarefaService';


export default {

  components: {

    'meu-botao': Botao
  },
   data() {
     
    return {
      
      tarefa: new Tarefa(),
      id: this.$route.params.id,
      tarefa: {
        datan: getData().dataFull,
        horan: getData().horaFull,
        status: 'não realizada'
        
      }
    }
  },
  
  methods: {
    grava() {
      this.$validator
            .validateAll()
            .then(success => {
              if(success) {
                this.tarefa = Object.assign({}, this.tarefa, {
                    datae: getData().dataFull,
                    horae: getData().horaFull
                  })
                this.service
                  
                  .cadastra(this.tarefa)
                  .then(() => {

                   
                    if(this.id) this.$router.push({ name: 'home'});
                    
                    this.tarefa = new Tarefa() 
                  }, 
                  err => console.log(err));
              }
          });
    }
  },
  created() {

    this.service = new TarefaService(this.$resource);

    if(this.id) {
      this.service
        .busca(this.id)
        .then(tarefa => this.tarefa = tarefa);
    }
  }
}
function getData(){
    let data = new Date();
    let dia = data.getDate();
      if (dia.toString().length == 1){
      dia = "0"+dia;
      }
    let mes = data.getMonth() + 1; 
      if (mes.toString().length == 1){
        mes = "0"+mes;
      }
    let ano = data.getFullYear();
    
    let dataFull = dia + '/' + mes + '/' + ano;

    let hora = data.getHours();
      if (hora.toString().length == 1){
        hora = "0"+hora;
      }
    let minuto = data.getMinutes();
      if (minuto.toString().length == 1){
        minuto = "0"+minuto;
      }
    let horaFull = hora + ':' + minuto;
    return {
      dia: dia,
      mes: mes,
      ano: ano,
      hora: hora,
      minuto: minuto,
      dataFull: dataFull,
      horaFull: horaFull
    }
}
</script>
<style lang="scss" scoped>

  .controle {
    font-size: 1.2em;
    margin-bottom: 20px;

  }
  .controle label {
    display: block;
    font-weight: bold;
  }

 .controle label + input, .controle textarea {
    width: 100%;
    font-size: inherit;
    border-radius: 5px
  }


  #tempo{
    height: 29px;
    border-radius: 5px;
  }
  .controle{
    width: 50%;
  }
  .erro{
    color: red;
  }

</style>