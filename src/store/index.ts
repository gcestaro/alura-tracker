import INotificacao, { TipoNotificacao } from "@/interfaces/INotificacao";
import IProjeto from "@/interfaces/IProjeto";
import ITarefa from "@/interfaces/ITarefa";
import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import {
  ADICIONA_PROJETO,
  ADICIONA_TAREFA,
  ALTERA_PROJETO,
  ATUALIZA_TAREFA,
  EXCLUI_PROJETO,
  NOTIFICAR,
  REMOVE_TAREFA,
} from "./tipo-mutacoes";
interface Estado {
  projetos: IProjeto[];
  tarefas: ITarefa[];
  notificacoes: INotificacao[];
}

/*
Alternativas ao Vuex usando vue 3:
 - Store Pattern com reactive variables (import {reactive} from vue)
 - Providers --> Provide/Inject
 - Pinia -> outra library
*/

export const key: InjectionKey<Store<Estado>> = Symbol();

export const store = createStore<Estado>({
  state: {
    projetos: [],
    tarefas: [],
    notificacoes: [],
  },
  mutations: {
    /*
        Actions X Mutations:
            - Em vez de mudar o estado, as ações confirmam (ou fazem commit de) mutações.
            - As ações podem conter operações assíncronas arbitrárias.
        Então, uma chamada à uma API HTTP, por exemplo, ficaria numa action e uma mutation seria chamada
        caso a requisição seja realizada com sucesso.
    */
    [ADICIONA_PROJETO](state, nomeProjeto: string) {
      const projeto = {
        id: new Date().toISOString(),
        nome: nomeProjeto,
      } as IProjeto;
      state.projetos.push(projeto);
    },
    [ALTERA_PROJETO](state, projeto: IProjeto) {
      const index = state.projetos.findIndex((pj) => pj.id === projeto.id);
      state.projetos[index] = projeto;
    },
    [EXCLUI_PROJETO](state, idProjeto: string) {
      state.projetos = state.projetos.filter((pj) => pj.id !== idProjeto);
    },
    [ADICIONA_TAREFA](state, tarefa: ITarefa) {
      tarefa.id = new Date().toISOString();
      state.tarefas.push(tarefa);
    },
    [ATUALIZA_TAREFA](state, tarefa: ITarefa) {
      const indice = state.tarefas.findIndex((p) => p.id == tarefa.id);
      state.tarefas[indice] = tarefa;
    },
    [REMOVE_TAREFA](state, id: string) {
      state.projetos = state.projetos.filter((p) => p.id != id);
    },
    [NOTIFICAR](state, notificacao: INotificacao) {
      notificacao.id = new Date().getTime();
      state.notificacoes.push(notificacao);

      setTimeout(() => {
        state.notificacoes = state.notificacoes.filter(
          (n) => n.id !== notificacao.id
        );
      }, 3000);
    },
  },
});

export function useStore(): Store<Estado> {
  return vuexUseStore(key);
}
