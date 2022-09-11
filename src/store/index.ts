import INotificacao, { TipoNotificacao } from "@/interfaces/INotificacao";
import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { NOTIFICAR } from "./tipo-mutacoes";
import { EstadoProjeto, projeto } from "./modulos/projeto";
import { EstadoTarefa, tarefa } from "./modulos/tarefa";

export interface Estado {
  tarefa: EstadoTarefa;
  notificacoes: INotificacao[];
  projeto: EstadoProjeto;
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
    notificacoes: [],
    tarefa: {
      tarefas: [],
    },
    projeto: {
      projetos: [],
    },
  },
  actions: {},
  mutations: {
    /*
        Actions X Mutations:
            - Em vez de mudar o estado, as ações confirmam (ou fazem commit de) mutações.
            - As ações podem conter operações assíncronas arbitrárias.
        Então, uma chamada à uma API HTTP, por exemplo, ficaria numa action e uma mutation seria chamada
        caso a requisição seja realizada com sucesso.
    */
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
  modules: {
    projeto,
    tarefa,
  },
});

export function useStore(): Store<Estado> {
  return vuexUseStore(key);
}
