<template>
  <FormularioVue @salvarTarefa="salvarTarefa" />
  <div class="lista">
    <BoxVue v-if="semTarefas"> Nenhuma tarefa </BoxVue>
    <TarefaVue
      :tarefa="tarefa"
      v-for="(tarefa, index) in tarefas"
      :key="index"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import FormularioVue from "../components/Formulario.vue";
import TarefaVue from "../components/Tarefa.vue";
import ITarefa from "../interfaces/ITarefa";
import BoxVue from "../components/Box.vue";

export default defineComponent({
  name: "TarefasVue",
  components: { FormularioVue, TarefaVue, BoxVue },
  data() {
    return {
      tarefas: [] as ITarefa[],
    };
  },
  computed: {
    semTarefas(): boolean {
      return this.tarefas.length === 0;
    },
  },
  methods: {
    salvarTarefa(tarefa: ITarefa) {
      this.tarefas.push(tarefa);
    },
  },
});
</script>
