import http from "@/http";
import ITarefa from "@/interfaces/ITarefa";
import { Estado } from "@/store";
import {
  OBTER_TAREFAS,
  ADICIONAR_TAREFA,
  EDITAR_TAREFA,
  REMOVER_TAREFA,
} from "../../tipo-acoes";
import {
  ADICIONA_TAREFA,
  ATUALIZA_TAREFA,
  REMOVE_TAREFA,
  DEFINIR_TAREFAS,
} from "../../tipo-mutacoes";
import { Module } from "vuex";

export interface EstadoTarefa {
  tarefas: ITarefa[];
}

export const tarefa: Module<EstadoTarefa, Estado> = {
  state: {
    tarefas: [],
  },
  mutations: {
    [ADICIONA_TAREFA](state, tarefa: ITarefa) {
      state.tarefas.push(tarefa);
    },
    [ATUALIZA_TAREFA](state, tarefa: ITarefa) {
      const indice = state.tarefas.findIndex((t) => t.id == tarefa.id);
      state.tarefas[indice] = tarefa;
    },
    [REMOVE_TAREFA](state, id: string) {
      state.tarefas = state.tarefas.filter((t) => t.id != id);
    },
    [DEFINIR_TAREFAS](state, tarefas: ITarefa[]) {
      state.tarefas = tarefas;
    },
  },
  actions: {
    [OBTER_TAREFAS]({ commit }, filtro: string) {
      let url = "/tarefas";
      if (filtro) {
        url += `?descricao=${filtro}`;
      }
      http.get(url).then((res) => commit(DEFINIR_TAREFAS, res.data));
    },
    [ADICIONAR_TAREFA]({ commit }, tarefa: ITarefa) {
      return http
        .post("/tarefas", tarefa)
        .then((res) => commit(ADICIONA_TAREFA, res.data));
    },
    [EDITAR_TAREFA]({ commit }, tarefa: ITarefa) {
      return http
        .put(`/tarefas/${tarefa.id}`, tarefa)
        .then((res) => commit(ATUALIZA_TAREFA, res.data));
    },
    [REMOVER_TAREFA]({ commit }, id: string) {
      return http
        .delete(`/tarefas/${id}`)
        .then(() => commit(REMOVE_TAREFA, id));
    },
  },
};
