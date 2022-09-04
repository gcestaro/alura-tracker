<template>
  <main
    class="columns is-gapless is-multiline"
    :class="{ 'modo-escuro': modoEscuroAtivo }"
  >
    <div class="column is-one-quarter">
      <BarraLateral @tema-alterado="alterarTema" />
    </div>
    <div class="column is-three-quarter conteudo">
      <FormularioVue @salvarTarefa="salvarTarefa" />
      <div class="lista">
        <BoxVue v-if="semTarefas"> Nenhuma tarefa </BoxVue>
        <TarefaVue
          :tarefa="tarefa"
          v-for="(tarefa, index) in tarefas"
          :key="index"
        />
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BarraLateral from "./components/BarraLateral.vue";
import FormularioVue from "./components/Formulario.vue";
import TarefaVue from "./components/Tarefa.vue";
import ITarefa from "./interfaces/ITarefa";
import BoxVue from "./components/Box.vue";

export default defineComponent({
  name: "App",
  components: { BarraLateral, FormularioVue, TarefaVue, BoxVue },
  data() {
    return {
      tarefas: [] as ITarefa[],
      modoEscuroAtivo: false,
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
    alterarTema(modoEscuroAtivo: boolean) {
      this.modoEscuroAtivo = modoEscuroAtivo;
    },
  },
});
</script>

<style>
.lista {
  padding: 1.25rem;
}
main {
  --bg-primario: #fff;
  --texto-primario: #000;
}
main.modo-escuro {
  --bg-primario: #2b2d42;
  --texto-primario: #ddd;
}
.conteudo {
  background-color: var(--bg-primario);
}
</style>
