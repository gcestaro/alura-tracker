<template>
  <div class="box formulario">
    <div class="columns">
      <div
        class="column is-8"
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
      <div class="column">
        <TemporizadorVue @temporizador-finalizado="finalizarTarefa" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TemporizadorVue from "./Temporizador.vue";

export default defineComponent({
  name: "FormularioVue",
  components: { TemporizadorVue },
  emits: ["salvarTarefa"],
  data() {
    return {
      descricaoTarefa: "",
    };
  },
  methods: {
    finalizarTarefa(tempoDecorrido: number): void {
      this.$emit("salvarTarefa", {
        duracaoEmSegundos: tempoDecorrido,
        descricao: this.descricaoTarefa,
      });
      this.descricaoTarefa = "";
    },
  },
});
</script>

<style scoped>
.formulario {
  color: var(--texto-primario);
  background-color: var(--bg-primario);
}
</style>
