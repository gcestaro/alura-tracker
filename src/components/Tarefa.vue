<template>
  <BoxVue>
    <div class="columns clicavel" @click="selecionarTarefa">
      <div class="column is-4">
        {{ tarefa.descricao || "Tarefa sem descrição" }}
      </div>
      <div class="column is-3">
        {{ tarefa.projeto?.nome || "N/D" }}
      </div>
      <div class="column">
        <CronometroVue :tempoEmSegundos="tarefa.duracaoEmSegundos" />
      </div>
    </div>
  </BoxVue>
</template>

<script lang="ts">
import ITarefa from "@/interfaces/ITarefa";
import { defineComponent, PropType } from "vue";
import CronometroVue from "./Cronometro.vue";
import BoxVue from "./Box.vue";

export default defineComponent({
  name: "TarefaVue",
  components: { CronometroVue, BoxVue },
  emits: ["tarefaClicada"],
  props: {
    tarefa: {
      type: Object as PropType<ITarefa>,
      required: true,
    },
  },
  setup(props, { emit }) {
    const selecionarTarefa = (): void => {
      emit("tarefaClicada", props.tarefa);
    };

    return {
      selecionarTarefa,
    };
  },
});
</script>

<style scoped>
.clicavel {
  cursor: pointer;
}
</style>
