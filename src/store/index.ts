import IProjeto from "@/interfaces/IProjeto";
import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
interface Estado {
  projetos: IProjeto[];
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
  },
  mutations: {
    /*
        Actions X Mutations:
            - Em vez de mudar o estado, as ações confirmam (ou fazem commit de) mutações.
            - As ações podem conter operações assíncronas arbitrárias.
        Então, uma chamada à uma API HTTP, por exemplo, ficaria numa action e uma mutation seria chamada
        caso a requisição seja realizada com sucesso.
    */
    ADICIONA_PROJETO(state, nomeProjeto: string) {
      const projeto = {
        id: new Date().toISOString(),
        nome: nomeProjeto,
      } as IProjeto;
      state.projetos.push(projeto);
    },
  },
});

export function useStore(): Store<Estado> {
  return vuexUseStore(key);
}
