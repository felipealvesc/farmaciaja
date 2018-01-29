<template>
  <div>
    <h1 class="centralizado">{{ titulo }} </h1>
    <p v-show="mensagem" class="centralizado">{{ mensagem }}</p>

    <input type="search" class="filtro" @input="filtro = $event.target.value" placeholder="filtre pela descrição">
    <div id="lista">
      <span>ordenar por:</span>
      <a href="#" @click="sortUsers('descricao')">descricao</a>
      <a href="#" @click="sortUsers('data')">data</a>
     
    </div> 
    <ul class="lista-tarefas">
      <li class="lista-tarefas-item" v-for="tarefa in tarefasComFiltro">

        <meu-painel :descricao="tarefa.descricao"> 
            <ul class="box-tarefas">
                <li class="itens-tarefas"> Descrição:  {{ tarefa.descricao }}</li>
                <li class="itens-tarefas"> Data:  {{ tarefa.data }} {{tarefa.hora}}</li>
                <li class="itens-tarefas"> Duração:  {{ tarefa.tempo }} Minutos</li>
                <li class="itens-tarefas"> Data Criação: {{ tarefa.datan }} {{ tarefa.horan }}</li>
                <li class="itens-tarefas"> Editado: {{ tarefa.datae }} {{ tarefa.horae }} </li>
                <li class="itens-tarefas"> Status: {{ tarefa.status }} </li>
                

            </ul>
            
            <router-link :to="{ name: 'altera', params: {id : tarefa.id }}">
              <meu-botao rotulo="alterar" tipo="button"/>
            </router-link> 
            <meu-botao tipo="button" rotulo="remover" @botaoAtivado="remove(tarefa)" :confirmacao="true" estilo="perigo"/>
           
             
        </meu-painel>

      </li>
    </ul>
  </div>
</template>

<script>
import Painel from '../shared/Painel.vue';
import Botao from '../shared/botao/Botao.vue';
import TarefaService from '../../domain/tarefa/TarefaService';

export default {

components:{
  'meu-painel' : Painel,
  'meu-botao': Botao
},

methods: {

  remove(tarefa) {

    this.service.apaga(tarefa.id)
    .then(()=> {
      let indice = this.tarefas.indexOf(tarefa);
      this.tarefas.splice(indice, 1);
      this.mensagem = 'Tarefa removida com sucesso no dia ' + getData().dataFull + ' as ' + getData().horaFull;
    }, err => {
      console.log(err);
      this.mensagem = 'Não foi possível remover a tarefa';
    });
  },
  sortUsers: function(chave) {
    this.tarefas.sort(function(a, b) {
      return a[chave].localeCompare(b[chave])
    });
  },

},


  
  data() {
    return {
      titulo: 'Farmacia Já',
      tarefas: [],
      filtro:'',
      mensagem: '',

    }
  },

  computed:{
    tarefasComFiltro(){

      if(this.filtro){
        let exp = new RegExp(this.filtro.trim(), 'i');
        return this.tarefas.filter(tarefa => exp.test(tarefa.descricao));
      }else{
        return this.tarefas;
      }
    }
  },

    created() {
    this.service = new TarefaService(this.$resource);

    this.service.lista()
      .then(tarefas => this.tarefas = tarefas, err => this.mensagem = err.message);
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
    let horaAlarm =  hora + ':' + (minuto + 1);
    return {
      dia: dia,
      mes: mes,
      ano: ano,
      hora: hora,
      minuto: minuto,
      dataFull: dataFull,
      horaFull: horaFull,
      horaAlarm: horaAlarm
    }
}



document.addEventListener('DOMContentLoaded', function(){
  if(Notification.permission !== 'granted')
    Notification.requestPermission(); 
});

if(getData().horaFull == getData().horaAlarm){
var notification = new Notification('Titulo teste',{
  ico: 'https://www.google.com.br/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
  body: getData().hora + ':' + (getData().minuto)
});
}

</script>

<style lang="scss" cscoped>

  .titulo, .centralizado {
    text-align: center;
  }

  
  .filtro{
    display: block;       
    width: 50%;
    height: 35px;
    border-radius: 4px;
  }
  .lista-tarefas-item{
    width: 32%;
    display: inline-block;
    margin: 5px;
  }

</style>
