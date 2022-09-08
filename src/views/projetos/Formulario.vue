<template>
  <section>
    <h1 class="title">Projetos</h1>
    <form @submit.prevent="salvar">
      <div class="field">
        <label for="nomeProjeto" class="label"> Nome do Projeto </label>
        <input
          type="text"
          class="input"
          v-model="nomeProjeto"
          id="nomeProjeto"
        />
      </div>
      <div class="field">
        <button class="button" type="submit">Salvar</button>
      </div>
    </form>
  </section>
</template>

<script lang="ts">
import { TipoNotificacao } from "@/interfaces/INotificacao";
import { useStore } from "@/store";
import {
  ADICIONA_PROJETO,
  ALTERA_PROJETO,
  NOTIFICAR,
} from "@/store/tipo-mutacoes";
import { defineComponent } from "vue";
export default defineComponent({
  name: "FormularioVueƒ",
  components: {},
  data() {
    return {
      nomeProjeto: "",
    };
  },
  mounted() {
    if (this.id) {
      const projeto = this.store.state.projetos.find((pj) => pj.id === this.id);
      this.nomeProjeto = projeto?.nome || "";
    }
  },
  props: {
    id: {
      type: String,
    },
  },
  methods: {
    salvar() {
      if (this.id) {
        const projeto = {
          id: this.id,
          nome: this.nomeProjeto,
        };
        this.store.commit(ALTERA_PROJETO, projeto);
      } else {
        this.store.commit(ADICIONA_PROJETO, this.nomeProjeto);
      }
      this.nomeProjeto = "";
      this.store.commit(NOTIFICAR, {
        titulo: "Projeto salvo",
        texto: "Seu projeto já está disponível",
        tipo: TipoNotificacao.SUCESSO,
      });
      this.$router.push("/projetos");
    },
  },
  setup() {
    const store = useStore();
    return {
      store,
    };
  },
});
</script>
