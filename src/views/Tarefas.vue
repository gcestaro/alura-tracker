<template>
  <FormularioVue @salvarTarefa="salvarTarefa" />
  <div class="lista">
    <BoxVue v-if="semTarefas"> Nenhuma tarefa </BoxVue>
    <div class="field">
      <p class="control has-icons-left has-icons-right">
        <input
          class="input"
          type="text"
          placeholder="Digite para filtrar"
          v-model="filtro"
        />
        <span class="icon is-small is-left">
          <i class="fas fa-search"></i>
        </span>
      </p>
    </div>
    <TarefaVue
      @tarefaClicada="selecionarTarefa"
      :tarefa="tarefa"
      v-for="(tarefa, index) in tarefas"
      :key="index"
    />
    <Modal :mostrar="tarefaSelecionada != null" v-if="tarefaSelecionada">
      <template v-slot:cabecalho>
        <p class="modal-card-title">Editar tarefa</p>
        <button class="delete" aria-label="close" @click="fecharModal"></button>
      </template>
      <template v-slot:corpo>
        <div class="field">
          <label for="nomeTarefa" class="label"> Descrição da Tarefa </label>
          <input
            type="text"
            class="input"
            v-model="tarefaSelecionada.descricao"
            id="nomeTarefa"
          />
        </div>
      </template>
      <template v-slot:rodape>
        <button @click="alterarTarefa" class="button is-success">Salvar</button>
        <button @click="fecharModal" class="button">Cancelar</button>
      </template>
    </Modal>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, Ref, ref, watchEffect } from "vue";
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
import Modal from "@/components/Modal.vue";

export default defineComponent({
  name: "TarefasVue",
  components: { FormularioVue, TarefaVue, BoxVue, Modal },
  computed: {
    semTarefas(): boolean {
      return this.tarefas.length === 0;
    },
  },
  setup() {
    const store = useStore();
    store.dispatch(OBTER_PROJETOS);
    store.dispatch(OBTER_TAREFAS);

    const filtro = ref("");

    const tarefaSelecionada = ref(null) as Ref<ITarefa | null>;

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

    const tarefas = computed(
      () => store.state.tarefa.tarefas
      // .filter(
      //   (t) => !filtro.value || t.descricao.includes(filtro.value)
      // )
    );

    watchEffect(() => {
      console.log(filtro.value);
      store.dispatch(OBTER_TAREFAS, filtro.value);
    });

    return {
      tarefaSelecionada,
      tarefas,
      filtro,
      salvarTarefa,
      alterarTarefa,
      selecionarTarefa,
      fecharModal,
    };
  },
});
</script>
