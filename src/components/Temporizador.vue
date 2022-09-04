<template>
  <div class="is-flex is-align-items-center is-justify-content-space-between">
    <CronometroVue
      :tempo-em-segundos="tempoEmSegundos"
      :disabled="cronometroRodando"
    />
    <BotaoVue
      @clicked="iniciar"
      :disabled="cronometroRodando"
      iconClass="fas fa-play"
      label="Play"
    />
    <BotaoVue
      @clicked="finalizar"
      :disabled="!cronometroRodando"
      iconClass="fas fa-stop"
      label="Stop"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CronometroVue from "./Cronometro.vue";
import BotaoVue from "./Botao.vue";

export default defineComponent({
  name: "TemporizadorVue",
  components: { CronometroVue, BotaoVue },
  emits: ["temporizadorFinalizado"],
  data() {
    return {
      tempoEmSegundos: 0,
      cronometro: 0,
      cronometroRodando: false,
    };
  },
  methods: {
    iniciar() {
      this.cronometroRodando = true;
      this.cronometro = setInterval(() => {
        this.tempoEmSegundos++;
      }, 1000);
    },
    finalizar() {
      this.cronometroRodando = false;
      clearInterval(this.cronometro);
      this.$emit("temporizadorFinalizado", this.tempoEmSegundos);
      this.tempoEmSegundos = 0;
    },
  },
});
</script>
