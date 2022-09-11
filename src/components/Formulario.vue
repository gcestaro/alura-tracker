<template>
  <div class="box formulario">
    <div class="columns">
      <div
        class="column is-5"
        role="form"
        aria-label="Formuário para criação de uma nova tarefa"
      >
        <input
          type="text"
          class="input"
          placeholder="Qual tarefa você deseja iniciar?"
          v-model="descricaoTarefa"
        />
      </div>
      <div class="column is-3">
        <div class="select">
          <select v-model="idProjeto">
            <option value="">Selecione o projeto</option>
            <option
              :value="projeto.id"
              v-for="projeto in projetos"
              :key="projeto.id"
            >
              {{ projeto.nome }}
            </option>
          </select>
        </div>
      </div>
      <div class="column">
        <TemporizadorVue @temporizador-finalizado="finalizarTarefa" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { TipoNotificacao } from "@/interfaces/INotificacao";
import { key } from "@/store";
import { NOTIFICAR } from "@/store/tipo-mutacoes";
import { computed, defineComponent, ref } from "vue";
import { useStore } from "vuex";
import TemporizadorVue from "./Temporizador.vue";

export default defineComponent({
  name: "FormularioVue",
  components: { TemporizadorVue },
  emits: ["salvarTarefa"],
  methods: {},
  setup(props, { emit }) {
    const store = useStore(key);

    const descricaoTarefa = ref("");
    const idProjeto = ref("");
    const projetos = computed(() => store.state.projeto.projetos);

    const finalizarTarefa = (tempoDecorrido: number): void => {
      const projeto = projetos.value.find((pj) => pj.id == idProjeto.value);

      if (!projeto) {
        store.commit(NOTIFICAR, {
          titulo: "Ops!",
          texto: "Selecione um projeto antes de finalizar a tarefa!",
          tipo: TipoNotificacao.FALHA,
        });
        return;
      }

      emit("salvarTarefa", {
        duracaoEmSegundos: tempoDecorrido,
        descricao: descricaoTarefa.value,
        projeto: projetos.value.find((pj) => pj.id === idProjeto.value),
      });
      descricaoTarefa.value = "";
    };

    return {
      descricaoTarefa,
      idProjeto,
      projetos,
      finalizarTarefa,
    };
  },
});
</script>

<style scoped>
.formulario {
  color: var(--texto-primario);
  background-color: var(--bg-primario);
}
</style>
