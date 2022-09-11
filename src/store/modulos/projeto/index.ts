import IProjeto from "@/interfaces/IProjeto";
import { Estado } from "@/store";
import {
  ADICIONAR_PROJETO,
  EDITAR_PROJETO,
  OBTER_PROJETOS,
  REMOVER_PROJETO,
} from "../../tipo-acoes";
import http from "@/http";
import {
  ALTERA_PROJETO,
  EXCLUI_PROJETO,
  DEFINIR_PROJETOS,
} from "../../tipo-mutacoes";
import { Module } from "vuex";

export interface EstadoProjeto {
  projetos: IProjeto[];
}

export const projeto: Module<EstadoProjeto, Estado> = {
  state: {
    projetos: [],
  },
  mutations: {
    [ALTERA_PROJETO](state, projeto: IProjeto) {
      const index = state.projetos.findIndex((pj) => pj.id === projeto.id);
      state.projetos[index] = projeto;
    },
    [EXCLUI_PROJETO](state, idProjeto: string) {
      state.projetos = state.projetos.filter((pj) => pj.id !== idProjeto);
    },
    [DEFINIR_PROJETOS](state, projetos: IProjeto[]) {
      state.projetos = projetos;
    },
  },
  actions: {
    [OBTER_PROJETOS]({ commit }) {
      http.get("projetos").then((res) => commit(DEFINIR_PROJETOS, res.data));
    },
    [ADICIONAR_PROJETO](contexto, nome: string) {
      return http.post("/projetos", {
        nome,
      });
    },
    [EDITAR_PROJETO](contexto, projeto: IProjeto) {
      return http.put(`/projetos/${projeto.id}`, projeto);
    },
    [REMOVER_PROJETO]({ commit }, id: string) {
      return http
        .delete(`/projetos/${id}`)
        .then(() => commit(EXCLUI_PROJETO, id));
    },
  },
};
