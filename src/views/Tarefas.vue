<template>
  <FormularioVue @salvarTarefa="salvarTarefa" />
  <div class="lista">
    <BoxVue v-if="semTarefas"> Nenhuma tarefa </BoxVue>
    <TarefaVue
      @tarefaClicada="selecionarTarefa"
      :tarefa="tarefa"
      v-for="(tarefa, index) in tarefas"
      :key="index"
    />
    <div
      class="modal"
      :class="{ 'is-active': tarefaSelecionada }"
      v-if="tarefaSelecionada"
    >
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Editar tarefa</p>
          <button
            class="delete"
            aria-label="close"
            @click="fecharModal"
          ></button>
        </header>
        <section class="modal-card-body">
          <div class="field">
            <label for="nomeTarefa" class="label"> Descrição da Tarefa </label>
            <input
              type="text"
              class="input"
              v-model="tarefaSelecionada.descricao"
              id="nomeTarefa"
            />
          </div>
        </section>
        <footer class="modal-card-foot">
          <button @click="alterarTarefa" class="button is-success">
            Salvar
          </button>
          <button @click="fecharModal" class="button">Cancelar</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, Ref, ref } from "vue";
import FormularioVue from "../components/Formulario.vue";
import TarefaVue from "../components/Tarefa.vue";
import ITarefa from "../interfaces/ITarefa";
import BoxVue from "../components/Box.vue";
import { useStore } from "@/store";
import {
  ADICIONAR_TAREFA,
  EDITAR_TAREFA,
  OBTER_PROJETOS,
  OBTER_TAREFAS,
} from "@/store/tipo-acoes";

export default defineComponent({
  name: "TarefasVue",
  components: { FormularioVue, TarefaVue, BoxVue },
  computed: {
    semTarefas(): boolean {
      return this.tarefas.length === 0;
    },
  },
  setup(props) {
    const store = useStore();
    store.dispatch(OBTER_PROJETOS);
    store.dispatch(OBTER_TAREFAS);

    const tarefas = computed(() => store.state.tarefa.tarefas);

    var tarefaSelecionada = ref(null) as Ref<ITarefa | null>;

    const salvarTarefa = (tarefa: ITarefa) => {
      store.dispatch(ADICIONAR_TAREFA, tarefa);
    };

    const alterarTarefa = () => {
      store.dispatch(EDITAR_TAREFA, tarefaSelecionada.value).then(fecharModal);
    };

    const selecionarTarefa = (tarefa: ITarefa) => {
      tarefaSelecionada.value = tarefa;
    };

    const fecharModal = () => {
      tarefaSelecionada.value = null;
    };

    return {
      tarefaSelecionada,
      tarefas,
      salvarTarefa,
      alterarTarefa,
      selecionarTarefa,
      fecharModal,
    };
  },
});
</script>
