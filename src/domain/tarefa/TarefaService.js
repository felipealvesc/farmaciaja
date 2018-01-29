export default class TarefaService {

    constructor(resource) {

        this._resource = resource('tarefas{/id}');
    } 

    lista() {

        return this._resource
            .query()
            .then(
                res => res.json(),
                err => {
                    console.log(err);
                    throw new Error('Não foi possível obter as tarefas. Tenta mais tarde');
                }
            )
    }

    cadastra(tarefa) {
        if(tarefa.id) {
                
            return this._resource.update({ id: tarefa.id }, tarefa);
                
        } else {

            return this._resource.save(tarefa);
        }

    }
    
    apaga(id) {

        return this._resource
            .delete({ id })
            .then(null, err => {
                console.log(err);
                throw new Error('Não foi possível remover a tarefa. Tente mais tarde');
            });
    }

    busca(id) {

        return this._resource
            .get({ id })
            .then(res => res.json());
    }

}